"use client"

import { ArrowUpRight, Gauge, Route, TrendingDown, Activity } from "lucide-react"
import { COST_SPARKLINE } from "./data"

function RadialGauge({ value }: { value: number }) {
  const r = 30
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  return (
    <div className="relative h-[84px] w-[84px] shrink-0">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgb(30 41 59)" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="rgb(52 211 153)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-base font-semibold text-emerald-400">{value}%</span>
      </div>
    </div>
  )
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const w = 120
  const h = 36
  const pts = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((d - min) / (max - min || 1)) * h
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-[120px]" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="rgb(34 211 238)" strokeWidth="2" />
    </svg>
  )
}

function MetricCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900/60 p-4 ${className}`}
    >
      {children}
    </div>
  )
}

export function MetricsBar() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {/* FTR */}
      <MetricCard>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
              <Gauge className="h-3.5 w-3.5" />
              First Time Resolution
            </div>
            <p className="mt-1 text-xs text-slate-500">Target: &gt;95%</p>
            <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[11px] text-emerald-400">
              <ArrowUpRight className="h-3 w-3" />
              +0.8%
            </div>
          </div>
          <RadialGauge value={96.4} />
        </div>
      </MetricCard>

      {/* MTTR */}
      <MetricCard>
        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
          <Route className="h-3.5 w-3.5" />
          Mean Time to Route
        </div>
        <p className="mt-3 font-mono text-3xl font-semibold text-slate-100">
          4.2<span className="ml-1 text-base font-normal text-slate-500">s</span>
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Target: &lt;10s · <span className="text-emerald-400">within SLA</span>
        </p>
      </MetricCard>

      {/* Token cost efficiency */}
      <MetricCard>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
            <TrendingDown className="h-3.5 w-3.5" />
            Token Cost Efficiency
          </div>
        </div>
        <div className="mt-2 flex items-end justify-between gap-2">
          <div>
            <p className="font-mono text-2xl font-semibold text-slate-100">$142.30</p>
            <p className="mt-0.5 text-xs text-cyan-400">32% optimization</p>
          </div>
          <Sparkline data={COST_SPARKLINE} />
        </div>
      </MetricCard>

      {/* System health */}
      <MetricCard className="flex flex-col justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
          <Activity className="h-3.5 w-3.5" />
          System Health
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-sm font-semibold text-emerald-400">
            Operational
          </span>
        </div>
        <p className="mt-2 font-mono text-xs text-slate-500">uptime 99.98% · 14 nodes live</p>
      </MetricCard>
    </div>
  )
}
