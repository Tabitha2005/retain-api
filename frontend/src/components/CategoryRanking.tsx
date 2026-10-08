import { Box, Card, Typography } from "@mui/material";
import type { CategoryStat } from "../types";

interface Props {
  title: string;
  items: CategoryStat[];
}

export default function CategoryRanking({ title, items }: Props) {
  return (
    <Card sx={{ p: { xs: 2.5, sm: 3 }, minWidth: 0 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {title}
      </Typography>

      {items.length === 0 ? (
        <Typography color="text.secondary">No categories yet.</Typography>
      ) : (
        <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 1.5 }}>
          {items.map((item, index) => (
            <Box component="li" key={item.categoryId} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 2,
                  bgcolor: "#EEF1FD",
                  color: "primary.main",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                  fontSize: "0.8125rem",
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </Box>
              <Typography sx={{ fontWeight: 700, flexGrow: 1, minWidth: 0, overflowWrap: "anywhere" }}>{item.name}</Typography>
              <Typography color="text.secondary" sx={{ whiteSpace: "nowrap", flexShrink: 0 }}>
                {item.count} {item.count === 1 ? "expense" : "expenses"}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
}
