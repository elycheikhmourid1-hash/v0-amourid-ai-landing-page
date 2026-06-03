"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Activity } from "lucide-react"
import { LeadFormDialog } from "@/components/lead-form-dialog"
import { LogoMark } from "@/components/logo"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from "@/lib/i18n"

const navLinkKeys = [
  { key: "nav.founder" as const, href: "/founder", isRoute: true },
  { key: "nav.simulator" as const, href: "#simulator" },
  { key: "nav.playground" as const, href: "#playground" },
  { key: "nav.industries" as const, href: "#industries" },
  { key: "nav.services" as const, href: "/services", isRoute: true },
  { key: "nav.contact" as const, href: "#contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <a href="#" className="flex items-center gap-2.5">
          <LogoMark box={40} />
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tighter text-foreground font-mono uppercase">
              AICore <span className="gradient-text-purple text-[0.95em]">Digital</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinkKeys.map((link) => 
            link.isRoute ? (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-all hover:text-primary"
              >
                {t(link.key)}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-all hover:text-primary"
              >
                {t(link.key)}
              </a>
            )
          )}
        </nav>

        {/* CTA Button + Language Switcher + Activity Icon */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/dashboard"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 transition-all hover:bg-purple-500/20 hover:border-purple-500/50"
            title={t("nav.dashboard")}
          >
            <Activity className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-purple-500" />
            </span>
          </Link>
          <LeadFormDialog>
            <Button size="default" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 font-semibold transition-transform hover:scale-105">
              {t("cta.freeConsultation")}
            </Button>
          </LeadFormDialog>
        </div>

        {/* Mobile Toggle + Language Switcher + Activity Icon */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher compact />
          <Link
            href="/dashboard"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400"
            title={t("nav.dashboard")}
          >
            <Activity className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500" />
            </span>
          </Link>
          <button
            className="text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t("common.close") : t("common.menu")}
          >
            {mobileOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 border-b border-border bg-background/95 backdrop-blur-lg px-6 py-8 md:hidden shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-6 text-center">
            {navLinkKeys.map((link) => 
              link.isRoute ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-semibold text-muted-foreground transition-colors hover:text-primary"
                >
                  {t(link.key)}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-semibold text-muted-foreground transition-colors hover:text-primary"
                >
                  {t(link.key)}
                </a>
              )
            )}
            <div className="pt-4 border-t border-border">
              <LeadFormDialog>
                <Button size="lg" className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                  {t("cta.freeConsultation")}
                </Button>
              </LeadFormDialog>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
