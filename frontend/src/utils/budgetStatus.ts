import type { BudgetStatus } from "../types";
import { brand } from "../theme";

export interface StatusMeta {
  label: string;
  color: string;
  background: string;
}

export const STATUS_META: Record<BudgetStatus, StatusMeta> = {
  none: { label: "No budget set", color: "#586174", background: "#EEF0F4" },
  within: { label: "Within budget", color: brand.positive, background: "#E5F5EE" },
  approaching: { label: "Approaching budget", color: brand.caution, background: "#FBF0DC" },
  over: { label: "Over budget", color: brand.danger, background: "#FBE6E6" },
};
