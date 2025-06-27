"use client";

import { motion } from "framer/motion";

export default function AboutPage() {
    return (
        <main className="relative bg-gradient-to-br from-blue-50 via-white to-gray-100 px-6 md:px-20 py-24 overflow-hidden text-gray-800 space-y-32">
            {/* Background animé */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/30 to-transparent -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {/* Section 1 : Présentation */}
            <section className="max-w-4xl mx-auto">
                <motion.h1
                    className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-sm text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    Qui sommes-nous ?
                </motion.h1>

                <motion.div
                    className="w-20 h-1 bg-blue-600 mb-10 mx-auto rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "center" }}
                />

                <div className="space-y-6 text-lg leading-relaxed text-center">
                    {[
                        "Taxis Service Pro (TSP) est une entreprise de taxi, fondée sur des valeurs de ponctualité, de sécurité et de service personnalisé. Basés à Paris, nous mettons à votre disposition une flotte de véhicules confortables et des chauffeurs professionnels disponibles 7j/7 et 24h/24.",
                        "Que ce soit pour un trajet local, un transfert vers une gare ou un aéroport, un déplacement professionnel ou un événement privé, TSP s’adapte à vos besoins pour vous offrir une expérience de transport fluide et agréable.",
                        "Notre mission : vous conduire sereinement, avec efficacité et courtoisie, en respectant vos impératifs de temps et de confort.",
                        "En choisissant Taxis Service Pro, vous optez pour une entreprise de proximité, à l’écoute de ses clients et engagée à fournir un service de qualité.",
                    ].map((text, i) => (
                        <motion.p
                            key={i}
                            className="text-gray-700 max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: i * 0.2 }}
                            viewport={{ once: true, amount: 0.6 }}
                        >
                            {text}
                        </motion.p>
                    ))}
                </div>
            </section>

            {/* Section 2 : Nos valeurs */}
            <section className="max-w-5xl mx-auto text-center">
                <motion.h2
                    className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    Nos valeurs fondamentales
                </motion.h2>
                <motion.div
                    className="w-12 h-1 bg-blue-600 mx-auto mb-10 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "center" }}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Ponctualité",
                            desc: "Nous garantissons des trajets à l’heure, sans stress ni retard.",
                            icon: "⏱️",
                        },
                        {
                            title: "Sécurité",
                            desc: "Nos chauffeurs sont formés et nos véhicules contrôlés régulièrement.",
                            icon: "🛡️",
                        },
                        {
                            title: "Écoute",
                            desc: "Chaque client est unique. Nous adaptons notre service à vos besoins.",
                            icon: "👂",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="bg-white backdrop-blur-xl border border-gray-200 p-6 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-4xl mb-3">{item.icon}</div>
                            <h3 className="text-blue-700 text-xl font-semibold mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Section 3 : Notre équipe */}
            <section className="max-w-4xl mx-auto text-center">
                <motion.h2
                    className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    Une équipe à votre service
                </motion.h2>
                <motion.div
                    className="w-12 h-1 bg-blue-600 mx-auto mb-10 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "center" }}
                />
                <motion.p
                    className="text-lg text-gray-700 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    Nos chauffeurs sont sélectionnés avec soin pour leur professionnalisme,
                    leur courtoisie et leur parfaite connaissance de la région. Disponibles,
                    ponctuels et discrets, ils sont le reflet de notre engagement envers un
                    service de qualité.
                </motion.p>
            </section>
            <section className="relative h-[60vh] overflow-hidden rounded-xl shadow-xl">
                <motion.div
                    className="absolute inset-0 bg-fixed bg-center bg-cover"
                    style={{ backgroundImage: "url('/images/flotte-tsp.jpg')" }}
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                />
                <div className="relative z-10 h-full w-full bg-black/50 flex items-center justify-center text-center px-6">
                    <motion.h2
                        className="text-white text-3xl md:text-4xl font-bold max-w-3xl"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Une flotte moderne et confortable, prête à vous conduire partout à Paris et en Île-de-France.
                    </motion.h2>
                    <p> Ajoutez images</p>

                </div>
            </section>

        </main>
    );
}
