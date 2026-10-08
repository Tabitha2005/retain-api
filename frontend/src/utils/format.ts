// Change this one line to switch the currency across the whole app.
const CURRENCY = "USD";

const moneyFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: CURRENCY });

export function formatMoney(value: number): string {
  return moneyFormat.format(value);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function currentMonth(): string {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function monthLabel(month: string): string {
  const [year, m] = month.split("-").map(Number) as [number, number];
  return new Date(Date.UTC(year, m - 1, 1)).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function shiftMonth(month: string, delta: number): string {
  const [year, m] = month.split("-").map(Number) as [number, number];
  const d = new Date(Date.UTC(year, m - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function monthLabelShort(month: string): string {
  const [year, m] = month.split("-").map(Number) as [number, number];
  return new Date(Date.UTC(year, m - 1, 1)).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
