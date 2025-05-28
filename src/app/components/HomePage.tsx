"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const transition = {
    duration: 0.8
}
export default function HomePage() {
    return (
        <div>
            <motion.div className="relative" initial={{ height: '10vh', width: '10vw' }} animate={{ height: 'calc(100vh - 10rem)', width: "100vw" }} transition={transition}>
                <Image
                    src="/image-provisoire.jpeg"
                    alt="Image d'un taxi devant l'arc de triomphe"
                    className="object-cover"
                    fill
                    priority
                />
            </motion.div>

        </div>
    );
}
