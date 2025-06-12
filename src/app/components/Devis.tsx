"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";


export default function Devis() {
    const [hasMounted, setHasMounted] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [messageEnvoye, setMessageEnvoye] = useState(false);
    const [messageErreur, setMessageErreur] = useState(false);
    const [formTente, setFormTente] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLSelectElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const honeypotRef = useRef<HTMLInputElement>(null);
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);

    const [errors, setErrors] = useState<{ email?: string; type?: string; message?: string }>({});
    const [showText, setShowText] = useState(true);
    const [showLetter, setShowLetter] = useState(false);
    const [showCar, setShowCar] = useState(false);
    const [showRoad, setShowRoad] = useState(false);

    const letterControls = useAnimation();
    const carControls = useAnimation();
    const roadControls = useAnimation();
    const shakeControls = useAnimation();

    useEffect(() => setHasMounted(true), []);

    const validate = () => {
        const newErrors: typeof errors = {};
        const email = emailRef.current?.value.trim() || "";
        const type = typeRef.current?.value.trim() || "";
        const message = messageRef.current?.value.trim() || "";

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Email invalide";
        }

        if (!type) {
            newErrors.type = "Veuillez choisir un type";
        }

        if (!message) {
            newErrors.message = "Message requis";
        } else if (message.length < 10) {
            newErrors.message = "Message trop court (10 caractères min)";
        } else if (message.length > 1000) {
            newErrors.message = "Message trop long (1000 caractères max)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormTente(true);
        if (disabled) return;

        const isValid = validate();
        if (!isValid) {
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            await shakeControls.start({ x: [-10, 10, -8, 8, -5, 5, 0], transition: { duration: 0.5 } });
            return;
        }

        const email = emailRef.current!.value.trim();
        const type = typeRef.current!.value.trim();
        const message = messageRef.current!.value.trim();
        const honeypot = honeypotRef.current?.value || "";
        const token = recaptchaRef.current?.getValue();

        if (!token) {
            setMessageErreur(true);
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }

        setDisabled(true);
        setShowText(false);
        setShowLetter(true);
        setShowCar(true);
        setShowRoad(true);

        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, type, message, honeypot, recaptchaToken: token }),
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.error);
        } catch {
            setMessageErreur(true);
            setDisabled(false);
            setShowText(true);
            setTimeout(() => setMessageErreur(false), 4000);
            return;
        }

        await letterControls.start({ y: -20, opacity: 1, transition: { duration: 0.4 } });
        roadControls.start({ width: "100%", transition: { duration: 0.5 } });
        await carControls.start({ x: 0, transition: { duration: 1.5 } });
        await new Promise((res) => setTimeout(res, 1000));
        await letterControls.start({ y: 30, opacity: 0, transition: { duration: 0.4 } });

        setShowLetter(false);
        await carControls.start({ x: "100vw", transition: { duration: 1.3 } });

        setShowCar(false);
        setShowRoad(false);
        roadControls.set({ width: "0%" });
        setMessageEnvoye(true);

        emailRef.current!.value = "";
        typeRef.current!.value = "";
        messageRef.current!.value = "";
        recaptchaRef.current?.reset();

        setTimeout(() => {
            setDisabled(false);
            setShowText(true);
            setMessageEnvoye(false);
            setFormTente(false);
            setErrors({});
        }, 4000);
    };

    if (!hasMounted) return null;

    return (
        <div className="flex justify-center bg-gradient-to-b from-sky-100 to-white px-4 py-20 min-h-screen">
            <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                animate={shakeControls}
                className="w-full max-w-xl bg-white p-10 rounded-2xl shadow-xl space-y-8 relative border border-gray-200"
                noValidate
            >
                <h2 className="text-3xl font-extrabold text-center text-gray-800">Demande de Devis</h2>

                {formTente && Object.keys(errors).length > 0 && (
                    <div className="bg-red-100 text-red-700 px-4 py-3 rounded text-sm font-medium">
                        ❌ Merci de corriger les erreurs dans le formulaire.
                    </div>
                )}

                <input ref={honeypotRef} type="text" name="honeypot" className="hidden" />

                <div className="space-y-5">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            ref={emailRef}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="nom@exemple.com"
                            required
                            maxLength={100}
                            autoComplete="email"
                            inputMode="email"
                            aria-invalid={!!errors.email}
                            className={`border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {formTente && errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="type" className="text-sm font-medium text-gray-700">Type de devis</label>
                        <select
                            ref={typeRef}
                            id="type"
                            name="type"
                            required
                            aria-invalid={!!errors.type}
                            className={`border rounded-md px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.type ? "border-red-500" : "border-gray-300"
                                }`}
                        >
                            <option value="">Choisissez une option</option>
                            <option value="handicap">Pour handicapée</option>
                            <option value="assurance">Assurance</option>
                        </select>
                        {formTente && errors.type && <span className="text-red-500 text-sm">{errors.type}</span>}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            ref={messageRef}
                            id="message"
                            name="message"
                            rows={5}
                            placeholder="Décrivez votre demande..."
                            required
                            maxLength={1000}
                            aria-invalid={!!errors.message}
                            className={`border rounded-md px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 ${errors.message ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {formTente && errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
                    </div>
                </div>

                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Lfq_lcrAAAAAAbwc0G6p1nJDerTu54cO9CiwxFD"
                    size="normal"
                />


                <Button
                    type="submit"
                    disabled={disabled}
                    className={`relative w-full h-12 rounded-md font-semibold text-white bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 transition duration-300 ease-in-out overflow-hidden ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    asChild
                >
                    <motion.div className="relative w-full h-12 flex items-center justify-center">
                        {/* Texte + icône */}
                        {showText && (
                            <motion.span className="absolute flex items-center gap-2">
                                Envoyer
                                {disabled && (
                                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                )}
                            </motion.span>
                        )}
                        {showLetter && (
                            <motion.span className="absolute" initial={{ y: 10, opacity: 0 }} animate={letterControls}>
                                ✉️
                            </motion.span>
                        )}

                        {/* Animations externes */}
                        {showCar && (
                            <motion.div
                                initial={{ x: "-100vw" }}
                                animate={carControls}
                                className="absolute -bottom-1 left-1/2 w-16 h-auto z-10 -translate-x-1/2"
                            >
                                <Image src="/voiture.svg" alt="voiture" width={64} height={40} priority />
                            </motion.div>
                        )}

                        {showRoad && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={roadControls}
                                className="absolute bottom-0 left-0 h-2 bg-gray-500 w-full z-0 overflow-hidden rounded"
                            >
                                <div className="flex justify-between items-center px-2 w-full h-full">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <span key={i} className="w-2 h-1 bg-white rounded-sm" />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </Button>

                <div aria-live="polite">
                    {messageEnvoye && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center text-green-600 font-medium pt-2"
                        >
                            ✅ Message envoyé avec succès
                        </motion.p>
                    )}
                    {messageErreur && formTente && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center text-red-600 font-medium pt-2"
                        >
                            ❌ Une erreur est survenue lors de l’envoi. Veuillez réessayer.
                        </motion.p>
                    )}
                </div>
            </motion.form>
        </div>
    );
}
