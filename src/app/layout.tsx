// layout.tsx
import './globals.css';
import { Metadata } from 'next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MatomoTracker from './components/MatomoTracker';

export const metadata: Metadata = {
  title: 'Taxis Service Pro – Votre flotte à Paris',
  description: '70 taxis à Paris pour les professionnels exigeants, ponctuels et discrets.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr" className="h-full">
      <body className="antialiased bg-background text-foreground min-h-full flex flex-col">
        <MatomoTracker />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
