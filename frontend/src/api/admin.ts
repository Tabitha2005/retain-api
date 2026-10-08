import { api } from "./client";
import type { AdminInsights } from "../types";

export async function getInsights(): Promise<AdminInsights> {
  const { data } = await api.get<AdminInsights>("/admin/insights");
  return data;
}
