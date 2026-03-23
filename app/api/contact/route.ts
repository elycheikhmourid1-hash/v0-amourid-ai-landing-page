import { Browserbase } from "@browserbasehq/sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Parse incoming request body
    const body = await req.json();
    const { name, email, message } = body;

    // 2. Initialize Browserbase with your environment variables
    const bb = new Browserbase({
      apiKey: process.env.BROWSERBASE_API_KEY,
    });

    // 3. Create a cloud automation session
    const session = await bb.sessions.create({
      projectId: process.env.BROWSERBASE_PROJECT_ID!,
    });

    // 4. Return success response as JSON
    return NextResponse.json({
      status: "success",
      id: session.id,
      received: { name, email }
    });

  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { status: "error", message: "Processing failed" },
      { status: 500 }
    );
  }
}