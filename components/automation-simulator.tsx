"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react"
import {
  Sparkles,
  Webhook,
  BrainCircuit,
  Zap,
  ArrowRight,
  Clock,
  Repeat,
  Gauge,
  Loader2,
  CornerDownLeft,
} from "lucide-react"

type Node = {
  id: string
  kind: "trigger" | "ai" | "action"
  title: string
  detail: string
  tool: string
}

type Workflow = {
  title: string
  summary: string
  nodes: Node[]
  hoursSavedPerWeek: number
  monthlyTaskRuns: number
  complexity: "Simple" | "Moderate" | "Advanced"
}

const EXAMPLES = [
  "Personalize sales outreach emails for new leads in Google Sheets",
  "Sync my CRM with custom Telegram alerts and Google Sheets",
  "When a customer pays on Stripe, send an invoice and onboard them in Notion",
  "Triage incoming support emails and draft replies with AI",
  "Auto-post new blog content to all my social channels",
]

const KIND_META: Record<
  Node["kind"],
  { label: string; icon: typeof Webhook; ring: string; text: string; glow: string }
> = {
  trigger: {
    label: "Trigger",
    icon: Webhook,
    ring: "border-cyan-400/40",
    text: "text-cyan-400",
    glow: "shadow-[0_0_40px_-8px_rgba(34,211,238,0.5)]",
  },
  ai: {
    label: "AI Reasoning",
    icon: BrainCircuit,
    ring: "border-fuchsia-400/40",
    text: "text-fuchsia-400",
    glow: "shadow-[0_0_40px_-8px_rgba(217,70,239,0.55)]",
  },
  action: {
    label: "Action",
    icon: Zap,
    ring: "border-purple-400/40",
    text: "text-purple-300",
    glow: "shadow-[0_0_40px_-8px_rgba(168,85,247,0.5)]",
  },
}

function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString(),
  )
  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.1, ease: [0.22, 1, 0.36, 1] })
    return controls.stop
  }, [value, mv])
  return <motion.span>{rounded}</motion.span>
}

export function AutomationSimulator() {
  const [problem, setProblem] = useState("")
  const [workflow, setWorkflow] = useState<Workflow | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeNode, setActiveNode] = useState(-1)
  const playRef = useRef<ReturnType<typeof setInterval> | null>(null)

  async function generate(input: string) {
    const text = input.trim()
    if (text.length < 3 || loading) return
    setLoading(true)
    setError(null)
    setWorkflow(null)
    setActiveNode(-1)
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem: text }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setWorkflow(data as Workflow)
      }
    } catch {
      setError("Something went wrong generating your workflow. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Sequentially light up nodes once a workflow arrives.
  useEffect(() => {
    if (!workflow) return
    setActiveNode(0)
    let i = 0
    playRef.current && clearInterval(playRef.current)
    playRef.current = setInterval(() => {
      i += 1
      if (i >= workflow.nodes.length) {
        i = 0
      }
      setActiveNode(i)
    }, 1400)
    return () => {
      playRef.current && clearInterval(playRef.current)
    }
  }, [workflow])

  const roiPerMonth = workflow ? Math.round(workflow.hoursSavedPerWeek * 4.33 * 35) : 0

  return (
    <section id="simulator" className="relative px-6 py-24 md:py-32 overflow-hidden">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-fuchsia-600/15 blur-3xl" />
        <div className="absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-foreground">
            <Sparkles className="h-4 w-4 text-fuchsia-400" />
            Live AI Workflow Simulator
          </span>
          <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Describe your problem.{" "}
            <span className="shimmer">Watch the automation build itself.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Type any operational headache in plain language. Our AI architect designs a real,
            production-grade workflow — live, in seconds.
          </p>
        </div>

        {/* Input */}
        <div className="mx-auto max-w-2xl">
          <div className="glass-strong gradient-border relative rounded-2xl p-2">
            <div className="flex items-end gap-2">
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    generate(problem)
                  }
                }}
                rows={2}
                placeholder="e.g. Sync my CRM with custom Telegram alerts and Google Sheets…"
                className="min-h-[56px] flex-1 resize-none bg-transparent px-3 py-2 text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
              />
              <button
                onClick={() => generate(problem)}
                disabled={loading || problem.trim().length < 3}
                className="tactile mb-1 inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-4 font-semibold text-white disabled:opacity-40"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Generate
                    <CornerDownLeft className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Example chips */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => {
                  setProblem(ex)
                  generate(ex)
                }}
                disabled={loading}
                className="tactile rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-fuchsia-400/40 hover:text-foreground disabled:opacity-40"
              >
                {ex}
              </button>
            ))}
          </div>

          {error && (
            <p className="mt-4 text-center text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* Loading skeleton */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12 flex flex-col items-center gap-3 text-muted-foreground"
            >
              <Loader2 className="h-6 w-6 animate-spin text-fuchsia-400" />
              <p className="font-mono text-sm">Designing your workflow…</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence mode="wait">
          {workflow && !loading && (
            <motion.div
              key={workflow.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14"
            >
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold text-foreground">{workflow.title}</h3>
                <p className="mx-auto mt-2 max-w-2xl text-pretty text-muted-foreground">
                  {workflow.summary}
                </p>
              </div>

              {/* Node graph */}
              <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch lg:gap-0">
                {workflow.nodes.map((node, idx) => {
                  const meta = KIND_META[node.kind]
                  const Icon = meta.icon
                  const isActive = idx === activeNode
                  return (
                    <div key={node.id} className="flex flex-1 items-center gap-3 lg:flex-col">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.12, duration: 0.4 }}
                        className={`relative w-full rounded-2xl border bg-card/70 p-5 backdrop-blur-xl transition-all duration-300 ${meta.ring} ${
                          isActive ? `${meta.glow} -translate-y-1` : "shadow-none"
                        }`}
                      >
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border ${meta.ring} bg-background/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${meta.text}`}
                        >
                          <Icon className="h-3 w-3" />
                          {meta.label}
                        </span>
                        <h4 className="mt-3 font-semibold text-foreground">{node.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {node.detail}
                        </p>
                        <span className="mt-3 inline-block rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-foreground/80">
                          {node.tool}
                        </span>
                        {/* live pulse */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute right-3 top-3 flex h-2.5 w-2.5"
                            >
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* connector */}
                      {idx < workflow.nodes.length - 1 && (
                        <div className="flex shrink-0 items-center justify-center px-1 lg:w-full lg:py-1">
                          <ArrowRight
                            className={`h-5 w-5 rotate-90 transition-colors duration-300 lg:rotate-0 ${
                              idx < activeNode ? "text-fuchsia-400" : "text-border"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* ROI / stats */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="glass rounded-2xl p-6 text-center">
                  <Clock className="mx-auto mb-2 h-6 w-6 text-cyan-400" />
                  <div className="text-3xl font-bold text-foreground">
                    <Counter value={workflow.hoursSavedPerWeek} />
                    <span className="text-lg text-muted-foreground"> hrs/wk</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Human hours saved</p>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <Gauge className="mx-auto mb-2 h-6 w-6 text-fuchsia-400" />
                  <div className="text-3xl font-bold text-foreground">
                    $<Counter value={roiPerMonth} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Est. monthly value</p>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <Repeat className="mx-auto mb-2 h-6 w-6 text-purple-300" />
                  <div className="text-3xl font-bold text-foreground">
                    <Counter value={workflow.monthlyTaskRuns} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Tasks run / month</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
