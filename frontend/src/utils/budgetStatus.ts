import type { BudgetStatus } from "../types";
import { brand } from "../theme";

export interface StatusMeta {
  label: string;
  color: string;
  background: string;
}

export const STATUS_META: Record<BudgetStatus, StatusMeta> = {
  none: { label: "No budget set", color: "#566462", background: "#ECEEEA" },
  within: { label: "Within budget", color: brand.positive, background: "#E3F0E9" },
  approaching: { label: "Approaching budget", color: brand.caution, background: "#F6EBD6" },
  over: { label: "Over budget", color: brand.danger, background: "#F5E2E0" },
};
