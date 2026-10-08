import { useState } from "react";
import { Box, Button, Card, Chip, IconButton, Snackbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import PageHeader from "../components/PageHeader";
import CategoryDialog from "../components/CategoryDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useCategories } from "../hooks/useCategories";
import { deleteCategory } from "../api/categories";
import { getErrorMessage } from "../api/client";
import type { Category } from "../types";

export default function AdminCategories() {
  const { categories, loading, error, reload } = useCategories();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(category: Category) {
    setEditing(category);
    setDialogOpen(true);
  }

  function handleSaved(message: string) {
    setDialogOpen(false);
    setEditing(null);
    setToast(message);
    reload();
  }

  async function confirmDelete() {
    if (!deleting) return;
    setBusy(true);
    try {
      const result = await deleteCategory(deleting._id);
      const moved = result.expensesMoved;
      setToast(
        moved > 0
          ? `Category deleted. ${moved} ${moved === 1 ? "expense" : "expenses"} moved to Uncategorized.`
          : "Category deleted"
      );
      reload();
    } catch (err) {
      setToast(getErrorMessage(err));
    } finally {
      setBusy(false);
      setDeleting(null);
    }
  }

  return (
    <>
      <PageHeader
        title="Categories"
        subtitle="Add, rename and remove the categories everyone uses."
        action={
          <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={openCreate}>
            Add category
          </Button>
        }
      />

      <Box sx={{ display: "grid", gap: 3 }}>
        {error && <ErrorMessage message={error} onRetry={reload} />}
        {loading && categories.length === 0 && <Loader />}

        {categories.length > 0 && (
          <Card sx={{ opacity: loading ? 0.55 : 1, transition: "opacity 150ms" }}>
            {categories.map((c, index) => (
              <Box
                key={c._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: 3,
                  py: 1.75,
                  borderTop: index === 0 ? 0 : 1,
                  borderColor: "divider",
                }}
              >
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography sx={{ fontWeight: 700 }} noWrap>
                    {c.name}
                  </Typography>
                  {c.isDefault && (
                    <Typography variant="body2" color="text.secondary">
                      Fallback for expenses when a category is deleted
                    </Typography>
                  )}
                </Box>
                {c.isDefault ? (
                  <Chip label="Default" size="small" sx={{ bgcolor: "#EEF1FD", color: "primary.main" }} />
                ) : (
                  <Box sx={{ whiteSpace: "nowrap" }}>
                    <IconButton aria-label={`Rename ${c.name}`} size="small" onClick={() => openEdit(c)}>
                      <EditOutlined fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label={`Delete ${c.name}`}
                      size="small"
                      onClick={() => setDeleting(c)}
                      sx={{ "&:hover": { color: "error.main" } }}
                    >
                      <DeleteOutlined fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            ))}
          </Card>
        )}
      </Box>

      {dialogOpen && <CategoryDialog category={editing} onClose={() => setDialogOpen(false)} onSaved={handleSaved} />}

      <ConfirmDialog
        open={deleting !== null}
        title="Delete this category?"
        message={
          deleting
            ? `Any expenses in "${deleting.name}" will be moved to Uncategorized. The category itself is removed permanently.`
            : ""
        }
        busy={busy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />

      <Snackbar
        open={toast !== ""}
        autoHideDuration={4500}
        onClose={() => setToast("")}
        message={toast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
