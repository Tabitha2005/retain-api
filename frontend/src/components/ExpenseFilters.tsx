import { Box, Button, Card, InputAdornment, MenuItem, TextField } from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import FilterAltOffOutlined from "@mui/icons-material/FilterAltOffOutlined";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetFilters, selectActiveFilterCount, selectFilters, updateFilters } from "../store/filtersSlice";
import { PAYMENT_METHODS, type Category, type PaymentMethod, type SortField, type SortOrder } from "../types";
import { PAYMENT_LABELS, SORT_OPTIONS } from "../utils/labels";

const selectSlotProps = { select: { displayEmpty: true }, inputLabel: { shrink: true } };
const shrinkSlotProps = { inputLabel: { shrink: true } };
const amountSlotProps = { inputLabel: { shrink: true }, htmlInput: { min: 0, step: "0.01" } };

export default function ExpenseFilters({ categories }: { categories: Category[] }) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const activeCount = useAppSelector(selectActiveFilterCount);

  function handleSort(value: string) {
    const [sortBy, order] = value.split(":") as [SortField, SortOrder];
    dispatch(updateFilters({ sortBy, order }));
  }

  return (
    <Card sx={{ p: { xs: 2, md: 2.5 }, display: "grid", gap: 2 }}>
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 2fr) minmax(0, 1fr)" } }}>
        <TextField
          placeholder="Search by title or notes"
          value={filters.search}
          onChange={(e) => dispatch(updateFilters({ search: e.target.value }))}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined fontSize="small" />
                </InputAdornment>
              ),
            },
            htmlInput: { "aria-label": "Search expenses" },
          }}
        />
        <TextField
          select
          label="Sort by"
          value={`${filters.sortBy}:${filters.order}`}
          onChange={(e) => handleSort(e.target.value)}
          slotProps={shrinkSlotProps}
        >
          {SORT_OPTIONS.map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))", lg: "repeat(6, minmax(0, 1fr))" },
        }}
      >
        <TextField
          select
          label="Category"
          value={filters.category}
          onChange={(e) => dispatch(updateFilters({ category: e.target.value }))}
          slotProps={selectSlotProps}
        >
          <MenuItem value="">All categories</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c._id} value={c._id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Payment method"
          value={filters.paymentMethod}
          onChange={(e) => dispatch(updateFilters({ paymentMethod: e.target.value as PaymentMethod | "" }))}
          slotProps={selectSlotProps}
        >
          <MenuItem value="">All methods</MenuItem>
          {PAYMENT_METHODS.map((m) => (
            <MenuItem key={m} value={m}>
              {PAYMENT_LABELS[m]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="From"
          type="date"
          value={filters.dateFrom}
          onChange={(e) => dispatch(updateFilters({ dateFrom: e.target.value }))}
          slotProps={shrinkSlotProps}
        />
        <TextField
          label="To"
          type="date"
          value={filters.dateTo}
          onChange={(e) => dispatch(updateFilters({ dateTo: e.target.value }))}
          slotProps={shrinkSlotProps}
        />
        <TextField
          label="Min amount"
          type="number"
          value={filters.minAmount}
          onChange={(e) => dispatch(updateFilters({ minAmount: e.target.value }))}
          slotProps={amountSlotProps}
        />
        <TextField
          label="Max amount"
          type="number"
          value={filters.maxAmount}
          onChange={(e) => dispatch(updateFilters({ maxAmount: e.target.value }))}
          slotProps={amountSlotProps}
        />
      </Box>

      {activeCount > 0 && (
        <Box>
          <Button startIcon={<FilterAltOffOutlined />} onClick={() => dispatch(resetFilters())} color="inherit">
            Clear {activeCount} {activeCount === 1 ? "filter" : "filters"}
          </Button>
        </Box>
      )}
    </Card>
  );
}
