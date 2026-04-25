import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Operations Manager, BrightPath Logistics",
    quote:
      "AImouridAI completely transformed how we handle incoming orders. What used to take our team hours every morning is now fully automated. We've saved over 20 hours a week.",
    initials: "SM",
  },
  {
    name: "David Chen",
    role: "Founder, GreenLeaf Marketing",
    quote:
      "The data analytics dashboards gave us visibility we never had before. We went from guessing to making real, confident decisions. Their team is incredibly responsive.",
    initials: "DC",
  },
  {
    name: "Maria Gonzalez",
    role: "Customer Success Lead, TrueNorth Financial",
    quote:
      "Our response time to client inquiries dropped from 4 hours to under 5 minutes. The smart automated responses feel natural, and our clients love the instant support.",
    initials: "MG",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-24 bg-secondary/50" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Testimonials
          </p>
          <h2 id="testimonials-heading" className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-mono text-balance">
            Trusted by businesses that demand results
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            See what our clients have to say about working with AImouridAI.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="border-border bg-card transition-all hover:shadow-lg"
            >
              <CardContent className="flex flex-col gap-6 p-8">
                {/* Stars */}
                <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent text-accent"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  <p>{`"${t.quote}"`}</p>
                </blockquote>

                {/* Author */}
                <footer className="mt-auto flex items-center gap-3 border-t border-border pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary" aria-hidden="true">
                    <span className="text-xs font-bold text-primary-foreground">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <cite className="text-sm font-semibold text-foreground not-italic">
                      {t.name}
                    </cite>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
