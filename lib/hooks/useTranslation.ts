import { useAppStore } from "@/lib/store/useAppStore";
import { translations, TranslationKey } from "@/lib/i18n/translations";

export function useTranslation() {
  const language = useAppStore((state) => state.language);
  const t = translations[language] as TranslationKey;

  return {
    t,
    language,
    dir: language === "ar" ? "rtl" : "ltr",
    isArabic: language === "ar",
  };
}
