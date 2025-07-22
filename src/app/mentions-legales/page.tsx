'use client'
import { motion } from "framer-motion";




export default function MentionsLegales() {
    return (
        <main className="min-h-screen bg-gray-50 py-16 px-4 flex items-center justify-center">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8 md:p-12 text-gray-800"
            >
                <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
                    Mentions légales
                </h1>

                <div className="space-y-8 text-[17px] leading-relaxed">
                    {/* Informations générales */}
                    <div>
                        <h2 className="font-semibold text-xl text-gray-700 mb-2">
                            Informations générales
                        </h2>
                        <ul className="space-y-1">
                            <li><strong>Nom de la société :</strong> Taxis Services Pro</li>
                            <li><strong>Forme juridique :</strong> SARL au capital de …… €</li>
                            <li><strong>SIRET :</strong> 123 456 789 00012</li>
                            <li><strong>Siège social :</strong> 0 rue de ……, 75000 Paris</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="font-semibold text-xl text-gray-700 mb-2">Contact</h2>
                        <ul className="space-y-1">
                            <li><strong>Téléphone :</strong> 01 23 45 67 89</li>
                            <li className="flex">
                                <strong>Email : </strong>
                                <span className="text-blue-600 hover:underline"> contact@taxis-service-pro.fr</span>
                            </li>
                        </ul>
                    </div>

                    {/* Responsable */}
                    <div>
                        <h2 className="font-semibold text-xl text-gray-700 mb-2">
                            Responsable de la publication
                        </h2>
                        <p>Djaffar Hachemane</p>
                    </div>

                    {/* Hébergeur */}
                    <div>
                        <h2 className="font-semibold text-xl text-gray-700 mb-2">Hébergement</h2>
                        <p>
                            Le site est hébergé par <strong>VERCEL INC</strong>, 650 California St, San Francisco, CA 94108, États-Unis
                        </p>
                    </div>
                </div>
            </motion.section>
        </main >
    );
}
