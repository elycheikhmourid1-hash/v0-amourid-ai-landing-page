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

/* ------------------------------------------------------------------ */
/* Data & State Manager — Core Data Engine internals                   */
/* ------------------------------------------------------------------ */

export type SessionState =
  | "Awaiting_Webhook"
  | "Processing_Payload"
  | "Vector_Search"
  | "Fulfillment_Dispatched"

export type SessionRow = {
  id: string
  customer: string
  state: SessionState
  checkpointHash: string
  ttl: number // seconds remaining in Redis
}

const SESSION_STATES: SessionState[] = [
  "Awaiting_Webhook",
  "Processing_Payload",
  "Vector_Search",
  "Fulfillment_Dispatched",
]

const HEX = "0123456789abcdef"

export function makeHash(len = 7) {
  let s = ""
  for (let i = 0; i < len; i++) s += HEX[Math.floor(Math.random() * 16)]
  return s
}

export const INITIAL_SESSIONS: SessionRow[] = [
  { id: "#SESS-9011", customer: "cust_AX72•northwind", state: "Awaiting_Webhook", checkpointHash: "db7a3f9", ttl: 184 },
  { id: "#SESS-9008", customer: "cust_QF19•lumenco", state: "Processing_Payload", checkpointHash: "4c1e88a", ttl: 92 },
  { id: "#SESS-9004", customer: "cust_KP55•vertexlab", state: "Vector_Search", checkpointHash: "9af20b3", ttl: 311 },
  { id: "#SESS-8999", customer: "cust_ZM03•harborpay", state: "Fulfillment_Dispatched", checkpointHash: "1f6dcae", ttl: 47 },
  { id: "#SESS-8994", customer: "cust_BN88•clarionix", state: "Processing_Payload", checkpointHash: "7e3b510", ttl: 228 },
  { id: "#SESS-8990", customer: "cust_TR41•meridian", state: "Vector_Search", checkpointHash: "a02f9d7", ttl: 159 },
]

export function nextSessionState(current: SessionState): SessionState {
  const idx = SESSION_STATES.indexOf(current)
  return SESSION_STATES[(idx + 1) % SESSION_STATES.length]
}

export type ContextMechanism = {
  label: string
  detail: string
  tone: "active" | "hit"
}

export const CONTEXT_MECHANISMS: ContextMechanism[] = [
  { label: "Semantic Compression (Vector-based)", detail: "Active — 42% Saved", tone: "active" },
  { label: "Sliding Window Buffer", detail: "Active — Retaining last 5 turns", tone: "active" },
  { label: "System Prompt Caching", detail: "Hit — 0.002s response time", tone: "hit" },
]

export const TOKEN_WINDOW = { used: 84000, total: 128000 }

export type SsotNode = {
  label: string
  engine: string
  status: "Synced" | "Live"
  metric: string
}

export const SSOT_NODES: SsotNode[] = [
  { label: "Vector Database", engine: "Pinecone / Milvus", status: "Synced", metric: "1.2M Vectors" },
  { label: "Relational DB", engine: "PostgreSQL", status: "Synced", metric: "Zero Lag" },
  { label: "Cache Layer", engine: "Redis Cluster", status: "Live", metric: "99.9% Cache Hit Rate" },
]

/* ------------------------------------------------------------------ */
/* Automated QA & Governance — LLM-as-a-Judge & HITL                   */
/* ------------------------------------------------------------------ */

export type AuditDecision = "APPROVED" | "REJECTED"

export type EvaluationRow = {
  id: string
  linkedReqId: string
  evaluator: string
  accuracy: number
  latencyMs: number
  safetyPass: boolean
  decision: AuditDecision
  timestamp: string
}

const EVALUATORS = [
  "Format_Guard_v2",
  "Hallucination_Detector",
  "Security_Anonymizer",
  "Schema_Validator",
  "Tone_Compliance",
  "PII_Redactor",
]

let outCounter = 5505

export function nextOutId() {
  outCounter += 1
  return `#OUT-${outCounter}`
}

export function makeEvaluation(): EvaluationRow {
  const approved = Math.random() > 0.18
  return {
    id: nextOutId(),
    linkedReqId: `#REQ-${8400 + Math.floor(Math.random() * 100)}`,
    evaluator: EVALUATORS[Math.floor(Math.random() * EVALUATORS.length)],
    accuracy: Math.floor(88 + Math.random() * 12),
    latencyMs: Math.floor(80 + Math.random() * 140),
    safetyPass: Math.random() > 0.08,
    decision: approved ? "APPROVED" : "REJECTED",
    timestamp: nowStamp(),
  }
}

export const INITIAL_EVALUATIONS: EvaluationRow[] = [
  { id: "#OUT-5505", linkedReqId: "#REQ-8491", evaluator: "Format_Guard_v2", accuracy: 98, latencyMs: 112, safetyPass: true, decision: "APPROVED", timestamp: "14:03:22" },
  { id: "#OUT-5504", linkedReqId: "#REQ-8490", evaluator: "Hallucination_Detector", accuracy: 94, latencyMs: 145, safetyPass: true, decision: "APPROVED", timestamp: "14:03:18" },
  { id: "#OUT-5503", linkedReqId: "#REQ-8488", evaluator: "Security_Anonymizer", accuracy: 91, latencyMs: 98, safetyPass: false, decision: "REJECTED", timestamp: "14:03:11" },
  { id: "#OUT-5502", linkedReqId: "#REQ-8485", evaluator: "Schema_Validator", accuracy: 97, latencyMs: 130, safetyPass: true, decision: "APPROVED", timestamp: "14:03:05" },
  { id: "#OUT-5501", linkedReqId: "#REQ-8479", evaluator: "Tone_Compliance", accuracy: 89, latencyMs: 167, safetyPass: true, decision: "REJECTED", timestamp: "14:02:58" },
]

export type DriftMetrics = {
  promptDrift: number
  hallucinationRate: number
  costPerformanceRatio: number
  driftTrend: "up" | "down" | "stable"
  hallucinationTrend: "up" | "down" | "stable"
}

export const INITIAL_DRIFT_METRICS: DriftMetrics = {
  promptDrift: 1.2,
  hallucinationRate: 0.04,
  costPerformanceRatio: 4.8,
  driftTrend: "stable",
  hallucinationTrend: "down",
}

export type HitlIntercept = {
  id: string
  violation: string
  outputSnippet: string
}

export const INITIAL_HITL_INTERCEPTS: HitlIntercept[] = [
  { id: "#OUT-5498", violation: "Schema mismatch on output array", outputSnippet: '{ "items": null, "count": -1 }' },
  { id: "#OUT-5492", violation: "PII detected in response body", outputSnippet: '"email": "john.doe@client.com"' },
  { id: "#OUT-5487", violation: "Hallucinated external URL reference", outputSnippet: '"source": "https://fake-domain.io/doc"' },
]
