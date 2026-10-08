import type { ReactNode } from "react";
import { Box, Chip, Container, Typography } from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { brand, displayFont } from "../../theme";
import { formatMoney } from "../../utils/format";

const steps = [
  { title: "Add what you spend", text: "Record each expense with a title, amount, category, payment method and date. Notes are optional." },
  { title: "Set a monthly budget", text: "Choose a limit for the month. You can change it whenever your plans change." },
  { title: "Check where you stand", text: "See what is left, which category takes the most, and get an early sign before you go over." },
];

export function HowItWorks() {
  return (
    <Box component="section" id="how-it-works" sx={{ bgcolor: "background.paper", py: { xs: 8, md: 12 }, scrollMarginTop: "72px" }}>
      <Container
        maxWidth="lg"
        sx={{
          display: "grid",
          gap: { xs: 5, md: 10 },
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1fr) minmax(0, 1.5fr)" },
        }}
      >
        <Box sx={{ position: { md: "sticky" }, top: { md: 112 }, alignSelf: "start" }}>
          <Typography variant="h2" component="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}>
            Three steps, then it runs itself
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 2, fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: 380 }}>
            There is nothing to set up beyond your account. Add a few expenses and the summaries fill in on their own.
          </Typography>
        </Box>

        <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0 }}>
          {steps.map((step, index) => (
            <Box
              component="li"
              key={step.title}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "56px minmax(0, 1fr)", sm: "88px minmax(0, 1fr)" },
                gap: 2,
                py: { xs: 3, md: 4 },
                borderTop: 1,
                borderColor: "divider",
                "&:last-of-type": { borderBottom: 1 },
              }}
            >
              <Typography
                sx={{ fontFamily: displayFont, fontWeight: 700, fontSize: { xs: "2.25rem", sm: "3.25rem" }, lineHeight: 1, color: "primary.main" }}
              >
                {`0${index + 1}`}
              </Typography>
              <Box>
                <Typography variant="h3" component="h3">
                  {step.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.65 }}>
                  {step.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function Tile({ title, text, span = 1, children }: { title: string; text: string; span?: 1 | 2; children: ReactNode }) {
  return (
    <Box
      sx={{
        gridColumn: { xs: "auto", md: `span ${span}` },
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        p: { xs: 3, md: 4 },
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>
        {text}
      </Typography>
      <Box sx={{ mt: "auto", pt: 3 }}>{children}</Box>
    </Box>
  );
}

function SearchDemo() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          border: 1,
          borderColor: "divider",
          borderRadius: 1.5,
          px: 1.5,
          py: 1,
          bgcolor: "#F8F9F7",
        }}
      >
        <SearchOutlined fontSize="small" sx={{ color: "text.secondary" }} />
        <Typography color="text.secondary">lunch</Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1.5 }}>
        {["Food", "Card", "This month", "Min amount 20"].map((label) => (
          <Chip key={label} label={label} size="small" sx={{ bgcolor: brand.tint, color: "primary.main" }} />
        ))}
      </Box>
    </Box>
  );
}

function SortDemo() {
  const rows = [
    { title: "Electricity", amount: 98 },
    { title: "Groceries", amount: 91 },
    { title: "Bus pass", amount: 84 },
  ];
  return (
    <Box>
      <Chip label="Highest amount first" size="small" sx={{ bgcolor: brand.tint, color: "primary.main", mb: 1 }} />
      {rows.map((r) => (
        <Box key={r.title} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderTop: 1, borderColor: "divider" }}>
          <Typography sx={{ fontWeight: 600 }}>{r.title}</Typography>
          <Typography sx={{ fontWeight: 800 }}>{formatMoney(r.amount)}</Typography>
        </Box>
      ))}
    </Box>
  );
}

function BudgetBarDemo() {
  return (
    <Box>
      <Box sx={{ position: "relative", height: 10, borderRadius: 5, bgcolor: "#E3E8E5" }}>
        <Box sx={{ width: "82%", height: "100%", borderRadius: 5, bgcolor: brand.caution }} />
        <Box sx={{ position: "absolute", left: "80%", top: -4, bottom: -4, width: 2, bgcolor: brand.ink, opacity: 0.45 }} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          82% used
        </Typography>
        <Typography variant="body2" sx={{ color: brand.caution, fontWeight: 700 }}>
          Approaching
        </Typography>
      </Box>
    </Box>
  );
}

function CategoryDemo() {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {["Food", "Transport", "Rent", "Utilities", "Health"].map((label) => (
        <Chip key={label} label={label} size="small" sx={{ bgcolor: brand.tint, color: "primary.main" }} />
      ))}
      <Chip label="Uncategorized" size="small" variant="outlined" sx={{ borderColor: "primary.main", color: "primary.main" }} />
    </Box>
  );
}

export function Features() {
  return (
    <Box component="section" id="features" sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: "72px" }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, maxWidth: 620 }}>
          Built for the way you actually check in
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2, fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: 520 }}>
          Short, clear screens that answer one question at a time.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            mt: { xs: 5, md: 7 },
            gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(3, minmax(0, 1fr))" },
          }}
        >
          <Tile span={2} title="Search and filter in seconds" text="Find any expense by title or notes, then narrow it by category, payment method, date range or amount.">
            <SearchDemo />
          </Tile>
          <Tile title="Sort and page" text="Order by date or amount and move through a long history one page at a time.">
            <SortDemo />
          </Tile>
          <Tile title="A budget that warns early" text="You see a clear sign once you pass 80% of the month, not after it is too late.">
            <BudgetBarDemo />
          </Tile>
          <Tile
            span={2}
            title="Categories that stay tidy"
            text="Administrators keep the category list clean. If one is removed, its expenses move to Uncategorized so nothing is lost."
          >
            <CategoryDemo />
          </Tile>
        </Box>
      </Container>
    </Box>
  );
}
