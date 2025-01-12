import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";



import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

export const metadata: Metadata = {
  title: "Dimension Novel",
  description: "Un site de fou par moi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased overflow-x-hidden w-screen bg-[#1d0424]  ;">
        <header className="relative w-screen shadow-2xl p-4 md:p-8">
          {/* Background with blur */}
          <div className="absolute inset-0 animate-radialWave blur-lg"></div>

          {/* Foreground content */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center">
              <img src="/logoAlone.png" alt="Logo" className="h-[45px] md:h-[65px]" />
              <h1 className="text-3xl md:text-4xl ml-2 font-[MedievalSharp]">Dimension Novels</h1>
            </div>
            <Link href="/" className="flex justify-center items-center p-2 h-12 w-12 rounded-full gradientMoveAnimation shadow-xl text-[1.2em] hover:bg-yellow-300 hover:text-black transition-all duration-300">
              <FontAwesomeIcon icon={faHome} className="fa-fw" />
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
