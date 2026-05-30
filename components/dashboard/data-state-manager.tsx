"use client"

import {
  Database,
  Layers,
  Server,
  Zap,
  GitBranch,
  RotateCcw,
  FileSearch,
  CheckCircle2,
  Gauge,
} from "lucide-react"
import {
  CONTEXT_MECHANISMS,
  TOKEN_WINDOW,
  SSOT_NODES,
  type SessionRow,
  type SessionState,
} from "./data"

const stateMeta: Record<SessionState, string> = {
  Awaiting_Webhook: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Processing_Payload: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  Vector_Search: "border-violet-500/30 bg-violet-500/10 text-violet-300",
  Fulfillment_Dispatched: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
}

function fmtTtl(s: number) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, "0")}`
}

/* ----------------------------- Panel 1 ----------------------------- */
function TokenContextPanel() {
  const { used, total } = TOKEN_WINDOW
  const pct = Math.round((used / total) * 100)
  return (
    <section className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/40">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-cyan-400" />
          <h2 className="text-sm font-semibold text-slate-200">Token &amp; Context Optimization</h2>
        </div>
        <span className="font-mono text-[11px] text-slate-500">/ active memory buffer</span>
      </header>

      <div className="space-y-4 p-4">
        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Token Window Allocation
            </span>
            <span className="font-mono text-xs text-slate-300">
              {used.toLocaleString()} / {total.toLocaleString()} Tokens
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full border border-slate-700 bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1 font-mono text-[11px] text-slate-500">
            {pct}% utilized · {(total - used).toLocaleString()} tokens headroom
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Active Context Pruning
          </span>
          {CONTEXT_MECHANISMS.map((m) => (
            <div
              key={m.label}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2"
            >
              <span className="font-mono text-xs text-slate-300">{m.label}</span>
              <span
                className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[11px] font-medium ${
                  m.tone === "hit"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                }`}
              >
                {m.tone === "hit" ? <Zap className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                {m.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Panel 2 ----------------------------- */
function SessionMatrix({
  sessions,
  onRollback,
  onInspect,
}: {
  sessions: SessionRow[]
  onRollback: (id: string) => void
  onInspect: (id: string) => void
}) {
  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/40">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-violet-300" />
          <h2 className="text-sm font-semibold text-slate-200">State Machine &amp; Session Recovery</h2>
        </div>
        <span className="font-mono text-[11px] text-slate-500">{sessions.length} live sessions</span>
      </header>

      <div className="grid grid-cols-[1.4fr_1fr_1fr_0.7fr_auto] gap-2 border-b border-slate-800/60 px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-slate-500">
        <span>Session / Customer</span>
        <span>Current State</span>
        <span>Checkpoint Hash</span>
        <span>TTL</span>
        <span className="text-right">Recovery</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="group grid grid-cols-[1.4fr_1fr_1fr_0.7fr_auto] items-center gap-2 border-b border-slate-800/40 px-4 py-2.5 transition-colors hover:bg-slate-800/30"
          >
            <div className="min-w-0">
              <div className="font-mono text-sm text-slate-200">{s.id}</div>
              <div className="truncate font-mono text-[11px] text-slate-500">{s.customer}</div>
            </div>

            <div>
              <span
                className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[11px] font-medium ${stateMeta[s.state]}`}
              >
                <GitBranch className="h-3 w-3" />
                {s.state}
              </span>
            </div>

            <div className="font-mono text-xs text-slate-400" title="JSON state hash in Redis">
              <span className="rounded bg-slate-800/70 px-1.5 py-0.5 text-slate-300">{s.checkpointHash}…</span>
            </div>

            <div
              className={`font-mono text-xs tabular-nums ${
                s.ttl < 60 ? "text-amber-400" : "text-slate-300"
              }`}
            >
              {fmtTtl(s.ttl)}
            </div>

            <div className="flex items-center justify-end gap-1.5">
              <button
                type="button"
                onClick={() => onRollback(s.id)}
                title="Force Session Rollback"
                className="flex items-center gap-1 rounded border border-slate-700 bg-slate-800/60 px-1.5 py-0.5 text-[11px] font-medium text-slate-300 transition-colors hover:border-amber-500/40 hover:text-amber-400"
              >
                <RotateCcw className="h-3 w-3" />
                Rollback
              </button>
              <button
                type="button"
                onClick={() => onInspect(s.id)}
                title="Inspect State Payload"
                className="flex items-center gap-1 rounded border border-slate-700 bg-slate-800/60 px-1.5 py-0.5 text-[11px] font-medium text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
              >
                <FileSearch className="h-3 w-3" />
                Inspect
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------- Panel 3 ----------------------------- */
const ssotIcons = [Database, Server, Zap]

function SsotPanel() {
  return (
    <section className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/40">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-slate-200">Single Source of Truth — Sync Status</h2>
        </div>
        <span className="font-mono text-[11px] text-emerald-400">all nodes consistent</span>
      </header>

      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
        {SSOT_NODES.map((n, i) => {
          const Icon = ssotIcons[i] ?? Database
          const live = n.status === "Live"
          return (
            <div
              key={n.label}
              className="flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-900/60 p-3"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-700 bg-slate-800">
                  <Icon className="h-3.5 w-3.5 text-slate-300" />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[11px] font-medium text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {n.status}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">{n.label}</p>
                <p className="font-mono text-[11px] text-slate-500">{n.engine}</p>
              </div>
              <p className={`font-mono text-xs ${live ? "text-emerald-400" : "text-slate-300"}`}>{n.metric}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ----------------------------- Composition ------------------------- */
export function DataStateManager({
  sessions,
  onRollback,
  onInspect,
}: {
  sessions: SessionRow[]
  onRollback: (id: string) => void
  onInspect: (id: string) => void
}) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col gap-3">
        <TokenContextPanel />
        <SsotPanel />
      </div>
      <div className="h-[560px] lg:h-auto">
        <SessionMatrix sessions={sessions} onRollback={onRollback} onInspect={onInspect} />
      </div>
    </div>
  )
}
