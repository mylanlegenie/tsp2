'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import Image from 'next/image'


const contacts = [
    { label: 'Standard', value: '01 41 94 14 04', type: 'phone' },
    { label: 'Eddy FRESCHARD', value: '06 71 53 46 16', type: 'phone' },
    { label: 'Christophe PUTRZYNSKI', value: '06 61 08 25 75', type: 'phone' },
    { label: 'Abdel DJELLALI', value: '06 85 44 41 59', type: 'phone' },
    { label: 'Email', value: 'taxisservicespro@gmail.com', type: 'email' },
]

export default function ContactInfo() {
    const [copied, setCopied] = useState(false)

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch (err) {
            console.error('Erreur de copie :', err)
        }
    }

    return (
        <section
            id="contact"
            className="relative bg-gradient-to-br from-blue-50 via-white to-gray-100 py-24 px-6 md:px-20 overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/30 to-transparent -z-10" />

            <div className="text-center mb-16">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-gray-800 drop-shadow-sm"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                >
                    Nous Contacter
                </motion.h2>
                <motion.div
                    className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: 'center' }}
                />
            </div>

            <motion.p
                className="text-center text-gray-600 text-lg mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
            >
                Vous pouvez nous contacter 24h/24 et 7j/7
            </motion.p>
            <motion.p
                className="text-center text-gray-600 text-lg mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
            >
                Pour toute demande, réservation ou renseignement :
            </motion.p>

            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-8">
                {contacts.map((contact, i) => {
                    const isLastOdd = contacts.length % 2 === 1 && i === contacts.length - 1

                    const isEmail = contact.type === 'email'

                    return (
                        <motion.div
                            key={i}
                            className={`relative backdrop-blur-xl bg-white/60 border border-white/30 p-6 rounded-2xl shadow-lg transition-all duration-300 ${isLastOdd ? 'sm:col-span-2 sm:mx-auto sm:w-1/2' : ''
                                }`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-blue-800 font-semibold text-md mb-1">
                                {contact.label}
                            </h3>

                            {/* BOUTON COPIER UNIQUEMENT POUR EMAIL */}
                            {isEmail && (
                                <div className="absolute top-2 right-2">
                                    <button
                                        onClick={() => handleCopy(contact.value)}
                                        className="p-1"
                                        aria-label="Copier l'adresse email"
                                        title="Copier l'adresse email"
                                    >
                                        <Image
                                            src="/bouton-copier.png"
                                            alt="Copier"
                                            width={20}
                                            height={20}
                                            className="hover:scale-110 cursor-pointer transition-transform duration-200"
                                        />
                                    </button>

                                    {copied && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: -10 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow"
                                        >
                                            Copié !
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            {contact.type === 'phone' ? (
                                <a
                                    href={`tel:${contact.value.replace(/\s+/g, '')}`}
                                    className="text-gray-700 font-mono underline underline-offset-2"
                                >
                                    {contact.value}
                                </a>
                            ) : (
                                <p className="text-gray-700 font-mono break-all pr-10">
                                    {contact.value}
                                </p>
                            )}
                        </motion.div>
                    )
                })}

            </div>
        </section>
    )
}
