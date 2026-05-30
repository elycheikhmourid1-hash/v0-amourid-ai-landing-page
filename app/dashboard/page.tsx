"use client"

import { useEffect, useMemo, useState } from "react"
import { Cpu, Clock } from "lucide-react"
import { MetricsBar } from "@/components/dashboard/metrics-bar"
import { PipelineFeed } from "@/components/dashboard/pipeline-feed"
import { ResilienceMatrix } from "@/components/dashboard/resilience-matrix"
import { DashboardFilters } from "@/components/dashboard/dashboard-filters"
import {
  INITIAL_PIPELINE,
  INITIAL_RETRIES,
  INITIAL_FALLBACKS,
  INITIAL_ALERTS,
  makePipelineRow,
  makeAlert,
  nowStamp,
  type PipelineRow,
  type RetryRow,
  type FallbackRow,
  type CriticalAlert,
  type SystemPath,
  type Severity,
} from "@/components/dashboard/data"

export default function DashboardPage() {
  const [pipeline, setPipeline] = useState<PipelineRow[]>(INITIAL_PIPELINE)
  const [retries, setRetries] = useState<RetryRow[]>(INITIAL_RETRIES)
  const [fallbacks, setFallbacks] = useState<FallbackRow[]>(INITIAL_FALLBACKS)
  const [alerts, setAlerts] = useState<CriticalAlert[]>(INITIAL_ALERTS)

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

  function handleForceBypass(id: string) {
    setPipeline((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, validation: "Valid", validationDetail: "Force Bypassed" } : r,
      ),
    )
    setFallbacks((prev) => [
      { id, reason: "Operator force bypass", routedTo: "Backup Server B", frozen: false },
      ...prev.filter((f) => f.id !== id),
    ].slice(0, 5))
  }

  function handleReroute(id: string) {
    setFallbacks((prev) =>
      prev.map((f) => (f.id === id ? { ...f, routedTo: "Backup Server C", reason: "Re-routed by operator" } : f)),
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
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
      </main>
    </div>
  )
}
