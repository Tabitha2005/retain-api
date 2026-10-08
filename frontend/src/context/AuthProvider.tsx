import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthContext, type AuthContextValue } from "./AuthContext";
import { getMe, login, register } from "../api/auth";
import { TOKEN_KEY, UNAUTHORIZED_EVENT } from "../api/client";
import type { AuthResponse, User } from "../types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(() => localStorage.getItem(TOKEN_KEY) !== null);

  // Restore the session from a saved token when the app opens.
  useEffect(() => {
    if (localStorage.getItem(TOKEN_KEY) === null) return;
    let active = true;
    getMe()
      .then((me) => {
        if (active) setUser(me);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // The API client fires this when a token expires mid-session.
  useEffect(() => {
    const handle = () => setUser(null);
    window.addEventListener(UNAUTHORIZED_EVENT, handle);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handle);
  }, []);

  const finishAuth = useCallback((res: AuthResponse) => {
    localStorage.setItem(TOKEN_KEY, res.token);
    setUser(res.user);
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => finishAuth(await login(email, password)),
    [finishAuth]
  );

  // Creating an account does not sign the user in. They continue to the sign in page.
  const signUp = useCallback(async (name: string, email: string, password: string) => {
    await register(name, email, password);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, isAdmin: user?.role === "admin", signIn, signUp, signOut }),
    [user, loading, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
