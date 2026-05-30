export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary px-6 py-12" aria-label="Site footer">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-xs font-bold text-primary-foreground">A</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-foreground font-mono uppercase">
              AICORE DIGITAL
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Founded by <span className="font-medium text-foreground">Ely Cheikh Mourid</span>
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="#services"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Services
          </a>
          <a
            href="#how-we-work"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How We Work
          </a>
          <a
            href="#testimonials"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Testimonials
          </a>
          <a
            href="#contact"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </a>
        </nav>

        <div className="flex flex-col items-center gap-1 md:items-end">
          <p className="text-sm text-muted-foreground">
            {"© 2026 AICORE DIGITAL. All rights reserved."}
          </p>
          <p className="text-xs text-muted-foreground/70">
            Ely Cheikh Mourid, Founder & CEO
          </p>
        </div>
      </div>
    </footer>
  )
}
