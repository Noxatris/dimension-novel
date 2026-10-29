"use client";

import { useEffect, useRef } from "react";

/* Lumière de lampe (plus chaude le soir) et poussière lumineuse qui monte dans le faisceau. */
export default function Ambience() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const lamp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = new Date().getHours();
    lamp.current?.style.setProperty("--lamp-strength", String(h >= 19 || h < 6 ? 0.3 : h >= 17 ? 0.24 : 0.14));

    const cv = canvas.current!, ctx = cv.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0;
    let motes: { x: number; y: number; r: number; v: number; p: number; arc: boolean }[] = [];

    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      motes = Array.from({ length: Math.round(Math.min(70, W / 18)) }, () => ({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + 0.4,
        v: Math.random() * 10 + 4, p: Math.random() * 6.28, arc: Math.random() < 0.22,
      }));
    };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      for (const m of motes) {
        if (!reduce) {
          m.y -= m.v / 60;
          m.x += Math.sin(t / 2400 + m.p) * 0.18;
          if (m.y < -10) { m.y = H + 10; m.x = Math.random() * W; }
        }
        const a = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t / 900 + m.p * 3));
        ctx.fillStyle = m.arc ? `rgba(169,155,255,${a})` : `rgba(233,185,107,${a})`;
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
  }, []);

  return (
    <>
      <div ref={lamp} className="lamp" aria-hidden="true" />
      <div className="lamp-low" aria-hidden="true" />
      <canvas ref={canvas} className="motes" aria-hidden="true" />
    </>
  );
}
