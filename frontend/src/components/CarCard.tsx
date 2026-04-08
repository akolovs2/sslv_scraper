import { useTranslation } from "react-i18next";
import type { Car } from "@/types/car";

interface Props {
  car: Car;
}

export default function CarCard({ car }: Props) {
  const { t } = useTranslation();

  return (
    <a
      href={car.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl overflow-hidden border border-slate-200 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        {car.image ? (
          <img
            src={car.image}
            alt={car.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
            {t("card.noImage")}
          </div>
        )}
        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium px-2 py-1 rounded-md">
          {car.manufacturer}
        </span>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
          {car.title}
        </h3>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-500">
          <span>📅 {car.year ?? "—"}</span>
          <span>⚙️ {car.engine}</span>
          <span>🛣️ {car.mileage != null ? `${car.mileage.toLocaleString()} km` : "—"}</span>
          <span>📆 {car.date ?? "—"}</span>
        </div>

        <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-base font-bold text-slate-900">
            {car.price != null ? `${car.price.toLocaleString()} €` : "—"}
          </span>
          <span className="text-xs text-slate-400">{car.model}</span>
        </div>
      </div>
    </a>
  );
}
