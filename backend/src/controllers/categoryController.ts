import { Request, Response } from "express";
import { Category } from "../models/Category";
import { Expense } from "../models/Expense";

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function listCategories(_req: Request, res: Response): Promise<void> {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
}

export async function createCategory(req: Request, res: Response): Promise<void> {
  const name = String(req.body?.name ?? "").trim();
  if (!name) {
    res.status(400).json({ message: "Category name is required" });
    return;
  }
  const exists = await Category.findOne({ name: new RegExp(`^${escapeRegex(name)}$`, "i") });
  if (exists) {
    res.status(409).json({ message: "Category already exists" });
    return;
  }
  const category = await Category.create({ name });
  res.status(201).json(category);
}

export async function updateCategory(req: Request, res: Response): Promise<void> {
  const name = String(req.body?.name ?? "").trim();
  if (!name) {
    res.status(400).json({ message: "Category name is required" });
    return;
  }
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  if (category.isDefault) {
    res.status(400).json({ message: "The default category cannot be renamed" });
    return;
  }
  const clash = await Category.findOne({
    name: new RegExp(`^${escapeRegex(name)}$`, "i"),
    _id: { $ne: category._id },
  });
  if (clash) {
    res.status(409).json({ message: "Category already exists" });
    return;
  }
  category.name = name;
  await category.save();
  res.json(category);
}

export async function deleteCategory(req: Request, res: Response): Promise<void> {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  if (category.isDefault) {
    res.status(400).json({ message: "The default category cannot be deleted" });
    return;
  }
  const fallback = await Category.findOne({ isDefault: true });
  if (!fallback) {
    res.status(500).json({ message: "Default category is missing. Run the seed script." });
    return;
  }
  const moved = await Expense.updateMany({ category: category._id }, { $set: { category: fallback._id } });
  await category.deleteOne();
  res.json({ message: "Category deleted", expensesMoved: moved.modifiedCount });
}
