import { NextResponse } from "next/server"
import { relevanceConfig } from "@/lib/relevance"

export async function GET() {
  const cfg = relevanceConfig()
  return NextResponse.json({
    configured: cfg.configured,
    region: cfg.region,
    project: cfg.project ? "set" : "missing",
    agent: cfg.agentId ? "set" : "missing",
    key: cfg.apiKey ? "set" : "missing",
    rule: "A human must escalate before the desk calls Relevance AI.",
  })
}
