import { Card, CardContent } from "@/components/ui/card"

const principles = [
  {
    title: "Human decision",
    body: "The system classifies, summarizes, and tracks deadlines. A named official or operator records the decision. Nothing legal or administrative is issued by a model.",
  },
  {
    title: "Named processor",
    body: "AICore Digital LLC acts only on a written instruction. The client remains controller. Data does not leave the location named in that instruction.",
  },
  {
    title: "No model training",
    body: "Client files are not used to train public or private foundation models. At the end of an engagement we return or certify deletion.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-24 bg-secondary/50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Operating rules
          </p>
          <h2 className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-mono">
            How a Virginia company works on sensitive files
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We do not publish unverifiable client quotes. These are the rules that govern every engagement.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {principles.map((p) => (
            <Card key={p.title} className="border-border bg-card">
              <CardContent className="flex flex-col gap-4 p-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-accent">{p.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
