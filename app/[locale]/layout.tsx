
// Remova 'use client'; daqui, RootLayout pode ser um Server Component
// e renderizar Client Components (como o FavoritesProvider) dentro dele.
// Se você realmente precisar de lógica de cliente no RootLayout em si,
// então 'use client'; seria necessário.

import type { Metadata } from "next";
import { Geist } from "next/font/google"; 
import "../globals.css";
import HeroTop from "../components/organisms/hero/HeroTop"; 
import { FavoritesProvider } from "../context/FavoritesContext";


const geistSans = Geist({ 
  variable: "--font-geist-sans",
  subsets: ["latin"],   
});

const geistMono = Geist({ 
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Wars",
  description: "Melhor conteúdo de Star Wars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <link rel="icon" href="/favicon.ico" />   {/* mudei aqui por causa da internacionalização */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`} 
      >
        
        <FavoritesProvider>
          <HeroTop /> 
          <main className="container mx-auto p-4">
            {children}
          </main>
        </FavoritesProvider>
      </body>
    </html>
  );
}