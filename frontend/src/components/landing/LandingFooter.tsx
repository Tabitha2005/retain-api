import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Divider, Link, Typography } from "@mui/material";
import Logo from "../Logo";
import { brand } from "../../theme";

interface FooterLink {
  label: string;
  href?: string;
  to?: string;
}

const product: FooterLink[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Budget states", href: "#budget-states" },
  { label: "FAQ", href: "#faq" },
];

const account: FooterLink[] = [
  { label: "Sign in", to: "/login" },
  { label: "Register", to: "/register" },
];

const linkSx = {
  color: "rgba(255,255,255,0.72)",
  "&:hover": { color: "#FFFFFF" },
} as const;

function Column({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <Box component="nav" aria-label={title}>
      <Typography sx={{ color: "#FFFFFF", fontWeight: 700, mb: 2 }}>{title}</Typography>
      <Box sx={{ display: "grid", gap: 1.25 }}>
        {links.map((l) =>
          l.to ? (
            <Link key={l.label} component={RouterLink} to={l.to} underline="hover" sx={linkSx}>
              {l.label}
            </Link>
          ) : (
            <Link key={l.label} href={l.href} underline="hover" sx={linkSx}>
              {l.label}
            </Link>
          )
        )}
      </Box>
    </Box>
  );
}

export default function LandingFooter() {
  return (
    <Box component="footer" sx={{ bgcolor: brand.deep, color: "rgba(255,255,255,0.72)", pt: { xs: 7, md: 9 }, pb: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gap: { xs: 5, md: 6 },
            gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", md: "minmax(0, 1.6fr) repeat(2, minmax(0, 1fr))" },
          }}
        >
          <Box sx={{ gridColumn: { sm: "span 2", md: "auto" } }}>
            <Logo light />
            <Typography sx={{ mt: 2, maxWidth: 340, lineHeight: 1.65 }}>
              A personal expense and budget manager. Track what you spend, keep a monthly budget and see where your money goes.
            </Typography>
          </Box>
          <Column title="Product" links={product} />
          <Column title="Account" links={account} />
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", my: 5 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Typography variant="body2">{`© ${new Date().getFullYear()} Retain. All rights reserved.`}</Typography>
          <Link href="#top" underline="hover" variant="body2" sx={linkSx}>
            Back to top
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
