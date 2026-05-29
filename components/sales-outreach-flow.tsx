"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { SiGooglesheets, SiClaude, SiGmail } from "react-icons/si"
import { Globe, CheckCircle2, Zap, type LucideIcon } from "lucide-react"
import type { IconType } from "react-icons"

type ModuleNode = {
  id: string
  name: string
  subtitle: string
  /** brand icon from react-icons */
  brandIcon?: IconType
  /** fallback lucide icon */
  lucideIcon?: LucideIcon
  /** hex accent for the brand */
  accent: string
  /** soft background tint */
  tint: string
}

const MODULES: ModuleNode[] = [
  {
    id: "sheets-trigger",
    name: "Google Sheets",
    subtitle: "Triggers on new lead",
    brandIcon: SiGooglesheets,
    accent: "#0F9D58",
    tint: "rgba(15,157,88,0.12)",
  },
  {
    id: "http",
    name: "HTTP Request",
    subtitle: "Enriches lead data",
    lucideIcon: Globe,
    accent: "#3B82F6",
    tint: "rgba(59,130,246,0.12)",
  },
  {
    id: "claude",
    name: "Anthropic Claude",
    subtitle: "Writes personalized email",
    brandIcon: SiClaude,
    accent: "#D97757",
    tint: "rgba(217,119,87,0.14)",
  },
  {
    id: "gmail",
    name: "Gmail",
    subtitle: "Sends the email",
    brandIcon: SiGmail,
    accent: "#EA4335",
    tint: "rgba(234,67,53,0.12)",
  },
  {
    id: "sheets-update",
    name: "Google Sheets",
    subtitle: "Updates the status",
    brandIcon: SiGooglesheets,
    accent: "#0F9D58",
    tint: "rgba(15,157,88,0.12)",
  },
]

const STEP_MS = 900
const TARGET_TIME = 1.2

export function SalesOutreachFlow() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [execTime, setExecTime] = useState(TARGET_TIME)
  const [runs, setRuns] = useState(128)
  const stepRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Sequentially activate modules in a loop
  useEffect(() => {
    if (reduceMotion) {
      setActive(MODULES.length - 1)
      return
    }
    stepRef.current = setInterval(() => {
      setActive((prev) => {
        const next = prev + 1
        if (next >= MODULES.length) {
          // full execution finished: bump the run counter
          setRuns((r) => r + 1)
          return 0
        }
        return next
      })
    }, STEP_MS)
    return () => {
      if (stepRef.current) clearInterval(stepRef.current)
    }
  }, [reduceMotion])

  // Count the execution timer up to 1.2s each cycle
  useEffect(() => {
    if (reduceMotion) return
    if (active !== 0) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000
      const v = Math.min(elapsed, TARGET_TIME)
      setExecTime(v)
      if (v < TARGET_TIME) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, reduceMotion])

  return (
    <div className="relative">
      {/* Production canvas */}
      <div className="relative overflow-x-auto rounded-2xl border border-white/10 bg-[#0b0f1a]/60 p-6 sm:p-8">
        {/* faint dotted automation grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative flex min-w-max items-stretch gap-0">
          {MODULES.map((mod, i) => {
            const isActive = i === active
            const isDone = i < active
            const BrandIcon = mod.brandIcon
            const LucideI = mod.lucideIcon
            return (
              <div key={mod.id} className="flex items-center">
                {/* Module node */}
                <motion.div
                  initial={false}
                  animate={{
                    y: isActive ? -4 : 0,
                    borderColor: isActive ? mod.accent : "rgba(255,255,255,0.10)",
                    boxShadow: isActive
                      ? `0 12px 40px -8px ${mod.accent}66`
                      : "0 0 0 0 transparent",
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="gpu relative flex w-44 flex-col items-center gap-3 rounded-2xl border bg-card/70 px-4 py-5 text-center backdrop-blur-sm"
                >
                  {/* step index */}
                  <span className="absolute left-3 top-3 text-[10px] font-bold tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* done check */}
                  <AnimatePresence>
                    {isDone && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-3 top-3 text-emerald-400"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* icon tile with pulsing glow */}
                  <div className="relative">
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-2xl"
                      animate={{
                        opacity: isActive ? [0.5, 0.15, 0.5] : 0,
                        scale: isActive ? [1, 1.25, 1] : 1,
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                      }}
                      style={{ background: mod.accent, filter: "blur(14px)" }}
                    />
                    <div
                      className="relative flex h-14 w-14 items-center justify-center rounded-2xl border"
                      style={{
                        background: mod.tint,
                        borderColor: `${mod.accent}55`,
                        color: mod.accent,
                      }}
                    >
                      {BrandIcon ? (
                        <BrandIcon className="h-7 w-7" />
                      ) : LucideI ? (
                        <LucideI className="h-7 w-7" />
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-bold leading-tight text-foreground">{mod.name}</p>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">{mod.subtitle}</p>
                  </div>

                  {/* live processing label */}
                  <div className="h-4">
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider"
                          style={{ color: mod.accent }}
                        >
                          <span className="relative flex h-1.5 w-1.5">
                            <span
                              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                              style={{ background: mod.accent }}
                            />
                            <span
                              className="relative inline-flex h-1.5 w-1.5 rounded-full"
                              style={{ background: mod.accent }}
                            />
                          </span>
                          Running
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Connector with traveling pulse */}
                {i < MODULES.length - 1 && (
                  <div className="relative mx-1 h-0.5 w-10 shrink-0 sm:w-14">
                    <div className="absolute inset-0 rounded-full bg-white/10" />
                    {/* filled progress */}
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      initial={false}
                      animate={{ width: i < active ? "100%" : "0%" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{
                        background: `linear-gradient(90deg, ${mod.accent}, ${MODULES[i + 1].accent})`,
                      }}
                    />
                    {/* traveling pulse dot when this edge just fired */}
                    <AnimatePresence>
                      {i === active - 1 && !reduceMotion && (
                        <motion.span
                          initial={{ left: "0%", opacity: 0 }}
                          animate={{ left: "100%", opacity: [0, 1, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                          style={{
                            background: MODULES[i + 1].accent,
                            boxShadow: `0 0 12px 2px ${MODULES[i + 1].accent}`,
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Live telemetry footer */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-card/60 px-4 py-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/15 text-amber-400">
            <Zap className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Execution Time</p>
            <p className="font-mono text-lg font-bold tabular-nums text-foreground">
              {execTime.toFixed(1)}s
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Status</p>
            <p className="text-sm font-bold text-emerald-400">Active &amp; Automated</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-card/60 px-4 py-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-400/15 text-fuchsia-400">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Successful Runs</p>
            <p className="font-mono text-lg font-bold tabular-nums text-foreground">
              {runs.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
