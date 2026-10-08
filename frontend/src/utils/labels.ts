import type { PaymentMethod } from "../types";

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cash: "Cash",
  card: "Card",
  mobile_money: "Mobile money",
  bank_transfer: "Bank transfer",
  other: "Other",
};

export const SORT_OPTIONS = [
  { value: "date:desc", label: "Newest first" },
  { value: "date:asc", label: "Oldest first" },
  { value: "amount:desc", label: "Highest amount" },
  { value: "amount:asc", label: "Lowest amount" },
] as const;
