import { Browserbase } from "@browserbasehq/sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Check if variables are loaded
    if (!process.env.BROWSERBASE_API_KEY) {
       return NextResponse.json({ error: "Config missing" }, { status: 500 });
    }

    const bb = new Browserbase({
      apiKey: process.env.BROWSERBASE_API_KEY,
    });

    const session = await bb.sessions.create({
      projectId: process.env.BROWSERBASE_PROJECT_ID!,
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      user: body.name
    });

  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
