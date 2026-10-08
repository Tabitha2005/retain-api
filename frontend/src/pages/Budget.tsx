import { useState } from "react";
import { Box, Snackbar } from "@mui/material";
import PageHeader from "../components/PageHeader";
import MonthPicker from "../components/MonthPicker";
import BudgetCard from "../components/BudgetCard";
import BudgetForm from "../components/BudgetForm";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useBudget } from "../hooks/useBudget";
import { currentMonth } from "../utils/format";

export default function Budget() {
  const [month, setMonth] = useState(currentMonth());
  const { data, loading, error, reload } = useBudget(month);
  const [toast, setToast] = useState("");

  function handleSaved(message: string) {
    setToast(message);
    reload();
  }

  return (
    <>
      <PageHeader
        title="Budget"
        subtitle="Set a limit for the month and watch it as you spend."
        action={<MonthPicker month={month} onChange={setMonth} />}
      />

      <Box sx={{ display: "grid", gap: 3 }}>
        {error && <ErrorMessage message={error} onRetry={reload} />}
        {loading && !data && <Loader />}

        {data && (
          <Box sx={{ display: "grid", gap: 3, opacity: loading ? 0.55 : 1, transition: "opacity 150ms" }}>
            <BudgetCard amount={data.amount} spent={data.spent} remaining={data.remaining} status={data.status} />
            <BudgetForm key={`${data.month}-${data.amount}`} month={data.month} amount={data.amount} onSaved={handleSaved} />
          </Box>
        )}
      </Box>

      <Snackbar
        open={toast !== ""}
        autoHideDuration={3500}
        onClose={() => setToast("")}
        message={toast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
