import { Link as RouterLink, Navigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import Loader from "../components/Loader";
import LandingNav from "../components/landing/LandingNav";
import Hero from "../components/landing/Hero";
import { Features, HowItWorks } from "../components/landing/LandingSections";
import BudgetStates from "../components/landing/BudgetStates";
import Faq from "../components/landing/Faq";
import LandingFooter from "../components/landing/LandingFooter";
import { brassButtonSx, ghostButtonSx } from "../components/landing/styles";
import { useAuth } from "../hooks/useAuth";
import { brand } from "../theme";

function FinalCta() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, sm: 3 } }}>
      <Container maxWidth="lg" disableGutters>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            bgcolor: brand.primaryDark,
            color: "#FFFFFF",
            borderRadius: 3,
            px: { xs: 3, md: 8 },
            py: { xs: 6, md: 9 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box aria-hidden="true" sx={{ position: "absolute", right: -90, top: "50%", transform: "translateY(-50%)", display: { xs: "none", md: "block" } }}>
            <svg width="420" height="420" viewBox="0 0 420 420">
              <g fill="none" stroke="#FFFFFF">
                <circle cx="210" cy="210" r="90" strokeOpacity="0.14" strokeWidth="1.5" />
                <circle cx="210" cy="210" r="140" strokeOpacity="0.1" strokeWidth="1.5" />
                <circle cx="210" cy="210" r="190" strokeOpacity="0.07" strokeWidth="1.5" />
              </g>
              <circle
                cx="210"
                cy="210"
                r="140"
                fill="none"
                stroke="#B8873A"
                strokeOpacity="0.7"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray="520 360"
                transform="rotate(-80 210 210)"
              />
            </svg>
          </Box>

          <Box sx={{ position: "relative", maxWidth: 560 }}>
            <Typography variant="h2" component="h2" sx={{ color: "#FFFFFF", fontSize: { xs: "2rem", md: "2.75rem" } }}>
              Start tracking this month
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.78)", mt: 2, fontSize: "1.0625rem", lineHeight: 1.65 }}>
              Create an account in a minute, add your first expense and see where you stand.
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, mt: 4, flexDirection: { xs: "column", sm: "row" }, justifyContent: { xs: "center", md: "flex-start" } }}>
              <Button component={RouterLink} to="/register" variant="contained" size="large" sx={brassButtonSx}>
                Register
              </Button>
              <Button component={RouterLink} to="/login" variant="outlined" size="large" sx={ghostButtonSx}>
                Sign in
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default function Landing() {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <Loader fullScreen />;
  if (user) return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;

  return (
    <Box id="top" sx={{ minHeight: "100vh", overflowX: "hidden", bgcolor: "background.default" }}>
      <LandingNav />
      <Box component="main">
        <Hero />
        <HowItWorks />
        <Features />
        <BudgetStates />
        <Faq />
        <FinalCta />
      </Box>
      <LandingFooter />
    </Box>
  );
}
