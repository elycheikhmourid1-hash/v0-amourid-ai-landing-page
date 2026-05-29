import { buildHeuristicWorkflow } from "@/lib/workflow-engine"

export const maxDuration = 30

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

  // Deterministic, input-aware engine — no external AI package required.
  // This keeps the build dependency-free and the simulator instant + reliable.
  const workflow = buildHeuristicWorkflow(problem)
  return Response.json({ ...workflow, engine: "heuristic" })
}
