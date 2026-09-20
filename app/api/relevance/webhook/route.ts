import { NextResponse } from "next/server"

const inbox: unknown[] = []

export async function POST(req: Request) {
  const payload = await req.json().catch(() => null)
  inbox.unshift({ ts: new Date().toISOString(), payload })
  if (inbox.length > 20) inbox.pop()
  return NextResponse.json({ received: true })
}

export async function GET() {
  return NextResponse.json({
    note: "In-memory inbox on this instance only. Point the Relevance agent destination to this URL.",
    items: inbox,
  })
}
