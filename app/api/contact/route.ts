import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = "elycheikhmourid1@gmail.com"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, company, message, source } = body

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      )
    }

    const isLeadForm = source === "lead-form"

    const subjectLine = isLeadForm
      ? `[AImouridAI Lead] New automation request from ${firstName}`
      : `[AImouridAI] Consultation request from ${firstName} ${lastName || ""}`.trim()

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #0d9488; padding: 20px 24px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px;">
            ${isLeadForm ? "New Automation Lead" : "New Consultation Request"}
          </h2>
        </div>
        <div style="background-color: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${firstName} ${lastName || ""}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Email</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                <a href="mailto:${email}" style="color: #0d9488; text-decoration: none;">${email}</a>
              </td>
            </tr>
            ${
              phone
                ? `<tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Phone</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                <a href="tel:${phone}" style="color: #0d9488; text-decoration: none;">${phone}</a>
              </td>
            </tr>`
                : ""
            }
            ${
              company
                ? `<tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Company</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">${company}</td>
            </tr>`
                : ""
            }
            ${
              isLeadForm
                ? `<tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Source</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                <span style="background-color: #0d948820; color: #0d9488; padding: 2px 8px; border-radius: 4px; font-size: 12px;">Free Automation Lead Form</span>
              </td>
            </tr>`
                : ""
            }
          </table>
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">Message</p>
            <div style="background-color: #ffffff; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb;">
              <p style="color: #111827; font-size: 14px; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
            Reply directly to this email to respond to ${firstName}.
          </p>
        </div>
      </div>
    `

    const { error: sendError } = await resend.emails.send({
      from: "AImouridAI <onboarding@resend.dev>",
      to: [TO_EMAIL],
      replyTo: email,
      subject: subjectLine,
      html: htmlBody,
    })

    if (sendError) {
      console.error("Resend error:", sendError)
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
