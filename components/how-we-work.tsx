import { Reveal } from "@/components/reveal"

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We start with a free consultation to understand your business, pain points, and automation goals.",
  },
  {
    number: "02",
    title: "Custom Strategy",
    description:
      "Our team designs a tailored automation blueprint that fits your workflows and budget.",
  },
  {
    number: "03",
    title: "Build & Integrate",
    description:
      "We develop, test, and deploy your automation solutions — integrated seamlessly with your existing tools.",
  },
  {
    number: "04",
    title: "Optimize & Scale",
    description:
      "We continuously monitor performance and refine your automations to scale with your growth.",
  },
]

export function HowWeWork() {
  return (
    <section id="how-we-work" className="relative px-6 py-24 bg-secondary/40">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Our Process
          </p>
          <h2 className="text-pretty text-3xl font-bold tracking-tight sm:text-4xl font-mono shimmer">
            How We Work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            A simple, transparent process designed to get you results fast.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass spotlight glow-ring p-6 transition-transform duration-300 hover:-translate-y-1">
                <span className="block bg-gradient-to-br from-primary to-accent-secondary bg-clip-text text-5xl font-black text-transparent font-mono">
                  {step.number}
                </span>
                <h3 className="mb-2 mt-4 text-lg font-bold text-foreground font-mono">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
