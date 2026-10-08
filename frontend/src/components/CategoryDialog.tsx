import { useState, type FormEvent } from "react";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { createCategory, updateCategory } from "../api/categories";
import { getErrorMessage } from "../api/client";
import type { Category } from "../types";

interface Props {
  category: Category | null;
  onClose: () => void;
  onSaved: (message: string) => void;
}

export default function CategoryDialog({ category, onClose, onSaved }: Props) {
  const [name, setName] = useState(category?.name ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const invalid = name.trim() === "";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (invalid) return;
    setSaving(true);
    setError("");
    try {
      if (category) await updateCategory(category._id, name.trim());
      else await createCategory(name.trim());
      onSaved(category ? "Category renamed" : "Category added");
    } catch (err) {
      setError(getErrorMessage(err));
      setSaving(false);
    }
  }

  return (
    <Dialog open onClose={saving ? undefined : onClose} fullWidth maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "contents" }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.375rem" }}>{category ? "Rename category" : "Add category"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "grid", gap: 2, pt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField label="Category name" value={name} onChange={(e) => setName(e.target.value)} autoFocus required fullWidth />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={onClose} disabled={saving} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={saving || invalid}>
            {saving ? "Saving..." : category ? "Save" : "Add category"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
