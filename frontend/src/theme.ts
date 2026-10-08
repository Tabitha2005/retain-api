import { createTheme } from "@mui/material/styles";

export const brand = {
  ink: "#0E1726",
  cobalt: "#2845D6",
  cobaltDark: "#17267A",
  mist: "#F3F5F9",
  line: "#E3E7EF",
  positive: "#1b4548",
  caution: "#844c0d",
  danger: "#4e0909",
};

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: brand.cobalt, dark: brand.cobaltDark, contrastText: "#FFFFFF" },
    success: { main: brand.positive },
    warning: { main: brand.caution },
    error: { main: brand.danger },
    text: { primary: brand.ink, secondary: "#586174" },
    background: { default: brand.mist, paper: "#FFFFFF" },
    divider: brand.line,
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: "'Manrope Variable', system-ui, -apple-system, 'Segoe UI', sans-serif",
    h1: { fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.15 },
    h2: { fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2 },
    h3: { fontSize: "1.375rem", fontWeight: 700, letterSpacing: "-0.015em" },
    h4: { fontSize: "1.125rem", fontWeight: 700 },
    h5: { fontSize: "1rem", fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { fontVariantNumeric: "tabular-nums" },
        "*:focus-visible": { outline: `2px solid ${brand.cobalt}`, outlineOffset: 2 },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10 },
        sizeLarge: { height: 48 },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiCard: {
      styleOverrides: {
        root: { border: `1px solid ${brand.line}`, borderRadius: 16, boxShadow: "none" },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 10, backgroundColor: "#FFFFFF" },
        notchedOutline: { borderColor: brand.line },
      },
    },
    MuiChip: { styleOverrides: { root: { borderRadius: 8, fontWeight: 700 } } },
  },
});
