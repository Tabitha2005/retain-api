import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { monthLabel, shiftMonth } from "../utils/format";

interface Props {
  month: string;
  onChange: (month: string) => void;
}

export default function MonthPicker({ month, onChange }: Props) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        p: 0.5,
      }}
    >
      <IconButton aria-label="Previous month" onClick={() => onChange(shiftMonth(month, -1))} size="small">
        <ChevronLeft />
      </IconButton>
      <Typography aria-live="polite" sx={{ fontWeight: 700, minWidth: 140, textAlign: "center" }}>
        {monthLabel(month)}
      </Typography>
      <IconButton aria-label="Next month" onClick={() => onChange(shiftMonth(month, 1))} size="small">
        <ChevronRight />
      </IconButton>
    </Box>
  );
}
