// layout.tsx
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MatomoTracker from './components/MatomoTracker';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Taxis Service Pro – Votre flotte à Paris',
    template: '%s | Taxis Service Pro',
  },
  description:
    'Taxis Service Pro – Service de taxi haut de gamme à Paris pour les professionnels et entreprises. Flotte de 70 taxis fiables, ponctuels, discrets, avec chauffeurs expérimentés pour transferts aéroports, gares et déplacements VIP.',
  keywords:
    'taxi Paris, taxi professionnel, flotte de taxis Paris, chauffeur privé Paris, transfert aéroport Paris, taxi entreprise, service taxi premium, taxi gare, réservation taxi Paris, taxi VIP, transport professionnel Paris, chauffeur ponctuel Paris',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.ico', rel: 'shortcut icon', type: 'image/x-icon' },
      { url: '/apple-touch-icon.png', rel: 'apple-touch-icon', sizes: '180x180' },
    ],
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#000000',
  openGraph: {
    title: 'Taxis Service Pro – Votre flotte à Paris',
    description:
      'Taxis Service Pro – Service de taxi haut de gamme à Paris pour les professionnels et entreprises. Flotte de 70 taxis fiables, ponctuels, discrets, avec chauffeurs expérimentés pour transferts aéroports, gares et déplacements VIP.',
    url: 'https://www.taxis-services-pro.fr',
    siteName: 'Taxis Service Pro',
    images: [
      {
        url: '/image-provisoire.jpeg',
        width: 1200,
        height: 630,
        alt: 'Taxi professionnel à Paris',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taxis Service Pro – Votre flotte à Paris',
    description:
      'Taxis Service Pro – Service de taxi haut de gamme à Paris pour les professionnels et entreprises. Flotte de 70 taxis fiables, ponctuels, discrets, avec chauffeurs expérimentés pour transferts aéroports, gares et déplacements VIP.',
    images: ['/image-provisoire.jpeg'],
  },
  manifest: '/site.webmanifest',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr" className="h-full">
      <body className="antialiased bg-background text-foreground min-h-full flex flex-col overflow-x-hidden overflow-y-auto">
        <MatomoTracker />
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
