import { Response } from "express";
import mongoose from "mongoose";
import { Budget } from "../models/Budget";
import { Expense } from "../models/Expense";
import { AuthRequest } from "../middleware/auth";
import { MONTH_REGEX, monthRange, budgetStatus } from "../utils/month";

export async function getBudget(req: AuthRequest, res: Response): Promise<void> {
  const month = String(req.params.month);
  if (!MONTH_REGEX.test(month)) {
    res.status(400).json({ message: "Month must look like 2026-10" });
    return;
  }
  const { start, end } = monthRange(month);
  const [budget, agg] = await Promise.all([
    Budget.findOne({ user: req.user?.id, month }),
    Expense.aggregate<{ total: number }>([
      { $match: { user: new mongoose.Types.ObjectId(req.user?.id), date: { $gte: start, $lt: end } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
  ]);
  const amount = budget?.amount ?? 0;
  const spent = agg[0]?.total ?? 0;
  res.json({
    month,
    amount,
    spent,
    remaining: amount - spent,
    status: budgetStatus(spent, amount),
  });
}

export async function setBudget(req: AuthRequest, res: Response): Promise<void> {
  const month = String(req.params.month);
  if (!MONTH_REGEX.test(month)) {
    res.status(400).json({ message: "Month must look like 2026-10" });
    return;
  }
  const amount = Number((req.body as Record<string, unknown>).amount);
  if (!Number.isFinite(amount) || amount < 0) {
    res.status(400).json({ message: "Amount must be zero or more" });
    return;
  }
  const budget = await Budget.findOneAndUpdate(
    { user: req.user?.id, month },
    { $set: { amount } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.json({ month: budget.month, amount: budget.amount });
}
