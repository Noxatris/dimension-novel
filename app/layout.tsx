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
      <body className="antialiased overflow-x-hidden w-screen">
        <header className="w-full shadow-2xl  bg-gradient-to-b from-violet-900 to-gray-900">
          <div className="z-10 flex items-center justify-between bg-black/20 p-4 md:p-8">
            <div className="flex items-center">
              <img src="/logoAlone.png" alt="Logo" className="h-[45px] md:h-[65px]" />
              <h1 className="text-2xl md:text-3xl ml-2 medievalFont">Dimension Novels</h1>
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
