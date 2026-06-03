import { FileText, BarChart3, MessageSquare } from "lucide-react"
import { TiltCard } from "@/components/tilt-card"
import { Reveal } from "@/components/reveal"

const services = [
  {
    icon: FileText,
    title: "Google Forms Automation",
    description:
      "Automate data collection, processing, and routing with intelligent Google Forms workflows. From auto-responses to spreadsheet integration, we eliminate the manual work.",
    features: ["Auto-routing responses", "Smart notifications", "Spreadsheet sync"],
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights with custom dashboards and automated reporting. Make confident, data-driven decisions every day.",
    features: ["Custom dashboards", "Automated reports", "Trend analysis"],
  },
  {
    icon: MessageSquare,
    title: "Smart Automated Responses",
    description:
      "Deploy intelligent response systems that handle customer inquiries, route tickets, and provide instant support — 24/7 without fatigue.",
    features: ["24/7 availability", "Intelligent routing", "Custom AI training"],
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
            Automation that works as hard as you do
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Our suite of AI automation services covers every stage of your
            business operations — from data collection to customer engagement.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3" style={{ perspective: 1200 }}>
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.12}>
              <TiltCard className="h-full rounded-2xl glass p-8 transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent-secondary/20 ring-1 ring-primary/30">
                  <service.icon className="h-6 w-6 text-primary-foreground" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-foreground font-mono">
                  {service.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <ul className="flex flex-col gap-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
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
