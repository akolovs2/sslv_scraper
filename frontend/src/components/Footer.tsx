import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <p>
          {t("footer.source")}{" "}
          <a
            href="https://www.ss.lv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 underline underline-offset-2 hover:text-slate-700 transition-colors"
          >
            ss.lv
          </a>
          . {t("footer.ownership")}
        </p>
        <p className="shrink-0">{t("footer.disclaimer")}</p>
      </div>
    </footer>
  );
}
