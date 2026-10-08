import { useState, type FormEvent } from "react";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../api/client";

export default function Register() {
  const { user, signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/" replace />;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Use a password with at least 6 characters.");
      return;
    }
    setSubmitting(true);
    try {
      await signUp(name.trim(), email, password);
    } catch (err) {
      setError(getErrorMessage(err));
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Set a monthly budget and start tracking in a minute."
      footer={
        <Typography color="text.secondary">
          Already have an account?{" "}
          <Link component={RouterLink} to="/login" underline="hover" sx={{ fontWeight: 700 }}>
            Sign in
          </Link>
        </Typography>
      }
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "grid", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Full name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="new-password"
          helperText="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" disabled={submitting || !name || !email || !password}>
          {submitting ? "Creating account..." : "Create account"}
        </Button>
      </Box>
    </AuthLayout>
  );
}
