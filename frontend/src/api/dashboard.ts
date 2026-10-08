import { api } from "./client";
import type { Dashboard } from "../types";

export async function getDashboard(month: string): Promise<Dashboard> {
  const { data } = await api.get<Dashboard>("/dashboard", { params: { month } });
  return data;
}
