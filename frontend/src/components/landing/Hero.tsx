import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import HeroArt from "./HeroArt";
import HeroPreview from "./HeroPreview";
import { brand } from "../../theme";
import { brassButtonSx, ghostButtonSx } from "./styles";

// Optional photo: save any image as src/assets/hero.jpg (or .png, .webp) and it appears behind the hero.
const photos = import.meta.glob<string>("../../assets/hero.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
const heroPhoto: string | undefined = Object.values(photos)[0];

export default function Hero() {
  return (
    <Box component="section" sx={{ position: "relative", bgcolor: brand.deep, color: "#FFFFFF", overflow: "hidden" }}>
      {heroPhoto && (
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(15,43,48,0.84), rgba(15,43,48,0.84)), url(${heroPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <HeroArt />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          display: "grid",
          alignItems: "center",
          gap: { xs: 8, md: 8 },
          py: { xs: 8, md: 13 },
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1.15fr) minmax(0, 1fr)" },
        }}
      >
        <Box>
          <Typography
            variant="h1"
            component="h1"
            sx={{ color: "#FFFFFF", fontSize: { xs: "2.5rem", sm: "3.25rem", md: "4rem" }, lineHeight: 1.05 }}
          >
            Know what you have left,{" "}
            <Box component="span" sx={{ color: brand.brassLight }}>
              before you spend it.
            </Box>
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.78)", mt: 3, fontSize: "1.125rem", lineHeight: 1.65, maxWidth: 520 }}>
            Retain tracks every expense, keeps your monthly budget, and warns you early when you are close to the limit.
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5, mt: 4.5, flexDirection: { xs: "column", sm: "row" } }}>
            <Button component={RouterLink} to="/register" variant="contained" size="large" sx={brassButtonSx}>
              Create your account
            </Button>
            <Button component={RouterLink} to="/login" variant="outlined" size="large" sx={ghostButtonSx}>
              Sign in
            </Button>
          </Box>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mt: 2.5 }}>
            Works in any browser, on your phone or your computer.
          </Typography>
        </Box>

        <HeroPreview />
      </Container>
    </Box>
  );
}
