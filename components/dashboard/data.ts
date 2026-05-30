// Shared types and mock data generators for the Operations Dashboard.
// Self-contained: no external state, no impact on the rest of the app.

export type SystemPath = "Autonomous Agent" | "API Integration" | "System Maintenance"
export type Severity = "Muted" | "Warning" | "Critical"
export type ValidationStatus = "Valid" | "Invalid"

export type PipelineRow = {
  id: string
  timestamp: string
  intent: SystemPath
  validation: ValidationStatus
  validationDetail: string
  latencyMs: number
}

export type RetryRow = {
  id: string
  attempt: number
  maxAttempts: number
  rescheduleIn: number // seconds
  endpoint: string
}

export type FallbackRow = {
  id: string
  reason: string
  routedTo: "Dead Letter Queue" | "Backup Server B" | "Backup Server C"
  frozen: boolean
}

export type CriticalAlert = {
  id: string
  timestamp: string
  trace: string
  node: string
  cost: string
  severity: Severity
}

const INTENTS: SystemPath[] = ["Autonomous Agent", "API Integration", "System Maintenance"]

const ENDPOINTS = [
  "n8n_core_node",
  "openai_router",
  "stripe_webhook",
  "supabase_edge",
  "vector_index",
  "email_dispatch",
]

function pad(n: number) {
  return n.toString().padStart(2, "0")
}

export function nowStamp(d = new Date()) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

let reqCounter = 8492

export function nextReqId() {
  reqCounter += 1
  return `#REQ-${reqCounter}`
}

export function makePipelineRow(): PipelineRow {
  const valid = Math.random() > 0.22
  const intent = INTENTS[Math.floor(Math.random() * INTENTS.length)]
  return {
    id: nextReqId(),
    timestamp: nowStamp(),
    intent,
    validation: valid ? "Valid" : "Invalid",
    validationDetail: valid ? "Input Verified" : "Auto-Rejected",
    latencyMs: Math.floor(2 + Math.random() * 9),
  }
}

export const INITIAL_PIPELINE: PipelineRow[] = [
  {
    id: "#REQ-8492",
    timestamp: "14:02:11",
    intent: "Autonomous Agent",
    validation: "Valid",
    validationDetail: "Input Verified",
    latencyMs: 3,
  },
  {
    id: "#REQ-8491",
    timestamp: "14:02:08",
    intent: "API Integration",
    validation: "Valid",
    validationDetail: "Input Verified",
    latencyMs: 5,
  },
  {
    id: "#REQ-8490",
    timestamp: "14:02:04",
    intent: "API Integration",
    validation: "Invalid",
    validationDetail: "Auto-Rejected",
    latencyMs: 4,
  },
  {
    id: "#REQ-8489",
    timestamp: "14:01:59",
    intent: "System Maintenance",
    validation: "Valid",
    validationDetail: "Input Verified",
    latencyMs: 2,
  },
  {
    id: "#REQ-8488",
    timestamp: "14:01:55",
    intent: "Autonomous Agent",
    validation: "Valid",
    validationDetail: "Input Verified",
    latencyMs: 6,
  },
]

export const INITIAL_RETRIES: RetryRow[] = [
  { id: "#REQ-8490", attempt: 2, maxAttempts: 3, rescheduleIn: 15, endpoint: "openai_router" },
  { id: "#REQ-8485", attempt: 1, maxAttempts: 3, rescheduleIn: 4, endpoint: "stripe_webhook" },
  { id: "#REQ-8479", attempt: 3, maxAttempts: 3, rescheduleIn: 28, endpoint: "n8n_core_node" },
]

export const INITIAL_FALLBACKS: FallbackRow[] = [
  { id: "#REQ-8472", reason: "Main API 503 — capacity", routedTo: "Backup Server B", frozen: false },
  { id: "#REQ-8468", reason: "Timeout > 30s", routedTo: "Dead Letter Queue", frozen: true },
  { id: "#REQ-8461", reason: "Rate limit exceeded", routedTo: "Backup Server C", frozen: false },
]

export const INITIAL_ALERTS: CriticalAlert[] = [
  {
    id: "#REQ-8455",
    timestamp: "13:58:42",
    trace: "502 Bad Gateway at n8n_core_node",
    node: "n8n_core_node",
    cost: "$3.18",
    severity: "Critical",
  },
  {
    id: "#REQ-8443",
    timestamp: "13:55:10",
    trace: "ECONNRESET at vector_index.query()",
    node: "vector_index",
    cost: "$1.92",
    severity: "Critical",
  },
]

export function makeAlert(): CriticalAlert {
  const node = ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)]
  const codes = ["502 Bad Gateway", "504 Gateway Timeout", "ECONNRESET", "503 Service Unavailable"]
  const code = codes[Math.floor(Math.random() * codes.length)]
  return {
    id: nextReqId(),
    timestamp: nowStamp(),
    trace: `${code} at ${node}`,
    node,
    cost: `$${(Math.random() * 4 + 0.5).toFixed(2)}`,
    severity: "Critical",
  }
}

export const COST_SPARKLINE = [18, 24, 21, 30, 27, 35, 31, 42, 38, 47, 44, 52]
