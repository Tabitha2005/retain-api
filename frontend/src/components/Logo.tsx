import { Box, Typography } from "@mui/material";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1.25 }}>
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <rect width="28" height="28" rx="8" fill={light ? "#FFFFFF" : "#2845D6"} />
        <path
          d="M9 20V8h6.2a3.8 3.8 0 0 1 0 7.6H9m5.2 0L19 20"
          fill="none"
          stroke={light ? "#17267A" : "#FFFFFF"}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Typography
        component="span"
        sx={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.02em", color: light ? "#FFFFFF" : "text.primary" }}
      >
        Retain
      </Typography>
    </Box>
  );
}
