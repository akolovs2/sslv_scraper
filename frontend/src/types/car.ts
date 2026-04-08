export interface Car {
  manufacturer: string;
  id: string;
  title: string;
  link: string;
  image: string | null;
  model: string;
  year: number | null;
  engine: string;
  mileage: number | null;
  price: number | null;
  date: string | null;
  features_count: number | null;
}

export interface CarsResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Car[];
}
