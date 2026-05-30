"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import {
  MessageCircle,
  MonitorCheck,
  Bike,
  TrendingUp,
  CalendarPlus,
  CalendarCheck,
  MapPin,
  BellRing,
  ShoppingCart,
  PackageMinus,
  Factory,
  Truck,
  Utensils,
  Stethoscope,
  Warehouse,
  Bot,
  type LucideIcon,
} from "lucide-react"
import { SalesOutreachFlow } from "@/components/sales-outreach-flow"

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
  result: string // payoff outcome shown to the business owner
  steps: Step[]
}

const INDUSTRIES: Industry[] = [
  {
    id: "restaurants",
    label: "Smart Restaurants",
    tabIcon: Utensils,
    accent: "text-orange-400",
    result: "Zero missed orders. Owner sees every dirham land in real time.",
    steps: [
      { icon: MessageCircle, title: "Customer orders", detail: "Order placed via Telegram or WhatsApp bot" },
      { icon: MonitorCheck, title: "Kitchen fires", detail: "Synced to the kitchen screen & ticket printer" },
      { icon: Bike, title: "Driver notified", detail: "Nearest delivery driver auto-dispatched" },
      { icon: TrendingUp, title: "Revenue updates", detail: "Owner's phone dashboard updates instantly" },
    ],
  },
  {
    id: "hospitals",
    label: "AI Healthcare",
    tabIcon: Stethoscope,
    accent: "text-cyan-400",
    result: "Fewer no-shows. Calendars, reminders & confirmations run themselves.",
    steps: [
      { icon: CalendarPlus, title: "Patient books", detail: "Appointment booked online in seconds" },
      { icon: CalendarCheck, title: "Calendar updates", detail: "Doctor's calendar adjusts dynamically" },
      { icon: MapPin, title: "Confirm + GPS", detail: "WhatsApp confirmation sent with clinic GPS" },
      { icon: BellRing, title: "24h reminder", detail: "Auto reminder to confirm or reschedule" },
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce & Warehouses",
    tabIcon: Warehouse,
    accent: "text-emerald-400",
    result: "Never out of stock. Restocking & shipping happen without lifting a finger.",
    steps: [
      { icon: ShoppingCart, title: "Customer buys", detail: "New order placed on the online store" },
      { icon: PackageMinus, title: "Stock deducted", detail: "Inventory auto-updates in real time" },
      { icon: Factory, title: "Reorder fires", detail: "Low stock (< 3) triggers a supplier PO" },
      { icon: Truck, title: "Label sent", detail: "Shipping label generated & sent to courier" },
    ],
  },
]

const STEP_INTERVAL = 1600

// The featured production template (mirrors a real Make.com scenario)
const SALES_TAB = {
  id: "sales-outreach",
  label: "Sales Outreach Agent",
  tabIcon: Bot,
  result: "Every new lead gets a personalized, human-quality email in ~1.2s — fully hands-off.",
}

export function IndustrySimulator() {
  // Tab 0 = featured Sales Outreach Agent, tabs 1..n = industry playbooks
  const [activeTab, setActiveTab] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const reduceMotion = useReducedMotion()
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const isSales = activeTab === 0
  const industry = isSales ? null : INDUSTRIES[activeTab - 1]
  const stepCount = industry?.steps.length ?? 0

  // Auto-advance the active step in a loop (industry templates only)
  useEffect(() => {
    if (isSales || stepCount === 0) return
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
  }, [activeTab, stepCount, isSales, reduceMotion])

  return (
    <section id="industries" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Industry Playbooks
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            See automation work for <span className="text-primary">your</span> business
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Pick your industry and watch a live workflow play out — no technical knowledge required.
          </p>
        </div>

        {/* Template tabs */}
        <div
          role="tablist"
          aria-label="Automation templates"
          className="mx-auto mb-12 flex max-w-3xl flex-wrap items-center justify-center gap-3"
        >
          {[SALES_TAB, ...INDUSTRIES].map((tab, i) => {
            const TabIcon = tab.tabIcon
            const selected = i === activeTab
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
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
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Workflow stage */}
        <div
          id={`panel-${isSales ? SALES_TAB.id : industry?.id}`}
          role="tabpanel"
          className="glass-strong relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-10"
        >
          {/* ambient glow inside stage */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl" />

          {/* Featured production scenario: AI Core Digital — Sales Outreach Agent */}
          {isSales && (
            <div className="relative">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Bot className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">AI Core Digital — Sales Outreach Agent</p>
                    <p className="text-xs text-muted-foreground">Live production scenario · 5 connected modules</p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                  Make.com workflow
                </span>
              </div>

              <SalesOutreachFlow />

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-5 py-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
                  <TrendingUp className="h-5 w-5" />
                </span>
                <p className="text-pretty text-sm font-medium text-foreground sm:text-base">
                  <span className="font-bold text-emerald-400">The result:</span> {SALES_TAB.result}
                </p>
              </div>
            </div>
          )}

          {!isSales && industry && (
          <>
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

          {/* Payoff / result banner */}
          <AnimatePresence mode="wait">
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-5 py-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
                <TrendingUp className="h-5 w-5" />
              </span>
              <p className="text-pretty text-sm font-medium text-foreground sm:text-base">
                <span className="font-bold text-emerald-400">The result:</span> {industry.result}
              </p>
            </motion.div>
          </AnimatePresence>
          </>
          )}
        </div>
      </div>
    </section>
  )
}
