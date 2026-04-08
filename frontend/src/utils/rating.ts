import type { Car } from "@/types/car";

function factor(value: number, min: number, max: number, invert = false): number {
  const clamped = Math.min(Math.max(value, min), max);
  const normalized = (clamped - min) / (max - min);
  return invert ? 1 - normalized : normalized;
}

const MISSING_MILEAGE_FACTOR = 0.15;

export interface RatingDetails {
  rating: number;
  yearScore: number;        // 0–10
  mileageScore: number;     // 0–10 (penalised if missing)
  priceScore: number;       // 0–10
  featuresBonus: number;    // 0–1.0
  mileageMissing: boolean;
  featuresCount: number | null;
}

/**
 * Full breakdown used by the tooltip. Core factors combined via weighted
 * geometric mean; features added as a capped bonus on top.
 *
 *   base  = year^0.25 × mileage^0.40 × price^0.35   (scaled to 1–10)
 *   bonus = (features_count / 98) × 1.0              (max +1.0)
 *
 * Ranges (ss.lv context):
 *   year:     1990 → 2025
 *   mileage:     0 → 500 000 km
 *   price:     500 → 150 000 €
 *   features:    0 → 98 options
 */
export function computeRatingDetails(car: Car): RatingDetails | null {
  if (car.year == null && car.price == null) return null;

  const yearF    = car.year    != null ? factor(car.year,    1990,    2025)        : 0.5;
  const mileageF = car.mileage != null ? factor(car.mileage,    0, 500_000, true)  : MISSING_MILEAGE_FACTOR;
  const priceF   = car.price   != null ? factor(car.price,    500, 150_000, true)  : 0.5;

  const base         = Math.pow(yearF, 0.25) * Math.pow(mileageF, 0.40) * Math.pow(priceF, 0.35) * 9 + 1;
  const featuresBonus = car.features_count != null ? factor(car.features_count, 0, 98) * 1.0 : 0;
  const rating       = Math.round(Math.min(10, base + featuresBonus) * 10) / 10;

  return {
    rating,
    yearScore:     Math.round(yearF    * 100) / 10,
    mileageScore:  Math.round(mileageF * 100) / 10,
    priceScore:    Math.round(priceF   * 100) / 10,
    featuresBonus: Math.round(featuresBonus * 100) / 100,
    mileageMissing: car.mileage == null,
    featuresCount:  car.features_count,
  };
}

export function computeRating(car: Car): number | null {
  return computeRatingDetails(car)?.rating ?? null;
}
