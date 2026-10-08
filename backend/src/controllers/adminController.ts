import { Request, Response } from "express";
import { User } from "../models/User";
import { Expense } from "../models/Expense";
import { Category } from "../models/Category";
import { monthRange, currentMonth } from "../utils/month";

interface CategoryStat {
  categoryId: string;
  name: string;
  count: number;
  total: number;
}

export async function getInsights(_req: Request, res: Response): Promise<void> {
  const { start, end } = monthRange(currentMonth());

  const [totalUsers, totals, thisMonth, perCategory, recentExpenses, recentUsers, categories] = await Promise.all([
    User.countDocuments(),
    Expense.aggregate<{ count: number; total: number }>([
      { $group: { _id: null, count: { $sum: 1 }, total: { $sum: "$amount" } } },
    ]),
    Expense.countDocuments({ date: { $gte: start, $lt: end } }),
    Expense.aggregate<{ _id: unknown; count: number; total: number }>([
      { $group: { _id: "$category", count: { $sum: 1 }, total: { $sum: "$amount" } } },
    ]),
    Expense.find().sort({ createdAt: -1 }).limit(5).populate("category", "name").populate("user", "name email"),
    User.find().sort({ createdAt: -1 }).limit(5).select("name email role createdAt"),
    Category.find().select("name"),
  ]);

  const stats = new Map<string, { count: number; total: number }>();
  for (const row of perCategory) stats.set(String(row._id), { count: row.count, total: row.total });

  const all: CategoryStat[] = categories.map((c) => {
    const s = stats.get(String(c._id));
    return { categoryId: String(c._id), name: c.name, count: s?.count ?? 0, total: s?.total ?? 0 };
  });

  const byUsage = [...all].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  res.json({
    totalUsers,
    totalExpenses: totals[0]?.count ?? 0,
    totalExpenseValue: totals[0]?.total ?? 0,
    expensesThisMonth: thisMonth,
    spendingPerCategory: [...all].sort((a, b) => b.total - a.total),
    topCategories: byUsage.slice(0, 5),
    bottomCategories: [...byUsage].reverse().slice(0, 5),
    recentExpenses,
    recentUsers,
  });
}
