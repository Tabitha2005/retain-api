import { Card, Typography } from "@mui/material";

interface Props {
  label: string;
  value: string;
  caption?: string;
}

export default function StatCard({ label, value, caption }: Props) {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.02em", mt: 0.5 }}>{value}</Typography>
      {caption && (
        <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.25 }}>
          {caption}
        </Typography>
      )}
    </Card>
  );
}
