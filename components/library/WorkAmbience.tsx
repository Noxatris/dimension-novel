"use client";

import { useEffect, useRef } from "react";

/* Ambiance d'une œuvre : calque FIXE derrière toute la page (lueurs + braises qui montent).
   Fixe = jamais coupé au bord d'une section. Les couleurs viennent des props pour qu'une autre œuvre
   puisse avoir ses propres particules (neige, cendres, lucioles…). */

interface Props {
  /** couleurs RGB des particules, ex. ["240,162,74", "214,58,58"] */
  colors?: [string, string];
  /** proportion de particules dans la seconde couleur */
  mix?: number;
  /** quelques grands orbes flous en plus des particules (le mana d'Elysia) */
  orbs?: boolean;
  /** vitesse de montée (1 = braises ; plus bas = plus lent, plus flottant) */
  speed?: number;
}

export default function WorkAmbience({ colors = ["240,162,74", "214,58,58"], mix = 0.35, orbs = false, speed = 1 }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current!, ctx = cv.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0;
    let parts: { x: number; y: number; r: number; v: number; p: number; alt: boolean }[] = [];

    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: Math.round(Math.min(46, W / 30)) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: orbs && Math.random() < 0.12 ? Math.random() * 3 + 2.5 : Math.random() * 1.5 + 0.4,
        v: (Math.random() * 14 + 6) * speed, p: Math.random() * 6.28, alt: Math.random() < mix,
      }));
    };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      for (const m of parts) {
        if (!reduce) {
          m.y -= m.v / 60;
          m.x += Math.sin(t / 1600 + m.p) * 0.35;
          if (m.y < -10) { m.y = H + 10; m.x = Math.random() * W; }
        }
        const big = m.r > 2.4;
        const a = (big ? 0.12 : 0.2) + 0.45 * (0.5 + 0.5 * Math.sin(t / 500 + m.p * 4));
        const c = m.alt ? colors[1] : colors[0];
        ctx.shadowBlur = orbs ? (big ? 14 : 4) : 0;
        ctx.shadowColor = `rgba(${c},.8)`;
        ctx.fillStyle = `rgba(${c},${a})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, 6.283);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    size();
    raf = requestAnimationFrame(draw);
    addEventListener("resize", size);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); };
  }, [colors[0], colors[1], mix, orbs, speed]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-amb" aria-hidden="true">
      <div className="glow-top" />
      <div className="glow-low" />
      <canvas ref={canvas} />
    </div>
  );
}
