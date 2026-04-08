import { useTranslation } from "react-i18next";
import type { Car } from "@/types/car";
import { computeRatingDetails, type RatingDetails } from "@/utils/rating";

interface Props {
  car: Car;
}

function ratingStyle(r: number): string {
  if (r >= 8) return "bg-green-500/90 text-white";
  if (r >= 5) return "bg-yellow-400/90 text-slate-900";
  if (r >= 3) return "bg-orange-400/90 text-white";
  return "bg-red-500/90 text-white";
}

function FactorRow({ label, score }: { label: string; score: number }) {
  const bar = score >= 7 ? "bg-green-400" : score >= 4 ? "bg-yellow-400" : "bg-red-400";
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[10px]">
        <span className="text-slate-500 dark:text-slate-400">{label}</span>
        <span className="font-semibold text-slate-700 dark:text-slate-200">{score.toFixed(1)}</span>
      </div>
      <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${score * 10}%` }} />
      </div>
    </div>
  );
}

function RatingBadge({ d, t }: { d: RatingDetails; t: ReturnType<typeof useTranslation>["t"] }) {
  return (
    <div className="absolute top-2 right-2 group/rating z-10">
      {/* Badge */}
      <span className={`backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-md cursor-default select-none ${ratingStyle(d.rating)}`}>
        {d.rating.toFixed(1)}
      </span>

      {/* Tooltip */}
      <div className="absolute right-0 bottom-full mb-2 w-44 opacity-0 translate-y-1 group-hover/rating:opacity-100 group-hover/rating:translate-y-0 transition-all duration-200 ease-out pointer-events-none select-none">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-3 flex flex-col gap-2.5">
          <FactorRow label={t("card.tooltip.year")}    score={d.yearScore} />
          {d.mileageMissing ? (
            <p className="text-[10px] font-medium text-orange-500 dark:text-orange-400">
              {t("card.tooltip.mileageMissing")}
            </p>
          ) : (
            <FactorRow label={t("card.tooltip.mileage")} score={d.mileageScore} />
          )}
          <FactorRow label={t("card.tooltip.price")}   score={d.priceScore} />
          {d.featuresCount != null && d.featuresCount > 0 && (
            <div className="border-t border-slate-100 dark:border-slate-800 pt-2 text-[10px] text-slate-500 dark:text-slate-400">
              <span className="text-green-500 dark:text-green-400 font-semibold">
                +{d.featuresBonus.toFixed(2)}
              </span>{" "}
              {t("card.tooltip.featuresBonus", { count: d.featuresCount })}
            </div>
          )}
        </div>
        {/* Arrow */}
        <div className="absolute -bottom-[5px] right-3 w-2.5 h-2.5 rotate-45 bg-white dark:bg-slate-900 border-r border-b border-slate-200 dark:border-slate-700" />
      </div>
    </div>
  );
}

export default function CarCard({ car }: Props) {
  const { t } = useTranslation();
  const details = computeRatingDetails(car);

  return (
    // overflow-visible so the tooltip can escape the card boundary
    <a
      href={car.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Image — overflow-hidden here only, so tooltip on badge can escape */}
      <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-700 overflow-hidden rounded-t-xl">
        {car.image ? (
          <img
            src={car.image}
            alt={car.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
            {t("card.noImage")}
          </div>
        )}
        <span className="absolute top-2 left-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-700 dark:text-slate-300 text-xs font-medium px-2 py-1 rounded-md">
          {car.manufacturer}
        </span>
      </div>

      {/* Rating badge + tooltip — outside overflow-hidden so tooltip can overflow upward */}
      {details != null && <RatingBadge d={details} t={t} />}

      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-blue-500 transition-colors">
          {car.title}
        </h3>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span>📅 {car.year ?? "—"}</span>
          <span>⚙️ {car.engine}</span>
          <span>🛣️ {car.mileage != null ? `${car.mileage.toLocaleString()} km` : "—"}</span>
          <span>📆 {car.date ?? "—"}</span>
        </div>

        <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <span className="text-base font-bold text-slate-900 dark:text-slate-100">
            {car.price != null ? `${car.price.toLocaleString()} €` : "—"}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">{car.model}</span>
        </div>
      </div>
    </a>
  );
}
