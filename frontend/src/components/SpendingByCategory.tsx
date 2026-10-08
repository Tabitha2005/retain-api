import { Box, Card, Typography } from "@mui/material";
import type { CategoryTotal } from "../types";
import { formatMoney } from "../utils/format";

interface Props {
  items: CategoryTotal[];
  total: number;
  title?: string;
  emptyMessage?: string;
}

export default function SpendingByCategory({
  items,
  total,
  title = "Spending by category",
  emptyMessage = "No spending recorded for this month yet.",
}: Props) {
  return (
    <Card sx={{ p: { xs: 2.5, sm: 3 }, minWidth: 0 }}>
      <Typography variant="h4" sx={{ mb: 2.5 }}>
        {title}
      </Typography>

      {items.length === 0 ? (
        <Typography color="text.secondary">{emptyMessage}</Typography>
      ) : (
        <Box sx={{ display: "grid", gap: 2.25 }}>
          {items.map((item) => {
            const share = total > 0 ? item.total / total : 0;
            return (
              <Box key={item.categoryId}>
                <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", columnGap: 2, rowGap: 0.25, mb: 0.75 }}>
                  <Typography sx={{ fontWeight: 700, minWidth: 0, overflowWrap: "anywhere" }}>
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontWeight: 700 }}>
                    {formatMoney(item.total)}{" "}
                    <Typography component="span" color="text.secondary" sx={{ fontWeight: 500 }}>
                      · {Math.round(share * 100)}%
                    </Typography>
                  </Typography>
                </Box>
                <Box sx={{ height: 8, borderRadius: 4, bgcolor: "#E3E8E5", overflow: "hidden" }}>
                  <Box sx={{ height: "100%", width: `${Math.max(share * 100, 2)}%`, bgcolor: "primary.main", borderRadius: 4 }} />
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Card>
  );
}
