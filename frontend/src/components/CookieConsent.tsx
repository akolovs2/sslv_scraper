import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getCookie, setCookie } from "@/utils/cookies";

export default function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookie("cookie_consent")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    setCookie("cookie_consent", "accepted");
    setVisible(false);
  }

  function decline() {
    setCookie("cookie_consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-slate-600 dark:text-slate-300 flex-1">
          {t("cookies.message")}{" "}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors"
          >
            {t("cookies.decline")}
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer transition-colors"
          >
            {t("cookies.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
