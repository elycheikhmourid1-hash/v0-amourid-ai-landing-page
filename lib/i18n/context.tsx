"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { type Locale, defaultLocale, isRtl } from "./config"
import { type TranslationKey, getTranslation } from "./translations"

type LanguageContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
  isRtl: boolean
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const STORAGE_KEY = "aicore-locale"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [mounted, setMounted] = useState(false)

  // Load saved locale from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (saved && ["en", "ar", "fr"].includes(saved)) {
      setLocaleState(saved)
    }
    setMounted(true)
  }, [])

  // Update document direction and lang when locale changes
  useEffect(() => {
    if (!mounted) return
    const rtl = isRtl(locale)
    document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr")
    document.documentElement.setAttribute("lang", locale)
  }, [locale, mounted])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(STORAGE_KEY, newLocale)
  }, [])

  const t = useCallback(
    (key: TranslationKey) => getTranslation(locale, key),
    [locale]
  )

  const rtl = isRtl(locale)

  // Prevent hydration mismatch by rendering with default locale until mounted
  const value: LanguageContextType = {
    locale: mounted ? locale : defaultLocale,
    setLocale,
    t,
    isRtl: mounted ? rtl : false,
    dir: mounted && rtl ? "rtl" : "ltr",
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function useTranslation() {
  const { t, locale, isRtl, dir } = useLanguage()
  return { t, locale, isRtl, dir }
}
