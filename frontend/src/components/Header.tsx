import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

interface Props {
  total?: number;
}

export default function Header({ total }: Props) {
  const { t } = useTranslation();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ss.lv <span className="text-blue-600">Auto</span>
        </h1>
        <div className="flex items-center gap-3">
          {total !== undefined && (
            <span className="text-sm text-slate-400 dark:text-slate-500">
              {t("header.listings", { count: total.toLocaleString() })}
            </span>
          )}
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
