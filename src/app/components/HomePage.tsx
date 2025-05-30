"use client";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

export default function HomePage() {
    const [showImage, setShowImage] = useState(false);
    const [showText, setShowText] = useState(false);
    const [triggerLine, setTriggerLine] = useState(false);

    const controlsLine = useAnimation();
    const controlsH2 = useAnimation();

    useEffect(() => {
        const imageTimer = setTimeout(() => setShowImage(true), 300);
        const textTimer = setTimeout(() => setShowText(true), 700);
        const lineTimer = setTimeout(() => setTriggerLine(true), 1100);

        return () => {
            clearTimeout(imageTimer);
            clearTimeout(textTimer);
            clearTimeout(lineTimer);
        };
    }, []);

    useEffect(() => {
        if (!triggerLine) return;

        const sequence = async () => {
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
        };

        sequence();
    }, [triggerLine, controlsLine, controlsH2]);

    return (
        <div className="relative overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-[url(/image-provisoire.jpeg)] bg-cover bg-center bg-no-repeat z-0"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: showImage ? 1 : 0, scale: showImage ? 1 : 0.85 }}
                transition={{
                    opacity: { duration: 1, ease: "easeInOut" },
                    scale: { duration: 1.2, ease: "easeInOut" },
                }}
            />

            <motion.div
                className="absolute inset-0 bg-black/60 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            />

            <div className="relative z-20 flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-white text-center px-6">
                <div className="relative overflow-hidden inline-block mb-6">
                    <motion.div
                        className="absolute inset-0 bg-white z-20"
                        initial={{ x: "-100%" }}
                        animate={showText ? { x: "100%" } : {}}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />

                    <motion.h1
                        className="relative z-10 text-4xl md:text-6xl font-extrabold drop-shadow-lg text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={showText ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                    >
                        Votre flotte de 70 taxis à Paris
                    </motion.h1>

                    <motion.div
                        className="h-[4px] bg-white rounded-full mt-3 origin-center"
                        initial={{ width: 0, opacity: 0, scaleX: 1 }}
                        animate={controlsLine}
                    />
                </div>

                <motion.h2
                    className="text-xl md:text-2xl font-medium drop-shadow-md"
                    initial={{ opacity: 0, y: 30 }}
                    animate={controlsH2}
                >
                    Pour les professionnels exigeants, ponctuels et discrets.
                </motion.h2>
            </div>
        </div>
    );
}
