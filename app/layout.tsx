import type { Metadata } from "next";
import "./globals.css";
import { fontVars } from "./fonts";

import { Analytics } from "@vercel/analytics/react"
import { config } from '@fortawesome/fontawesome-svg-core'

import "@/styles/library.css";

import { BookTransitionProvider } from "@/components/library/BookTransition";

config.autoAddCss = false

export const metadata: Metadata = {
  title: "Dimension Novel",
  description: "Site de lecture de romans en ligne avec interface optimisée et musique d'ambiance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={fontVars}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js-anim")' }} />
      </head>
      <body className="antialiased overflow-x-hidden w-screen">
        <Analytics />
        <BookTransitionProvider>{children}</BookTransitionProvider>
      </body>
    </html>
  );
}
