import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = "elycheikhmourid1@gmail.com"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      company,
      phone,
      message,
      source,
      _trap,
    } = body

    // Honeypot: real users never fill this hidden field. Bots do.
    // Silently accept to avoid tipping off the bot, but don't send anything.
    if (_trap) {
      return NextResponse.json({ success: true })
    }

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      )
    }

    const isLeadForm = source === "lead-form"
    const subject = isLeadForm
      ? `New automation lead from ${firstName}`
      : `New consultation request from ${firstName}${lastName ? ` ${lastName}` : ""}`

    const rows = [
      ["Name", `${firstName}${lastName ? ` ${lastName}` : ""}`],
      ["Email", email],
      phone ? ["Phone", phone] : null,
      company ? ["Company", company] : null,
      isLeadForm ? ["Source", "Free Automation Lead Form"] : null,
    ].filter(Boolean) as [string, string][]

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color: #7c3aed;">${subject}</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="padding: 8px 0; font-weight: 600; width: 120px; color: #475569;">${label}</td><td style="padding: 8px 0; color: #0f172a;">${value}</td></tr>`
            )
            .join("")}
        </table>
        <div style="padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 8px; font-weight: 600; color: #475569;">Message</p>
          <p style="margin: 0; white-space: pre-wrap; color: #0f172a;">${message}</p>
        </div>
      </div>
    `

    const { error } = await resend.emails.send({
      from: "AICore Digital <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[v0] Contact route error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
