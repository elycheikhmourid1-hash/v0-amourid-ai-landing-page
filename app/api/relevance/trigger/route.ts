import { NextResponse } from "next/server"
import { triggerRelevanceAgent } from "@/lib/relevance"

type Payload = {
  case_id?: string
  decision?: string
  title?: string
  flags?: { code: string; severity: string; detail: string }[]
}

export async function POST(req: Request) {
  const body = (await req.json()) as Payload
  if (body.decision !== "escalate") {
    return NextResponse.json(
      { ok: false, error: "Relevance runs only after escalate." },
      { status: 400 }
    )
  }
  const content = [
    "AICore Digital LLC Instruction Desk",
    `Operator: elycheikh@aicoredigital.com`,
    `Case: ${body.case_id || "unknown"}`,
    `Title: ${body.title || ""}`,
    `Decision: escalate`,
    "Flags:",
    ...(body.flags || []).map((f) => `- ${f.severity} ${f.code}: ${f.detail}`),
    "Do not issue an administrative decision. Return a draft note for a human.",
  ].join("\n")

  const result = await triggerRelevanceAgent(content)
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, upstream: result.status, body: result.body },
      { status: result.status || 503 }
    )
  }
  return NextResponse.json({ ok: true, upstream: result.status, body: result.body })
}
