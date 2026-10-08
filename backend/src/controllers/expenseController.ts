import { Response } from "express";
import { isValidObjectId, SortOrder } from "mongoose";
import { Expense, PAYMENT_METHODS } from "../models/Expense";
import { Category } from "../models/Category";
import { AuthRequest } from "../middleware/auth";

type PaymentMethod = (typeof PAYMENT_METHODS)[number];

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isPaymentMethod(value: unknown): value is PaymentMethod {
  return typeof value === "string" && (PAYMENT_METHODS as readonly string[]).includes(value);
}

export async function createExpense(req: AuthRequest, res: Response): Promise<void> {
  const { title, amount, category, paymentMethod, date, notes } = req.body as Record<string, unknown>;
  const amountNum = Number(amount);

  if (typeof title !== "string" || !title.trim()) {
    res.status(400).json({ message: "Title is required" });
    return;
  }
  if (!Number.isFinite(amountNum) || amountNum <= 0) {
    res.status(400).json({ message: "Amount must be a positive number" });
    return;
  }
  if (!isPaymentMethod(paymentMethod)) {
    res.status(400).json({ message: `Payment method must be one of: ${PAYMENT_METHODS.join(", ")}` });
    return;
  }
  if (!date || Number.isNaN(new Date(String(date)).getTime())) {
    res.status(400).json({ message: "A valid date is required" });
    return;
  }
  if (typeof category !== "string" || !isValidObjectId(category) || !(await Category.exists({ _id: category }))) {
    res.status(400).json({ message: "A valid category is required" });
    return;
  }

  const expense = await Expense.create({
    user: req.user?.id,
    title: title.trim(),
    amount: amountNum,
    category,
    paymentMethod,
    date: new Date(String(date)),
    notes: typeof notes === "string" ? notes.trim() : "",
  });
  const populated = await expense.populate("category", "name");
  res.status(201).json(populated);
}

export async function listExpenses(req: AuthRequest, res: Response): Promise<void> {
  const q = req.query as Record<string, string | undefined>;
  const filter: Record<string, unknown> = { user: req.user?.id };

  if (q.search?.trim()) {
    filter.$or = [
      { title: new RegExp(escapeRegex(q.search.trim()), "i") },
      { notes: new RegExp(escapeRegex(q.search.trim()), "i") },
    ];
  }
  if (q.category && isValidObjectId(q.category)) filter.category = q.category;
  if (isPaymentMethod(q.paymentMethod)) filter.paymentMethod = q.paymentMethod;

  const date: Record<string, Date> = {};
  if (q.dateFrom && !Number.isNaN(new Date(q.dateFrom).getTime())) date.$gte = new Date(q.dateFrom);
  if (q.dateTo && !Number.isNaN(new Date(q.dateTo).getTime())) {
    const end = new Date(q.dateTo);
    end.setUTCHours(23, 59, 59, 999);
    date.$lte = end;
  }
  if (Object.keys(date).length) filter.date = date;

  const amount: Record<string, number> = {};
  if (q.minAmount !== undefined && q.minAmount !== "" && Number.isFinite(Number(q.minAmount))) amount.$gte = Number(q.minAmount);
  if (q.maxAmount !== undefined && q.maxAmount !== "" && Number.isFinite(Number(q.maxAmount))) amount.$lte = Number(q.maxAmount);
  if (Object.keys(amount).length) filter.amount = amount;

  const sortField = q.sortBy === "amount" ? "amount" : "date";
  const direction: SortOrder = q.order === "asc" ? 1 : -1;
  const page = Math.max(1, parseInt(q.page ?? "1", 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(q.limit ?? "10", 10) || 10));

  const [items, total] = await Promise.all([
    Expense.find(filter)
      .populate("category", "name")
      .sort({ [sortField]: direction, _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Expense.countDocuments(filter),
  ]);

  res.json({ items, total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) });
}

export async function getExpense(req: AuthRequest, res: Response): Promise<void> {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(404).json({ message: "Expense not found" });
    return;
  }
  const expense = await Expense.findOne({ _id: id, user: req.user?.id }).populate("category", "name");
  if (!expense) {
    res.status(404).json({ message: "Expense not found" });
    return;
  }
  res.json(expense);
}

export async function updateExpense(req: AuthRequest, res: Response): Promise<void> {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(404).json({ message: "Expense not found" });
    return;
  }
  const expense = await Expense.findOne({ _id: id, user: req.user?.id });
  if (!expense) {
    res.status(404).json({ message: "Expense not found" });
    return;
  }

  const { title, amount, category, paymentMethod, date, notes } = req.body as Record<string, unknown>;

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      res.status(400).json({ message: "Title cannot be empty" });
      return;
    }
    expense.title = title.trim();
  }
  if (amount !== undefined) {
    const amountNum = Number(amount);
    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      res.status(400).json({ message: "Amount must be a positive number" });
      return;
    }
    expense.amount = amountNum;
  }
  if (paymentMethod !== undefined) {
    if (!isPaymentMethod(paymentMethod)) {
      res.status(400).json({ message: `Payment method must be one of: ${PAYMENT_METHODS.join(", ")}` });
      return;
    }
    expense.paymentMethod = paymentMethod;
  }
  if (date !== undefined) {
    if (Number.isNaN(new Date(String(date)).getTime())) {
      res.status(400).json({ message: "A valid date is required" });
      return;
    }
    expense.date = new Date(String(date));
  }
  if (category !== undefined) {
    if (typeof category !== "string" || !isValidObjectId(category) || !(await Category.exists({ _id: category }))) {
      res.status(400).json({ message: "A valid category is required" });
      return;
    }
    expense.set("category", category);
  }
  if (notes !== undefined) expense.notes = typeof notes === "string" ? notes.trim() : "";

  await expense.save();
  const populated = await expense.populate("category", "name");
  res.json(populated);
}

export async function deleteExpense(req: AuthRequest, res: Response): Promise<void> {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(404).json({ message: "Expense not found" });
    return;
  }
  const result = await Expense.deleteOne({ _id: id, user: req.user?.id });
  if (result.deletedCount === 0) {
    res.status(404).json({ message: "Expense not found" });
    return;
  }
  res.json({ message: "Expense deleted" });
}
