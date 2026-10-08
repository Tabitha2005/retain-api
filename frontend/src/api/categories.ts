import { api } from "./client";
import type { Category } from "../types";

export async function listCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>("/categories");
  return data;
}

export interface DeleteCategoryResult {
  message: string;
  expensesMoved: number;
}

export async function createCategory(name: string): Promise<Category> {
  const { data } = await api.post<Category>("/categories", { name });
  return data;
}

export async function updateCategory(id: string, name: string): Promise<Category> {
  const { data } = await api.put<Category>(`/categories/${id}`, { name });
  return data;
}

export async function deleteCategory(id: string): Promise<DeleteCategoryResult> {
  const { data } = await api.delete<DeleteCategoryResult>(`/categories/${id}`);
  return data;
}
