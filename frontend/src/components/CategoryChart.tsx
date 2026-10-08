import { Box, Card, Typography } from "@mui/material";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatMoney } from "../utils/format";

interface ChartItem {
  name: string;
  total: number;
}

interface Props {
  items: ChartItem[];
  total: number;
  title?: string;
  emptyMessage?: string;
}

const COLORS = ["#245B63", "#B8873A", "#2F7D5B", "#7A9E9F", "#A8691A", "#173F46", "#6B8F71", "#C9B79C", "#5E7C8A", "#B5443E"];

export default function CategoryChart({
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
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", gap: { xs: 2, sm: 4 } }}>
          <Box aria-hidden="true" sx={{ width: { xs: "100%", sm: 210 }, maxWidth: 260, height: 210, flexShrink: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={items} dataKey="total" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={2} stroke="none">
                  {items.map((item, index) => (
                    <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatMoney(Number(value))} contentStyle={{ borderRadius: 10, border: "1px solid #E1E4DE" }} />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 1.25, width: "100%", minWidth: 0 }}>
            {items.map((item, index) => {
              const share = total > 0 ? Math.round((item.total / total) * 100) : 0;
              return (
                <Box component="li" key={item.name} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: "3px", bgcolor: COLORS[index % COLORS.length], flexShrink: 0 }} />
                  <Typography sx={{ fontWeight: 700, flexGrow: 1, minWidth: 0, overflowWrap: "anywhere" }}>{item.name}</Typography>
                  <Typography sx={{ whiteSpace: "nowrap", fontWeight: 700 }}>
                    {formatMoney(item.total)}{" "}
                    <Typography component="span" color="text.secondary" sx={{ fontWeight: 500 }}>
                      · {share}%
                    </Typography>
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Card>
  );
}
