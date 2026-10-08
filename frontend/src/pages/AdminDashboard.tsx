import { Box } from "@mui/material";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import SpendingByCategory from "../components/SpendingByCategory";
import CategoryRanking from "../components/CategoryRanking";
import { AdminRecentExpenses, RecentUsers } from "../components/AdminLists";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useAdminInsights } from "../hooks/useAdminInsights";
import { formatMoney } from "../utils/format";

export default function AdminDashboard() {
  const { data, loading, error, reload } = useAdminInsights();

  return (
    <>
      <PageHeader title="Platform insights" subtitle="A look at how Retain is being used across all accounts." />

      <Box sx={{ display: "grid", gap: 3 }}>
        {error && <ErrorMessage message={error} onRetry={reload} />}
        {loading && !data && <Loader />}

        {data && (
          <Box sx={{ display: "grid", gap: 3, opacity: loading ? 0.55 : 1, transition: "opacity 150ms" }}>
            <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" } }}>
              <StatCard label="Registered users" value={String(data.totalUsers)} caption="All accounts" />
              <StatCard label="Expenses recorded" value={String(data.totalExpenses)} caption="Across all users" />
              <StatCard label="Total value" value={formatMoney(data.totalExpenseValue)} caption="Sum of every expense" />
              <StatCard label="This month" value={String(data.expensesThisMonth)} caption="Expenses dated this month" />
            </Box>

            <SpendingByCategory
              items={data.spendingPerCategory.filter((c) => c.total > 0)}
              total={data.totalExpenseValue}
              title="Total spending per category"
              emptyMessage="No spending has been recorded yet."
            />

            <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "repeat(2, minmax(0, 1fr))" } }}>
              <CategoryRanking title="Top 5 most used categories" items={data.topCategories} />
              <CategoryRanking title="Bottom 5 least used categories" items={data.bottomCategories} />
            </Box>

            <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "repeat(2, minmax(0, 1fr))" } }}>
              <AdminRecentExpenses items={data.recentExpenses} />
              <RecentUsers items={data.recentUsers} />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
