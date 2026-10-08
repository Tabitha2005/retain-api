import { useState, type FormEvent } from "react";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
import CheckRounded from "@mui/icons-material/CheckRounded";
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
  const [createdEmail, setCreatedEmail] = useState<string | null>(null);

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
      await signUp(name.trim(), email.trim(), password);
      setCreatedEmail(email.trim());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (createdEmail !== null) {
    return (
      <AuthLayout title="Account created" subtitle="You can now sign in with your new account." footer={null}>
        <Box role="status" sx={{ display: "grid", gap: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2.5, bgcolor: "#E3F0E9", borderRadius: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "success.main",
                color: "#FFFFFF",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <CheckRounded />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 800 }}>Account successfully created</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: "anywhere" }}>
                {createdEmail}
              </Typography>
            </Box>
          </Box>
          <Button component={RouterLink} to="/login" state={{ email: createdEmail }} variant="contained" size="large">
            Continue to sign in
          </Button>
        </Box>
      </AuthLayout>
    );
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
