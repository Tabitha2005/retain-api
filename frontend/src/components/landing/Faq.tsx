import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    q: "How does the budget status work?",
    a: "Each month has one budget. You are within it while you have spent less than 80%, approaching it from 80% to 100%, and over it once you pass 100%.",
  },
  {
    q: "Who can see my expenses?",
    a: "Your expenses and budgets are only available to your own account. Administrators manage the shared categories and can see platform wide totals and recent activity.",
  },
  {
    q: "What happens if a category is deleted?",
    a: "Its expenses move to Uncategorized, so nothing is lost. Uncategorized itself cannot be deleted.",
  },
  {
    q: "Can I change my budget later?",
    a: "Yes. You can set or change the budget for any month from the Budget page.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Retain runs in your browser, on a phone or a computer.",
  },
];

export default function Faq() {
  return (
    <Box component="section" id="faq" sx={{ bgcolor: "background.paper", py: { xs: 8, md: 12 }, scrollMarginTop: "72px" }}>
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
            Questions, answered
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 2, fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: 360 }}>
            The short version of how Retain handles your money and your data.
          </Typography>
        </Box>

        <Box>
          {faqs.map((item) => (
            <Accordion
              key={item.q}
              disableGutters
              elevation={0}
              square
              sx={{
                bgcolor: "transparent",
                borderTop: 1,
                borderColor: "divider",
                "&:before": { display: "none" },
                "&:last-of-type": { borderBottom: 1, borderColor: "divider" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 0, py: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: "1.0625rem" }}>{item.q}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pb: 3 }}>
                <Typography color="text.secondary" sx={{ lineHeight: 1.65 }}>
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
