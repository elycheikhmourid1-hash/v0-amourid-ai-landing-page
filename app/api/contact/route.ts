import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Here we use the key you saved in Vercel settings
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, company, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'AICore Digital <onboarding@resend.dev>',
      to: ['contact@aicoredigital.com'],
      subject: `New Lead: ${firstName} ${lastName} - ${company}`,
      html: `
<div style="font-family: Arial, sans-serif; padding: 20px;">
<h2 style="color: #7c3aed;">New AI Strategy Inquiry</h2>
<p><strong>Client:</strong> ${firstName} ${lastName}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'N/A'}</p>
<p><strong>Message:</strong></p>
<div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</div>
</div>
`,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}