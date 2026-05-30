"use client"

import { CheckCircle2, XCircle, TrendingDown, Minus, ArrowUpRight, AlertTriangle, Eye, RotateCcw } from "lucide-react"
import {
  type EvaluationRow,
  type DriftMetrics,
  type HitlIntercept,
} from "./data"

type Props = {
  evaluations: EvaluationRow[]
  drift: DriftMetrics
  intercepts: HitlIntercept[]
  onApproveOverride: (id: string) => void
  onSendBack: (id: string) => void
}

export function QaGovernance({ evaluations, drift, intercepts, onApproveOverride, onSendBack }: Props) {
  return (
    <div className="space-y-4">
      {/* ─────────────── LLM-as-a-Judge Monitoring ─────────────── */}
      <section
        aria-labelledby="llm-judge-title"
        className="rounded-lg border border-slate-800 bg-slate-900/60"
      >
        <header className="flex items-center gap-2 border-b border-slate-800 px-4 py-2.5">
          <Eye className="h-4 w-4 text-cyan-400" />
          <h2 id="llm-judge-title" className="text-xs font-semibold uppercase tracking-wide text-slate-300">
            Real-Time LLM-as-a-Judge Monitoring
          </h2>
        </header>

        <div className="max-h-[280px] overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-slate-900/95 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-2 font-medium">Target ID</th>
                <th className="px-4 py-2 font-medium">Linked Req</th>
                <th className="px-4 py-2 font-medium">Evaluator Agent</th>
                <th className="px-4 py-2 font-medium text-center">Accuracy</th>
                <th className="px-4 py-2 font-medium text-center">Latency</th>
                <th className="px-4 py-2 font-medium text-center">Safety</th>
                <th className="px-4 py-2 font-medium text-right">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {evaluations.map((ev) => (
                <tr key={ev.id} className="transition-colors hover:bg-slate-800/30">
                  <td className="whitespace-nowrap px-4 py-2 font-mono text-slate-200">{ev.id}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-mono text-slate-400">{ev.linkedReqId}</td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <span className="rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] text-slate-300">
                      {ev.evaluator}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                        ev.accuracy >= 95
                          ? "bg-emerald-950/60 text-emerald-400"
                          : ev.accuracy >= 90
                            ? "bg-cyan-950/60 text-cyan-400"
                            : "bg-amber-950/60 text-amber-400"
                      }`}
                    >
                      {ev.accuracy}%
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[11px] text-slate-300">
                      {ev.latencyMs}ms
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {ev.safetyPass ? (
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-950/60 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" /> Pass
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded bg-red-950/60 px-1.5 py-0.5 text-[11px] font-semibold text-red-400">
                        <XCircle className="h-3 w-3" /> Fail
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {ev.decision === "APPROVED" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/70 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 ring-1 ring-emerald-800/50">
                        <CheckCircle2 className="h-3 w-3" /> APPROVED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-950/70 px-2 py-0.5 text-[11px] font-semibold text-amber-400 ring-1 ring-amber-800/50">
                        <RotateCcw className="h-3 w-3" /> REJECTED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─────────────── Drift & Performance Metrics ─────────────── */}
      <section
        aria-labelledby="drift-title"
        className="rounded-lg border border-slate-800 bg-slate-900/60"
      >
        <header className="flex items-center gap-2 border-b border-slate-800 px-4 py-2.5">
          <TrendingDown className="h-4 w-4 text-cyan-400" />
          <h2 id="drift-title" className="text-xs font-semibold uppercase tracking-wide text-slate-300">
            Drift &amp; Performance Metrics
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
          {/* Prompt Drift Index */}
          <div className="flex flex-col gap-1 rounded-md border border-slate-700 bg-slate-800/50 p-3">
            <span className="text-[11px] uppercase tracking-wide text-slate-500">Prompt Drift Index</span>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold tabular-nums text-slate-100">{drift.promptDrift}%</span>
              <span className="mb-0.5 flex items-center gap-0.5 text-[11px] font-medium text-emerald-400">
                {drift.driftTrend === "stable" && <Minus className="h-3 w-3" />}
                {drift.driftTrend === "down" && <TrendingDown className="h-3 w-3" />}
                {drift.driftTrend === "up" && <ArrowUpRight className="h-3 w-3 text-amber-400" />}
                {drift.driftTrend === "stable" ? "Stable" : drift.driftTrend === "down" ? "Improving" : "Drifting"}
              </span>
            </div>
            <span className="text-[11px] text-slate-500">within tolerance threshold</span>
          </div>

          {/* Hallucination Rate */}
          <div className="flex flex-col gap-1 rounded-md border border-slate-700 bg-slate-800/50 p-3">
            <span className="text-[11px] uppercase tracking-wide text-slate-500">System Hallucination Rate</span>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold tabular-nums text-slate-100">{drift.hallucinationRate}%</span>
              <span className="mb-0.5 flex items-center gap-0.5 text-[11px] font-medium text-emerald-400">
                {drift.hallucinationTrend === "down" && <TrendingDown className="h-3 w-3" />}
                {drift.hallucinationTrend === "stable" && <Minus className="h-3 w-3" />}
                {drift.hallucinationTrend === "up" && <ArrowUpRight className="h-3 w-3 text-red-400" />}
                {drift.hallucinationTrend === "down" ? "Trending Down" : drift.hallucinationTrend === "stable" ? "Stable" : "Rising"}
              </span>
            </div>
            <span className="text-[11px] text-slate-500">below 0.1% target</span>
          </div>

          {/* Cost-to-Performance Ratio */}
          <div className="flex flex-col gap-1 rounded-md border border-slate-700 bg-slate-800/50 p-3">
            <span className="text-[11px] uppercase tracking-wide text-slate-500">Cost-to-Performance Ratio</span>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold tabular-nums text-slate-100">{drift.costPerformanceRatio}x</span>
              <span className="mb-0.5 text-[11px] font-medium text-cyan-400">ROI / token</span>
            </div>
            <span className="text-[11px] text-slate-500">efficiency factor above baseline</span>
          </div>
        </div>
      </section>

      {/* ─────────────── HITL Intercept Gate ─────────────── */}
      <section
        aria-labelledby="hitl-title"
        className="rounded-lg border border-amber-900/50 bg-slate-900/60"
      >
        <header className="flex items-center gap-2 border-b border-amber-900/40 bg-amber-950/30 px-4 py-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <h2 id="hitl-title" className="text-xs font-semibold uppercase tracking-wide text-amber-400">
            Human-in-the-Loop Intercept Gate
          </h2>
          <span className="ml-auto rounded-full bg-amber-900/50 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
            {intercepts.length} Pending
          </span>
        </header>

        {intercepts.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-sm text-slate-500">
            No outputs awaiting human review
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {intercepts.map((item) => (
              <div key={item.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:gap-4">
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-slate-200">{item.id}</span>
                    <span className="rounded border border-amber-800/60 bg-amber-950/50 px-1.5 py-0.5 text-[11px] font-medium text-amber-400">
                      Borderline
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">Violation:</span> {item.violation}
                  </p>
                  <pre className="mt-1 overflow-x-auto rounded border border-slate-700 bg-slate-950/80 p-2 font-mono text-[11px] leading-relaxed text-slate-300">
                    {item.outputSnippet}
                  </pre>
                </div>
                <div className="flex shrink-0 gap-2 sm:flex-col">
                  <button
                    type="button"
                    onClick={() => onApproveOverride(item.id)}
                    className="flex items-center gap-1.5 rounded-md border border-emerald-800/60 bg-emerald-950/50 px-3 py-1.5 text-[11px] font-semibold text-emerald-400 transition-colors hover:bg-emerald-900/50"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Approve Override
                  </button>
                  <button
                    type="button"
                    onClick={() => onSendBack(item.id)}
                    className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-[11px] font-semibold text-slate-300 transition-colors hover:bg-slate-700"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Send Back
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
