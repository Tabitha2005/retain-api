import { Box, Chip, Container, Typography } from "@mui/material";
import BudgetRing from "../BudgetRing";
import { STATUS_META } from "../../utils/budgetStatus";
import type { BudgetStatus } from "../../types";

const states: { status: Exclude<BudgetStatus, "none">; percent: number; rule: string; text: string }[] = [
  { status: "within", percent: 42, rule: "Under 80% used", text: "You are on track. Spend as planned." },
  { status: "approaching", percent: 86, rule: "80% to 100% used", text: "An early sign, while there is still room to adjust." },
  { status: "over", percent: 118, rule: "More than 100% used", text: "You have passed the limit, and the screen shows by how much." },
];

export default function BudgetStates() {
  return (
    <Box component="section" id="budget-states" sx={{ bgcolor: "#E9ECE7", py: { xs: 8, md: 12 }, scrollMarginTop: "72px" }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, maxWidth: 560 }}>
          Three clear states, no guessing
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2, fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: 520 }}>
          The ring and its colour tell you where the month stands the moment you open the page.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            mt: { xs: 5, md: 7 },
            gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(3, minmax(0, 1fr))" },
          }}
        >
          {states.map((s) => {
            const meta = STATUS_META[s.status];
            return (
              <Box
                key={s.status}
                sx={{
                  bgcolor: "background.paper",
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 4,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                <BudgetRing value={s.percent / 100} size={132} stroke={12} color={meta.color}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.5rem" }}>{`${s.percent}%`}</Typography>
                </BudgetRing>
                <Chip label={meta.label} size="small" sx={{ bgcolor: meta.background, color: meta.color, mt: 3 }} />
                <Typography variant="h4" component="h3" sx={{ mt: 1.5 }}>
                  {s.rule}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>
                  {s.text}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
