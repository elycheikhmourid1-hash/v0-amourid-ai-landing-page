"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Cpu, Clock, ArrowLeft, Activity, Database, ShieldCheck, TrendingUp, X } from "lucide-react"
import { MetricsBar } from "@/components/dashboard/metrics-bar"
import { PipelineFeed } from "@/components/dashboard/pipeline-feed"
import { ResilienceMatrix } from "@/components/dashboard/resilience-matrix"
import { DashboardFilters } from "@/components/dashboard/dashboard-filters"
import { DataStateManager } from "@/components/dashboard/data-state-manager"
import { QaGovernance } from "@/components/dashboard/qa-governance"
import { ClientOnboarding } from "@/components/dashboard/client-onboarding"
import {
  INITIAL_PIPELINE,
  INITIAL_RETRIES,
  INITIAL_FALLBACKS,
  INITIAL_ALERTS,
  INITIAL_SESSIONS,
  INITIAL_EVALUATIONS,
  INITIAL_DRIFT_METRICS,
  INITIAL_HITL_INTERCEPTS,
  INITIAL_CLIENTS,
  INITIAL_RESOURCE_METRICS,
  INITIAL_PROVISIONING,
  makePipelineRow,
  makeAlert,
  makeHash,
  makeEvaluation,
  makeClientRow,
  nextSessionState,
  nextOnboardingPhase,
  nowStamp,
  type PipelineRow,
  type RetryRow,
  type FallbackRow,
  type CriticalAlert,
  type SessionRow,
  type EvaluationRow,
  type DriftMetrics,
  type HitlIntercept,
  type ClientRow,
  type ResourceMetrics,
  type ProvisioningState,
  type SystemPath,
  type Severity,
} from "@/components/dashboard/data"

type DashboardTab = "pipeline" | "data-state" | "qa-governance" | "client-onboarding"

export default function DashboardPage() {
  const [pipeline, setPipeline] = useState<PipelineRow[]>(INITIAL_PIPELINE)
  const [retries, setRetries] = useState<RetryRow[]>(INITIAL_RETRIES)
  const [fallbacks, setFallbacks] = useState<FallbackRow[]>(INITIAL_FALLBACKS)
  const [alerts, setAlerts] = useState<CriticalAlert[]>(INITIAL_ALERTS)
  const [sessions, setSessions] = useState<SessionRow[]>(INITIAL_SESSIONS)
  const [evaluations, setEvaluations] = useState<EvaluationRow[]>(INITIAL_EVALUATIONS)
  const [drift, setDrift] = useState<DriftMetrics>(INITIAL_DRIFT_METRICS)
  const [intercepts, setIntercepts] = useState<HitlIntercept[]>(INITIAL_HITL_INTERCEPTS)
  const [clients, setClients] = useState<ClientRow[]>(INITIAL_CLIENTS)
  const [resources, setResources] = useState<ResourceMetrics>(INITIAL_RESOURCE_METRICS)
  const [provisioning, setProvisioning] = useState<ProvisioningState>(INITIAL_PROVISIONING)
  const [inspectId, setInspectId] = useState<string | null>(null)

  const [tab, setTab] = useState<DashboardTab>("pipeline")
  const [path, setPath] = useState<SystemPath | "All">("All")
  const [severity, setSeverity] = useState<Severity | "All">("All")
  const [retriesOnly, setRetriesOnly] = useState(false)
  const [live, setLive] = useState(true)
  const [clock, setClock] = useState("--:--:--")

  // Live wall clock
  useEffect(() => {
    setClock(nowStamp())
    const t = setInterval(() => setClock(nowStamp()), 1000)
    return () => clearInterval(t)
  }, [])

  // Ingestion stream — new pipeline rows
  useEffect(() => {
    if (!live) return
    const t = setInterval(() => {
      setPipeline((prev) => [makePipelineRow(), ...prev].slice(0, 14))
    }, 2600)
    return () => clearInterval(t)
  }, [live])

  // Retry countdown ticker
  useEffect(() => {
    if (!live) return
    const t = setInterval(() => {
      setRetries((prev) =>
        prev.map((r) => ({
          ...r,
          rescheduleIn: r.rescheduleIn <= 1 ? Math.floor(8 + Math.random() * 24) : r.rescheduleIn - 1,
        })),
      )
    }, 1000)
    return () => clearInterval(t)
  }, [live])

  // Occasional critical alert
  useEffect(() => {
    if (!live) return
    const t = setInterval(() => {
      if (Math.random() > 0.6) {
        setAlerts((prev) => [makeAlert(), ...prev].slice(0, 5))
      }
    }, 9000)
    return () => clearInterval(t)
  }, [live])

  // Session TTL countdown + state-machine progression
  useEffect(() => {
    if (!live) return
    const t = setInterval(() => {
      setSessions((prev) =>
        prev.map((s) => {
          const nextTtl = s.ttl <= 1 ? Math.floor(120 + Math.random() * 220) : s.ttl - 1
          // ~6% chance to advance state + write a fresh checkpoint hash
          if (Math.random() < 0.06) {
            return { ...s, ttl: nextTtl, state: nextSessionState(s.state), checkpointHash: makeHash() }
          }
          return { ...s, ttl: nextTtl }
        }),
      )
    }, 1000)
    return () => clearInterval(t)
  }, [live])

  // Evaluation stream — new LLM judge results
  useEffect(() => {
    if (!live) return
    const t = setInterval(() => {
      setEvaluations((prev) => [makeEvaluation(), ...prev].slice(0, 12))
    }, 3400)
    return () => clearInterval(t)
  }, [live])

  // Drift metrics micro-fluctuation
  useEffect(() => {
    if (!live) return
    const t = setInterval(() => {
      setDrift((prev) => ({
        ...prev,
        promptDrift: Math.max(0.1, +(prev.promptDrift + (Math.random() - 0.52) * 0.1).toFixed(1)),
        hallucinationRate: Math.max(0.01, +(prev.hallucinationRate + (Math.random() - 0.55) * 0.01).toFixed(2)),
      }))
    }, 5000)
    return () => clearInterval(t)
  }, [live])

  // Client onboarding stream — new inbound clients
  useEffect(() => {
    if (!live) return
    const t = setInterval(() => {
      setClients((prev) => [makeClientRow(), ...prev].slice(0, 8))
    }, 5200)
    return () => clearInterval(t)
  }, [live])

  // Resource metrics fluctuation
  useEffect(() => {
    if (!live) return
    const t = setInterval(() => {
      setResources((prev) => ({
        ...prev,
        projectedTokens: Math.max(20, +(prev.projectedTokens + (Math.random() - 0.48) * 2).toFixed(1)),
        concurrencyCurrent: Math.min(
          prev.concurrencyLimit,
          Math.max(100, prev.concurrencyCurrent + Math.floor((Math.random() - 0.45) * 30)),
        ),
        workersAllocated: Math.min(
          prev.workersTotal,
          Math.max(8, prev.workersAllocated + (Math.random() > 0.7 ? 1 : Math.random() < 0.3 ? -1 : 0)),
        ),
      }))
    }, 3000)
    return () => clearInterval(t)
  }, [live])

  const filteredPipeline = useMemo(() => {
    return pipeline.filter((row) => {
      if (path !== "All" && row.intent !== path) return false
      if (retriesOnly && !retries.some((r) => r.id === row.id)) return false
      // severity maps to validation: invalid rows are treated as elevated
      if (severity === "Critical" && row.validation !== "Invalid") return false
      if (severity === "Warning" && row.validation !== "Invalid") return false
      return true
    })
  }, [pipeline, path, retriesOnly, retries, severity])

  const handleForceBypass = useCallback((id: string) => {
    setPipeline((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, validation: "Valid", validationDetail: "Force Bypassed" } : r,
      ),
    )
    setFallbacks((prev) => [
      { id, reason: "Operator force bypass", routedTo: "Backup Server B", frozen: false },
      ...prev.filter((f) => f.id !== id),
    ].slice(0, 5))
  }, [])

  const handleReroute = useCallback((id: string) => {
    setFallbacks((prev) =>
      prev.map((f) => (f.id === id ? { ...f, routedTo: "Backup Server C", reason: "Re-routed by operator" } : f)),
    )
  }, [])

  const handleRollback = useCallback((id: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, state: "Awaiting_Webhook", checkpointHash: makeHash(), ttl: Math.floor(180 + Math.random() * 120) }
          : s,
      ),
    )
  }, [])

  const inspectedSession = useMemo(
    () => sessions.find((s) => s.id === inspectId) ?? null,
    [sessions, inspectId],
  )

  const handleApproveOverride = useCallback((id: string) => {
    setIntercepts((prev) => prev.filter((i) => i.id !== id))
    // Add an approved evaluation entry for it
    setEvaluations((prev) => [
      {
        id,
        linkedReqId: `#REQ-${8400 + Math.floor(Math.random() * 100)}`,
        evaluator: "HITL_Override",
        accuracy: 100,
        latencyMs: 0,
        safetyPass: true,
        decision: "APPROVED",
        timestamp: nowStamp(),
      },
      ...prev,
    ].slice(0, 12))
  }, [])

  const handleSendBack = useCallback((id: string) => {
    setIntercepts((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const handleRevokeCredentials = useCallback(() => {
    setProvisioning((prev) => ({
      ...prev,
      accessKey: "ak_live_REVOKED",
      workspaceStatus: "Pending",
      webhookStatus: "Pending",
      webhookCode: null,
    }))
  }, [])

  const handleAccelerateClient = useCallback((id: string) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, phase: nextOnboardingPhase(c.phase) } : c,
      ),
    )
    // If accelerating the provisioned client, regenerate creds
    setProvisioning((prev) => {
      if (id === prev.clientId) {
        return {
          ...prev,
          accessKey: `ak_live_${makeHash(8)}...${makeHash(4)}`,
          workspaceStatus: "Provisioned",
          webhookStatus: "Verified",
          webhookCode: 200,
        }
      }
      return prev
    })
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="Return to AICore Digital site"
              title="Return to site"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 bg-slate-900 text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 bg-slate-900">
              <Cpu className="h-4 w-4 text-cyan-400" />
            </span>
            <div>
              <h1 className="text-sm font-semibold text-slate-100">
                AI Automation &amp; API Fulfillment Engine
              </h1>
              <p className="font-mono text-[11px] text-slate-500">ops://mission-control / region us-east-1</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            <span>{clock}</span>
            <span className="ml-2 hidden rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-[11px] text-slate-500 sm:inline">
              UTC-5
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] space-y-3 px-4 py-4 sm:px-6">
        <MetricsBar />

        {/* Sub-navigation */}
        <nav
          aria-label="Dashboard views"
          className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/40 p-1"
        >
          {(
            [
              { key: "pipeline", label: "Pipeline Flow", Icon: Activity },
              { key: "data-state", label: "Data & State Manager", Icon: Database },
              { key: "qa-governance", label: "Automated QA & Governance", Icon: ShieldCheck },
              { key: "client-onboarding", label: "Client Onboarding & Growth", Icon: TrendingUp },
            ] as const
          ).map(({ key, label, Icon }) => {
            const active = tab === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-slate-800 text-slate-100 shadow-inner"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${active ? "text-cyan-400" : ""}`} />
                {label}
              </button>
            )
          })}
        </nav>

        {tab === "pipeline" ? (
          <>
            <DashboardFilters
              path={path}
              setPath={setPath}
              severity={severity}
              setSeverity={setSeverity}
              retriesOnly={retriesOnly}
              setRetriesOnly={setRetriesOnly}
              live={live}
              setLive={setLive}
            />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <div className="h-[560px]">
                <PipelineFeed rows={filteredPipeline} onForceBypass={handleForceBypass} />
              </div>
              <div className="h-[560px]">
                <ResilienceMatrix
                  retries={retries}
                  fallbacks={fallbacks}
                  alerts={alerts}
                  onReroute={handleReroute}
                />
              </div>
            </div>
          </>
        ) : tab === "data-state" ? (
          <DataStateManager
            sessions={sessions}
            onRollback={handleRollback}
            onInspect={setInspectId}
          />
        ) : tab === "qa-governance" ? (
          <QaGovernance
            evaluations={evaluations}
            drift={drift}
            intercepts={intercepts}
            onApproveOverride={handleApproveOverride}
            onSendBack={handleSendBack}
          />
        ) : (
          <ClientOnboarding
            clients={clients}
            resources={resources}
            provisioning={provisioning}
            onRevoke={handleRevokeCredentials}
            onAccelerate={handleAccelerateClient}
          />
        )}
      </main>

      {/* State payload inspector */}
      {inspectedSession && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="State payload inspector"
          onClick={() => setInspectId(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-slate-200">{inspectedSession.id}</span>
                <span className="font-mono text-[11px] text-slate-500">state payload</span>
              </div>
              <button
                type="button"
                onClick={() => setInspectId(null)}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-400 transition-colors hover:text-slate-200"
                aria-label="Close inspector"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <pre className="max-h-[60vh] overflow-auto bg-slate-950/60 p-4 font-mono text-xs leading-relaxed text-slate-300">
{`{
  "session_id": "${inspectedSession.id}",
  "customer": "${inspectedSession.customer}",
  "fsm_state": "${inspectedSession.state}",
  "checkpoint": {
    "hash": "${inspectedSession.checkpointHash}",
    "store": "redis-cluster://ops-01",
    "ttl_seconds": ${inspectedSession.ttl}
  },
  "context": {
    "tokens_used": ${TOKEN_WINDOW_USED},
    "vector_ns": "ns_${inspectedSession.checkpointHash}",
    "sliding_window_turns": 5
  },
  "ssot_consistent": true
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

const TOKEN_WINDOW_USED = 84000
