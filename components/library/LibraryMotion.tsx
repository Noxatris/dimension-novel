"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ============================================================
   Animation d'arrivée et de scroll du hub.
   - La classe js-anim (posée par un script dans <head>) masque les éléments avant le premier rendu.
   - Ici, GSAP pose les états de départ PUIS ajoute anim-on, qui retire le masquage CSS : aucun flash.
   - Sans JS ou si ce composant ne tourne pas, un filet CSS fait tout réapparaître au bout de 2,5 s.
   - L'intro ne se joue qu'une fois par visite : en revenant d'un livre, le hub s'affiche tel quel.
   ============================================================ */

let played = false;

/** Prépare un SVG à « se dessiner » : chaque trait commence entièrement caché. À appeler DANS gsap.context. */
function drawable(svg: Element | null): SVGGeometryElement[] {
  if (!svg) return [];
  const els = [...svg.querySelectorAll<SVGGeometryElement>("circle, path")];
  for (const el of els) {
    const L = el.getTotalLength?.() ?? 300;
    // posé PAR GSAP (et non à la main) : ctx.revert() le retire au démontage. Sinon, si la page est gardée
    // en mémoire et réaffichée (navigation retour), les traits resteraient cachés et le sceau invisible.
    gsap.set(el, { strokeDasharray: L, strokeDashoffset: L });
  }
  return els;
}

export default function LibraryMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const hub = document.querySelector<HTMLElement>(".library");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hub || played || reduce) { root.classList.add("anim-on"); played = true; return; }
    played = true;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = (sel: string) => hub.querySelectorAll<HTMLElement>(sel);
      const shelf = hub.querySelector(".shelf");

      // --- états de départ ---
      gsap.set([".lamp", ".motes"], { opacity: 0 });
      gsap.set(q(".top"), { opacity: 0, y: -12 });
      gsap.set(q("[data-a]"), { opacity: 0, y: 18 });
      gsap.set(q(".wi"), { yPercent: 110 });
      gsap.set(q(".shelf .spine"), { opacity: 0, y: -46, rotation: (i: number) => (i % 2 ? 5 : -4), transformOrigin: "50% 100%" });
      gsap.set(q(".shelf .plaque, .shelf .bookend"), { opacity: 0 });
      gsap.set(q(".bookplate"), { clipPath: "inset(50% 0% 50% 0%)" });
      gsap.set(q(".portal"), { opacity: 0, y: 30 });
      const latestSigil = drawable(hub.querySelector(".latest .sigil"));
      const grandSigil = drawable(hub.querySelector(".intro-seal .sigil"));
      gsap.set(q(".intro-seal figcaption, .intro-seal .sigil text"), { opacity: 0 });
      gsap.set(q(".ghost"), { opacity: 0 });
      const plateSigil = drawable(hub.querySelector(".bookplate .sigil"));
      const signature = drawable(hub.querySelector(".signature svg"));
      gsap.set(q(".latest .sigil text, .bookplate .sigil text"), { opacity: 0 });
      shelf?.classList.add("no-tr");
      root.classList.add("anim-on");

      // --- arrivée : la lampe s'allume, le titre monte mot à mot, le sceau se dessine ---
      const intro = gsap.timeline({ delay: 0.15, defaults: { ease: "power3.out" } })
        .to(".lamp", { opacity: 1, duration: 1.8, ease: "power2.out" })
        .to(".motes", { opacity: 1, duration: 2 }, "<.4")
        .to(q(".top"), { opacity: 1, y: 0, duration: 0.8 }, "<")
        .to(q(".intro .eyebrow"), { opacity: 1, y: 0, duration: 0.7 }, "<.15")
        .to(q(".intro h1 .wi"), { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.07 }, "<.1")
        .to(q(".intro p[data-a], .latest [data-a]"), { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=.7")
        .to(latestSigil, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.015 }, "<")
        .to(q(".latest .sigil text"), { opacity: 1, duration: 0.6 }, "-=.5")
        // le grand sceau se trace pendant que le titre monte
        .to(grandSigil, { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut", stagger: 0.008 }, 0.5)
        .to(q(".intro-seal .sigil text, .intro-seal figcaption"), { opacity: 1, duration: 0.8 }, 2.4);

      // --- l'étagère : les livres viennent se ranger un à un, après l'arrivée si elle est visible tout de suite ---
      const shelfTl = gsap.timeline({
        paused: true,
        onComplete: () => { gsap.set(q(".shelf .spine"), { clearProps: "transform" }); shelf?.classList.remove("no-tr"); },
      })
        .to(q(".shelf-head [data-a], .shelf-head .wi"), { opacity: 1, y: 0, yPercent: 0, duration: 0.8, stagger: 0.05 })
        .to(q(".shelf .bookend"), { opacity: 1, duration: 0.4 }, "<")
        .to(q(".shelf .spine"), { opacity: 1, y: 0, rotation: 0, duration: 0.9, ease: "back.out(1.6)", stagger: 0.09 }, "<.1")
        .to(q(".shelf .plaque"), { opacity: 1, duration: 0.5, stagger: 0.1 }, "-=.4")
        // les emplacements libres apparaissent du centre vers les bords
        .to(q(".ghosts.left .ghost"), { opacity: 1, duration: 0.6, stagger: { each: 0.03, from: "end" } }, "-=.6")
        .to(q(".ghosts.right .ghost"), { opacity: 1, duration: 0.6, stagger: 0.03 }, "<");
      ScrollTrigger.create({
        trigger: "#etagere", start: "top 85%", once: true,
        onEnter: () => { gsap.delayedCall(Math.max(0, 1.5 - intro.time()), () => { shelfTl.play(); }); },
      });

      // --- le bibliothécaire ---
      gsap.timeline({ scrollTrigger: { trigger: "#bibliothecaire", start: "top 72%", once: true }, defaults: { ease: "power3.out" } })
        .to(q(".about-text .eyebrow"), { opacity: 1, y: 0, duration: 0.6 })
        .to(q("#aboutTitle .wi"), { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.08 }, "<.1")
        .to(q(".about-text p[data-a]"), { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, "-=.6")
        .to(q(".bookplate"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" }, "<")
        .to(plateSigil, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", stagger: 0.012 }, "-=.6")
        .to(q(".bookplate .sigil text"), { opacity: 1, duration: 0.6 }, "-=.5")
        .to(q(".signature"), { opacity: 1, y: 0, duration: 0.6 }, "-=1.2")
        .to(signature, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "<.2");

      gsap.timeline({ scrollTrigger: { trigger: ".passages", start: "top 82%", once: true }, defaults: { ease: "power3.out" } })
        .to(q(".passages .wi"), { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.08 })
        .to(q(".passages-head p[data-a]"), { opacity: 1, y: 0, duration: 0.7 }, "<.2")
        .to(q(".portal"), { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, clearProps: "transform" }, "<.1");

      // --- la lumière de la lampe glisse doucement quand on descend ---
      gsap.to(".lamp", { yPercent: -15, ease: "none", scrollTrigger: { trigger: hub, start: "top top", end: "bottom bottom", scrub: true } });
    }, hub);

    return () => {
      // remet la page dans son état final : si elle est réaffichée sans être recréée, tout doit être visible
      ctx.revert();
      hub.querySelector(".shelf")?.classList.remove("no-tr");
    };
  }, []);

  return null;
}
