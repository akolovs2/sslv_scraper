export type SortField = "manufacturer" | "price" | "year" | "mileage" | "date" | "rating";
export type SortOrder = "asc" | "desc";

export interface Filters {
  manufacturer: string;
  model: string;
  fuel: string;
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
  mileageMax: string;
  ratingMin: string;
  sortField: SortField;
  sortOrder: SortOrder;
}

export const defaultFilters: Filters = {
  manufacturer: "",
  model: "",
  fuel: "",
  priceMin: "",
  priceMax: "",
  yearMin: "",
  yearMax: "",
  mileageMax: "",
  ratingMin: "",
  sortField: "date",
  sortOrder: "desc",
};
