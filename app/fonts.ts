import { Gloock, IM_Fell_English, IM_Fell_English_SC, Spectral } from "next/font/google";

/* Polices du thème « bibliothèque des mondes ».
   Dans app/layout.tsx :
     import { fontVars } from "./fonts";
     <html lang="fr" className={fontVars}> */

const display = Gloock({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const body = Spectral({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-body" });
const old = IM_Fell_English({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-old" });
const sc = IM_Fell_English_SC({ subsets: ["latin"], weight: "400", variable: "--font-sc" });

export const fontVars = [display.variable, body.variable, old.variable, sc.variable].join(" ");
