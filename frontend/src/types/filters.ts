export type SortField = "manufacturer" | "price" | "year" | "mileage" | "date";
export type SortOrder = "asc" | "desc";

export interface Filters {
  manufacturer: string;
  fuel: string;
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
  mileageMax: string;
  sortField: SortField;
  sortOrder: SortOrder;
}

export const defaultFilters: Filters = {
  manufacturer: "",
  fuel: "",
  priceMin: "",
  priceMax: "",
  yearMin: "",
  yearMax: "",
  mileageMax: "",
  sortField: "date",
  sortOrder: "desc",
};
