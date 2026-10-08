import { Card, Typography } from "@mui/material";

interface Props {
  label: string;
  value: string;
  caption?: string;
}

export default function StatCard({ label, value, caption }: Props) {
  return (
    <Card sx={{ p: { xs: 2.5, sm: 3 }, minWidth: 0 }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography
        sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", sm: "1.75rem" }, letterSpacing: "-0.02em", mt: 0.5, overflowWrap: "anywhere" }}
      >
        {value}
      </Typography>
      {caption && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25, overflowWrap: "anywhere" }}>
          {caption}
        </Typography>
      )}
    </Card>
  );
}
