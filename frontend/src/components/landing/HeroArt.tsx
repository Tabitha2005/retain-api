import { Box } from "@mui/material";

export default function HeroArt() {
  return (
    <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <svg width="100%" height="100%" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="ledger" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M56 0H0V56" fill="none" stroke="#FFFFFF" strokeOpacity="0.045" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1440" height="760" fill="url(#ledger)" />
        <g fill="none" stroke="#FFFFFF" strokeLinecap="round">
          <circle cx="1180" cy="360" r="130" strokeOpacity="0.12" strokeWidth="1.5" />
          <circle cx="1180" cy="360" r="210" strokeOpacity="0.09" strokeWidth="1.5" />
          <circle cx="1180" cy="360" r="300" strokeOpacity="0.07" strokeWidth="1.5" />
          <circle cx="1180" cy="360" r="400" strokeOpacity="0.05" strokeWidth="1.5" />
          <circle cx="1180" cy="360" r="510" strokeOpacity="0.035" strokeWidth="1.5" />
        </g>
        <circle
          cx="1180"
          cy="360"
          r="300"
          fill="none"
          stroke="#B8873A"
          strokeOpacity="0.6"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="640 1245"
          transform="rotate(-70 1180 360)"
        />
        <circle
          cx="1180"
          cy="360"
          r="210"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.22"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="300 1020"
          transform="rotate(20 1180 360)"
        />
      </svg>
    </Box>
  );
}
