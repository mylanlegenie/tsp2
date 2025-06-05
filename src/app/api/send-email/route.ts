import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
    try {
        const { email, type, message, honeypot, recaptchaToken } = await req.json();

        // 🛡️ Anti-spam : champ caché
        if (honeypot) {
            return NextResponse.json({ success: false, error: "Bot détecté (honeypot)" }, { status: 403 });
        }

        // ✅ Vérification des champs
        if (!email || !type || !message || !recaptchaToken) {
            return NextResponse.json({ success: false, error: "Champs requis manquants" }, { status: 400 });
        }

        // 📩 Vérification du reCAPTCHA v2
        const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        });

        const recaptchaData = await recaptchaRes.json();

        if (!recaptchaData.success) {
            console.warn("Échec reCAPTCHA :", recaptchaData);
            return NextResponse.json({ success: false, error: "Échec de vérification reCAPTCHA" }, { status: 403 });
        }

        // ✅ Envoi de l'email avec Resend
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [process.env.DEST_EMAIL!, email],
            replyTo: email,
            subject: `Nouveau message de contact : ${type}`,
            html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px;">
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Type :</strong> ${type}</p>
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        </div>
      `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);

        const errorMsg = error instanceof Error ? error.message : "Erreur inconnue";

        return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
    }
}
