import { Box, Card, Chip, Typography } from "@mui/material";
import BudgetRing from "../BudgetRing";
import { brand } from "../../theme";
import { formatMoney } from "../../utils/format";

const examples = [
  { title: "Groceries", detail: "Food · 5 Oct", amount: 48 },
  { title: "Bus pass", detail: "Transport · 4 Oct", amount: 35 },
  { title: "Electricity", detail: "Utilities · 2 Oct", amount: 62 },
];

export default function HeroPreview() {
  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: 480, justifySelf: { md: "end" }, minWidth: 0 }}>
      <Card sx={{ p: { xs: 2.5, sm: 3.5 }, boxShadow: "0 24px 60px rgba(0,0,0,0.3)", border: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexDirection: { xs: "column", sm: "row" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <BudgetRing value={0.64} size={132} stroke={12} color={brand.positive}>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: "1.5rem", lineHeight: 1 }}>64%</Typography>
              <Typography variant="caption" color="text.secondary">
                used
              </Typography>
            </Box>
          </BudgetRing>
          <Box sx={{ minWidth: 0 }}>
            <Chip label="Within budget" size="small" sx={{ bgcolor: "#E3F0E9", color: brand.positive, mb: 1 }} />
            <Typography sx={{ fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.02em" }}>{formatMoney(540)} left</Typography>
            <Typography variant="body2" color="text.secondary">
              of a {formatMoney(1500)} budget
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          {examples.map((e) => (
            <Box key={e.title} sx={{ display: "flex", justifyContent: "space-between", gap: 2, py: 1.5, borderTop: 1, borderColor: "divider" }}>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700 }}>{e.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {e.detail}
                </Typography>
              </Box>
              <Typography sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>{formatMoney(e.amount)}</Typography>
            </Box>
          ))}
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
          Example month
        </Typography>
      </Card>

      <Card
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: 1.5,
          position: "absolute",
          left: -40,
          bottom: -30,
          p: 2,
          width: 270,
          boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
          border: 0,
        }}
      >
        <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: brand.caution, flexShrink: 0 }} />
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: "0.9375rem" }}>Heads up</Typography>
          <Typography variant="body2" color="text.secondary">
            You have used 80% of this month's budget.
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
