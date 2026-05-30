"use client"

import { useState, useRef, useEffect } from "react"
import { Globe, ChevronDown, Check } from "lucide-react"
import { useLanguage, type Locale, locales, localeNames } from "@/lib/i18n"
import { motion, AnimatePresence } from "motion/react"

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 ${
          compact ? "h-9 px-2.5" : "h-10 px-3"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        <span className={`font-medium ${compact ? "text-xs" : "text-sm"}`}>
          {localeNames[locale]}
        </span>
        <ChevronDown 
          className={`transition-transform ${compact ? "h-3 w-3" : "h-3.5 w-3.5"} ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute end-0 top-full mt-2 z-50 min-w-[120px] overflow-hidden rounded-xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/30"
            role="listbox"
          >
            {locales.map((loc) => (
              <button
                key={loc}
                role="option"
                aria-selected={locale === loc}
                onClick={() => handleSelect(loc)}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                  locale === loc
                    ? "bg-purple-500/20 text-purple-300"
                    : "text-foreground hover:bg-white/5"
                }`}
              >
                <span className={loc === "ar" ? "font-arabic" : ""}>
                  {localeNames[loc]}
                </span>
                {locale === loc && <Check className="h-4 w-4 text-purple-400" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
