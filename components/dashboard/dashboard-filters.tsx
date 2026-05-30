"use client"

import { Filter, Pause, Play, Zap } from "lucide-react"
import type { SystemPath, Severity } from "./data"

const PATHS: (SystemPath | "All")[] = ["All", "Autonomous Agent", "API Integration", "System Maintenance"]
const SEVERITIES: (Severity | "All")[] = ["All", "Muted", "Warning", "Critical"]

export function DashboardFilters({
  path,
  setPath,
  severity,
  setSeverity,
  retriesOnly,
  setRetriesOnly,
  live,
  setLive,
}: {
  path: SystemPath | "All"
  setPath: (p: SystemPath | "All") => void
  severity: Severity | "All"
  setSeverity: (s: Severity | "All") => void
  retriesOnly: boolean
  setRetriesOnly: (v: boolean) => void
  live: boolean
  setLive: (v: boolean) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3">
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
        <Filter className="h-3.5 w-3.5" />
        Filters
      </div>

      {/* System path */}
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[11px] text-slate-500">path:</span>
        <div className="flex rounded-md border border-slate-800 bg-slate-950/60 p-0.5">
          {PATHS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPath(p)}
              className={`rounded px-2 py-1 text-[11px] font-medium transition-colors ${
                path === p ? "bg-slate-700 text-slate-100" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {p === "All" ? "All" : p.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Severity */}
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[11px] text-slate-500">severity:</span>
        <div className="flex rounded-md border border-slate-800 bg-slate-950/60 p-0.5">
          {SEVERITIES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSeverity(s)}
              className={`rounded px-2 py-1 text-[11px] font-medium transition-colors ${
                severity === s ? "bg-slate-700 text-slate-100" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Active retries toggle */}
      <button
        type="button"
        onClick={() => setRetriesOnly(!retriesOnly)}
        className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors ${
          retriesOnly
            ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
            : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200"
        }`}
      >
        <Zap className="h-3 w-3" />
        Active Retries Only
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => setLive(!live)}
          className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors ${
            live
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
              : "border-slate-700 bg-slate-800/60 text-slate-300"
          }`}
        >
          {live ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {live ? "Pause Stream" : "Resume Stream"}
        </button>
      </div>
    </div>
  )
}
