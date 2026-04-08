import { useState, useEffect } from "react";
import { fetchAllCars } from "@/services/api";
import type { Car } from "@/types/car";

export function useAllCars(enabled: boolean) {
  const [data, setData] = useState<Car[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    fetchAllCars()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [enabled]);

  return { data, loading, error };
}
