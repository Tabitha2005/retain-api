import { useState, type FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { createExpense, updateExpense } from "../api/expenses";
import { getErrorMessage } from "../api/client";
import { PAYMENT_METHODS, type Category, type Expense, type ExpenseInput, type PaymentMethod } from "../types";
import { PAYMENT_LABELS } from "../utils/labels";

interface Props {
  expense: Expense | null;
  categories: Category[];
  onClose: () => void;
  onSaved: (message: string) => void;
}

const today = () => new Date().toLocaleDateString("en-CA");

export default function ExpenseForm({ expense, categories, onClose, onSaved }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [title, setTitle] = useState(expense?.title ?? "");
  const [amount, setAmount] = useState(expense ? String(expense.amount) : "");
  const [category, setCategory] = useState(expense?.category._id ?? "");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(expense?.paymentMethod ?? "card");
  const [date, setDate] = useState(expense ? expense.date.slice(0, 10) : today());
  const [notes, setNotes] = useState(expense?.notes ?? "");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const errors = {
    title: title.trim() ? "" : "Add a title",
    amount: Number(amount) > 0 ? "" : "Enter an amount above 0",
    category: category ? "" : "Choose a category",
    date: date ? "" : "Pick a date",
  };
  const valid = Object.values(errors).every((message) => message === "");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    if (!valid) return;

    const input: ExpenseInput = {
      title: title.trim(),
      amount: Number(amount),
      category,
      paymentMethod,
      date,
      notes: notes.trim(),
    };

    setSaving(true);
    setError("");
    try {
      if (expense) await updateExpense(expense._id, input);
      else await createExpense(input);
      onSaved(expense ? "Expense updated" : "Expense added");
    } catch (err) {
      setError(getErrorMessage(err));
      setSaving(false);
    }
  }

  return (
    <Dialog open onClose={saving ? undefined : onClose} fullWidth maxWidth="sm" fullScreen={fullScreen}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "contents" }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.375rem" }}>{expense ? "Edit expense" : "Add expense"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "grid", gap: 2.5, pt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={submitted && !!errors.title}
              helperText={submitted ? errors.title : ""}
              autoFocus
              required
              fullWidth
            />
            <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
              <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                error={submitted && !!errors.amount}
                helperText={submitted ? errors.amount : ""}
                required
                slotProps={{ htmlInput: { min: 0, step: "0.01", inputMode: "decimal" } }}
              />
              <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                error={submitted && !!errors.date}
                helperText={submitted ? errors.date : ""}
                required
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                error={submitted && !!errors.category}
                helperText={submitted ? errors.category : ""}
                required
              >
                {categories.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Payment method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              >
                {PAYMENT_METHODS.map((m) => (
                  <MenuItem key={m} value={m}>
                    {PAYMENT_LABELS[m]}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <TextField
              label="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              minRows={3}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={onClose} disabled={saving} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" size="large" disabled={saving}>
            {saving ? "Saving..." : expense ? "Save changes" : "Add expense"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
