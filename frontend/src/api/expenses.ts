import { api } from "./client";
import type { Expense, ExpenseInput, ExpenseQuery, Paginated } from "../types";

export async function listExpenses(query: ExpenseQuery): Promise<Paginated<Expense>> {
  const { data } = await api.get<Paginated<Expense>>("/expenses", { params: query });
  return data;
}

export async function getExpense(id: string): Promise<Expense> {
  const { data } = await api.get<Expense>(`/expenses/${id}`);
  return data;
}

export async function createExpense(input: ExpenseInput): Promise<Expense> {
  const { data } = await api.post<Expense>("/expenses", input);
  return data;
}

export async function updateExpense(id: string, input: Partial<ExpenseInput>): Promise<Expense> {
  const { data } = await api.put<Expense>(`/expenses/${id}`, input);
  return data;
}

export async function deleteExpense(id: string): Promise<void> {
  await api.delete(`/expenses/${id}`);
}
