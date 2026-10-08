import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", p: 3 }}>
      <Box>
        <Typography variant="h1">Page not found</Typography>
        <Typography color="text.secondary" sx={{ mt: 1.5, mb: 3 }}>
          The page you opened doesn't exist or has moved.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained" size="large">
          Back to home
        </Button>
      </Box>
    </Box>
  );
}
