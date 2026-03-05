import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, company, phone, message, source } = body

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      )
    }

    const isLeadForm = source === "lead-form"
    const subjectLine = isLeadForm
      ? `New automation lead from ${firstName}`
      : `New consultation request from ${firstName} ${lastName || ""}`

    const subject = encodeURIComponent(subjectLine)
    const bodyText = [
      `Name: ${firstName} ${lastName || ""}`.trim(),
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      company ? `Company: ${company}` : null,
      isLeadForm ? `Source: Free Automation Lead Form` : null,
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
