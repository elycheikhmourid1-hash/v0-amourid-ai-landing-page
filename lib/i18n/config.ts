export type Locale = "en" | "ar" | "fr"

export const locales: Locale[] = ["en", "ar", "fr"]

export const localeNames: Record<Locale, string> = {
  en: "EN",
  ar: "العربية",
  fr: "FR",
}

export const localeFullNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  fr: "Français",
}

export const rtlLocales: Locale[] = ["ar"]

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale)
}

export const defaultLocale: Locale = "en"
