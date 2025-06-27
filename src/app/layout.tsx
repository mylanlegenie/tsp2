import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
// import { Analytics } from "@vercel/analytics/next"




export const metadata: Metadata = {
  title: "Taxis Services Pro",
  description: "Site du groupe TSP, groupe de taxis parisien 7/7 24/24",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className="__variable_5cfdac __variable_9a8899 antialiased"
      ><Navbar />
        {children}
        {/* <Analytics /> */}
      </body>
    </html >
  );
}
