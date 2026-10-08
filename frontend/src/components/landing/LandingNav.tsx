import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Box, Button, Collapse, Container, IconButton, Link, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../Logo";
import { brand } from "../../theme";
import { brassButtonSx } from "./styles";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#budget-states", label: "Budget states" },
  { href: "#faq", label: "FAQ" },
];

const linkSx = {
  color: "rgba(255,255,255,0.78)",
  fontWeight: 600,
  "&:hover": { color: "#FFFFFF" },
} as const;

export default function LandingNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: brand.deep, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 72, justifyContent: "space-between" }}>
          <Link component={RouterLink} to="/" underline="none" aria-label="Retain home">
            <Logo light />
          </Link>

          <Box component="nav" aria-label="Main" sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} underline="none" sx={linkSx}>
                {l.label}
              </Link>
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
            <Button component={RouterLink} to="/login" sx={{ color: "#FFFFFF" }}>
              Sign in
            </Button>
            <Button component={RouterLink} to="/register" variant="contained" sx={brassButtonSx}>
              Register
            </Button>
          </Box>

          <IconButton
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            sx={{ display: { xs: "inline-flex", md: "none" }, color: "#FFFFFF" }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        <Collapse in={open} unmountOnExit sx={{ display: { md: "none" } }}>
          <Box sx={{ display: "grid", gap: 0.5, pb: 3 }}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={close} underline="none" sx={{ ...linkSx, py: 1.25, fontSize: "1.0625rem" }}>
                {l.label}
              </Link>
            ))}
            <Box sx={{ display: "grid", gap: 1.5, mt: 2 }}>
              <Button component={RouterLink} to="/login" variant="outlined" size="large" sx={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.4)" }}>
                Sign in
              </Button>
              <Button component={RouterLink} to="/register" variant="contained" size="large" sx={brassButtonSx}>
                Register
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Container>
    </AppBar>
  );
}
