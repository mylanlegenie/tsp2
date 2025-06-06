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
    type: z.enum(["handicap", "assurance"]),
    message: z.string().min(10, "Message trop court").max(1000, "Message trop long"),
    honeypot: z.string().optional(),
    recaptchaToken: z.string().min(1, "reCAPTCHA manquant"),
});

export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") || "unknown";

        // Appliquer le rate limiter
        const { success, limit, remaining, reset } = await ratelimit.limit(ip);
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

        const { email, type, message, honeypot, recaptchaToken } = parsed.data;

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
        const msg = error instanceof Error ? error.message : "Erreur inconnue";
        return NextResponse.json({ success: false, error: msg }, { status: 500 });
    }
}
