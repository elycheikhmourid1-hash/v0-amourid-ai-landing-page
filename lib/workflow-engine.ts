// Deterministic, input-aware workflow generator.
// Used as the reliable engine when the AI Gateway is unavailable (e.g. no billing),
// and as a structured fallback otherwise. It actually parses the user's text so
// every generated workflow reflects what they typed.

export type WorkflowNode = {
  id: string
  kind: "trigger" | "ai" | "action"
  title: string
  detail: string
  tool: string
}

export type Workflow = {
  title: string
  summary: string
  nodes: WorkflowNode[]
  hoursSavedPerWeek: number
  monthlyTaskRuns: number
  complexity: "Simple" | "Moderate" | "Advanced"
}

type ToolDef = {
  match: RegExp
  tool: string
  title: string
  detail: string
}

// Action integrations we can detect from free text.
const ACTION_TOOLS: ToolDef[] = [
  { match: /telegram/i, tool: "Telegram", title: "Telegram Alert", detail: "A formatted alert is pushed to your Telegram channel in real time." },
  { match: /whatsapp/i, tool: "WhatsApp", title: "WhatsApp Message", detail: "A templated WhatsApp message is sent to the relevant contact." },
  { match: /slack/i, tool: "Slack", title: "Slack Notification", detail: "A rich notification is posted to the chosen Slack channel." },
  { match: /discord/i, tool: "Discord", title: "Discord Post", detail: "An embed is posted to your Discord server." },
  { match: /\b(google )?sheets?\b/i, tool: "Google Sheets", title: "Log to Sheet", detail: "A new row is appended to your tracking spreadsheet for reporting." },
  { match: /notion/i, tool: "Notion", title: "Notion Record", detail: "A structured page is created in your Notion database." },
  { match: /airtable/i, tool: "Airtable", title: "Airtable Record", detail: "A record is created or updated in your Airtable base." },
  { match: /\b(hubspot|crm|salesforce|pipedrive)\b/i, tool: "CRM", title: "Update CRM", detail: "The enriched record is written back to your CRM instantly." },
  { match: /\b(gmail|email|mail|inbox)\b/i, tool: "Gmail", title: "Send Email", detail: "A personalized email is drafted and sent automatically." },
  { match: /\b(invoice|stripe|payment|pay|billing)\b/i, tool: "Stripe", title: "Issue Invoice", detail: "An invoice/receipt is generated and delivered to the customer." },
  { match: /\bcalendar|meeting|schedule|booking\b/i, tool: "Google Calendar", title: "Create Event", detail: "A calendar event/booking is created and invites are sent." },
  { match: /\b(twitter|x\.com|linkedin|instagram|facebook|social)\b/i, tool: "Social", title: "Publish Post", detail: "Content is formatted and published across your social channels." },
  { match: /\b(database|db|postgres|supabase|mysql)\b/i, tool: "Database", title: "Write to Database", detail: "The processed data is persisted to your database." },
]

// Trigger detection.
function detectTrigger(text: string): WorkflowNode {
  const t = text.toLowerCase()
  if (/\b(pay|payment|stripe|checkout|purchase|order|invoice|billing)\b/.test(t))
    return { id: "n1", kind: "trigger", title: "Payment Received", detail: "A successful payment or new order event kicks off the workflow.", tool: "Stripe" }
  if (/\b(email|mail|inbox|support ticket|ticket)\b/.test(t))
    return { id: "n1", kind: "trigger", title: "New Message", detail: "An incoming email or support ticket triggers the automation.", tool: "Gmail" }
  if (/\b(lead|form|signup|sign up|subscribe|contact)\b/.test(t))
    return { id: "n1", kind: "trigger", title: "New Lead", detail: "A form submission or signup fires a webhook to start the flow.", tool: "Webhook" }
  if (/\b(schedule|daily|weekly|every|cron|recurring|hourly)\b/.test(t))
    return { id: "n1", kind: "trigger", title: "Scheduled Run", detail: "A time-based schedule triggers the workflow automatically.", tool: "Scheduler" }
  if (/\b(blog|content|article|post|publish)\b/.test(t))
    return { id: "n1", kind: "trigger", title: "New Content", detail: "Newly published content is detected and enters the pipeline.", tool: "CMS" }
  return { id: "n1", kind: "trigger", title: "New Event", detail: "An incoming event or webhook starts the automation.", tool: "Webhook" }
}

// AI reasoning step, tailored a little to intent.
function detectAiStep(text: string): WorkflowNode {
  const t = text.toLowerCase()
  if (/\b(email|support|reply|respond|ticket)\b/.test(t))
    return { id: "n2", kind: "ai", title: "AI Triage & Draft", detail: "The message is classified by intent and a tailored reply is drafted.", tool: "Claude API" }
  if (/\b(lead|score|qualify|crm|sales)\b/.test(t))
    return { id: "n2", kind: "ai", title: "AI Enrichment", detail: "The record is enriched, scored, and a concise summary is generated.", tool: "Claude API" }
  if (/\b(content|blog|social|post|caption|summary|summarize)\b/.test(t))
    return { id: "n2", kind: "ai", title: "AI Content Engine", detail: "Channel-specific copy is generated and optimized automatically.", tool: "Claude API" }
  return { id: "n2", kind: "ai", title: "AI Processing", detail: "The payload is analyzed, structured, and routed by an AI reasoning step.", tool: "Claude API" }
}

// Curated, production-grade template that mirrors AICore Digital's real
// Make.com "Sales Outreach Agent" scenario, returned verbatim when the user's
// problem clearly maps to lead outreach.
function salesOutreachTemplate(): Workflow {
  return {
    title: "Sales Outreach Agent",
    summary:
      "A new lead in Google Sheets is enriched, personalized by Claude, emailed via Gmail automatically, and its status is written back — fully hands-off.",
    nodes: [
      { id: "n1", kind: "trigger", title: "New Lead Row", detail: "A new lead added to Google Sheets triggers the scenario instantly.", tool: "Google Sheets" },
      { id: "n2", kind: "action", title: "Enrich Data", detail: "An HTTP request enriches the lead with company and contact details.", tool: "HTTP" },
      { id: "n3", kind: "ai", title: "Personalize Outreach", detail: "Anthropic Claude drafts a tailored, human-quality outreach email.", tool: "Claude API" },
      { id: "n4", kind: "action", title: "Send Email", detail: "Gmail sends the personalized email to the lead automatically.", tool: "Gmail" },
      { id: "n5", kind: "action", title: "Update Status", detail: "The lead's status is written back to Google Sheets as 'Contacted'.", tool: "Google Sheets" },
    ],
    hoursSavedPerWeek: 18,
    monthlyTaskRuns: 1200,
    complexity: "Advanced",
  }
}

function isSalesOutreach(text: string): boolean {
  const t = text.toLowerCase()
  const outreach = /\b(outreach|cold email|cold outreach|sales email|prospect|prospecting|personalized email|reach out)\b/.test(t)
  const leadFlow = /\b(lead|leads)\b/.test(t) && /\b(email|gmail|outreach|enrich|personali[sz]e)\b/.test(t)
  return outreach || leadFlow
}

export function buildHeuristicWorkflow(problem: string): Workflow {
  const text = problem.trim()

  // Highest-priority: our flagship sales outreach scenario.
  if (isSalesOutreach(text)) return salesOutreachTemplate()

  const trigger = detectTrigger(text)
  const ai = detectAiStep(text)

  // Detect explicitly mentioned action tools, de-duplicated and excluding the trigger's tool.
  const seen = new Set<string>([trigger.tool])
  const actions: WorkflowNode[] = []
  for (const def of ACTION_TOOLS) {
    if (def.match.test(text) && !seen.has(def.tool)) {
      seen.add(def.tool)
      actions.push({
        id: `n${actions.length + 3}`,
        kind: "action",
        title: def.title,
        detail: def.detail,
        tool: def.tool,
      })
    }
  }

  // Guarantee at least two concrete actions so the graph always feels complete.
  if (actions.length === 0) {
    actions.push(
      { id: "n3", kind: "action", title: "Update System", detail: "The processed result is written back to your system of record.", tool: "CRM" },
      { id: "n4", kind: "action", title: "Notify Team", detail: "A formatted alert is sent to your team's channel.", tool: "Slack" },
    )
  } else if (actions.length === 1) {
    actions.push({ id: "n4", kind: "action", title: "Notify Team", detail: "A summary notification is sent so your team stays in the loop.", tool: "Slack" })
  }

  const nodes = [trigger, ai, ...actions].slice(0, 7)

  // Complexity + ROI scale with the number of integrations involved.
  const stepCount = nodes.length
  const complexity: Workflow["complexity"] =
    stepCount >= 6 ? "Advanced" : stepCount >= 4 ? "Moderate" : "Simple"
  const hoursSavedPerWeek = Math.min(40, 4 + (stepCount - 2) * 3 + actions.length * 2)
  const monthlyTaskRuns = Math.round((120 + actions.length * 140) * (complexity === "Advanced" ? 2.2 : complexity === "Moderate" ? 1.5 : 1))

  const focus = actions.map((a) => a.tool).slice(0, 3).join(", ")
  const title =
    focus.length > 0 ? `${trigger.tool} → ${actions[0].tool} Automation` : "Custom Automation Flow"

  return {
    title,
    summary: `${trigger.title} triggers an AI step that processes the data, then ${
      focus ? `syncs it to ${focus}` : "updates your tools and notifies your team"
    } — fully automated, no manual work.`,
    nodes,
    hoursSavedPerWeek,
    monthlyTaskRuns,
    complexity,
  }
}
