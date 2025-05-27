"use client";
import { useState } from "react";
import '../globals.css';
import { motion } from "framer-motion";
import Logo from '../assets/vrailogo.svg';

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

// Function

function RubriquesDesktop({ lien, label }: RubriquesDesktopProps) {
    return <a href={lien} className="relative slide-in hover:text-blue-600 transition duration-300">{label}</a>
}
function RubriquesMobile({ lien, label, onClick }: RubriquesMobileProps) {
    return <a href={lien} onClick={onClick} className="text-gray-800">{label}</a>

}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="relative bg-white shadow-md px-6 py-4 w-full z-50">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="relative w-32 h-32 z-10">
                    <MotionLogo whileHover={{ color: '#1c398e' }} className="w-full h-full object-contain transition-transform duration-300" />
                </a>

                {/* Desktop menu */}
                <ul className="hidden md:flex gap-8 text-gray-700 font-medium z-0">
                    <li><RubriquesDesktop lien="#tarifs" label="Qui sommes nous ?"></RubriquesDesktop></li>
                    <li><RubriquesDesktop lien="#tarifs" label="Nos Tarifs"></RubriquesDesktop></li>
                    <li><RubriquesDesktop lien="#tarifs" label="Nous Contacter"></RubriquesDesktop></li>
                    <li><RubriquesDesktop lien="#tarifs" label="I don't know"></RubriquesDesktop></li>
                </ul>

                {/* Burger / Croix mobile */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="relative w-8 h-8 flex flex-col justify-center items-center gap-1 md:hidden z-10"
                    aria-label="Menu"
                >
                    <span className={`block h-0.5 w-6 bg-black transition-transform duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                    <span className={`block h-0.5 w-6 bg-black transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                    <span className={`block h-0.5 w-6 bg-black transition-transform duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <ul className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden z-0">
                    <li><RubriquesMobile lien="#tarifs" label="Qui sommes nous" onClick={() => setMenuOpen(false)} ></RubriquesMobile></li>
                    <li><RubriquesMobile lien="#tarifs" label="Qui sommes nous" onClick={() => setMenuOpen(false)} ></RubriquesMobile></li>
                    <li><RubriquesMobile lien="#tarifs" label="Qui sommes nous" onClick={() => setMenuOpen(false)} ></RubriquesMobile></li>
                    <li><RubriquesMobile lien="#tarifs" label="Qui sommes nous" onClick={() => setMenuOpen(false)} ></RubriquesMobile></li>
                </ul>
            )}
        </nav>
    );
}
