import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
    try {
        const { email, type, message, honeypot } = await req.json();

        // Anti-spam simple
        if (honeypot) {
            return NextResponse.json(
                { success: false, error: "Bot détecté." },
                { status: 403 }
            );
        }

        // Validation basique
        if (!email || !type || !message) {
            return NextResponse.json(
                { success: false, error: "Champs requis manquants." },
                { status: 400 }
            );
        }

        // Validation email (simple)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: "Email invalide." },
                { status: 400 }
            );
        }

        // Envoi de l'email
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

        const errorMsg =
            error instanceof Error ? error.message : "Erreur inconnue.";

        return NextResponse.json(
            { success: false, error: errorMsg },
            { status: 500 }
        );
    }
}
