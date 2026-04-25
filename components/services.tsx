import { Card, CardContent } from "@/components/ui/card"
import { FileText, BarChart3, MessageSquare } from "lucide-react"

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
    <section id="services" className="px-6 py-24" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            What we do
          </p>
          <h2 id="services-heading" className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-mono text-balance">
            Automation that works as hard as you do
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Our suite of AI automation services covers every stage of your
            business operations — from data collection to customer engagement.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group border-border bg-card transition-all hover:border-foreground/20 hover:shadow-lg"
            >
              <CardContent className="p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary" aria-hidden="true">
                  <service.icon className="h-6 w-6 text-foreground" />
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
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
