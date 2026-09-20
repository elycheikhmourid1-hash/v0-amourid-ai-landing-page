"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

type Flag = { code: string; severity: string; detail: string }
type Row = { id: string; title: string; flags: Flag[] }

export function RelevanceBridge({
  rows,
  decisions,
}: {
  rows: Row[]
  decisions: Record<string, string>
}) {
  const [status, setStatus] = useState<{ configured?: boolean; key?: string; agent?: string; region?: string }>({})
  const [log, setLog] = useState("")
  const [busy, setBusy] = useState(false)
  const escalated = rows.filter((r) => decisions[r.id] === "escalate")

  useEffect(() => {
    fetch("/api/relevance/status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus({}))
  }, [])

  async function send(row: Row) {
    setBusy(true)
    setLog("Sending…")
    const res = await fetch("/api/relevance/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        case_id: row.id,
        title: row.title,
        decision: "escalate",
        flags: row.flags,
      }),
    })
    const body = await res.json()
    setLog(JSON.stringify(body, null, 2))
    setBusy(false)
  }

  return (
    <section className="rounded-xl border border-border p-5 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Relevance AI</p>
      <p className="text-sm text-muted-foreground">
        {status.configured
          ? `Connected · region ${status.region} · agent ${status.agent}`
          : "Not connected. Add RELEVANCE_API_KEY and RELEVANCE_AGENT_ID on Vercel."}
      </p>
      <p className="text-xs text-muted-foreground">The agent is called only after escalate. It drafts; it does not decide.</p>
      <div className="flex flex-wrap gap-2">
        {escalated.length === 0 && (
          <span className="text-sm text-muted-foreground">Escalate a flagged case to enable send.</span>
        )}
        {escalated.map((r) => (
          <Button key={r.id} size="sm" className="rounded-full" disabled={busy || !status.configured} onClick={() => send(r)}>
            Send {r.id} to Relevance
          </Button>
        ))}
      </div>
      {log && (
        <pre className="overflow-x-auto rounded-lg border border-border p-3 text-xs text-muted-foreground">{log}</pre>
      )}
    </section>
  )
}
