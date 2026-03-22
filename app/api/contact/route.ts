import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, company, message } = body;

    const data = await resend.emails.send({
      from: 'AICore Digital <onboarding@resend.dev>',
      to: ['contact@aicoredigital.com'],
      subject: `New Lead: ${firstName} from ${company}`,
      html: `
<p><strong>Name:</strong> ${firstName} ${lastName}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company}</p>
<p><strong>Message:</strong> ${message}</p>
`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
