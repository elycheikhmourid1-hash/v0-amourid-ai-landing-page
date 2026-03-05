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
    <section id="how-we-work" className="px-6 py-24 bg-secondary">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Our Process
          </p>
          <h2 className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-mono">
            How We Work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            A simple, transparent process designed to get you results fast.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connector line (hidden on last item and on mobile) */}
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute right-0 top-8 hidden h-px w-8 translate-x-full bg-border lg:block" />
              )}

              <div className="flex flex-col">
                <span className="mb-4 text-4xl font-bold text-foreground/10 font-mono">
                  {step.number}
                </span>
                <h3 className="mb-2 text-lg font-bold text-foreground font-mono">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
