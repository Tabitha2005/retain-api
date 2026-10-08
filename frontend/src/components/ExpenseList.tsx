import {
  Box,
  Card,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectFilters, updateFilters } from "../store/filtersSlice";
import type { Expense, SortField } from "../types";
import { formatDate, formatMoney } from "../utils/format";
import { PAYMENT_LABELS } from "../utils/labels";

interface Props {
  items: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

const headCell = { color: "text.secondary", fontWeight: 700, bgcolor: "#FAFBFD", borderColor: "divider", py: 1.5 };

function CategoryChip({ name }: { name: string }) {
  return <Chip label={name} size="small" sx={{ bgcolor: "#EEF1FD", color: "primary.main" }} />;
}

export default function ExpenseList({ items, onEdit, onDelete }: Props) {
  const dispatch = useAppDispatch();
  const { sortBy, order } = useAppSelector(selectFilters);

  function toggleSort(field: SortField) {
    if (sortBy === field) dispatch(updateFilters({ order: order === "asc" ? "desc" : "asc" }));
    else dispatch(updateFilters({ sortBy: field, order: "desc" }));
  }

  return (
    <>
      <Card sx={{ display: { xs: "none", md: "block" }, overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={headCell}>Expense</TableCell>
              <TableCell sx={headCell}>Category</TableCell>
              <TableCell sx={headCell}>Payment</TableCell>
              <TableCell sx={headCell} sortDirection={sortBy === "date" ? order : false}>
                <TableSortLabel active={sortBy === "date"} direction={sortBy === "date" ? order : "desc"} onClick={() => toggleSort("date")}>
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={headCell} align="right" sortDirection={sortBy === "amount" ? order : false}>
                <TableSortLabel active={sortBy === "amount"} direction={sortBy === "amount" ? order : "desc"} onClick={() => toggleSort("amount")}>
                  Amount
                </TableSortLabel>
              </TableCell>
              <TableCell sx={headCell} align="right">
                <Box component="span" sx={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                  Actions
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((e) => (
              <TableRow key={e._id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                <TableCell sx={{ borderColor: "divider" }}>
                  <Typography sx={{ fontWeight: 700 }}>{e.title}</Typography>
                  {e.notes && (
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 280 }}>
                      {e.notes}
                    </Typography>
                  )}
                </TableCell>
                <TableCell sx={{ borderColor: "divider" }}>
                  <CategoryChip name={e.category.name} />
                </TableCell>
                <TableCell sx={{ borderColor: "divider", color: "text.secondary" }}>{PAYMENT_LABELS[e.paymentMethod]}</TableCell>
                <TableCell sx={{ borderColor: "divider", color: "text.secondary" }}>{formatDate(e.date)}</TableCell>
                <TableCell align="right" sx={{ borderColor: "divider", fontWeight: 800 }}>
                  {formatMoney(e.amount)}
                </TableCell>
                <TableCell align="right" sx={{ borderColor: "divider", whiteSpace: "nowrap" }}>
                  <IconButton aria-label={`Edit ${e.title}`} onClick={() => onEdit(e)} size="small">
                    <EditOutlined fontSize="small" />
                  </IconButton>
                  <IconButton aria-label={`Delete ${e.title}`} onClick={() => onDelete(e)} size="small" sx={{ "&:hover": { color: "error.main" } }}>
                    <DeleteOutlined fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Box sx={{ display: { xs: "grid", md: "none" }, gap: 1.5 }}>
        {items.map((e) => (
          <Card key={e._id} sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700 }} noWrap>
                  {e.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(e.date)} · {PAYMENT_LABELS[e.paymentMethod]}
                </Typography>
              </Box>
              <Typography sx={{ fontWeight: 800, whiteSpace: "nowrap" }}>{formatMoney(e.amount)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5 }}>
              <CategoryChip name={e.category.name} />
              <Box>
                <IconButton aria-label={`Edit ${e.title}`} onClick={() => onEdit(e)} size="small">
                  <EditOutlined fontSize="small" />
                </IconButton>
                <IconButton aria-label={`Delete ${e.title}`} onClick={() => onDelete(e)} size="small" sx={{ "&:hover": { color: "error.main" } }}>
                  <DeleteOutlined fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
}
