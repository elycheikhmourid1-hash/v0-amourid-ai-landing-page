import { FileText, Shield, Building2 } from "lucide-react"
import { TiltCard } from "@/components/tilt-card"
import { Reveal } from "@/components/reveal"

const services = [
  {
    icon: Building2,
    title: "Companies",
    description:
      "Intake, routing, drafts, and reporting for operators in the United States. Anything that leaves the building is approved by a person.",
    features: ["Workflow intake", "Supervised drafts", "Named owner on every send"],
  },
  {
    icon: Shield,
    title: "Institutions",
    description:
      "Ninety-day pilots for instruction desks: classify files, summarize exhibits, track deadlines, keep an audit log. The authority decides.",
    features: ["Human-in-the-loop", "Client-named hosting", "No model training on the file"],
  },
  {
    icon: FileText,
    title: "Briefings",
    description:
      "Short written notes a ministry or a company can file. Not a chatbot. Not a mass-mail product.",
    features: ["Written scope first", "Processor role only", "Deletion certificate at close"],
  },
]

export function Services() {
  return (
    <section id="services" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            What we do
          </p>
          <h2 className="text-pretty text-3xl font-bold tracking-tight sm:text-4xl font-mono shimmer">
            Two paths. One rule: a human decides.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            AICore Digital LLC is a Virginia company. We do not sell lead-chasing agents to governments.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3" style={{ perspective: 1200 }}>
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.12}>
              <TiltCard className="h-full rounded-2xl glass p-8 transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent-secondary/20 ring-1 ring-primary/30">
                  <service.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground font-mono">{service.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <ul className="flex flex-col gap-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary shadow-[0_0_8px_2px] shadow-accent-secondary/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
