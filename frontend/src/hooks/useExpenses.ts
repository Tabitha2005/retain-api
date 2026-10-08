import { useCallback, useEffect, useState } from "react";
import { listExpenses } from "../api/expenses";
import { getErrorMessage } from "../api/client";
import type { Expense, ExpenseQuery, Paginated } from "../types";

export function useExpenses(query: ExpenseQuery) {
  const [data, setData] = useState<Paginated<Expense> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    listExpenses(query)
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err: unknown) => {
        if (active) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    // If a newer request starts, the older answer is ignored.
    return () => {
      active = false;
    };
  }, [query, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  return { data, loading, error, reload };
}
