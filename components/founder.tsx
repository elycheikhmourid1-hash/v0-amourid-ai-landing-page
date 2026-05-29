import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LeadFormDialog } from "@/components/lead-form-dialog"
import { MapPin, Sparkles, Linkedin } from "lucide-react"

const highlights = [
  "AI automation strategist",
  "Google Forms & workflow specialist",
  "Data analytics for small business",
]

export function Founder() {
  return (
    <section id="founder" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Avatar */}
          <div className="relative mx-auto w-full max-w-sm">
            {/* Glow ring */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-fuchsia-600/30 via-purple-600/20 to-cyan-500/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl shadow-purple-900/40">
              <Image
                src="/founder-photo.jpg"
                alt="Portrait of the founder of AICore Digital"
                width={640}
                height={640}
                className="h-auto w-full object-cover"
                priority
              />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-background/70 px-4 py-2 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                <span className="text-xs font-medium text-foreground">
                  Founder & Lead Automation Engineer
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
              <Sparkles className="h-4 w-4" />
              Meet the Founder
            </p>
            <h2 className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-mono">
              Building the future of automation, one business at a time
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {
                "I started AICore Digital with a simple belief: every business deserves the kind of automation that big enterprises take for granted. From automated Google Forms to intelligent analytics and instant smart responses, I help teams reclaim their time and make smarter decisions."
              }
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-xs font-bold text-white">
                    +
                  </span>
                  <span className="text-base">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Based in Richmond, Virginia</span>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <LeadFormDialog>
                <Button
                  size="lg"
                  className="h-13 rounded-full px-8 text-base font-bold text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:from-fuchsia-500 hover:via-purple-500 hover:to-cyan-400 shadow-xl shadow-purple-600/30 transition-all hover:scale-105 border-0"
                >
                  Work With Me
                </Button>
              </LeadFormDialog>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-13 rounded-full px-8 text-base font-semibold text-white border-2 border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10"
              >
                <a
                  href="https://www.linkedin.com/in/ely-cheikh-mourid-7150b12b2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
