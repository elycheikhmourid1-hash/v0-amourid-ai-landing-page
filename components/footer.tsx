export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary px-6 py-12" aria-label="Site footer">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-xs font-bold text-primary-foreground">A</span>
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground font-mono uppercase">
                AICore Digital LLC
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Richmond, Virginia, United States</p>
            <p className="text-xs text-muted-foreground">Founder-led · Ely Cheikh Mourid</p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a href="#services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Services
            </a>
            <a href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>

          <div className="flex flex-col items-center gap-1 md:items-end">
            <a className="text-sm text-muted-foreground hover:text-foreground" href="mailto:elycheikh@aicoredigital.com">
              elycheikh@aicoredigital.com
            </a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="tel:+18044853384">
              +1 (804) 485-3384
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground/70">
          © 2026 AICore Digital LLC. All rights reserved. We do not sell personal information.
        </p>
      </div>
    </footer>
  )
}
