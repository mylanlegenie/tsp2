// layout.tsx
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MatomoTracker from './components/MatomoTracker';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Taxis Service Pro – Votre flotte à Paris',
  description: '70 taxis à Paris pour les professionnels exigeants, ponctuels et discrets.',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
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
