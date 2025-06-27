"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t-2 text-gray-600 text-sm py-6 w-full">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-center md:text-left">
                    &copy; {new Date().getFullYear()} Taxis Service Pro. Tous droits réservés.
                </p>
                <div className="flex gap-6 justify-center md:justify-end">
                    <Link href="/mentions-legales" className="hover:text-gray-900 transition">
                        Mentions légales
                    </Link>
                    <Link href="/politique-confidentialite" className="hover:text-gray-900 transition">
                        Confidentialité
                    </Link>
                    <Link href="/nous-contacter" className="hover:text-gray-900 transition">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}
