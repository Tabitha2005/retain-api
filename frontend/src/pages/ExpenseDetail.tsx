import { useState, type ReactNode } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, Chip, Snackbar, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import ExpenseForm from "../components/ExpenseForm";
import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import { useExpense } from "../hooks/useExpense";
import { useCategories } from "../hooks/useCategories";
import { deleteExpense } from "../api/expenses";
import { getErrorMessage } from "../api/client";
import { formatDate, formatMoney } from "../utils/format";
import { PAYMENT_LABELS } from "../utils/labels";

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <Box sx={{ fontWeight: 700 }}>{children}</Box>
    </Box>
  );
}

export default function ExpenseDetail() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error, reload } = useExpense(id);
  const { categories } = useCategories();

  const [editing, setEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  async function handleDelete() {
    setBusy(true);
    try {
      await deleteExpense(id);
      navigate("/expenses");
    } catch (err) {
      setToast(getErrorMessage(err));
      setBusy(false);
      setConfirmOpen(false);
    }
  }

  const back = (
    <Button component={RouterLink} to="/expenses" startIcon={<ArrowBack />} color="inherit" sx={{ mb: 3 }}>
      Back to expenses
    </Button>
  );

  if (loading && !data) return <Loader />;

  if (!data) {
    return (
      <>
        {back}
        <EmptyState title="We could not open this expense" message={error || "It may have been deleted."} />
      </>
    );
  }

  return (
    <>
      {back}

      <Card sx={{ p: { xs: 3, md: 5 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3, flexWrap: "wrap", alignItems: "flex-start" }}>
          <Box sx={{ minWidth: 0 }}>
            <Chip label={data.category.name} size="small" sx={{ bgcolor: "#EEF1FD", color: "primary.main", mb: 1.5 }} />
            <Typography variant="h2" component="h1">
              {data.title}
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: "2.25rem", letterSpacing: "-0.02em" }}>{formatMoney(data.amount)}</Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" },
            my: 4,
            py: 3,
            borderTop: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Detail label="Date">{formatDate(data.date)}</Detail>
          <Detail label="Payment method">{PAYMENT_LABELS[data.paymentMethod]}</Detail>
          <Detail label="Category">{data.category.name}</Detail>
          <Detail label="Added on">{formatDate(data.createdAt)}</Detail>
        </Box>

        <Detail label="Notes">
          <Typography sx={{ fontWeight: 500, color: data.notes ? "text.primary" : "text.secondary" }}>
            {data.notes || "No notes added."}
          </Typography>
        </Detail>

        <Box sx={{ display: "flex", gap: 1.5, mt: 4, flexWrap: "wrap" }}>
          <Button variant="contained" size="large" startIcon={<EditOutlined />} onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" size="large" startIcon={<DeleteOutlined />} onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
        </Box>
      </Card>

      {editing && (
        <ExpenseForm
          expense={data}
          categories={categories}
          onClose={() => setEditing(false)}
          onSaved={(message) => {
            setEditing(false);
            setToast(message);
            reload();
          }}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this expense?"
        message={`"${data.title}" will be removed permanently. This can't be undone.`}
        busy={busy}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
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
