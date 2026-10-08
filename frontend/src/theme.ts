import { createTheme } from "@mui/material/styles";

export const brand = {
  ink: "#14201F",
  deep: "#0F2B30",
  primary: "#245B63",
  primaryDark: "#173F46",
  tint: "#E4EEEC",
  mist: "#F3F4F1",
  line: "#E1E4DE",
  brass: "#B8873A",
  brassLight: "#D2A75F",
  positive: "#2F7D5B",
  caution: "#A8691A",
  danger: "#B5443E",
};

export const displayFont = "'Bricolage Grotesque Variable', 'Manrope Variable', system-ui, sans-serif";
const bodyFont = "'Manrope Variable', system-ui, -apple-system, 'Segoe UI', sans-serif";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: brand.primary, dark: brand.primaryDark, contrastText: "#FFFFFF" },
    success: { main: brand.positive },
    warning: { main: brand.caution },
    error: { main: brand.danger },
    text: { primary: brand.ink, secondary: "#566462" },
    background: { default: brand.mist, paper: "#FFFFFF" },
    divider: brand.line,
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: bodyFont,
    h1: { fontFamily: displayFont, fontSize: "2.25rem", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.12 },
    h2: { fontFamily: displayFont, fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 },
    h3: { fontFamily: displayFont, fontSize: "1.375rem", fontWeight: 700, letterSpacing: "-0.015em" },
    h4: { fontSize: "1.125rem", fontWeight: 700 },
    h5: { fontSize: "1rem", fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { fontVariantNumeric: "tabular-nums" },
        "*:focus-visible": { outline: `2px solid ${brand.primary}`, outlineOffset: 2 },
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
