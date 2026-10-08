import { useCallback, useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard";
import { getErrorMessage } from "../api/client";
import type { Dashboard } from "../types";

export function useDashboard(month: string) {
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getDashboard(month)
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
