import axios, { isAxiosError } from "axios";

export const TOKEN_KEY = "retain_token";
export const UNAUTHORIZED_EVENT = "retain:unauthorized";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError(error) && error.response?.status === 401 && !error.config?.url?.startsWith("/auth/")) {
      localStorage.removeItem(TOKEN_KEY);
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }
    return Promise.reject(error);
  }
);

export function getErrorMessage(error: unknown): string {
  if (isAxiosError<{ message?: string }>(error)) {
    const message = error.response?.data?.message;
    if (message) return message;
    if (error.code === "ERR_NETWORK") {
      return "Can't reach the server. If it was idle, wait a minute and try again.";
    }
  }
  return "Something went wrong. Try again.";
}
