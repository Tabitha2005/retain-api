import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Card, Typography } from "@mui/material";
import type { Expense } from "../types";
import { formatDate, formatMoney } from "../utils/format";

export default function RecentExpenses({ items }: { items: Expense[] }) {
  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
        <Typography variant="h4">Recent expenses</Typography>
        <Button component={RouterLink} to="/expenses" size="small">
          View all
        </Button>
      </Box>

      {items.length === 0 ? (
        <Typography color="text.secondary">Nothing here yet. Your latest expenses will show up here.</Typography>
      ) : (
        <Box>
          {items.map((e, index) => (
            <Box
              key={e._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                py: 1.5,
                borderTop: index === 0 ? 0 : 1,
                borderColor: "divider",
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700, overflowWrap: "anywhere" }}>
                  {e.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: "anywhere" }}>
                  {e.category.name} · {formatDate(e.date)}
                </Typography>
              </Box>
              <Typography sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>{formatMoney(e.amount)}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
}
