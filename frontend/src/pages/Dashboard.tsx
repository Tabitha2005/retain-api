import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import PageHeader from "../components/PageHeader";
import MonthPicker from "../components/MonthPicker";
import BudgetCard from "../components/BudgetCard";
import StatCard from "../components/StatCard";
import CategoryChart from "../components/CategoryChart";
import RecentExpenses from "../components/RecentExpenses";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useAuth } from "../hooks/useAuth";
import { useDashboard } from "../hooks/useDashboard";
import { currentMonth, formatMoney, monthLabel } from "../utils/format";

export default function Dashboard() {
  const { user } = useAuth();
  const [month, setMonth] = useState(currentMonth());
  const { data, loading, error, reload } = useDashboard(month);
  const firstName = user?.name.split(" ")[0] ?? "";

  return (
    <>
      <PageHeader
        title={`Hi, ${firstName}`}
        subtitle={`Here is where your money stands for ${monthLabel(month)}.`}
        action={<MonthPicker month={month} onChange={setMonth} />}
      />

      <Box sx={{ display: "grid", gap: 3 }}>
        {error && <ErrorMessage message={error} onRetry={reload} />}
        {loading && !data && <Loader />}

        {data && (
          <Box sx={{ display: "grid", gap: 3, opacity: loading ? 0.55 : 1, transition: "opacity 150ms" }}>
            <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1.5fr) minmax(0, 1fr)" } }}>
              <BudgetCard
                amount={data.budget}
                spent={data.totalSpent}
                remaining={data.remaining}
                status={data.status}
                action={
                  <Button component={RouterLink} to="/budget" variant="outlined">
                    {data.budget > 0 ? "Change budget" : "Set a budget"}
                  </Button>
                }
              />
              <Box
                sx={{
                  display: "grid",
                  gap: 3,
                  gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", md: "minmax(0, 1fr)" },
                  gridTemplateRows: { md: "1fr 1fr" },
                }}
              >
                <StatCard
                  label="Total spent"
                  value={formatMoney(data.totalSpent)}
                  caption={`${data.expenseCount} ${data.expenseCount === 1 ? "expense" : "expenses"} this month`}
                />
                <StatCard
                  label="Highest expense"
                  value={data.highestExpense ? formatMoney(data.highestExpense.amount) : "None yet"}
                  caption={data.highestExpense?.title ?? "Add an expense to see it here"}
                />
              </Box>
            </Box>

            <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "repeat(2, minmax(0, 1fr))" } }}>
              <CategoryChart items={data.byCategory} total={data.totalSpent} />
              <RecentExpenses items={data.recentExpenses} />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
