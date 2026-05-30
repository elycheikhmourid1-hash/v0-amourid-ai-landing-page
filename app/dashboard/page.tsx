"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  ArrowLeft,
  Workflow,
  Database,
  ShieldCheck,
  Users,
  Activity,
  Zap,
  Server,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Layers,
  RefreshCw,
  Eye,
  Lock,
  UserPlus,
  Cpu,
  Key,
  CircleDot,
  Play,
  Pause,
  RotateCcw,
  Brain,
  Scale,
  Hand,
  FileCheck,
  Gauge,
  HardDrive,
  Cloud,
  Sparkles,
} from "lucide-react"
import { LogoMark } from "@/components/logo"

// Note: metadata must be in a separate layout.tsx for client components
// This page uses "use client" for interactivity

const TABS = [
  { id: "pipeline", label: "Pipeline Flow", icon: Workflow },
  { id: "data", label: "Data & State", icon: Database },
  { id: "qa", label: "QA & Governance", icon: ShieldCheck },
  { id: "clients", label: "Client Onboarding", icon: Users },
] as const

type TabId = (typeof TABS)[number]["id"]

export default function OperationsDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("pipeline")

  return (
    <div className="min-h-screen bg-[#0a0c10] text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0d0f14]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Site</span>
            </Link>
            <div className="h-6 w-px bg-slate-700" />
            <div className="flex items-center gap-2.5">
              <LogoMark box={32} />
              <span className="font-mono text-sm font-bold uppercase tracking-tight text-foreground">
                AICORE <span className="text-purple-400">DIGITAL</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              All Systems Operational
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-mono text-2xl font-bold uppercase tracking-tight text-foreground">
            Operations Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time monitoring and control for AICORE DIGITAL automation infrastructure
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex flex-wrap gap-2 rounded-xl border border-slate-800/60 bg-slate-900/50 p-2">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/20 via-purple-500/10 to-cyan-500/10 border border-purple-500/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "pipeline" && <PipelineFlowTab />}
            {activeTab === "data" && <DataStateTab />}
            {activeTab === "qa" && <QAGovernanceTab />}
            {activeTab === "clients" && <ClientOnboardingTab />}
          </motion.div>
        </AnimatePresence>

        {/* Dashboard Footer */}
        <footer className="mt-12 border-t border-slate-800/40 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <LogoMark box={20} />
              <span className="font-mono uppercase">AICORE DIGITAL</span>
              <span className="text-slate-600">|</span>
              <span>Operations Control Center</span>
            </div>
            <div className="flex flex-col items-center gap-1 sm:items-end">
              <p className="text-xs text-muted-foreground">
                {"© 2026 AICORE DIGITAL. All rights reserved."}
              </p>
              <p className="text-[10px] text-muted-foreground/60">
                Ely Cheikh Mourid, Founder & CEO
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

/* ============================================================
   TAB 1: PIPELINE FLOW
   ============================================================ */
function PipelineFlowTab() {
  const ingestionEvents = [
    { id: 1, source: "Webhook", event: "lead.created", status: "processed", time: "2s ago" },
    { id: 2, source: "API", event: "form.submitted", status: "processing", time: "5s ago" },
    { id: 3, source: "Scheduler", event: "daily.sync", status: "processed", time: "12s ago" },
    { id: 4, source: "Webhook", event: "payment.received", status: "processed", time: "18s ago" },
    { id: 5, source: "API", event: "user.updated", status: "queued", time: "25s ago" },
  ]

  const resilienceLayers = [
    { layer: "Edge Cache", status: "active", latency: "2ms", uptime: "99.99%" },
    { layer: "Load Balancer", status: "active", latency: "5ms", uptime: "99.97%" },
    { layer: "Failover Cluster", status: "standby", latency: "—", uptime: "100%" },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Live Ingestion Stream */}
      <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase text-foreground">
            <Activity className="h-4 w-4 text-cyan-400" />
            Live Ingestion Stream
          </h3>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Streaming
          </span>
        </div>
        <div className="space-y-2">
          {ingestionEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between rounded-lg border border-slate-800/40 bg-slate-800/30 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${
                  event.source === "Webhook" ? "bg-purple-500/20 text-purple-400" :
                  event.source === "API" ? "bg-cyan-500/20 text-cyan-400" :
                  "bg-amber-500/20 text-amber-400"
                }`}>
                  {event.source}
                </span>
                <code className="text-xs text-muted-foreground">{event.event}</code>
              </div>
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-1 text-xs ${
                  event.status === "processed" ? "text-emerald-400" :
                  event.status === "processing" ? "text-cyan-400" :
                  "text-amber-400"
                }`}>
                  {event.status === "processed" && <CheckCircle2 className="h-3 w-3" />}
                  {event.status === "processing" && <RefreshCw className="h-3 w-3 animate-spin" />}
                  {event.status === "queued" && <Clock className="h-3 w-3" />}
                  {event.status}
                </span>
                <span className="text-xs text-muted-foreground">{event.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3-Layer Resilience Matrix */}
      <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-foreground">
          <Layers className="h-4 w-4 text-purple-400" />
          3-Layer Resilience Matrix
        </h3>
        <div className="space-y-4">
          {resilienceLayers.map((layer, i) => (
            <div
              key={layer.layer}
              className="rounded-lg border border-slate-800/40 bg-slate-800/30 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-sm font-medium text-foreground">{layer.layer}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  layer.status === "active"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}>
                  {layer.status}
                </span>
              </div>
              <div className="flex gap-6 text-xs text-muted-foreground">
                <span>Latency: <span className="text-foreground">{layer.latency}</span></span>
                <span>Uptime: <span className="text-emerald-400">{layer.uptime}</span></span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: layer.status === "active" ? "100%" : "0%" }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Filters */}
      <div className="lg:col-span-2 rounded-xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-foreground">
          <Zap className="h-4 w-4 text-amber-400" />
          Active Filters
        </h3>
        <div className="flex flex-wrap gap-3">
          {["Rate Limiter", "Auth Validator", "Schema Checker", "Deduplication", "PII Masker"].map((filter) => (
            <div
              key={filter}
              className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/40 px-4 py-2"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-foreground">{filter}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   TAB 2: DATA & STATE MANAGER
   ============================================================ */
function DataStateTab() {
  const sessions = [
    { id: "sess_a1b2c3", user: "client_acme", state: "active", tokens: 3847, recovery: "ready" },
    { id: "sess_d4e5f6", user: "client_apex", state: "active", tokens: 2156, recovery: "ready" },
    { id: "sess_g7h8i9", user: "client_nova", state: "idle", tokens: 892, recovery: "pending" },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Token Window Optimization */}
      <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-foreground">
          <Gauge className="h-4 w-4 text-cyan-400" />
          Token Window
        </h3>
        <div className="mb-4">
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-muted-foreground">Context Usage</span>
            <span className="text-foreground">78,432 / 128,000</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-700">
            <div className="h-full w-[61%] rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
          </div>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Compression</span>
            <span className="text-emerald-400">Active (2.3x)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sliding Window</span>
            <span className="text-foreground">8,192 tokens</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pruning Strategy</span>
            <span className="text-foreground">LRU + Semantic</span>
          </div>
        </div>
      </div>

      {/* Session Recovery Matrix */}
      <div className="lg:col-span-2 rounded-xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-foreground">
          <RotateCcw className="h-4 w-4 text-purple-400" />
          Session Recovery Matrix
        </h3>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between rounded-lg border border-slate-800/40 bg-slate-800/30 px-4 py-3"
            >
              <div className="flex items-center gap-4">
                <code className="rounded bg-slate-700/50 px-2 py-0.5 text-xs text-muted-foreground">
                  {session.id}
                </code>
                <span className="text-sm text-foreground">{session.user}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  session.state === "active"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-slate-600/30 text-slate-400"
                }`}>
                  {session.state}
                </span>
                <span className="text-xs text-muted-foreground">{session.tokens.toLocaleString()} tokens</span>
                <button className="rounded-lg border border-slate-700/50 bg-slate-800/40 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-slate-700/50">
                  <Eye className="inline h-3 w-3 mr-1" />
                  Inspect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SSOT Status */}
      <div className="lg:col-span-3 rounded-xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-foreground">
          <HardDrive className="h-4 w-4 text-emerald-400" />
          Single Source of Truth (SSOT)
        </h3>
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Primary DB", status: "synced", icon: Database, latency: "3ms" },
            { label: "Cache Layer", status: "synced", icon: Server, latency: "< 1ms" },
            { label: "Search Index", status: "synced", icon: Cloud, latency: "12ms" },
            { label: "Analytics", status: "syncing", icon: TrendingUp, latency: "45ms" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-slate-800/40 bg-slate-800/30 p-4 text-center"
            >
              <item.icon className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
              <div className="text-sm font-medium text-foreground">{item.label}</div>
              <div className={`mt-1 text-xs ${
                item.status === "synced" ? "text-emerald-400" : "text-amber-400"
              }`}>
                {item.status === "synced" ? <CheckCircle2 className="inline h-3 w-3 mr-1" /> : <RefreshCw className="inline h-3 w-3 mr-1 animate-spin" />}
                {item.status}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{item.latency}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   TAB 3: AUTOMATED QA & GOVERNANCE
   ============================================================ */
function QAGovernanceTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* LLM Judge Monitor */}
      <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-foreground">
          <Brain className="h-4 w-4 text-purple-400" />
          LLM Judge Monitoring
        </h3>
        <div className="space-y-4">
          {[
            { metric: "Response Quality", score: 94, trend: "+2.3%" },
            { metric: "Factual Accuracy", score: 97, trend: "+0.8%" },
            { metric: "Tone Consistency", score: 91, trend: "-0.5%" },
            { metric: "Safety Compliance", score: 99, trend: "+0.1%" },
          ].map((item) => (
            <div key={item.metric}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">{item.metric}</span>
                <span className="flex items-center gap-2">
                  <span className="text-foreground font-medium">{item.score}%</span>
                  <span className={item.trend.startsWith("+") ? "text-emerald-400" : "text-rose-400"}>
                    {item.trend}
                  </span>
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drift Metrics */}
      <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-foreground">
          <Scale className="h-4 w-4 text-cyan-400" />
          Drift Metrics
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-800/40 bg-slate-800/30 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Model Drift Index</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                Low (0.023)
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              No significant distribution shift detected in the last 24h.
            </p>
          </div>
          <div className="rounded-lg border border-slate-800/40 bg-slate-800/30 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Data Freshness</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                Current
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Training data last updated 2 hours ago. Embeddings synced.
            </p>
          </div>
          <div className="rounded-lg border border-slate-800/40 bg-slate-800/30 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Anomaly Detection</span>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">
                1 Alert
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Unusual latency spike detected at 14:32 UTC. Auto-mitigated.
            </p>
          </div>
        </div>
      </div>

      {/* Human-in-the-Loop Intercept Gate */}
      <div className="lg:col-span-2 rounded-xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-foreground">
          <Hand className="h-4 w-4 text-amber-400" />
          Human-in-the-Loop Intercept Gate
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
            <div className="text-3xl font-bold text-emerald-400">847</div>
            <div className="mt-1 text-xs text-muted-foreground">Auto-Approved</div>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-center">
            <div className="text-3xl font-bold text-amber-400">12</div>
            <div className="mt-1 text-xs text-muted-foreground">Pending Review</div>
          </div>
          <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-center">
            <div className="text-3xl font-bold text-rose-400">3</div>
            <div className="mt-1 text-xs text-muted-foreground">Rejected</div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/40 px-4 py-3">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <div>
              <div className="text-sm font-medium text-foreground">Review Required</div>
              <div className="text-xs text-muted-foreground">High-value transaction flagged for manual approval</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-emerald-500/50 bg-emerald-500/20 px-4 py-2 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/30">
              Approve
            </button>
            <button className="rounded-lg border border-rose-500/50 bg-rose-500/20 px-4 py-2 text-xs font-medium text-rose-400 transition-colors hover:bg-rose-500/30">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   TAB 4: CLIENT ONBOARDING & GROWTH
   ============================================================ */
function ClientOnboardingTab() {
  const clients = [
    { name: "Acme Corp", tier: "Enterprise", status: "active", apiCalls: "1.2M", compute: "High" },
    { name: "Apex Industries", tier: "Pro", status: "active", apiCalls: "450K", compute: "Medium" },
    { name: "Nova Startup", tier: "Starter", status: "onboarding", apiCalls: "12K", compute: "Low" },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Client Profiling */}
      <div className="lg:col-span-2 rounded-xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-foreground">
          <Users className="h-4 w-4 text-purple-400" />
          Client Profiling
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700/50 text-xs uppercase text-muted-foreground">
                <th className="pb-3 font-medium">Client</th>
                <th className="pb-3 font-medium">Tier</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">API Calls (30d)</th>
                <th className="pb-3 font-medium">Compute</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.name} className="border-b border-slate-800/40">
                  <td className="py-4 font-medium text-foreground">{client.name}</td>
                  <td className="py-4">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      client.tier === "Enterprise" ? "bg-purple-500/20 text-purple-400" :
                      client.tier === "Pro" ? "bg-cyan-500/20 text-cyan-400" :
                      "bg-slate-600/30 text-slate-400"
                    }`}>
                      {client.tier}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                      client.status === "active"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}>
                      <CircleDot className="h-3 w-3" />
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 text-muted-foreground">{client.apiCalls}</td>
                  <td className="py-4 text-muted-foreground">{client.compute}</td>
                  <td className="py-4">
                    <button className="rounded-lg border border-slate-700/50 bg-slate-800/40 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-slate-700/50">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compute Resource Estimator */}
      <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-foreground">
          <Cpu className="h-4 w-4 text-cyan-400" />
          Compute Resource Estimator
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs text-muted-foreground">Expected API Calls / Month</label>
            <input
              type="range"
              min="10000"
              max="5000000"
              defaultValue="500000"
              className="w-full accent-purple-500"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>10K</span>
              <span>5M</span>
            </div>
          </div>
          <div className="rounded-lg border border-slate-800/40 bg-slate-800/30 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Recommended Tier</span>
              <span className="font-mono font-bold text-purple-400">PRO</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Est. Monthly Cost</span>
              <span className="font-mono font-bold text-foreground">$299/mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Auto API Provisioning */}
      <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-sm font-semibold uppercase text-foreground">
          <Key className="h-4 w-4 text-amber-400" />
          Auto API Provisioning
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-foreground">Instant Key Generation</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              New clients receive API keys within seconds of onboarding completion.
            </p>
          </div>
          <button className="w-full rounded-lg border border-purple-500/50 bg-purple-500/20 py-3 text-sm font-medium text-purple-400 transition-colors hover:bg-purple-500/30">
            <UserPlus className="mr-2 inline h-4 w-4" />
            Onboard New Client
          </button>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Pending Invitations</span>
            <span className="font-medium text-foreground">4</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Keys Provisioned Today</span>
            <span className="font-medium text-foreground">12</span>
          </div>
        </div>
      </div>
    </div>
  )
}
