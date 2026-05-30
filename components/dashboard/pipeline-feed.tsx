"use client"

import { Bot, Plug, Wrench, CheckCircle2, XCircle, RotateCw } from "lucide-react"
import type { PipelineRow, SystemPath } from "./data"

const intentMeta: Record<SystemPath, { label: string; icon: typeof Bot; cls: string }> = {
  "Autonomous Agent": {
    label: "Autonomous Agent",
    icon: Bot,
    cls: "border-violet-500/30 bg-violet-500/10 text-violet-300",
  },
  "API Integration": {
    label: "API Integration",
    icon: Plug,
    cls: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  },
  "System Maintenance": {
    label: "System Maintenance",
    icon: Wrench,
    cls: "border-slate-600/40 bg-slate-700/30 text-slate-300",
  },
}

export function PipelineFeed({
  rows,
  onForceBypass,
}: {
  rows: PipelineRow[]
  onForceBypass: (id: string) => void
}) {
  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/40">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
          </span>
          <h2 className="text-sm font-semibold text-slate-200">Live Pipeline Flow</h2>
          <span className="font-mono text-xs text-slate-500">/ ingestion parser</span>
        </div>
        <span className="font-mono text-xs text-slate-500">{rows.length} active</span>
      </header>

      <div className="grid grid-cols-[1fr_auto] gap-2 border-b border-slate-800/60 px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-slate-500">
        <span>Request / Intent</span>
        <span className="text-right">Validation</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {rows.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">No requests match current filters.</p>
        ) : (
          rows.map((row) => {
            const meta = intentMeta[row.intent]
            const Icon = meta.icon
            const valid = row.validation === "Valid"
            return (
              <div
                key={row.id}
                className="group grid grid-cols-[1fr_auto] items-center gap-3 border-b border-slate-800/40 px-4 py-2.5 transition-colors hover:bg-slate-800/30"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm text-slate-200">{row.id}</span>
                    <span className="font-mono text-[11px] text-slate-500">{row.timestamp}</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] font-medium ${meta.cls}`}
                    >
                      <Icon className="h-3 w-3" />
                      {meta.label}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-slate-500">
                    routed in {row.latencyMs}s · parser confidence{" "}
                    {valid ? "0.9" + Math.floor(Math.random() * 9) : "0.4" + Math.floor(Math.random() * 9)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] font-medium ${
                      valid
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {valid ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    {valid ? "Valid" : "Invalid"} — {row.validationDetail}
                  </span>
                  <button
                    type="button"
                    onClick={() => onForceBypass(row.id)}
                    className="flex items-center gap-1 rounded border border-slate-700 bg-slate-800/60 px-1.5 py-0.5 text-[11px] font-medium text-slate-300 opacity-0 transition-opacity hover:border-cyan-500/40 hover:text-cyan-300 group-hover:opacity-100"
                    title="Force bypass this request"
                  >
                    <RotateCw className="h-3 w-3" />
                    Bypass
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}
