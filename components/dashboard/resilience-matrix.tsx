"use client"

import { Timer, Snowflake, GitBranch, ShieldAlert, Webhook, ArrowRightLeft } from "lucide-react"
import type { RetryRow, FallbackRow, CriticalAlert } from "./data"

function LayerHeader({
  index,
  icon: Icon,
  title,
  subtitle,
  tone = "slate",
}: {
  index: number
  icon: typeof Timer
  title: string
  subtitle: string
  tone?: "slate" | "amber" | "red"
}) {
  const toneCls =
    tone === "red"
      ? "text-red-400"
      : tone === "amber"
        ? "text-amber-400"
        : "text-slate-300"
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5">
      <span className="flex h-6 w-6 items-center justify-center rounded-md border border-slate-700 bg-slate-800/60 font-mono text-[11px] text-slate-400">
        L{index}
      </span>
      <Icon className={`h-4 w-4 ${toneCls}`} />
      <div>
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
        <p className="font-mono text-[11px] text-slate-500">{subtitle}</p>
      </div>
    </div>
  )
}

export function ResilienceMatrix({
  retries,
  fallbacks,
  alerts,
  onReroute,
}: {
  retries: RetryRow[]
  fallbacks: FallbackRow[]
  alerts: CriticalAlert[]
  onReroute: (id: string) => void
}) {
  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/40">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-200">
          Exception Handling <span className="text-slate-500">/ 3-Layer Resilience</span>
        </h2>
        <span className="rounded border border-slate-700 bg-slate-800/60 px-1.5 py-0.5 font-mono text-[11px] text-slate-400">
          ALL LAYERS ARMED
        </span>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Layer 1 — Exponential backoff */}
        <LayerHeader
          index={1}
          icon={Timer}
          title="Exponential Backoff Monitor"
          subtitle="active retries with jittered scheduling"
        />
        <div className="space-y-1.5 px-4 pb-3">
          {retries.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-slate-200">{r.id}</span>
                <span className="font-mono text-[11px] text-slate-500">{r.endpoint}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-amber-400">
                  Attempt {r.attempt}/{r.maxAttempts}
                </span>
                <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] text-slate-400">
                  retry {r.rescheduleIn}s
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Layer 2 — Fallback routing */}
        <div className="border-t border-slate-800/60">
          <LayerHeader
            index={2}
            icon={GitBranch}
            title="Fallback Routing"
            subtitle="DLQ / backup server redirection"
            tone="amber"
          />
          <div className="px-4 pb-3">
            <div className="overflow-hidden rounded-lg border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-1.5 font-medium">Request</th>
                    <th className="px-3 py-1.5 font-medium">Routed To</th>
                    <th className="px-3 py-1.5 text-right font-medium">State</th>
                  </tr>
                </thead>
                <tbody>
                  {fallbacks.map((f) => (
                    <tr key={f.id} className="border-b border-slate-800/40 last:border-0">
                      <td className="px-3 py-2">
                        <span className="font-mono text-slate-200">{f.id}</span>
                        <p className="font-mono text-[11px] text-slate-500">{f.reason}</p>
                      </td>
                      <td className="px-3 py-2">
                        <span className="font-mono text-[11px] text-slate-300">{f.routedTo}</span>
                      </td>
                      <td className="px-3 py-2 text-right">
                        {f.frozen ? (
                          <span className="inline-flex items-center gap-1 rounded border border-sky-500/30 bg-sky-500/10 px-1.5 py-0.5 font-mono text-[11px] text-sky-300">
                            <Snowflake className="h-3 w-3" />
                            Freeze &amp; Bypass
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onReroute(f.id)}
                            className="inline-flex items-center gap-1 rounded border border-slate-700 bg-slate-800/60 px-1.5 py-0.5 font-mono text-[11px] text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
                          >
                            <ArrowRightLeft className="h-3 w-3" />
                            Re-route
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Layer 3 — Critical alerting */}
        <div className="border-t border-slate-800/60">
          <LayerHeader
            index={3}
            icon={ShieldAlert}
            title="Critical Alerting System"
            subtitle="instant webhooks → #eng-incidents"
            tone="red"
          />
          <div className="space-y-2 px-4 pb-4">
            {alerts.map((a) => (
              <div
                key={a.id + a.timestamp}
                className="rounded-lg border border-red-900/60 bg-red-950/40 p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-red-300">{a.id}</span>
                    <span className="rounded border border-red-500/40 bg-red-500/10 px-1.5 py-0.5 font-mono text-[10px] uppercase text-red-400">
                      Critical
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-red-400/80">
                    <Webhook className="h-3 w-3" />
                    webhook sent {a.timestamp}
                  </span>
                </div>
                <pre className="mt-2 overflow-x-auto rounded border border-red-900/50 bg-black/40 px-2 py-1.5 font-mono text-[11px] text-red-300">
                  {a.trace}
                </pre>
                <div className="mt-2 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-slate-500">node: {a.node}</span>
                  <span className="text-amber-400">accrued cost {a.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
