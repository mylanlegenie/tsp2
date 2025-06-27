"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { PreloadImageLink } from "../components/Preload";

export default function HomePage() {
    const [textVisible, setTextVisible] = useState(false);
    const controlsLine = useAnimation();
    const controlsH2 = useAnimation();

    useEffect(() => {
        const timers = [
            setTimeout(() => setTextVisible(true), 150), // ← divisé par 2
            setTimeout(async () => {
                await controlsLine.start({
                    width: "100%",
                    opacity: 1,
                    scaleX: 1,
                    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
                });

                await controlsLine.start({
                    scaleX: 0,
                    opacity: 0,
                    transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
                });

                await controlsH2.start({
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1] },
                });
            }, 500), // ← divisé par 2 aussi
        ];

        return () => timers.forEach(clearTimeout);
    }, [controlsLine, controlsH2]);
    return (
        <div className="relative overflow-x-hidden min-h-screen">
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    opacity: { duration: 0.4, ease: "easeInOut" },
                    scale: { duration: 0.8, ease: "easeInOut" },
                }}
            >
                <Image
                    src="/image-provisoire.webp"
                    alt="Image de fond de taxi professionnel à Paris"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="/image-provisoire.webp"
                    quality={85}
                />
            </motion.div>

            {/* Overlay sombre */}
            <motion.div
                className="absolute inset-0 bg-black/60 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />

            {/* Contenu principal */}
            <div className="relative z-20 flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-white text-center px-6">
                <div className="relative overflow-hidden inline-block mb-6">
                    {/* Animation de balayage blanc */}
                    <motion.div
                        className="absolute inset-0 bg-white z-20"
                        initial={{ x: "-100%" }}
                        animate={textVisible ? { x: "100%" } : {}}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />

                    {/* Titre principal */}
                    <motion.h1
                        className="relative z-10 text-4xl md:text-6xl font-extrabold drop-shadow-lg text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={textVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                    >
                        Votre flotte de 70 taxis à Paris
                    </motion.h1>

                    {/* Barre blanche animée */}
                    <motion.div
                        className="h-[4px] bg-white rounded-full mt-3 origin-center"
                        initial={{ width: 0, opacity: 0, scaleX: 1 }}
                        animate={controlsLine}
                    />
                </div>

                {/* Sous-titre */}
                <motion.h2
                    className="text-xl md:text-2xl font-medium drop-shadow-md"
                    initial={{ opacity: 0, y: 30 }}
                    animate={controlsH2}
                >
                    Pour les professionnels exigeants, ponctuels et discrets.
                </motion.h2>
            </div>

            <PreloadImageLink />
        </div>
    );
}
