const REGIONS: Record<string, string> = {
  us: "https://api-bcbe5a.stack.tryrelevance.com/latest",
  eu: "https://api-d7b62b.stack.tryrelevance.com/latest",
  au: "https://api-f1db6c.stack.tryrelevance.com/latest",
}

export function relevanceConfig() {
  const apiKey = process.env.RELEVANCE_API_KEY || ""
  const agentId = process.env.RELEVANCE_AGENT_ID || ""
  const project = process.env.RELEVANCE_PROJECT_ID || ""
  const region = (process.env.RELEVANCE_REGION || "us").toLowerCase()
  const base =
    process.env.RELEVANCE_BASE_URL || REGIONS[region] || REGIONS.us
  return {
    configured: Boolean(apiKey && agentId),
    apiKey,
    agentId,
    project,
    region,
    base,
  }
}

export async function triggerRelevanceAgent(content: string) {
  const cfg = relevanceConfig()
  if (!cfg.configured) {
    return { ok: false as const, status: 0, body: { error: "Relevance is not configured" } }
  }
  const res = await fetch(`${cfg.base}/agents/trigger`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: cfg.apiKey,
    },
    body: JSON.stringify({
      agent_id: cfg.agentId,
      message: { role: "user", content },
    }),
  })
  const text = await res.text()
  let body: unknown = text
  try {
    body = JSON.parse(text)
  } catch {
    /* keep text */
  }
  return { ok: res.ok, status: res.status, body }
}
