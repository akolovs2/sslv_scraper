import { useTranslation } from "react-i18next";
import { setCookie } from "@/utils/cookies";

const LANGUAGES = [
  { code: "lv", flag: "lv" },
  { code: "en", flag: "gb" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  function switchLang(code: string) {
    i18n.changeLanguage(code);
    setCookie("lang", code);
  }

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLang(lang.code)}
          title={lang.code.toUpperCase()}
          className={`w-8 h-8 flex items-center justify-center rounded-md cursor-pointer transition-all ${
            i18n.language === lang.code
              ? "opacity-100"
              : "opacity-40 hover:opacity-100"
          }`}
        >
          <span className={`fi fi-${lang.flag} text-sm`} />
        </button>
      ))}
    </div>
  );
}
