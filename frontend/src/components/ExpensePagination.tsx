import { Box, Pagination, Typography } from "@mui/material";

interface Props {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}

export default function ExpensePagination({ page, totalPages, total, limit, onChange }: Props) {
  if (total === 0) return null;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
      <Typography variant="body2" color="text.secondary">
        Showing {from} to {to} of {total}
      </Typography>
      <Pagination
        page={page}
        count={totalPages}
        onChange={(_e, value) => onChange(value)}
        color="primary"
        shape="rounded"
        siblingCount={1}
      />
    </Box>
  );
}
