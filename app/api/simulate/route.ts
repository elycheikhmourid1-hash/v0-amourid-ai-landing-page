import { generateText, Output } from "ai"
import { z } from "zod"

export const maxDuration = 30

const nodeSchema = z.object({
  id: z.string().describe("short unique id like 'n1', 'n2'"),
  kind: z
    .enum(["trigger", "ai", "action"])
    .describe("trigger = the event that starts it, ai = an AI reasoning/processing step, action = a concrete output/integration"),
  title: z.string().describe("short 2-4 word title, e.g. 'New CRM Lead'"),
  detail: z.string().describe("one concise sentence describing what happens here"),
  tool: z
    .string()
    .describe("the integration/tool name involved, e.g. 'Telegram', 'Claude API', 'Google Sheets', 'Webhook', 'HubSpot'"),
})

const workflowSchema = z.object({
  title: z.string().describe("a punchy 3-6 word name for this automation"),
  summary: z.string().describe("one sentence explaining the end-to-end outcome for the business"),
  nodes: z
    .array(nodeSchema)
    .min(3)
    .max(7)
    .describe("ordered steps from trigger -> ai processing -> actions"),
  hoursSavedPerWeek: z.number().describe("realistic estimate of human hours saved per week, 2-40"),
  monthlyTaskRuns: z.number().describe("realistic estimate of how many times this runs per month, 20-5000"),
  complexity: z.enum(["Simple", "Moderate", "Advanced"]),
})

export type SimulatedWorkflow = z.infer<typeof workflowSchema>

const FALLBACK: SimulatedWorkflow = {
  title: "CRM → Alerts Sync",
  summary: "New leads are captured, enriched by AI, then synced to your tools and team channels automatically.",
  nodes: [
    { id: "n1", kind: "trigger", title: "New Lead Arrives", detail: "A form submission or webhook fires when a lead is created.", tool: "Webhook" },
    { id: "n2", kind: "ai", title: "AI Enrichment", detail: "The lead is classified, scored, and a tailored summary is drafted.", tool: "Claude API" },
    { id: "n3", kind: "action", title: "Update CRM", detail: "The enriched record is written back to your CRM instantly.", tool: "HubSpot" },
    { id: "n4", kind: "action", title: "Notify Team", detail: "A formatted alert is pushed to your Telegram channel.", tool: "Telegram" },
    { id: "n5", kind: "action", title: "Log to Sheet", detail: "A row is appended to your tracking spreadsheet for reporting.", tool: "Google Sheets" },
  ],
  hoursSavedPerWeek: 12,
  monthlyTaskRuns: 640,
  complexity: "Moderate",
}

export async function POST(req: Request) {
  try {
    const { problem } = await req.json()

    if (!problem || typeof problem !== "string" || problem.trim().length < 3) {
      return Response.json({ error: "Please describe your business problem." }, { status: 400 })
    }

    const { experimental_output } = await generateText({
      model: "openai/gpt-5.4-mini",
      system:
        "You are a senior automation architect at AICore Digital, an AI automation agency. " +
        "Given a business problem, design a realistic, production-grade automation workflow. " +
        "Always start with exactly one trigger node, include at least one 'ai' reasoning node, and end with concrete action nodes. " +
        "Use real, well-known tool names (Telegram, WhatsApp, Slack, Gmail, Google Sheets, HubSpot, Salesforce, Stripe, Notion, Airtable, Webhook, Claude API, n8n, Zapier). " +
        "Keep estimates realistic and grounded.",
      prompt: `Business problem: "${problem.trim()}"\n\nDesign the automation workflow.`,
      experimental_output: Output.object({ schema: workflowSchema }),
    })

    return Response.json(experimental_output ?? FALLBACK)
  } catch (err) {
    console.error("[v0] simulate error:", err)
    // Never leave the client empty-handed — return a sensible fallback.
    return Response.json(FALLBACK)
  }
}
