"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

/* ============================================================
   Transition « ouvrir le livre » entre deux pages.
   Le calque vit dans le layout racine : il ne se démonte pas pendant la navigation.

   Ouverture : la tranche grandit jusqu'à couvrir l'écran → on navigue → on révèle la page.
   Fermeture : le fond de l'univers couvre l'écran → on revient au hub → le calque rétrécit
               jusqu'à la tranche du livre sur l'étagère.
   ============================================================ */

export interface BookLook {
  id: string;
  title: string;
  color: string; // reliure
  ink: string;   // texte sur la reliure
  bg: string;    // fond de l'univers
}

interface Api {
  open: (look: BookLook, from: Element, href: string) => void;
  close: (look: BookLook, href?: string) => void;
}

const BookCtx = createContext<Api | null>(null);

export function useBook(): Api {
  const api = useContext(BookCtx);
  if (!api) throw new Error("useBook doit être utilisé sous <BookTransitionProvider>");
  return api;
}

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function BookTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const layer = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const pending = useRef<{ type: "open" | "close"; look: BookLook; path: string; hash?: string } | null>(null);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback(() => {
    if (layer.current) gsap.set(layer.current, { display: "none" });
    busy.current = false;
    pending.current = null;
    if (safety.current) clearTimeout(safety.current);
  }, []);

  // si la navigation n'aboutit pas (même page, erreur), on libère l'écran après 3 s
  const arm = useCallback(() => {
    if (safety.current) clearTimeout(safety.current);
    safety.current = setTimeout(() => {
      if (layer.current) gsap.to(layer.current, { opacity: 0, duration: 0.3, onComplete: finish });
    }, 3000);
  }, [finish]);

  const open = useCallback<Api["open"]>((look, from, href) => {
    if (busy.current) return;
    if (reduced()) { router.push(href); return; }
    busy.current = true;
    router.prefetch(href);
    const r = from.getBoundingClientRect();
    const el = layer.current!, t = title.current!;
    t.textContent = look.title;
    gsap.set(el, { display: "grid", left: r.left, top: r.top, width: r.width, height: r.height, backgroundColor: look.color, borderRadius: 3, opacity: 1 });
    gsap.set(t, { color: look.ink, opacity: 0, y: 0 });
    gsap.timeline()
      .to(el, { top: r.top - 30, duration: 0.25, ease: "power2.out" })                 // le livre sort de l'étagère
      .to(el, { left: 0, top: 0, width: innerWidth, height: innerHeight, borderRadius: 0, duration: 0.85, ease: "power3.inOut" })
      .to(t, { opacity: 1, duration: 0.35 }, "-=.35")
      .to(el, { backgroundColor: look.bg, duration: 0.45, ease: "none" }, "+=.1")     // la reliure devient le fond de l'univers
      .add(() => {
        const [path, hash] = href.split("#");
        pending.current = { type: "open", look, path, hash };
        arm();
        router.push(href);
      });
  }, [router, arm]);

  const close = useCallback<Api["close"]>((look, href = "/") => {
    if (busy.current) return;
    if (reduced()) { router.push(`${href}#etagere`); return; }
    busy.current = true;
    const el = layer.current!;
    title.current!.textContent = "";
    gsap.set(el, { display: "grid", left: 0, top: 0, width: innerWidth, height: innerHeight, backgroundColor: look.bg, borderRadius: 0, opacity: 0 });
    gsap.to(el, {
      opacity: 1, duration: 0.3,
      onComplete: () => {
        pending.current = { type: "close", look, path: href };
        arm();
        router.push(href, { scroll: false });
      },
    });
  }, [router, arm]);

  // deuxième moitié de l'animation, une fois la nouvelle page affichée
  useEffect(() => {
    const p = pending.current, el = layer.current;
    if (!p || !el || pathname !== p.path) return;
    if (safety.current) clearTimeout(safety.current);

    if (p.type === "open") {
      const target = p.hash ? document.getElementById(p.hash) : null;
      if (target) target.scrollIntoView({ behavior: "instant" });
      else scrollTo({ top: 0, behavior: "instant" });
      gsap.timeline({ onComplete: finish })
        .to(title.current, { opacity: 0, y: -20, duration: 0.3 })
        .to(el, { opacity: 0, duration: 0.45 }, "<.1");
      return;
    }

    // fermeture : on retrouve la tranche du livre sur l'étagère
    requestAnimationFrame(() => {
      const spine = document.querySelector(`[data-book="${p.look.id}"]`);
      if (!spine) { gsap.to(el, { opacity: 0, duration: 0.3, onComplete: finish }); return; }
      spine.scrollIntoView({ block: "center", behavior: "instant" });
      const r = spine.getBoundingClientRect();
      gsap.timeline({ onComplete: finish })
        .to(el, { backgroundColor: p.look.color, duration: 0.3 })
        .to(el, { left: r.left, top: r.top, width: r.width, height: r.height, borderRadius: 3, duration: 0.8, ease: "power3.inOut" }, "<")
        .to(el, { opacity: 0, duration: 0.2 });
    });
  }, [pathname, finish]);

  return (
    <BookCtx.Provider value={{ open, close }}>
      {children}
      <div ref={layer} className="opening" style={{ display: "none" }} aria-hidden="true">
        <span ref={title} className="ttl" />
      </div>
    </BookCtx.Provider>
  );
}
