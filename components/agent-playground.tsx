"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Terminal, Play, RotateCcw, CircleCheck, Cpu, Cog, Database, Send } from "lucide-react"

type LogKind = "thought" | "exec" | "data" | "output"

type LogLine = {
  kind: LogKind
  text: string
  delay: number // ms before this line appears after the previous
}

const SCRIPT: LogLine[] = [
  { kind: "thought", text: "Analyzing incoming request: 'New high-value lead from website form'…", delay: 500 },
  { kind: "thought", text: "Intent detected → enrich lead, score it, route to sales.", delay: 900 },
  { kind: "exec", text: "Calling tool: enrichContact(email) via Clearbit…", delay: 800 },
  { kind: "data", text: "Resolved: Acme Corp · 240 employees · SaaS · ARR ~$8M", delay: 1000 },
  { kind: "thought", text: "Lead score computed: 92/100 (enterprise fit, high intent).", delay: 850 },
  { kind: "exec", text: "Querying database: SELECT owner FROM territories WHERE region='EMEA'…", delay: 900 },
  { kind: "data", text: "Assigned account executive: Sara K.", delay: 700 },
  { kind: "exec", text: "Writing record → HubSpot CRM (deal stage: Qualified)…", delay: 900 },
  { kind: "exec", text: "Dispatching Telegram alert to #sales-priority…", delay: 800 },
  { kind: "output", text: "Workflow complete — lead enriched, scored, routed & team notified in 4.2s.", delay: 900 },
]

const KIND_META: Record<LogKind, { label: string; icon: typeof Cpu; color: string }> = {
  thought: { label: "THINKING", icon: Cpu, color: "text-fuchsia-400" },
  exec: { label: "EXECUTING", icon: Cog, color: "text-cyan-400" },
  data: { label: "DATA", icon: Database, color: "text-purple-300" },
  output: { label: "OUTPUT", icon: Send, color: "text-emerald-400" },
}

export function AgentPlayground() {
  const [lines, setLines] = useState<LogLine[]>([])
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle")
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const feedRef = useRef<HTMLDivElement>(null)

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  const run = useCallback(() => {
    clearTimers()
    setLines([])
    setStatus("running")
    let acc = 0
    SCRIPT.forEach((line, i) => {
      acc += line.delay
      const t = setTimeout(() => {
        setLines((prev) => [...prev, line])
        if (i === SCRIPT.length - 1) setStatus("done")
      }, acc)
      timers.current.push(t)
    })
  }, [clearTimers])

  const reset = useCallback(() => {
    clearTimers()
    setLines([])
    setStatus("idle")
  }, [clearTimers])

  useEffect(() => () => clearTimers(), [clearTimers])

  // keep the feed scrolled to the latest line
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [lines])

  return (
    <section id="playground" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-foreground">
            <Terminal className="h-4 w-4 text-cyan-400" />
            Live Agent Playground
          </span>
          <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            See an <span className="shimmer">autonomous AI agent</span> think and act.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Trigger a live demo and watch the agent reason, call tools, query data, and complete a
            real automation — exactly how our production agents operate.
          </p>
        </div>

        {/* Terminal */}
        <div className="overflow-hidden rounded-2xl border border-border bg-[oklch(0.06_0.02_280)] shadow-2xl">
          {/* title bar */}
          <div className="flex items-center justify-between border-b border-border bg-card/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">
                aicore-agent — autonomous-runtime
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center gap-1.5 font-mono text-xs ${
                  status === "running"
                    ? "text-cyan-400"
                    : status === "done"
                      ? "text-emerald-400"
                      : "text-muted-foreground"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    status === "running"
                      ? "animate-pulse bg-cyan-400"
                      : status === "done"
                        ? "bg-emerald-400"
                        : "bg-muted-foreground"
                  }`}
                />
                {status === "running" ? "running" : status === "done" ? "completed" : "idle"}
              </span>
            </div>
          </div>

          {/* feed */}
          <div
            ref={feedRef}
            className="h-[360px] overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed md:px-6"
          >
            {lines.length === 0 && status === "idle" && (
              <p className="text-muted-foreground/60">
                <span className="text-emerald-400">$</span> agent.trigger() — press “Trigger Demo
                Agent” to begin.
              </p>
            )}
            <AnimatePresence initial={false}>
              {lines.map((line, i) => {
                const meta = KIND_META[line.kind]
                const Icon = meta.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mb-2 flex items-start gap-2.5"
                  >
                    <span className={`mt-0.5 flex shrink-0 items-center gap-1 ${meta.color}`}>
                      <Icon className="h-3.5 w-3.5" />
                      <span className="w-[72px] text-[10px] font-bold tracking-wider">
                        {meta.label}
                      </span>
                    </span>
                    <span className="text-foreground/90">{line.text}</span>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            {status === "running" && (
              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-cyan-400 align-middle" />
            )}
          </div>

          {/* controls */}
          <div className="flex items-center justify-between gap-3 border-t border-border bg-card/60 px-4 py-3">
            <p className="hidden font-mono text-xs text-muted-foreground sm:block">
              {status === "done"
                ? "Agent finished. Reset to run again."
                : "Powered by AICore autonomous runtime"}
            </p>
            <div className="flex items-center gap-2">
              {status === "done" && (
                <button
                  onClick={reset}
                  className="tactile inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              )}
              <button
                onClick={run}
                disabled={status === "running"}
                className="tactile inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {status === "done" ? (
                  <>
                    <CircleCheck className="h-4 w-4" />
                    Run Again
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Trigger Demo Agent
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
