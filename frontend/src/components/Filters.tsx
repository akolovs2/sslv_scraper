import { useState } from "react";
import { useTranslation } from "react-i18next";
import { defaultFilters, type Filters, type SortField } from "@/types/filters";

interface Props {
  filters: Filters;
  manufacturers: string[];
  isActive: boolean;
  onChange: (filters: Filters) => void;
  onReset: () => void;
}

const FUEL_OPTIONS = ["petrol", "diesel", "electric", "hybrid"] as const;
const SORT_FIELDS: SortField[] = ["date", "price", "year", "mileage", "manufacturer"];

export default function Filters({ filters, manufacturers, isActive, onChange, onReset }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  function set<K extends keyof Filters>(key: K, value: Filters[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-4 px-4 py-3">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer transition-colors"

        >
          <span>{open ? "▲" : "▼"}</span>
          {t("filters.title")}
          {isActive && (
            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full">
              {t("filters.active")}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <label className="text-xs text-slate-400 hidden sm:block">{t("filters.sortBy")}</label>
          <select
            value={filters.sortField}
            onChange={(e) => set("sortField", e.target.value as SortField)}
            className="text-sm border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SORT_FIELDS.map((f) => (
              <option key={f} value={f}>{t(`filters.sort_options.${f}`)}</option>
            ))}
          </select>
          <button
            onClick={() => set("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc")}
            className="text-sm border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors min-w-[36px] text-center"
            title={t(`filters.${filters.sortOrder}`)}
          >
            {filters.sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>

        {isActive && (
          <button onClick={onReset} className="text-xs text-slate-400 hover:text-red-500 cursor-pointer transition-colors">
            {t("filters.clear")}
          </button>
        )}
      </div>

      {/* Expanded filters */}
      {open && (
        <div className="border-t border-slate-100 px-4 py-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Manufacturer */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">{t("filters.manufacturer")}</label>
            <select
              value={filters.manufacturer}
              onChange={(e) => set("manufacturer", e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t("filters.all")}</option>
              {manufacturers.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Fuel */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">{t("filters.fuel")}</label>
            <select
              value={filters.fuel}
              onChange={(e) => set("fuel", e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t("filters.all")}</option>
              {FUEL_OPTIONS.map((f) => (
                <option key={f} value={f}>{t(`filters.fuel_options.${f}`)}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">{t("filters.price")}</label>
            <div className="flex items-center gap-1">
              <input type="number" placeholder={t("filters.min")} value={filters.priceMin}
                onChange={(e) => set("priceMin", e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-slate-300">–</span>
              <input type="number" placeholder={t("filters.max")} value={filters.priceMax}
                onChange={(e) => set("priceMax", e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Year */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">{t("filters.year")}</label>
            <div className="flex items-center gap-1">
              <input type="number" placeholder={t("filters.from")} value={filters.yearMin}
                onChange={(e) => set("yearMin", e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-slate-300">–</span>
              <input type="number" placeholder={t("filters.to")} value={filters.yearMax}
                onChange={(e) => set("yearMax", e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Mileage */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500">{t("filters.mileageMax")}</label>
            <input type="number" placeholder={t("filters.placeholder.mileage")} value={filters.mileageMax}
              onChange={(e) => set("mileageMax", e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
