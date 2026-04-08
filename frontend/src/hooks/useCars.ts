import { useState, useEffect } from "react";
import { fetchCars } from "@/services/api";
import type { CarsResponse } from "@/types/car";

export function useCars(page: number) {
  const [data, setData] = useState<CarsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchCars(page)
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page]);

  return { data, loading, error };
}
