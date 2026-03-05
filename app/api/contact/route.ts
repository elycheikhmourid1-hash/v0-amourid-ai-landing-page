import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, company, message } = body

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "First name, email, and message are required." },
        { status: 400 }
      )
    }

    const subject = encodeURIComponent(
      `New consultation request from ${firstName} ${lastName || ""}`
    )
    const bodyText = [
      `Name: ${firstName} ${lastName || ""}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      `\nMessage:\n${message}`,
    ]
      .filter(Boolean)
      .join("\n")

    const mailtoUrl = `mailto:elycheikhmourid1@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`

    return NextResponse.json({ success: true, mailtoUrl })
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
