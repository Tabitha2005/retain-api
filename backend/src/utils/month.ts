export const MONTH_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/;

export function currentMonth(): string {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function monthRange(month: string): { start: Date; end: Date } {
  const [y, m] = month.split("-").map(Number) as [number, number];
  return {
    start: new Date(Date.UTC(y, m - 1, 1)),
    end: new Date(Date.UTC(y, m, 1)),
  };
}

export type BudgetStatus = "none" | "within" | "approaching" | "over";

export function budgetStatus(spent: number, budget: number): BudgetStatus {
  if (budget <= 0) return "none";
  const ratio = spent / budget;
  if (ratio > 1) return "over";
  if (ratio >= 0.8) return "approaching";
  return "within";
}
