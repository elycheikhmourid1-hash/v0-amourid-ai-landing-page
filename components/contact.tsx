import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Ici, nous utilisons la clé que vous avez enregistrée dans les paramètres Vercel
const resend = new Resend(process.env.RESEND_API_CLÉ);

export async function POST(req: Request) {
essayer {
    const corps = await req.json();
    const { prénom, nom, email, entreprise, message } = corps;

    const { data, error } = await resend.emails.send({
      de: 'AICore Digital < onboarding@resend.dev >',
      à: [' contact@aicoredigital.com '],
      Objet: `Nouveau prospect : ${firstName} ${lastName} - ${company}`,
      html: `
<div style="font-family: Arial, sans-serif; padding: 20px;">
<h2 style="color: #7c3aed;">Nouvelle enquête sur la stratégie en matière d'IA</h2>
<p><strong>Client :</strong> ${firstName} ${lastName}</p>
<p><strong>Courriel :</strong> ${email}</p>
<p><strong>Entreprise :</strong> ${company || 'N/A'}</p>
<p><strong>Message :</strong></p>
<div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</div>
</div>
`,
    });

    si(erreur) {
renvoie NextResponse.json({ erreur }, { statut: 400 });
    }

renvoie NextResponse.json({ success: true, data });
  } attraper(erreur) {
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}