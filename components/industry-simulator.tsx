"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import {
  MessageCircle,
  Workflow,
  ChefHat,
  ReceiptText,
  CalendarPlus,
  CalendarCheck,
  Send,
  ShieldCheck,
  PackagePlus,
  Truck,
  Boxes,
  MapPin,
  Utensils,
  Stethoscope,
  PackageCheck,
  type LucideIcon,
} from "lucide-react"

type Step = {
  icon: LucideIcon
  title: string
  detail: string
}

type Industry = {
  id: string
  label: string
  tabIcon: LucideIcon
  accent: string // tailwind text color for the icon glow
  steps: Step[]
}

const INDUSTRIES: Industry[] = [
  {
    id: "restaurants",
    label: "Restaurants",
    tabIcon: Utensils,
    accent: "text-orange-400",
    steps: [
      { icon: MessageCircle, title: "Order received", detail: "Customer messages via WhatsApp or Telegram" },
      { icon: Workflow, title: "Automation fires", detail: "Data instantly lights up the workflow path" },
      { icon: ChefHat, title: "Kitchen notified", detail: "Order sent straight to the kitchen display" },
      { icon: ReceiptText, title: "Books updated", detail: "Invoice prints & accounting sheet updates" },
    ],
  },
  {
    id: "hospitals",
    label: "Hospitals & Clinics",
    tabIcon: Stethoscope,
    accent: "text-cyan-400",
    steps: [
      { icon: CalendarPlus, title: "Patient books", detail: "Appointment scheduled online in seconds" },
      { icon: CalendarCheck, title: "Calendar syncs", detail: "Doctor's calendar updates dynamically" },
      { icon: Send, title: "Confirmation sent", detail: "Automated WhatsApp confirmation dispatched" },
      { icon: ShieldCheck, title: "Claim prepared", detail: "Insurance claim instantly assembled" },
    ],
  },
  {
    id: "logistics",
    label: "Logistics & Shipping",
    tabIcon: Truck,
    accent: "text-emerald-400",
    steps: [
      { icon: PackagePlus, title: "Order created", detail: "New delivery order enters the system" },
      { icon: MapPin, title: "Driver assigned", detail: "Nearest available driver auto-selected" },
      { icon: Boxes, title: "Stock synced", detail: "Inventory levels update in real-time" },
      { icon: PackageCheck, title: "Tracking sent", detail: "Live tracking link shot to the client" },
    ],
  },
]

const STEP_INTERVAL = 1600

export function IndustrySimulator() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const reduceMotion = useReducedMotion()
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const industry = INDUSTRIES[activeTab]
  const stepCount = industry.steps.length

  // Auto-advance the active step in a loop
  useEffect(() => {
    if (reduceMotion) {
      setActiveStep(stepCount - 1)
      return
    }
    setActiveStep(0)
    timerRef.current = setInterval(() => {
      setActiveStep((s) => (s + 1) % stepCount)
    }, STEP_INTERVAL)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [activeTab, stepCount, reduceMotion])

  return (
    <section id="simulator" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Interactive Simulator
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            See automation work for <span className="text-primary">your</span> business
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Pick your industry and watch a live workflow play out — no technical knowledge required.
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Industry workflows"
          className="mx-auto mb-12 flex max-w-2xl flex-wrap items-center justify-center gap-3"
        >
          {INDUSTRIES.map((ind, i) => {
            const TabIcon = ind.tabIcon
            const selected = i === activeTab
            return (
              <button
                key={ind.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${ind.id}`}
                onClick={() => setActiveTab(i)}
                className={`tactile relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  selected
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground glass"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 shadow-lg shadow-purple-600/30"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <TabIcon className="h-4 w-4" />
                {ind.label}
              </button>
            )
          })}
        </div>

        {/* Workflow stage */}
        <div
          id={`panel-${industry.id}`}
          role="tabpanel"
          className="glass-strong relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-10"
        >
          {/* ambient glow inside stage */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid gap-5 md:grid-cols-4"
            >
              {industry.steps.map((step, i) => {
                const Icon = step.icon
                const isActive = i === activeStep
                const isDone = i < activeStep
                return (
                  <div key={step.title} className="relative">
                    {/* Connector line (desktop) */}
                    {i < stepCount - 1 && (
                      <div className="absolute right-[-0.75rem] top-12 hidden h-0.5 w-6 md:block">
                        <div className="h-full w-full rounded-full bg-border" />
                        <motion.div
                          className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400"
                          initial={false}
                          animate={{ scaleX: isDone || isActive ? 1 : 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>
                    )}

                    <motion.div
                      initial={false}
                      animate={{
                        scale: isActive ? 1.04 : 1,
                        borderColor: isActive
                          ? "rgba(168,85,247,0.6)"
                          : "rgba(255,255,255,0.08)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      className={`gpu relative flex h-full flex-col items-start gap-4 rounded-2xl border bg-card/60 p-5 ${
                        isActive ? "shadow-2xl shadow-purple-600/20" : ""
                      }`}
                    >
                      {/* Step number */}
                      <span className="absolute right-4 top-4 text-xs font-bold tabular-nums text-muted-foreground">
                        0{i + 1}
                      </span>

                      {/* Icon tile */}
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-current opacity-0 blur-md"
                          animate={{ opacity: isActive ? 0.4 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div
                          className={`relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-background/80 transition-colors ${
                            isActive || isDone ? industry.accent : "text-muted-foreground"
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {step.detail}
                        </p>
                      </div>

                      {/* Active pulse dot */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className="absolute bottom-4 right-4 flex h-2.5 w-2.5"
                          >
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400"
              initial={false}
              animate={{ width: `${((activeStep + 1) / stepCount) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
