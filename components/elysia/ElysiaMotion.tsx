"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Animation de l'atlas d'Elysia : le mana s'éveille, le titre monte, le « y » s'illumine,
   l'anneau runique se trace, le cœur s'allume et les cinq peuples apparaissent ; puis chaque section au scroll.
   Même mécanique que WorkMotion (data-anim sur .work, états posés par GSAP, nettoyés par ctx.revert()). */

function drawable(els: Element[]): Element[] {
  for (const el of els) {
    const L = (el as SVGGeometryElement).getTotalLength?.() ?? 300;
    gsap.set(el, { strokeDasharray: L, strokeDashoffset: L });
  }
  return els;
}

export default function ElysiaMotion() {
  useLayoutEffect(() => {
    const view = document.querySelector<HTMLElement>(".work");
    if (!view) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // arrivée directe sur une section (#recits depuis l'étagère, ou lien partagé) : pas d'intro
    if (reduce || location.hash) { view.dataset.anim = "skip"; return; }
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = (sel: string) => view.querySelectorAll<HTMLElement>(sel);
      const ring = drawable([...view.querySelectorAll(".e-core .ring-out circle, .e-core .ring-out path, .e-core .edge")]);

      gsap.set(q(".w-amb"), { opacity: 0 });
      gsap.set(q(".top"), { opacity: 0, y: -12 });
      gsap.set(q(".w-kicker, .w-pitch, .w-actions > *"), { opacity: 0, y: 18 });
      gsap.set(q(".w-title .ch"), { yPercent: 115 });
      gsap.set(q(".w-title em"), { opacity: 0.2 });
      gsap.set(q(".e-core .core"), { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(q(".e-core .flows, .e-core figcaption"), { opacity: 0 });
      gsap.set(q(".e-core .node"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" });
      gsap.set(q(".e-sec [data-a]"), { opacity: 0, y: 26 });
      gsap.set(q(".e-sec .wi"), { yPercent: 110 });
      gsap.set(q(".e-map .rose"), { rotation: -40, scale: 0.85 });
      view.dataset.anim = "on";

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(q(".w-amb"), { opacity: 1, duration: 1.8, ease: "power2.out" })
        .to(q(".top"), { opacity: 1, y: 0, duration: 0.7 }, "<.2")
        .to(q(".w-kicker"), { opacity: 1, y: 0, duration: 0.7 }, "<.1")
        .to(q(".w-title .ch"), { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.07 }, "<.1")
        .to(q(".w-title em"), { opacity: 1, duration: 0.9, ease: "power2.inOut", onComplete: () => view.querySelector(".w-title em")?.classList.add("lit") }, "-=.5")
        .to(q(".w-pitch, .w-actions > *"), { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=.8")
        .to(ring, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", stagger: 0.006 }, 0.4)
        .to(q(".e-core .core"), { scale: 1, duration: 1.1, ease: "back.out(1.7)" }, 1.1)
        .to(q(".e-core .flows"), { opacity: 1, duration: 0.8 }, 1.6)
        .to(q(".e-core .node"), { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(2)", stagger: 0.12 }, 1.7)
        .to(q(".e-core figcaption"), { opacity: 1, duration: 0.6 }, 2.4);

      view.querySelectorAll<HTMLElement>(".e-sec").forEach((sec) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: "top 78%", once: true }, defaults: { ease: "power3.out" } })
          .to(sec.querySelectorAll(".sec-head [data-a]"), { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 })
          .to(sec.querySelectorAll(".wi"), { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.08 }, "<.05")
          .to(sec.querySelectorAll(":scope .inner > :not(.sec-head) [data-a], :scope .e-map[data-a]"), { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, clearProps: "transform" }, "<.25");
        const rose = sec.querySelector(".rose");
        if (rose) tl.to(rose, { rotation: 0, scale: 1, duration: 2, ease: "power2.out" }, "<");
      });

      gsap.to(view.querySelector(".w-amb .glow-top"), { yPercent: -12, ease: "none", scrollTrigger: { trigger: view, start: "top top", end: "bottom bottom", scrub: true } });
    }, view);

    return () => ctx.revert();
  }, []);

  return null;
}
