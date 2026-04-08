import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "lv", label: "LV" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  function switchLang(code: string) {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
  }

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLang(lang.code)}
          className={`text-xs font-semibold px-2 py-1 rounded-md cursor-pointer transition-colors ${
            i18n.language === lang.code
              ? "bg-blue-100 text-blue-600"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
