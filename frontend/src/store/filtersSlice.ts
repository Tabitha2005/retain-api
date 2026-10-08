import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ExpenseQuery, PaymentMethod, SortField, SortOrder } from "../types";
import type { RootState } from "./index";

export interface FiltersState {
  search: string;
  category: string;
  paymentMethod: PaymentMethod | "";
  dateFrom: string;
  dateTo: string;
  minAmount: string;
  maxAmount: string;
  sortBy: SortField;
  order: SortOrder;
  page: number;
  limit: number;
}

export const initialFilters: FiltersState = {
  search: "",
  category: "",
  paymentMethod: "",
  dateFrom: "",
  dateTo: "",
  minAmount: "",
  maxAmount: "",
  sortBy: "date",
  order: "desc",
  page: 1,
  limit: 10,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialFilters,
  reducers: {
    // Any change to a filter, search or sort sends the user back to page 1.
    updateFilters(state, action: PayloadAction<Partial<Omit<FiltersState, "page">>>) {
      Object.assign(state, action.payload);
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetFilters() {
      return initialFilters;
    },
  },
});

export const { updateFilters, setPage, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;

export const selectFilters = (state: RootState): FiltersState => state.filters;

// Turns the Redux state into the query the API expects, leaving out empty values.
export const selectExpenseQuery = createSelector([selectFilters], (f): ExpenseQuery => ({
  search: f.search.trim() || undefined,
  category: f.category || undefined,
  paymentMethod: f.paymentMethod || undefined,
  dateFrom: f.dateFrom || undefined,
  dateTo: f.dateTo || undefined,
  minAmount: f.minAmount || undefined,
  maxAmount: f.maxAmount || undefined,
  sortBy: f.sortBy,
  order: f.order,
  page: f.page,
  limit: f.limit,
}));

export const selectActiveFilterCount = createSelector(
  [selectFilters],
  (f) => [f.search.trim(), f.category, f.paymentMethod, f.dateFrom, f.dateTo, f.minAmount, f.maxAmount].filter(Boolean).length
);
