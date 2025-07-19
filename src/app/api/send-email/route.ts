import { Resend } from "resend";
import { z } from "zod";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const resend = new Resend(process.env.RESEND_API_KEY!);

// Initialiser Redis et le rate limiter
const redis = Redis.fromEnv();
const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 m"), // 3 requêtes par minute
    analytics: true,
});

const FormSchema = z.object({
    email: z.string().email("Email invalide"),
    message: z.string().min(10, "Message trop court").max(1000, "Message trop long"),
    honeypot: z.string().optional(),
    recaptchaToken: z.string().min(1, "reCAPTCHA manquant"),
});

export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") || "unknown";

        // Appliquer le rate limiter
        const { success } = await ratelimit.limit(ip);
        if (!success) {
            return NextResponse.json(
                { success: false, error: "Trop de tentatives. Réessayez plus tard." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const parsed = FormSchema.safeParse(body);

        if (!parsed.success) {
            const msg = parsed.error.errors.map((e) => e.message).join(", ");
            return NextResponse.json({ success: false, error: msg }, { status: 400 });
        }

        const { email, message, honeypot, recaptchaToken } = parsed.data;

        if (honeypot) {
            return NextResponse.json({ success: false, error: "Bot détecté (honeypot)" }, { status: 403 });
        }

        const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        });

        const recaptchaData = await recaptchaRes.json();
        if (!recaptchaData.success) {
            return NextResponse.json({ success: false, error: "Échec de vérification reCAPTCHA" }, { status: 403 });
        }

        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [process.env.DEST_EMAIL!, email],
            replyTo: email,
            subject: `Demande de devis`,
            html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f9f9f9; padding: 32px; border-radius: 12px; color: #222;">
          <h2 style="margin-top: 0; color: #0078d4;">Nouvelle demande de devis</h2>
          <table style="width: 100%; margin-bottom: 24px;">
            <tr>
              <td style="font-weight: bold; padding: 8px 0;">Contact :</td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
          </table>
          <div style="margin-bottom: 16px;">
            <span style="font-weight: bold;">Message :</span>
            <div style="margin-top: 8px; background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #eee; white-space: pre-line;">
              ${message}
            </div>
          </div>
        </div>
          `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        const msg = error instanceof Error ? error.message : "Erreur inconnue";
        return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
}
