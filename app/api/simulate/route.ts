import { generateText, Output } from "ai"
import { z } from "zod"
import { buildHeuristicWorkflow } from "@/lib/workflow-engine"

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
  nodes: z.array(nodeSchema).min(3).max(7).describe("ordered steps from trigger -> ai processing -> actions"),
  hoursSavedPerWeek: z.number().describe("realistic estimate of human hours saved per week, 2-40"),
  monthlyTaskRuns: z.number().describe("realistic estimate of how many times this runs per month, 20-5000"),
  complexity: z.enum(["Simple", "Moderate", "Advanced"]),
})

export async function POST(req: Request) {
  let problem = ""
  try {
    const body = await req.json()
    problem = typeof body?.problem === "string" ? body.problem : ""
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 })
  }

  if (problem.trim().length < 3) {
    return Response.json({ error: "Please describe your business problem in a bit more detail." }, { status: 400 })
  }

  // Try the AI-powered architect first (richest results).
  try {
    const { experimental_output } = await generateText({
      model: "openai/gpt-5.4-mini",
      system:
        "You are a senior automation architect at AICore Digital, an AI automation agency. " +
        "Given a business problem, design a realistic, production-grade automation workflow. " +
        "Always start with exactly one trigger node, include at least one 'ai' reasoning node, and end with concrete action nodes. " +
        "Use real, well-known tool names (Telegram, WhatsApp, Slack, Gmail, Google Sheets, HubSpot, Salesforce, Stripe, Notion, Airtable, Webhook, Claude API). " +
        "Keep estimates realistic and grounded.",
      prompt: `Business problem: "${problem.trim()}"\n\nDesign the automation workflow.`,
      experimental_output: Output.object({ schema: workflowSchema }),
    })

    if (experimental_output) {
      return Response.json({ ...experimental_output, engine: "ai" })
    }
  } catch (err) {
    // Most common cause in this environment: AI Gateway needs billing enabled.
    // We degrade gracefully to the deterministic, input-aware engine below.
    console.log("[v0] AI generation unavailable, using heuristic engine:", (err as Error)?.message)
  }

  // Reliable, input-aware fallback — always returns a workflow tailored to the input.
  const workflow = buildHeuristicWorkflow(problem)
  return Response.json({ ...workflow, engine: "heuristic" })
}
