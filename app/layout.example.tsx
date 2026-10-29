/* EXEMPLE de layout racine : reprends ces quatre éléments dans ton app/layout.tsx existant
   (polices, library.css, le script js-anim dans <head>, BookTransitionProvider). Renomme ce fichier ou supprime-le ensuite. */

import type { Metadata } from "next";
import { BookTransitionProvider } from "@/components/library/BookTransition";
import { fontVars } from "./fonts";
import "@/styles/library.css";

export const metadata: Metadata = {
  title: "Dimension Novel · Bibliothèque des mondes",
  description: "Une bibliothèque où chaque œuvre garde son propre univers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning : le script ci-dessous ajoute une classe à <html> avant que React ne prenne la main
    <html lang="fr" className={fontVars} suppressHydrationWarning>
      <head>
        {/* masque les éléments animés du hub avant le premier rendu (voir LibraryMotion) */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js-anim")' }} />
      </head>
      <body>
        <BookTransitionProvider>{children}</BookTransitionProvider>
      </body>
    </html>
  );
}
