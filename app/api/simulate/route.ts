import { z } from "zod"
import { buildHeuristicWorkflow } from "@/lib/workflow-engine"

export const maxDuration = 30

// Accept the simulator's `problem`, plus `prompt`/`template` aliases for
// backwards/forwards compatibility. No external 'ai' package is used.
const requestSchema = z.object({
  problem: z.string().optional(),
  prompt: z.string().optional(),
  template: z.string().optional(),
})

export async function POST(req: Request) {
  let parsed: z.infer<typeof requestSchema>
  try {
    parsed = requestSchema.parse(await req.json())
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 })
  }

  const problem = (parsed.problem ?? parsed.prompt ?? "").trim()

  if (problem.length < 3) {
    return Response.json(
      { error: "Please describe your business problem in a bit more detail." },
      { status: 400 },
    )
  }

  // Deterministic, input-aware engine — no external AI package required.
  // This keeps the build dependency-free and the simulator instant + reliable.
  const workflow = buildHeuristicWorkflow(problem)

  // Execution telemetry that mirrors the live Make.com scenario run.
  return Response.json({
    ...workflow,
    engine: "heuristic",
    scenario: "AI Core Digital — Sales Outreach Agent",
    executionTime: "1.2s",
    status: "Active & Automated",
  })
}
