"use client";
import { motion } from "framer-motion";

type Service = {
    title: string;
    description: string;
    icon: string;
};

const services: Service[] = [
    {
        title: "Transferts Aéroports",
        description: "Service fiable vers Roissy, Orly et Le Bourget, 24h/24, 7j/7.",
        icon: "🛫",
    },
    {
        title: "Mise à disposition",
        description: "Chauffeur privé pour événements, rendez-vous ou visites parisiennes.",
        icon: "🚖",
    },
    {
        title: "Courses professionnelles",
        description: "Ponctualité, confort et discrétion pour vos trajets d'affaires.",
        icon: "🏢",
    },
    {
        title: "Réservation par mail ou par téléphone",
        description: "trouver quelque chose",
        icon: "📲",
    },
    {
        title: "Transport d’enfants",
        description: "Accompagnement sécurisé entre le domicile et l’école.",
        icon: "🧒",
    },
    {
        title: "Assistance rapatriement",
        description: "Transport pour rapatriement, courte ou longue distance.",
        icon: "🚑",
    },
    {
        title: "Avance de fonds",
        description: "Service de soutien avec possibilité d’avance de frais.",
        icon: "💶",
    },
    {
        title: "Transport médical",
        description: "Déplacements vers hôpitaux et centres médicaux en toute sécurité.",
        icon: "🏥",
    },
    {
        title: "Transport de colis",
        description: "Livraison rapide et sécurisée partout en France.",
        icon: "📦",
    },
    {
        title: "Partenaires de confiance",
        description: "IMA, AXA, Mutuaide, Europe Assistance, laboratoires partenaires.",
        icon: "🤝",
    }

];

function ServiceCard({ service, index }: { service: Service; index: number }) {



    return (
        <motion.div
            className="backdrop-blur-xl bg-white/60 border border-white/30 p-6 rounded-2xl shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{
                rotateX: -3,
                rotateY: 3,
                scale: 1.015,
                transition: { type: "spring", stiffness: 100, damping: 15 },
            }}

        >
            <motion.div className="text-4xl mb-4">
                {service.icon}
            </motion.div>
            <h3 className="text-lg font-semibold text-blue-800 mb-1">{service.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{service.description}</p>
        </motion.div>
    );
}

export default function NosServices() {
    return (
        <section
            id="nos-services"
            className="relative bg-gradient-to-br from-blue-50 via-white to-gray-100 py-24 px-6 md:px-20 overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/30 to-transparent -z-10" />

            <div className="text-center mb-16">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-gray-800 drop-shadow-sm"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    Nos Services Premium
                </motion.h2>
                <motion.div
                    className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "center" }}
                />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                {services.map((service, index) => (
                    <ServiceCard key={index} service={service} index={index} />
                ))}
            </div>
        </section>
    );
}
