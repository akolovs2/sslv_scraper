import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCars } from "@/hooks/useCars";
import { useAllCars } from "@/hooks/useAllCars";
import { useFilters } from "@/hooks/useFilters";
import CarCard from "@/components/CarCard";
import Pagination from "@/components/Pagination";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Filters from "@/components/Filters";

const PER_PAGE = 20;

export default function Home() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  // Unfiltered paginated data (normal browsing)
  const { data: pagedData, loading: pagedLoading, error: pagedError } = useCars(page);

  // All data — only fetched when filters are active
  const { filters, setFilters, apply, reset, manufacturers, isActive } = useFilters(pagedData?.data ?? []);
  const { data: allData, loading: allLoading, error: allError } = useAllCars(isActive);

  // When filters active: apply to all data and paginate client-side
  const filteredAll = useMemo(() => (allData ? apply(allData) : []), [allData, filters]);
  const filteredPage = filteredAll.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const filteredTotalPages = Math.max(1, Math.ceil(filteredAll.length / PER_PAGE));

  const cars        = isActive ? filteredPage     : (pagedData?.data ?? []);
  const totalPages  = isActive ? filteredTotalPages : (pagedData?.total_pages ?? 1);
  const total       = isActive ? filteredAll.length : (pagedData?.total ?? 0);
  const loading     = isActive ? allLoading         : pagedLoading;
  const error       = isActive ? allError           : pagedError;

  function handleFiltersChange(next: typeof filters) {
    setFilters(next);
    setPage(1);
  }

  function handleReset() {
    reset();
    setPage(1);
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header total={total} />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-6">
        <Filters
          filters={filters}
          manufacturers={manufacturers}
          isActive={isActive}
          onChange={handleFiltersChange}
          onReset={handleReset}
        />

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: PER_PAGE }).map((_, i) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-600 rounded w-1/2" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mt-2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-slate-400 text-sm">{t("states.loadError")}</p>
            <p className="text-slate-300 text-xs mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            {cars.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-slate-400 text-sm">{t("states.noResults")}</p>
                <button onClick={handleReset} className="mt-3 text-xs text-blue-500 hover:underline cursor-pointer">
                  {t("states.clearFilters")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
