import { Response } from "express";
import mongoose from "mongoose";
import { Expense } from "../models/Expense";
import { Budget } from "../models/Budget";
import { AuthRequest } from "../middleware/auth";
import { MONTH_REGEX, monthRange, budgetStatus, currentMonth } from "../utils/month";

interface CategoryTotal {
  categoryId: mongoose.Types.ObjectId;
  name: string;
  total: number;
  count: number;
}

export async function getDashboard(req: AuthRequest, res: Response): Promise<void> {
  const month = typeof req.query.month === "string" ? req.query.month : currentMonth();
  if (!MONTH_REGEX.test(month)) {
    res.status(400).json({ message: "Month must look like 2026-10" });
    return;
  }
  const userId = new mongoose.Types.ObjectId(req.user?.id);
  const { start, end } = monthRange(month);
  const match = { user: userId, date: { $gte: start, $lt: end } };

  const [budget, totals, highest, byCategory, recent] = await Promise.all([
    Budget.findOne({ user: userId, month }),
    Expense.aggregate<{ total: number; count: number }>([
      { $match: match },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]),
    Expense.findOne(match).sort({ amount: -1 }).populate("category", "name"),
    Expense.aggregate<CategoryTotal>([
      { $match: match },
      { $group: { _id: "$category", total: { $sum: "$amount" }, count: { $sum: 1 } } },
      { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "cat" } },
      { $unwind: "$cat" },
      { $project: { _id: 0, categoryId: "$_id", name: "$cat.name", total: 1, count: 1 } },
      { $sort: { total: -1 } },
    ]),
    Expense.find({ user: userId }).sort({ date: -1, _id: -1 }).limit(5).populate("category", "name"),
  ]);

  const budgetAmount = budget?.amount ?? 0;
  const totalSpent = totals[0]?.total ?? 0;

  res.json({
    month,
    totalSpent,
    expenseCount: totals[0]?.count ?? 0,
    budget: budgetAmount,
    remaining: budgetAmount - totalSpent,
    status: budgetStatus(totalSpent, budgetAmount),
    highestExpense: highest,
    byCategory,
    recentExpenses: recent,
  });
}
