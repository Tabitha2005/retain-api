import type { ReactNode } from "react";
import { Box, Card, Chip, Typography } from "@mui/material";
import BudgetRing from "./BudgetRing";
import { STATUS_META } from "../utils/budgetStatus";
import { formatMoney } from "../utils/format";
import type { BudgetStatus } from "../types";

interface Props {
  amount: number;
  spent: number;
  remaining: number;
  status: BudgetStatus;
  action?: ReactNode;
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
        justifyContent: "space-between",
        alignItems: { xs: "baseline", sm: "flex-start" },
        gap: { xs: 2, sm: 0.25 },
        py: { xs: 1.25, sm: 0 },
        borderTop: { xs: 1, sm: 0 },
        borderColor: "divider",
        textAlign: "left",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 800, fontSize: "1.0625rem", overflowWrap: "anywhere" }}>{value}</Typography>
    </Box>
  );
}

export default function BudgetCard({ amount, spent, remaining, status, action }: Props) {
  const meta = STATUS_META[status];
  const ratio = amount > 0 ? spent / amount : 0;
  const percent = status === "none" ? "0%" : ratio > 9.99 ? "999%+" : `${Math.round(ratio * 100)}%`;

  let headline = "No budget set";
  if (status !== "none") {
    headline = remaining >= 0 ? `${formatMoney(remaining)} left` : `${formatMoney(Math.abs(remaining))} over`;
  }

  return (
    <Card
      sx={{
        p: { xs: 2.5, sm: 3, md: 4 },
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: { xs: 2.5, md: 4 },
        minWidth: 0,
      }}
    >
      <BudgetRing value={ratio} size={156} stroke={14} color={meta.color}>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: "1.75rem", lineHeight: 1 }}>{percent}</Typography>
          <Typography variant="caption" color="text.secondary">
            of budget used
          </Typography>
        </Box>
      </BudgetRing>

      <Box sx={{ flexGrow: 1, width: "100%", minWidth: 0, textAlign: { xs: "center", sm: "left" } }}>
        <Chip label={meta.label} size="small" sx={{ bgcolor: meta.background, color: meta.color, mb: 1.5 }} />
        <Typography variant="h3" component="p" sx={{ overflowWrap: "anywhere" }}>
          {headline}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 0, sm: 2 },
            mt: 2.5,
          }}
        >
          <Figure label="Spent" value={formatMoney(spent)} />
          <Figure label="Budget" value={formatMoney(amount)} />
          <Figure label="Remaining" value={formatMoney(remaining)} />
        </Box>

        {action && (
          <Box sx={{ mt: 2.5, "& .MuiButton-root": { width: { xs: "100%", sm: "auto" } } }}>{action}</Box>
        )}
      </Box>
    </Card>
  );
}
