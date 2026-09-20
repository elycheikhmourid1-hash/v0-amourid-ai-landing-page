"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { LeadFormDialog } from "@/components/lead-form-dialog"
import { LogoMark } from "@/components/logo"
import { LanguageSwitcher } from "@/components/language-switcher"

const links = [
  { label: "Founder", href: "/founder", route: true },
  { label: "Desk", href: "/desk", route: true },
  { label: "Services", href: "/services", route: true },
  { label: "Marketing", href: "/marketing", route: true },
  { label: "Contact", href: "#contact", route: false },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark box={40} />
          <span className="text-lg font-bold tracking-tighter text-foreground font-mono uppercase">
            AICore Digital
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) =>
            link.route ? (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <LeadFormDialog>
            <Button size="default" className="rounded-full px-6 font-semibold">
              Book a call
            </Button>
          </LeadFormDialog>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher compact />
          <button
            className="text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 border-b border-border bg-background/95 backdrop-blur-lg px-6 py-8 md:hidden">
          <nav className="flex flex-col gap-6 text-center">
            {links.map((link) =>
              link.route ? (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-foreground">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-foreground">
                  {link.label}
                </a>
              )
            )}
            <div className="pt-4 border-t border-border">
              <LeadFormDialog>
                <Button size="lg" className="w-full rounded-full">
                  Book a call
                </Button>
              </LeadFormDialog>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
