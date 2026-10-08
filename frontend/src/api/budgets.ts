import { api } from "./client";
import type { BudgetSummary } from "../types";

export async function getBudget(month: string): Promise<BudgetSummary> {
  const { data } = await api.get<BudgetSummary>(`/budgets/${month}`);
  return data;
}

export async function setBudget(month: string, amount: number): Promise<{ month: string; amount: number }> {
  const { data } = await api.put<{ month: string; amount: number }>(`/budgets/${month}`, { amount });
  return data;
}
