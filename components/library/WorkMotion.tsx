"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ============================================================
   Animation de la page d'une œuvre. Même principe que LibraryMotion :
   - avant le premier rendu, le CSS masque les éléments animés tant que .work n'a pas d'attribut data-anim ;
   - ici, on pose les états de départ (useLayoutEffect : avant l'affichage, donc pas de flash
     même en navigation côté client), puis data-anim="on" retire le masquage ;
   - en revenant du lecteur (lien « Le registre », #registre), pas d'intro : la page s'affiche telle quelle.
   Jouée à chaque ouverture du livre.
   ============================================================ */

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

export default function WorkMotion() {
  useLayoutEffect(() => {
    const work = document.querySelector<HTMLElement>(".work");
    if (!work) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || location.hash === "#registre") { work.dataset.anim = "skip"; return; }
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = (sel: string) => work.querySelectorAll<HTMLElement>(sel);

      // --- états de départ ---
      gsap.set(q(".w-amb"), { opacity: 0 });
      gsap.set(q(".top"), { opacity: 0, y: -12 });
      gsap.set(q(".w-kicker, .w-pitch, .w-actions > *"), { opacity: 0, y: 18 });
      gsap.set(q(".w-title .ch"), { yPercent: 115 });
      gsap.set(q(".w-title em"), { opacity: 0.15 });
      const seal = drawable(work.querySelector(".w-seal .sigil"));
      gsap.set(q(".w-seal figcaption, .w-seal .sigil text"), { opacity: 0 });
      gsap.set(q(".registre [data-a], .lore [data-a]"), { opacity: 0, y: 18 });
      gsap.set(q(".registre .wi, .lore .wi"), { yPercent: 110 });
      gsap.set(q(".recent li"), { opacity: 0, x: -24 });
      gsap.set(q(".codex-stage"), { opacity: 0, y: 70, rotationX: 14, transformPerspective: 1600, transformOrigin: "50% 100%" });
      work.dataset.anim = "on";

      // --- arrivée : la ville s'allume, le titre monte lettre à lettre, la lettre rouge grésille comme un néon ---
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(q(".w-amb"), { opacity: 1, duration: 1.6, ease: "power2.out" })
        .to(q(".top"), { opacity: 1, y: 0, duration: 0.7 }, "<.2")
        .to(q(".w-kicker"), { opacity: 1, y: 0, duration: 0.7 }, "<.1")
        .to(q(".w-title .ch"), { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.05 }, "<.1")
        .to(q(".w-title em"), {
          keyframes: [
            { opacity: 1, duration: 0.06 }, { opacity: 0.25, duration: 0.08 }, { opacity: 1, duration: 0.05 },
            { opacity: 0.5, duration: 0.12 }, { opacity: 1, duration: 0.3 },
          ],
          onComplete: () => work.querySelector(".w-title em")?.classList.add("lit"),
        }, "-=.3")
        .to(q(".w-pitch, .w-actions > *"), { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=.7")
        .to(seal, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", stagger: 0.008 }, 0.4)
        .to(q(".w-seal .sigil text, .w-seal figcaption"), { opacity: 1, duration: 0.8 }, 2.2);

      // --- le registre : le codex se redresse comme un livre posé sur un pupitre ---
      gsap.timeline({ scrollTrigger: { trigger: work.querySelector(".registre"), start: "top 75%", once: true }, defaults: { ease: "power3.out" } })
        .to(q(".registre .wi"), { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.08 })
        .to(q(".registre [data-a]"), { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, "<.15")
        .to(q(".recent li"), { opacity: 1, x: 0, duration: 0.6, stagger: 0.08 }, "<.2")
        .to(q(".codex-stage"), { opacity: 1, y: 0, rotationX: 0, duration: 1.3, clearProps: "transform" }, "<");

      // --- l'univers ---
      const lore = work.querySelector(".lore");
      if (lore) {
        const pathsOf = (sel: string) => [...lore.querySelectorAll<SVGGeometryElement>(sel)];
        const masks = [...lore.querySelectorAll(".persona .mask")].map((m) => drawable(m));
        const roads = pathsOf(".pl-av path, .pl-ring, .pl-river");
        for (const el of roads) { const L = el.getTotalLength?.() ?? 1200; gsap.set(el, { strokeDasharray: L, strokeDashoffset: L }); }
        gsap.set(lore.querySelectorAll(".pl-minor"), { opacity: 0 });
        gsap.set(lore.querySelectorAll(".pt"), { opacity: 0 });
        gsap.set(lore.querySelectorAll(".pt-core"), { scale: 0, transformOrigin: "50% 50%" });
        gsap.set(lore.querySelectorAll(".choeur .cwd"), { opacity: 0.12 });
        gsap.set(lore.querySelectorAll(".persona"), { x: -30 });

        // titre de la section
        gsap.timeline({ scrollTrigger: { trigger: lore, start: "top 80%", once: true }, defaults: { ease: "power3.out" } })
          .to(lore.querySelectorAll(".u-intro .wi"), { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.08 })
          .to(lore.querySelectorAll(".u-intro [data-a]"), { opacity: 1, y: 0, duration: 0.8 }, "<.15");

        // le chœur : chaque mot s'allume au rythme du défilement (scrub), le mot rouge en dernier s'il est en fin de phrase
        gsap.to(lore.querySelectorAll(".choeur .cwd"), {
          opacity: 1, ease: "none", stagger: 0.1,
          scrollTrigger: { trigger: lore.querySelector(".choeur"), start: "top 78%", end: "bottom 42%", scrub: 0.6 },
        });
        gsap.to(lore.querySelectorAll(".choeur [data-a]"), {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: lore.querySelector(".choeur"), start: "bottom 70%", once: true },
        });

        // chaque bloc : son titre, puis ses lignes
        lore.querySelectorAll(".u-block").forEach((block) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: block, start: "top 78%", once: true }, defaults: { ease: "power3.out" } })
            .to(block.querySelectorAll(".u-head .wi"), { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.08 })
            .to(block.querySelectorAll(".u-head [data-a]"), { opacity: 1, y: 0, duration: 0.7 }, "<");
          if (block.querySelector(".personae")) {
            const rows = [...block.querySelectorAll(".persona")];
            tl.to(rows, { opacity: 1, y: 0, x: 0, duration: 0.9, stagger: 0.14 }, "<.2");
            masks.forEach((m, i) => tl.to(m, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.01 }, `<${i === 0 ? 0 : 0.05}`));
          } else if (block.querySelector(".plan")) {
            tl.to(block.querySelectorAll(".pl-minor"), { opacity: 1, duration: 1.4, ease: "power1.out" }, "<.1")
              .to(roads, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", stagger: 0.15 }, "<")
              .to(block.querySelectorAll(".pt"), { opacity: 1, duration: 0.4, stagger: 0.12 }, "-=.6")
              .to(block.querySelectorAll(".pt-core"), { scale: 1, duration: 0.6, ease: "back.out(3)", stagger: 0.12 }, "<")
              .to(block.querySelectorAll(".lieux [data-a]"), { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "<");
          } else {
            tl.to(block.querySelectorAll("[data-a]:not(.u-head [data-a])"), { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, "<.15");
          }
        });
      }

      // --- la lumière glisse doucement quand on descend ---
      gsap.to(work.querySelector(".w-amb .glow-top"), { yPercent: -12, ease: "none", scrollTrigger: { trigger: work, start: "top top", end: "bottom bottom", scrub: true } });
    }, work);

    return () => ctx.revert();
  }, []);

  return null;
}
