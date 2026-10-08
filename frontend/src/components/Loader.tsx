import { Box, CircularProgress } from "@mui/material";

export default function Loader({ fullScreen = false }: { fullScreen?: boolean }) {
  return (
    <Box
      role="status"
      aria-label="Loading"
      sx={{ display: "grid", placeItems: "center", minHeight: fullScreen ? "100vh" : 240 }}
    >
      <CircularProgress size={32} />
    </Box>
  );
}
