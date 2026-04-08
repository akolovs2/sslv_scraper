import { useState } from "react";
import type { Car } from "@/types/car";
import { defaultFilters, type Filters } from "@/types/filters";
import { parsePrice, parseMileage, parseYear, parseDate, detectFuel } from "@/utils/parsers";
import { computeRating } from "@/utils/rating";

export function useFilters(cars: Car[]) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const manufacturers = [...new Set(cars.map((c) => c.manufacturer))].sort();

  function apply(cars: Car[]): Car[] {
    let result = [...cars];

    if (filters.manufacturer)
      result = result.filter((c) => c.manufacturer === filters.manufacturer);

    if (filters.model)
      result = result.filter((c) => c.model === filters.model);

    if (filters.fuel)
      result = result.filter((c) => detectFuel(c.engine) === filters.fuel);

    if (filters.priceMin)
      result = result.filter((c) => parsePrice(c.price) >= parseFloat(filters.priceMin));

    if (filters.priceMax)
      result = result.filter((c) => parsePrice(c.price) <= parseFloat(filters.priceMax));

    if (filters.yearMin)
      result = result.filter((c) => parseYear(c.year) >= parseInt(filters.yearMin));

    if (filters.yearMax)
      result = result.filter((c) => parseYear(c.year) <= parseInt(filters.yearMax));

    if (filters.mileageMax)
      result = result.filter((c) => c.mileage !== null && parseMileage(c.mileage) <= parseInt(filters.mileageMax));

    if (filters.ratingMin)
      result = result.filter((c) => (computeRating(c) ?? 0) >= parseFloat(filters.ratingMin));

    result.sort((a, b) => {
      let diff = 0;
      switch (filters.sortField) {
        case "manufacturer": diff = a.manufacturer.localeCompare(b.manufacturer); break;
        case "price":        diff = parsePrice(a.price) - parsePrice(b.price); break;
        case "year":         diff = parseYear(a.year) - parseYear(b.year); break;
        case "mileage":      diff = parseMileage(a.mileage) - parseMileage(b.mileage); break;
        case "date":         diff = parseDate(a.date) - parseDate(b.date); break;
        case "rating":       diff = (computeRating(a) ?? 0) - (computeRating(b) ?? 0); break;
      }
      return filters.sortOrder === "asc" ? diff : -diff;
    });

    return result;
  }

  function reset() {
    setFilters(defaultFilters);
  }

  const isActive = JSON.stringify(filters) !== JSON.stringify(defaultFilters);

  return { filters, setFilters, apply, reset, manufacturers, isActive };
}
