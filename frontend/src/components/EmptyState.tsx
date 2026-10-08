import type { ReactNode } from "react";
import { Box, Card, Typography } from "@mui/material";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";

interface Props {
  title: string;
  message: string;
  action?: ReactNode;
}

export default function EmptyState({ title, message, action }: Props) {
  return (
    <Card sx={{ p: { xs: 4, md: 7 }, textAlign: "center" }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          bgcolor: "#EEF1FD",
          color: "primary.main",
          display: "grid",
          placeItems: "center",
          mx: "auto",
          mb: 2,
        }}
      >
        <ReceiptLongOutlined />
      </Box>
      <Typography variant="h4">{title}</Typography>
      <Typography color="text.secondary" sx={{ mt: 0.75, mb: action ? 3 : 0, maxWidth: 380, mx: "auto" }}>
        {message}
      </Typography>
      {action}
    </Card>
  );
}
