"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react"
import { LogoMark } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { RelevanceBridge } from "@/components/relevance-bridge"

type Flag = { code: string; severity: string; detail: string }
type CaseRow = {
  id: string
  title: string
  buyer: string
  published: string
  deadline: string
  amount: number
  peer_amounts: number[]
  clauses: string[]
  required_clauses: string[]
}

const SAMPLE: CaseRow[] = [
  {
    id: "AO-2026-014",
    title: "Sample — data-center servers",
    buyer: "Anonymized contracting authority",
    published: "2026-09-02",
    deadline: "2026-08-20",
    amount: 185000000,
    peer_amounts: [42000000, 39000000, 51000000, 44000000, 47000000],
    clauses: ["objet", "delai", "garantie"],
    required_clauses: ["objet", "delai", "garantie", "penalites", "origine_fonds", "exclusion_conflit"],
  },
  {
    id: "AO-2026-021",
    title: "Sample — regional network maintenance",
    buyer: "Anonymized contracting authority",
    published: "2026-09-10",
    deadline: "2026-10-05",
    amount: 41000000,
    peer_amounts: [39000000, 43000000, 40000000, 45000000],
    clauses: ["objet", "delai", "garantie", "penalites", "origine_fonds", "exclusion_conflit"],
    required_clauses: ["objet", "delai", "garantie", "penalites", "origine_fonds", "exclusion_conflit"],
  },
  {
    id: "AO-2026-028",
    title: "Sample — school tablets",
    buyer: "Anonymized contracting authority",
    published: "2026-09-12",
    deadline: "2026-09-18",
    amount: 12000000,
    peer_amounts: [11000000, 12500000, 13000000, 11800000],
    clauses: ["objet", "delai"],
    required_clauses: ["objet", "delai", "garantie", "penalites", "origine_fonds"],
  },
]

function mean(xs: number[]) {
  return xs.reduce((a, b) => a + b, 0) / xs.length
}
function pstdev(xs: number[]) {
  const m = mean(xs)
  return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / xs.length)
}
function analyze(c: CaseRow) {
  const flags: Flag[] = []
  const missing = (c.required_clauses || []).filter((x) => !(c.clauses || []).includes(x))
  if (missing.length) {
    flags.push({
      code: "MISSING_CLAUSE",
      severity: missing.length >= 2 ? "high" : "medium",
      detail: "Missing: " + missing.join(", "),
    })
  }
  if (c.deadline && c.published && c.deadline < c.published) {
    flags.push({
      code: "DEADLINE_BEFORE_PUBLISH",
      severity: "critical",
      detail: `Deadline ${c.deadline} precedes publication ${c.published}.`,
    })
  }
  const days = Math.round((Date.parse(c.deadline) - Date.parse(c.published)) / 86400000)
  if (Number.isFinite(days) && days >= 0 && days < 10) {
    flags.push({ code: "SHORT_BID_WINDOW", severity: "medium", detail: `Bid window ${days} days.` })
  }
  const peers = c.peer_amounts || []
  if (peers.length >= 3) {
    const sd = pstdev(peers)
    const z = sd === 0 ? 0 : (Number(c.amount) - mean(peers)) / sd
    if (Math.abs(z) >= 2.5) {
      flags.push({
        code: "PRICE_OUTLIER",
        severity: "high",
        detail: `Amount z-score ${z.toFixed(2)} versus ${peers.length} peers.`,
      })
    }
  }
  if (!c.buyer) {
    flags.push({ code: "NO_BUYER", severity: "high", detail: "Buyer field empty." })
  }
  const score = Math.min(
    100,
    flags.reduce((s, f) => s + (f.severity === "critical" ? 20 : f.severity === "high" ? 12 : 6), 0)
  )
  return { ...c, flags, score, status: flags.length ? "needs_human_review" : "clear" }
}

function normalize(raw: unknown): CaseRow[] {
  const list = Array.isArray(raw) ? raw : Array.isArray((raw as { cases?: unknown }).cases) ? (raw as { cases: unknown[] }).cases : []
  return list.map((item, i) => {
    const c = item as Partial<CaseRow>
    return {
      id: String(c.id || `ROW-${i + 1}`),
      title: String(c.title || "Untitled"),
      buyer: String(c.buyer || ""),
      published: String(c.published || ""),
      deadline: String(c.deadline || ""),
      amount: Number(c.amount || 0),
      peer_amounts: Array.isArray(c.peer_amounts) ? c.peer_amounts.map(Number) : [],
      clauses: Array.isArray(c.clauses) ? c.clauses.map(String) : [],
      required_clauses: Array.isArray(c.required_clauses) ? c.required_clauses.map(String) : [],
    }
  })
}

export default function DeskPage() {
  const [pack, setPack] = useState<CaseRow[]>(SAMPLE)
  const [source, setSource] = useState("sample")
  const [error, setError] = useState("")
  const [decisions, setDecisions] = useState<Record<string, string>>({})
  const rows = useMemo(() => pack.map(analyze), [pack])

  function onFile(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        const next = normalize(parsed)
        if (!next.length) throw new Error("No cases in file")
        setPack(next)
        setDecisions({})
        setSource(file.name)
        setError("")
      } catch {
        setError("JSON must be an array of cases, or { cases: [...] }.")
      }
    }
    reader.readAsText(file)
  }

  function exportDecisions() {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            processor: "AICore Digital LLC",
            operator: "elycheikh@aicoredigital.com",
            source,
            decisions: rows.map((r) => ({
              case_id: r.id,
              title: r.title,
              status: r.status,
              score: r.score,
              flags: r.flags,
              decision: decisions[r.id] || null,
            })),
          },
          null,
          2
        ),
      ],
      { type: "application/json" }
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "aicore-desk-review.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <LogoMark box={28} />
            <span className="font-mono text-xs font-bold uppercase">AICore Digital LLC</span>
          </Link>
          <span className="text-xs text-muted-foreground">Instruction Desk · {source}</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Product</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Instruction Desk</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Flags missing clauses, impossible dates, and statistical price outliers on records the client supplies.
              No ministry is queried. A person records the decision. AICore Digital LLC is processor only.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="rounded-full">
              <a href="/sample-cases.json" download>
                Download sample JSON
              </a>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <label className="cursor-pointer">
                Upload JSON
                <input type="file" accept="application/json,.json" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
              </label>
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => {
                setPack(SAMPLE)
                setDecisions({})
                setSource("sample")
                setError("")
              }}
            >
              Reset sample
            </Button>
            <Button className="rounded-full" onClick={exportDecisions}>
              Export review
            </Button>
          </div>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground">Records</p>
            <p className="text-2xl font-semibold">{rows.length}</p>
          </div>
          <div className="rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground">Open flags</p>
            <p className="text-2xl font-semibold">{rows.reduce((s, r) => s + r.flags.length, 0)}</p>
          </div>
          <div className="rounded-xl border border-border p-4">
            <p className="text-xs text-muted-foreground">Human decisions</p>
            <p className="text-2xl font-semibold">{Object.keys(decisions).length}</p>
          </div>
        </div>

        <RelevanceBridge rows={rows} decisions={decisions} />

        <div className="space-y-4">
          {rows.map((r) => (
            <article key={r.id} className="rounded-xl border border-border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{r.id}</p>
                  <h2 className="text-lg font-medium">{r.title}</h2>
                </div>
                <span className="rounded-full border border-border px-3 py-1 text-xs">
                  {r.status === "clear" ? "clear" : `review · score ${r.score}`}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {r.flags.length === 0 && (
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" /> No rule fired.
                  </li>
                )}
                {r.flags.map((f) => (
                  <li key={f.code + f.detail} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      <span className="font-mono text-xs uppercase">{f.severity}</span> — {f.detail}
                    </span>
                  </li>
                ))}
              </ul>
              {r.flags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {(["confirm", "dismiss", "escalate"] as const).map((d) => (
                    <Button
                      key={d}
                      size="sm"
                      variant={decisions[r.id] === d ? "default" : "outline"}
                      className="rounded-full"
                      onClick={() => setDecisions((s) => ({ ...s, [r.id]: d }))}
                    >
                      {d}
                    </Button>
                  ))}
                  {decisions[r.id] && (
                    <span className="self-center text-xs text-muted-foreground">
                      Recorded locally: {decisions[r.id]} · operator elycheikh@aicoredigital.com
                    </span>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
