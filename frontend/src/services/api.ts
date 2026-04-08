import type { Car, CarsResponse } from "@/types/car";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function fetchCars(page: number = 1): Promise<CarsResponse> {
  const res = await fetch(`${BASE_URL}/cars?page=${page}`);
  if (!res.ok) throw new Error(`Failed to fetch cars: ${res.status}`);
  return res.json();
}

export async function fetchAllCars(): Promise<Car[]> {
  const res = await fetch(`${BASE_URL}/cars/all`);
  if (!res.ok) throw new Error(`Failed to fetch all cars: ${res.status}`);
  return res.json();
}
