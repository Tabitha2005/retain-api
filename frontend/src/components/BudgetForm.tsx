import { useState, type FormEvent } from "react";
import { Alert, Box, Button, Card, TextField, Typography } from "@mui/material";
import { setBudget } from "../api/budgets";
import { getErrorMessage } from "../api/client";
import { monthLabel } from "../utils/format";

interface Props {
  month: string;
  amount: number;
  onSaved: (message: string) => void;
}

export default function BudgetForm({ month, amount, onSaved }: Props) {
  const [value, setValue] = useState(amount > 0 ? String(amount) : "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const parsed = Number(value);
  const invalid = value === "" || !Number.isFinite(parsed) || parsed < 0;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (invalid) return;
    setSaving(true);
    setError("");
    try {
      await setBudget(month, parsed);
      onSaved("Budget saved");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card sx={{ p: { xs: 3, md: 4 } }}>
      <Typography variant="h4">Budget for {monthLabel(month)}</Typography>
      <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
        Set the most you want to spend this month. You can change it any time.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "grid", gap: 2, maxWidth: 360 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Monthly budget"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={value !== "" && invalid}
          helperText={value !== "" && invalid ? "Enter 0 or more" : "You will see a warning once you pass 80%."}
          slotProps={{ htmlInput: { min: 0, step: "0.01", inputMode: "decimal" } }}
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" disabled={saving || invalid}>
          {saving ? "Saving..." : "Save budget"}
        </Button>
      </Box>
    </Card>
  );
}
