import { useEffect, useState } from "react";
import { Box, Button, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PageHeader from "../components/PageHeader";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpenseList from "../components/ExpenseList";
import ExpensePagination from "../components/ExpensePagination";
import ExpenseForm from "../components/ExpenseForm";
import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetFilters, selectActiveFilterCount, selectExpenseQuery, setPage } from "../store/filtersSlice";
import { useDebounce } from "../hooks/useDebounce";
import { useExpenses } from "../hooks/useExpenses";
import { useCategories } from "../hooks/useCategories";
import { deleteExpense } from "../api/expenses";
import { getErrorMessage } from "../api/client";
import type { Expense } from "../types";

export default function Expenses() {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectExpenseQuery);
  const activeCount = useAppSelector(selectActiveFilterCount);
  const debouncedQuery = useDebounce(query, 300);
  const { data, loading, error, reload } = useExpenses(debouncedQuery);
  const { categories } = useCategories();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [deleting, setDeleting] = useState<Expense | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [toast, setToast] = useState("");

  // After deleting the last item on a page, step back to the last page that exists.
  useEffect(() => {
    if (data && data.page > data.totalPages) dispatch(setPage(data.totalPages));
  }, [data, dispatch]);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(expense: Expense) {
    setEditing(expense);
    setFormOpen(true);
  }

  function handleSaved(message: string) {
    setFormOpen(false);
    setEditing(null);
    setToast(message);
    reload();
  }

  async function confirmDelete() {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      await deleteExpense(deleting._id);
      setToast("Expense deleted");
      reload();
    } catch (err) {
      setToast(getErrorMessage(err));
    } finally {
      setDeleteBusy(false);
      setDeleting(null);
    }
  }

  const addButton = (
    <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={openCreate}>
      Add expense
    </Button>
  );

  return (
    <>
      <PageHeader title="Expenses" subtitle="Search, filter and manage everything you have spent." action={addButton} />

      <Box sx={{ display: "grid", gap: 3 }}>
        <ExpenseFilters categories={categories} />

        {error && <ErrorMessage message={error} onRetry={reload} />}

        {loading && !data && <Loader />}

        {data && data.total === 0 && (
          <EmptyState
            title={activeCount > 0 ? "No expenses match your filters" : "No expenses yet"}
            message={
              activeCount > 0
                ? "Try a different search or clear the filters to see everything."
                : "Add your first expense and it will show up here."
            }
            action={
              activeCount > 0 ? (
                <Button variant="outlined" onClick={() => dispatch(resetFilters())}>
                  Clear filters
                </Button>
              ) : (
                addButton
              )
            }
          />
        )}

        {data && data.total > 0 && (
          <>
            <Box sx={{ opacity: loading ? 0.55 : 1, transition: "opacity 150ms" }}>
              <ExpenseList items={data.items} onEdit={openEdit} onDelete={setDeleting} />
            </Box>
            <ExpensePagination
              page={data.page}
              totalPages={data.totalPages}
              total={data.total}
              limit={data.limit}
              onChange={(page) => dispatch(setPage(page))}
            />
          </>
        )}
      </Box>

      {formOpen && (
        <ExpenseForm
          expense={editing}
          categories={categories}
          onClose={() => setFormOpen(false)}
          onSaved={handleSaved}
        />
      )}

      <ConfirmDialog
        open={deleting !== null}
        title="Delete this expense?"
        message={deleting ? `"${deleting.title}" will be removed permanently. This can't be undone.` : ""}
        busy={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />

      <Snackbar
        open={toast !== ""}
        autoHideDuration={3500}
        onClose={() => setToast("")}
        message={toast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
