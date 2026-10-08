import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { monthLabel, monthLabelShort, shiftMonth } from "../utils/format";

interface Props {
  month: string;
  onChange: (month: string) => void;
}

const labelSx = {
  flexGrow: 1,
  minWidth: 0,
  px: 0.5,
  textAlign: "center",
  fontWeight: 700,
  lineHeight: 1.25,
  overflowWrap: "anywhere",
} as const;

export default function MonthPicker({ month, onChange }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.25,
        width: { xs: "100%", sm: "fit-content" },
        maxWidth: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        overflow: "hidden",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        p: 0.5,
        userSelect: "none",
      }}
    >
      <IconButton aria-label="Previous month" onClick={() => onChange(shiftMonth(month, -1))} size="small" sx={{ flexShrink: 0 }}>
        <ChevronLeft />
      </IconButton>

      <Typography
        aria-live="polite"
        aria-label={monthLabel(month)}
        sx={{
          ...labelSx,
          fontSize: "0.9375rem",
          display: "block",
          "@media (max-width:359px)": { display: "none" },
          "@media (min-width:600px)": { px: 2, fontSize: "1rem", minWidth: 140 },
        }}
      >
        {monthLabel(month)}
      </Typography>

      <Typography
        aria-hidden="true"
        sx={{
          ...labelSx,
          fontSize: "0.875rem",
          display: "none",
          "@media (max-width:359px)": { display: "block" },
        }}
      >
        {monthLabelShort(month)}
      </Typography>

      <IconButton aria-label="Next month" onClick={() => onChange(shiftMonth(month, 1))} size="small" sx={{ flexShrink: 0 }}>
        <ChevronRight />
      </IconButton>
    </Box>
  );
}
