"use client"

import { Building2, Cpu, Key, Server, Zap, Users, TrendingUp, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import type { ClientRow, ResourceMetrics, ProvisioningState, OnboardingPhase } from "./data"

type Props = {
  clients: ClientRow[]
  resources: ResourceMetrics
  provisioning: ProvisioningState
  onRevoke: () => void
  onAccelerate: (id: string) => void
}

const PHASE_ORDER: OnboardingPhase[] = ["Data_Discovery", "API_Scoping", "Architecture_Review", "Ready_To_Deploy"]

const PHASE_LABELS: Record<OnboardingPhase, string> = {
  Data_Discovery: "Data Discovery",
  API_Scoping: "API Scoping",
  Architecture_Review: "Architecture Review",
  Ready_To_Deploy: "Ready To Deploy",
}

function formatArr(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`
}

export function ClientOnboarding({ clients, resources, provisioning, onRevoke, onAccelerate }: Props) {
  const concurrencyPct = Math.round((resources.concurrencyCurrent / resources.concurrencyLimit) * 100)
  const workerPct = Math.round((resources.workersAllocated / resources.workersTotal) * 100)

  return (
    <div className="space-y-4">
      {/* Row 1: Client Profiling Stream */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60">
        <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-slate-100">Live Inbound Client Profiling Stream</h2>
          </div>
          <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-400">
            {clients.length} Active
          </span>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900/80 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2 font-medium">Client ID</th>
                <th className="px-4 py-2 font-medium">Company</th>
                <th className="px-4 py-2 font-medium">AI Use-Case</th>
                <th className="px-4 py-2 font-medium text-right">Est. ARR</th>
                <th className="px-4 py-2 font-medium text-right">Tech Match</th>
                <th className="px-4 py-2 font-medium">Pipeline Phase</th>
                <th className="px-4 py-2 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {clients.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-slate-800/30">
                  <td className="px-4 py-2.5 font-mono text-slate-300">{c.id}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5 text-slate-500" />
                      <span className="font-medium text-slate-200">{c.companyName.replace("_", " ")}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-slate-400">{c.useCase}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-emerald-400">{formatArr(c.estimatedArr)}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[11px] ${
                        c.techStackMatch >= 90
                          ? "bg-emerald-900/40 text-emerald-400"
                          : c.techStackMatch >= 80
                            ? "bg-cyan-900/40 text-cyan-400"
                            : "bg-amber-900/40 text-amber-400"
                      }`}
                    >
                      {c.techStackMatch}% Match
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <PhaseBadge phase={c.phase} />
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    {c.phase !== "Ready_To_Deploy" && (
                      <button
                        type="button"
                        onClick={() => onAccelerate(c.id)}
                        className="inline-flex items-center gap-1 rounded border border-cyan-700/50 bg-cyan-900/20 px-2 py-1 text-[11px] font-semibold text-cyan-400 transition-colors hover:bg-cyan-900/40"
                      >
                        <Zap className="h-3 w-3" />
                        Accelerate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Row 2: Resource Estimator + Provisioning Console */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Resource Estimator */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <header className="mb-4 flex items-center gap-2">
            <Server className="h-4 w-4 text-cyan-400" />
            <h2 className="text-sm font-semibold text-slate-100">Infrastructure &amp; Compute Resource Estimator</h2>
          </header>

          <div className="space-y-4">
            {/* Projected Token Volume */}
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-slate-500">Projected Monthly Token Volume</span>
                <span className="font-mono text-lg font-bold text-slate-100">{resources.projectedTokens}M</span>
              </div>
              <span className="text-[11px] text-slate-500">Tokens Estimated</span>
            </div>

            {/* Concurrency Gauge */}
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-slate-500">API Endpoint Load Prediction</span>
                <span className="font-mono text-sm text-slate-300">
                  {resources.concurrencyCurrent} / {resources.concurrencyLimit}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
                <div
                  className={`h-full rounded-full transition-all ${
                    concurrencyPct >= 80 ? "bg-amber-500" : concurrencyPct >= 60 ? "bg-cyan-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${concurrencyPct}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-slate-500">
                <span>0</span>
                <span>Concurrency Limit: {resources.concurrencyLimit}</span>
              </div>
            </div>

            {/* Worker Allocation */}
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-slate-500">Node Resource Allocation</span>
                <div className="flex items-center gap-2">
                  <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="font-mono text-sm font-semibold text-slate-100">
                    {resources.workersAllocated} / {resources.workersTotal}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: resources.workersTotal }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-5 flex-1 rounded ${
                      i < resources.workersAllocated ? "bg-cyan-500" : "bg-slate-700"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500">
                {resources.workersAllocated} Workers Allocated ({workerPct}% Capacity)
              </p>
            </div>
          </div>
        </section>

        {/* Provisioning Console */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <header className="mb-4 flex items-center gap-2">
            <Key className="h-4 w-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-slate-100">Automatic API Provisioning &amp; Access Key Issuance</h2>
          </header>

          <div className="space-y-3">
            {/* Linked Client */}
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2">
              <span className="text-[11px] uppercase tracking-wide text-slate-500">Provisioning For</span>
              <span className="font-mono text-sm font-semibold text-slate-200">{provisioning.clientId}</span>
            </div>

            {/* Workspace Status */}
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2">
              <span className="text-[11px] uppercase tracking-wide text-slate-500">Organization Workspace Setup</span>
              <StatusBadge status={provisioning.workspaceStatus} />
            </div>

            {/* Webhook Handshake */}
            <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2">
              <span className="text-[11px] uppercase tracking-wide text-slate-500">Custom Webhook Handshake</span>
              <div className="flex items-center gap-2">
                <StatusBadge status={provisioning.webhookStatus === "Verified" ? "Provisioned" : provisioning.webhookStatus} />
                {provisioning.webhookCode && (
                  <span className="rounded bg-emerald-900/40 px-1.5 py-0.5 font-mono text-[10px] text-emerald-400">
                    {provisioning.webhookCode} OK
                  </span>
                )}
              </div>
            </div>

            {/* Access Key */}
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2">
              <div className="mb-1 text-[11px] uppercase tracking-wide text-slate-500">Security Access Key</div>
              <code className="block rounded bg-slate-900 px-2 py-1.5 font-mono text-sm text-emerald-400">
                {provisioning.accessKey}
              </code>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onRevoke}
                className="flex-1 rounded-lg border border-red-700/50 bg-red-900/20 py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-900/40"
              >
                Revoke Credentials
              </button>
              <button
                type="button"
                onClick={() => onAccelerate(provisioning.clientId)}
                className="flex-1 rounded-lg border border-emerald-700/50 bg-emerald-900/20 py-2 text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-900/40"
              >
                Accelerate Provisioning
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function PhaseBadge({ phase }: { phase: OnboardingPhase }) {
  const idx = PHASE_ORDER.indexOf(phase)
  const isReady = phase === "Ready_To_Deploy"

  return (
    <div className="flex items-center gap-1.5">
      {PHASE_ORDER.map((p, i) => (
        <div
          key={p}
          className={`h-1.5 w-4 rounded-full ${
            i <= idx ? (isReady ? "bg-emerald-500" : "bg-cyan-500") : "bg-slate-700"
          }`}
        />
      ))}
      <span
        className={`ml-1 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
          isReady
            ? "bg-emerald-900/40 text-emerald-400"
            : "bg-slate-800 text-slate-400"
        }`}
      >
        {PHASE_LABELS[phase]}
      </span>
    </div>
  )
}

function StatusBadge({ status }: { status: "Pending" | "Provisioned" | "Failed" | "Verified" }) {
  if (status === "Provisioned" || status === "Verified") {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-emerald-900/40 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-400">
        <CheckCircle2 className="h-3 w-3" />
        {status}
      </span>
    )
  }
  if (status === "Failed") {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-red-900/40 px-1.5 py-0.5 text-[11px] font-semibold text-red-400">
        <AlertCircle className="h-3 w-3" />
        Failed
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded bg-amber-900/40 px-1.5 py-0.5 text-[11px] font-semibold text-amber-400">
      <Clock className="h-3 w-3" />
      Pending
    </span>
  )
}
