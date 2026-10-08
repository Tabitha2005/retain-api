import { Box, Card, Chip, Typography } from "@mui/material";
import type { AdminExpense, RecentUser } from "../types";
import { formatDate, formatMoney } from "../utils/format";

const rowSx = (index: number) => ({
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "space-between",
  alignItems: { xs: "flex-start", sm: "center" },
  gap: { xs: 0.75, sm: 2 },
  py: 1.5,
  borderTop: index === 0 ? 0 : 1,
  borderColor: "divider",
} as const);

export function AdminRecentExpenses({ items }: { items: AdminExpense[] }) {
  return (
    <Card sx={{ p: { xs: 2.5, sm: 3 }, minWidth: 0 }}>
      <Typography variant="h4" sx={{ mb: 1.5 }}>
        Recently added expenses
      </Typography>
      {items.length === 0 ? (
        <Typography color="text.secondary">No expenses have been recorded yet.</Typography>
      ) : (
        items.map((e, index) => (
          <Box key={e._id} sx={rowSx(index)}>
            <Box sx={{ minWidth: 0, width: "100%", overflowWrap: "anywhere" }}>
              <Typography sx={{ fontWeight: 700 }}>
                {e.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {e.user.name} · {e.category.name} · {formatDate(e.date)}
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 800, whiteSpace: "nowrap", flexShrink: 0 }}>{formatMoney(e.amount)}</Typography>
          </Box>
        ))
      )}
    </Card>
  );
}

export function RecentUsers({ items }: { items: RecentUser[] }) {
  return (
    <Card sx={{ p: { xs: 2.5, sm: 3 }, minWidth: 0 }}>
      <Typography variant="h4" sx={{ mb: 1.5 }}>
        Recently registered users
      </Typography>
      {items.length === 0 ? (
        <Typography color="text.secondary">No users yet.</Typography>
      ) : (
        items.map((u, index) => (
          <Box key={u._id} sx={rowSx(index)}>
            <Box sx={{ minWidth: 0, width: "100%", overflowWrap: "anywhere" }}>
              <Typography sx={{ fontWeight: 700 }}>
                {u.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {u.email} · Joined {formatDate(u.createdAt)}
              </Typography>
            </Box>
            <Chip
              label={u.role === "admin" ? "Admin" : "User"}
              size="small"
              sx={{ bgcolor: u.role === "admin" ? "#EEF1FD" : "#EEF0F4", color: u.role === "admin" ? "primary.main" : "text.secondary" }}
            />
          </Box>
        ))
      )}
    </Card>
  );
}
