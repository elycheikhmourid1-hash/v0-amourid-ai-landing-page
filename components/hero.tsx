import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Now serving businesses across Virginia
          </span>
        </div>

        <h1 className="text-pretty text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl font-mono">
          AI Automation for Smarter Business
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          We help businesses automate workflows, unlock data insights, and
          deliver intelligent responses — so you can focus on what matters most.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="rounded-full px-8 text-base">
            <a href="#contact">
              Request Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 text-base"
          >
            <a href="#services">Explore Our Services</a>
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Based in Richmond, Virginia</span>
        </div>
      </div>
    </section>
  )
}
