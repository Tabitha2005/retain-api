export type Role = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Category {
  _id: string;
  name: string;
  isDefault: boolean;
}

export interface CategoryRef {
  _id: string;
  name: string;
}

export const PAYMENT_METHODS = ["cash", "card", "mobile_money", "bank_transfer", "other"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: CategoryRef;
  paymentMethod: PaymentMethod;
  date: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseInput {
  title: string;
  amount: number;
  category: string;
  paymentMethod: PaymentMethod;
  date: string;
  notes?: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type BudgetStatus = "none" | "within" | "approaching" | "over";

export interface BudgetSummary {
  month: string;
  amount: number;
  spent: number;
  remaining: number;
  status: BudgetStatus;
}

export interface CategoryTotal {
  categoryId: string;
  name: string;
  total: number;
  count: number;
}

export interface Dashboard {
  month: string;
  totalSpent: number;
  expenseCount: number;
  budget: number;
  remaining: number;
  status: BudgetStatus;
  highestExpense: Expense | null;
  byCategory: CategoryTotal[];
  recentExpenses: Expense[];
}

export interface PersonRef {
  _id: string;
  name: string;
  email: string;
}

export type AdminExpense = Expense & { user: PersonRef };

export interface RecentUser extends PersonRef {
  role: Role;
  createdAt: string;
}

export interface CategoryStat {
  categoryId: string;
  name: string;
  count: number;
  total: number;
}

export interface AdminInsights {
  totalUsers: number;
  totalExpenses: number;
  totalExpenseValue: number;
  expensesThisMonth: number;
  spendingPerCategory: CategoryStat[];
  topCategories: CategoryStat[];
  bottomCategories: CategoryStat[];
  recentExpenses: AdminExpense[];
  recentUsers: RecentUser[];
}

export type SortField = "date" | "amount";
export type SortOrder = "asc" | "desc";

export interface ExpenseQuery {
  search?: string | undefined;
  category?: string | undefined;
  paymentMethod?: PaymentMethod | undefined;
  dateFrom?: string | undefined;
  dateTo?: string | undefined;
  minAmount?: string | undefined;
  maxAmount?: string | undefined;
  sortBy: SortField;
  order: SortOrder;
  page: number;
  limit: number;
}
