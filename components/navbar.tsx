"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { LeadFormDialog } from "@/components/lead-form-dialog"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" role="banner">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <a href="#" className="flex items-center gap-2" aria-label="AICore Digital - Go to homepage">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
            <span className="text-xs font-black text-primary-foreground leading-none">AI</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tighter text-foreground font-mono uppercase">
              AICore <span className="text-primary text-[0.95em]">Digital</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-all hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <LeadFormDialog>
            <Button size="default" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 font-semibold transition-transform hover:scale-105">
              Free Consultation
            </Button>
          </LeadFormDialog>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 border-b border-border bg-background/95 backdrop-blur-lg px-6 py-8 md:hidden shadow-2xl animate-in slide-in-from-top-4 duration-200" role="dialog" aria-label="Mobile menu">
          <nav className="flex flex-col gap-6 text-center" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              <LeadFormDialog>
                <Button size="lg" className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                  Free Consultation
                </Button>
              </LeadFormDialog>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
