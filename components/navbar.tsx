"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">A</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground font-mono">
            AImouridAI
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="default" className="rounded-full px-6">
            <a href="#contact">Free Consultation</a>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Button asChild size="default" className="rounded-full mt-2">
              <a href="#contact" onClick={() => setMobileOpen(false)}>
                Free Consultation
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
