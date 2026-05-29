import { NextResponse } from "next/server"
import { checkPassword } from "@/lib/auth"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const p = url.searchParams.get("p") ?? ""
  const expected = process.env.DASHBOARD_PASSWORD ?? ""
  return NextResponse.json({
    expectedLen: expected.length,
    secretSet: !!process.env.DASHBOARD_SECRET,
    receivedLen: p.length,
    matches: checkPassword(p),
    nodeEnv: process.env.NODE_ENV,
  })
}
