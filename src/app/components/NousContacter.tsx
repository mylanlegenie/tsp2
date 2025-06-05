"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

export default function NousContacter() {
    const [hasMounted, setHasMounted] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [showText, setShowText] = useState(true);
    const [showLetter, setShowLetter] = useState(false);
    const [showCar, setShowCar] = useState(false);
    const [showRoad, setShowRoad] = useState(false);
    const [messageEnvoye, setMessageEnvoye] = useState(false);

    const letterControls = useAnimation();
    const carControls = useAnimation();
    const roadControls = useAnimation();

    useEffect(() => setHasMounted(true), []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (disabled) return;

        setDisabled(true);
        setShowText(false);
        setShowLetter(true);
        setShowCar(true);
        setShowRoad(true);

        await new Promise((res) => setTimeout(res, 50));

        await letterControls.start({
            y: -20,
            opacity: 1,
            transition: { duration: 0.4 },
        });

        roadControls.start({
            width: "100%",
            transition: { duration: 0.5, ease: "easeInOut" },
        });

        await carControls.start({
            x: 0,
            transition: { duration: 1.5, ease: "easeInOut" },
        });

        await new Promise((res) => setTimeout(res, 1000));

        await letterControls.start({
            y: 30,
            opacity: 0,
            transition: { duration: 0.4 },
        });

        setShowLetter(false);

        await carControls.start({
            x: "100vw",
            transition: { duration: 1.3, ease: "easeInOut" },
        });

        setShowCar(false);
        setShowRoad(false);
        roadControls.set({ width: "0%" });
        setMessageEnvoye(true);

        setTimeout(() => {
            setDisabled(false);
            setShowText(true);
            setMessageEnvoye(false);
        }, 4000);
    };

    if (!hasMounted) return null;

    return (
        <div className="flex justify-center bg-gradient-to-b from-sky-100 to-white px-4 py-20 min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl bg-white p-10 rounded-2xl shadow-xl space-y-8 relative border border-gray-200"
            >
                <h2 className="text-3xl font-extrabold text-center text-gray-800">Nous contacter</h2>

                <div className="space-y-5">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            aria-label="Adresse email"
                            placeholder="nom@exemple.com"
                            required
                            className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="type" className="text-sm font-medium text-gray-700">
                            Type de devis
                        </label>
                        <select
                            id="type"
                            required
                            aria-label="Type de devis"
                            className="border border-gray-300 rounded-md px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="">Choisissez une option</option>
                            <option value="handicap">Pour handicapé</option>
                            <option value="assurance">Assurance</option>
                        </select>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={5}
                            aria-label="Votre message"
                            placeholder="Décrivez votre demande..."
                            required
                            className="border border-gray-300 rounded-md px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>
                </div>

                <motion.button
                    type="submit"
                    disabled={disabled}
                    className={`relative w-full h-12 rounded-md font-semibold text-white bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 transition duration-300 ease-in-out overflow-hidden ${disabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    <div className="relative flex items-center justify-center h-full z-10">
                        {showText && <motion.span className="absolute">Envoyer</motion.span>}
                        {showLetter && (
                            <motion.span
                                className="absolute"
                                initial={{ y: 10, opacity: 0 }}
                                animate={letterControls}
                            >
                                ✉️
                            </motion.span>
                        )}
                    </div>

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

                </motion.button>

                {messageEnvoye && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-green-600 font-medium pt-2"
                    >
                        Message envoyé avec succès ✅
                    </motion.p>
                )}
            </form>
        </div>
    );
}
