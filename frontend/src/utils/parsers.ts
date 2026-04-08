export function parsePrice(price: number | null): number {
  return price ?? 0;
}

export function parseMileage(mileage: number | null): number {
  return mileage ?? 0;
}

export function parseYear(year: number | null): number {
  return year ?? 0;
}

export function parseDate(date: string | null): number {
  if (!date) return 0;
  const [datePart, timePart] = date.split(" ");
  const [d, m, y] = datePart.split(".");
  return new Date(`${y}-${m}-${d}T${timePart ?? "00:00"}`).getTime();
}

export function detectFuel(engine: string): string {
  const e = engine.toLowerCase();
  if (e.includes("electric") || e === "e") return "electric";
  if (e.includes("hybrid")) return "hybrid";
  if (e.endsWith("d") || e.includes("tdi") || e.includes("cdi") || e.includes("dci")) return "diesel";
  return "petrol";
}
