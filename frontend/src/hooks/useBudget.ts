import { useCallback, useEffect, useState } from "react";
import { getBudget } from "../api/budgets";
import { getErrorMessage } from "../api/client";
import type { BudgetSummary } from "../types";

export function useBudget(month: string) {
  const [data, setData] = useState<BudgetSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getBudget(month)
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err: unknown) => {
        if (active) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [month, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  return { data, loading, error, reload };
}
