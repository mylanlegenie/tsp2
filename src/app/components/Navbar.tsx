"use client";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="relative bg-white shadow-md px-6 py-4 w-full z-50">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <a href="" className="relative w-32 h-22 md:h-22 z-10">
                    <Image
                        src="/logo.svg"
                        alt="Logo de TSP"
                        fill
                        className="object-contain"
                        sizes="(max-width:768px) 112px, 160px"
                    />
                </a>

                {/* Desktop menu */}
                <ul className="hidden md:flex gap-8 text-gray-700 font-medium z-0">
                    <li><a href="#tarifs" className="hover:text-blue-600 duration-400 transition">Qui sommes-nous</a></li>
                    <li><a href="#tarifs" className="hover:text-blue-600 transition">Nos Tarifs</a></li>
                    <li><a href="#contacts" className="hover:text-blue-600 transition">Nous Contacter</a></li>
                    <li><a href="#autre" className="hover:text-blue-600 transition">Un Truc</a></li>
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
                    <li><a href="#tarifs" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600">Qui sommes-nous</a></li>

                    <li><a href="#tarifs" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600">Nos Tarifs</a></li>
                    <li><a href="#contacts" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600">Nous Contacter</a></li>
                    <li><a href="#autre" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600">Un Truc</a></li>
                </ul>
            )}
        </nav>
    );
}
