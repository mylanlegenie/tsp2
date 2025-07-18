"use client";
import { useState } from "react";
import '../globals.css';
import { motion, AnimatePresence } from "framer-motion";
import Logo from '../assets/vrailogo.svg';
import Link from "next/link";

const MotionLogo = motion(Logo);

// Props
type RubriquesDesktopProps = {
    lien: string;
    label: string;
    className?: string;
};

type RubriquesMobileProps = {
    lien: string;
    label: string;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;

};

function RubriquesDesktop({ lien, label }: RubriquesDesktopProps) {
    return <Link href={lien} className="relative slide-in hover:text-blue-600 transition duration-300">{label}</Link>
}
function RubriquesMobile({ lien, label, onClick }: RubriquesMobileProps) {
    return <Link href={lien} onClick={onClick} className="text-gray-800">{label}</Link>

}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="relative bg-white shadow-md px-6 py-4 w-full z-50 shrink-0">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative w-32 h-32 z-10">
                    <MotionLogo whileHover={{ color: '#1c398e' }} className="w-full h-full object-contain transition-transform duration-300" />
                </Link>

                {/* Desktop menu */}
                <ul className="hidden md:flex gap-8 text-gray-700 font-medium z-0">
                    <li><RubriquesDesktop lien="/qui-sommes-nous" label="Qui sommes-nous ?"></RubriquesDesktop></li>
                    <li><RubriquesDesktop lien="/devis" label="Demande de Devis"></RubriquesDesktop></li>
                    <li><RubriquesDesktop lien="/nous-contacter" label="Nous Contacter"></RubriquesDesktop></li>


                </ul>

                {/* Burger / Croix mobile */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="relative w-8 h-8 flex flex-col justify-center items-center gap-1 md:hidden z-10 select-none"
                    aria-label="Menu"
                >
                    <span className={`block h-0.5 w-6 bg-black transition-transform duration-300 ease-in-out  ${menuOpen ? "rotate-45 translate-y-1.5" : "rounded-2xl"}`} />
                    <span className={`block h-0.5 bg-black transition-opacity duration-300  ${menuOpen ? "burger-animate" : "opacity-100 rounded-2xl w-6"}`} />
                    <span className={`block h-0.5 w-6 bg-black transition-transform duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-1.5" : "rounded-2xl"}`} />
                </button>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.ul
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, }}
                        transition={{
                            duration: 0.35,
                            ease: [0.25, 0.8, 0.25, 1],
                        }}
                        className="absolute top-full left-0 w-full bg-white shadow-xl flex flex-col items-center py-6 space-y-6 md:hidden z-40 rounded-b-2xl"
                    >
                        <li><RubriquesMobile lien="/qui-sommes-nous" label="Qui sommes-nous" onClick={() => setMenuOpen(false)} /></li>
                        <li><RubriquesMobile lien="/devis" label="Demande de Devis" onClick={() => setMenuOpen(false)} /></li>
                        <li><RubriquesMobile lien="/nous-contacter" label="Nous Contacter" onClick={() => setMenuOpen(false)} /></li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
}
