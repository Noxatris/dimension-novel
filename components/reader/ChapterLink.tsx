"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/* Lien vers un autre chapitre. Au lieu de sauter d'un coup en haut de la page, on y REMONTE vite et en douceur
   pendant que le texte s'estompe, puis le nouveau chapitre s'affiche en fondu.
   - durée selon la distance : courte pour un petit chapitre, plafonnée pour un long (jamais plus d'1,1 s) ;
   - html[data-turning] pendant la remontée : ReaderChrome ne change pas de piste en traversant les marqueurs ;
   - ctrl/cmd-clic, clic milieu : comportement normal du lien (nouvel onglet) ;
   - mouvement réduit demandé par le système : navigation classique. */

const ease = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2); // easeInOutQuart

// courbe douce entre a et b (0 avant a, 1 après b)
const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

export function turnPage(href: string, go: () => void) {
  const from = scrollY;
  const html = document.documentElement;
  const old = document.querySelector<HTMLElement>(".r-sheet");
  const target = new URL(href, location.href).pathname;
  html.dataset.turning = "1";

  // fin de l'effet, quoi qu'il arrive : plus de drapeau, feuille visible
  const finish = (sheet: HTMLElement | null) => {
    delete html.dataset.turning;
    if (sheet) sheet.style.opacity = "";
  };

  // 2. le nouveau chapitre est arrivé : fondu d'apparition (Web Animations API, sans dépendre d'une classe CSS)
  const arrive = (sheet: HTMLElement) => {
    scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    // l'animation démarre AVANT de lever le drapeau (qui gardait la feuille invisible, voir reader.css) : aucun flash
    sheet.animate(
      [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }],
      { duration: 900, easing: "cubic-bezier(.25, .1, .25, 1)" },
    );
    finish(sheet);
    if (old && old !== sheet && old.isConnected) old.style.opacity = "";
  };

  // on attend que Next ait affiché le nouveau chapitre (URL changée + feuille présente), image par image, 4 s maximum
  const waitForNext = () => {
    const t0 = performance.now();
    const check = () => {
      const sheet = document.querySelector<HTMLElement>(".r-sheet");
      if (location.pathname === target && sheet) {
        // une image de plus : on laisse le temps à React de finir d'écrire la page avant de lancer le fondu
        requestAnimationFrame(() => arrive(document.querySelector<HTMLElement>(".r-sheet") ?? sheet));
      } else if (performance.now() - t0 < 4000) requestAnimationFrame(check);
      else finish(old); // la navigation n'a pas abouti : on rend la page telle qu'elle était
    };
    requestAnimationFrame(check);
  };

  // 1. la remontée, pendant laquelle l'ancien texte s'efface
  const dur = Math.min(1100, 420 + from / 14);
  const t0 = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / dur);
    // behavior "instant" : on pilote chaque image nous-mêmes, même si le CSS impose scroll-behavior: smooth
    scrollTo({ top: from * (1 - ease(t)), behavior: "instant" as ScrollBehavior });
    // le fondu est calé sur le temps (la position freine à la fin) : il dure jusqu'à l'arrivée en haut
    if (old) old.style.opacity = String(1 - smooth(0.3, 1, t));
    if (t < 1) requestAnimationFrame(step);
    else { go(); waitForNext(); }
  };
  requestAnimationFrame(step);
}

export default function ChapterLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        // déjà en haut, ou mouvement réduit : le lien fait son travail normal (Next remet la page en haut)
        if (scrollY < 40 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        e.preventDefault();
        // scroll: false, on est déjà en haut : Next ne doit pas refaire son propre saut
        turnPage(href, () => router.push(href, { scroll: false }));
      }}
    >
      {children}
    </Link>
  );
}
