import type { SxProps, Theme } from "@mui/material/styles";
import { brand } from "../../theme";

export const brassButtonSx: SxProps<Theme> = {
  bgcolor: brand.brass,
  color: brand.deep,
  fontWeight: 700,
  "&:hover": { bgcolor: brand.brassLight },
};

export const ghostButtonSx: SxProps<Theme> = {
  color: "#FFFFFF",
  borderColor: "rgba(255,255,255,0.4)",
  "&:hover": { borderColor: "#FFFFFF", bgcolor: "rgba(255,255,255,0.08)" },
};
