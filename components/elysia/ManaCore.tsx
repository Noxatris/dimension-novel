"use client";

import Sigil from "@/components/Sigil";
import type { Race } from "@/lib/elysia";

/* Le cœur de mana : les cinq peuples en pentagone autour d'un même cœur, reliés par des flux.
   Toucher un peuple fait défiler jusqu'à sa fiche et la met en valeur. */

const R = 178;

export default function ManaCore({ races }: { races: Race[] }) {
  const pts = races.map((_, i) => {
    const a = ((-90 + i * (360 / races.length)) * Math.PI) / 180;
    return [Math.cos(a) * R, Math.sin(a) * R] as const;
  });

  const go = (id: string) => {
    const card = document.getElementById(`race-${id}`);
    if (!card) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    card.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    card.classList.add("hl");
    setTimeout(() => card.classList.remove("hl"), 1800);
  };

  return (
    <figure className="e-core" aria-label="Le cœur de mana et les peuples d’Elysia">
      {/* anneau runique derrière le diagramme */}
      <Sigil size={540} seed={23} count={44} star={5} className="ring-out" />
      <svg viewBox="-270 -270 540 540">
        <defs>
          <radialGradient id="coreGrad">
            <stop offset="0" stopColor="#bff7ee" stopOpacity=".9" />
            <stop offset=".35" stopColor="#7fe3d4" stopOpacity=".45" />
            <stop offset="1" stopColor="#7fe3d4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="edges">
          {pts.map(([x, y], i) => {
            const [x2, y2] = pts[(i + 1) % pts.length], [x3, y3] = pts[(i + 2) % pts.length];
            return (
              <g key={i}>
                <path className="edge" d={`M${x.toFixed(1)},${y.toFixed(1)}L${x2.toFixed(1)},${y2.toFixed(1)}`} />
                <path className="edge" d={`M${x.toFixed(1)},${y.toFixed(1)}L${x3.toFixed(1)},${y3.toFixed(1)}`} style={{ opacity: 0.5 }} />
              </g>
            );
          })}
        </g>
        <g className="flows">
          {pts.map(([x, y], i) => <path key={i} className="flow" d={`M0,0L${x.toFixed(1)},${y.toFixed(1)}`} />)}
        </g>
        <g className="core">
          <circle className="core-glow" r={78} />
          <circle className="core-ring" r={44} />
          <circle className="core-ring" r={52} style={{ opacity: 0.4 }} />
          <text className="core-txt" textAnchor="middle" y={5}>MANA</text>
        </g>
        <g className="nodes">
          {races.map((r, i) => {
            const [x, y] = pts[i];
            return (
              <g
                key={r.id}
                className="node"
                tabIndex={0}
                role="button"
                aria-label={r.name}
                transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`}
                onClick={() => go(r.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(r.id); } }}
              >
                <circle className="halo" r={40} stroke={r.hue} />
                <circle className="bg" r={30} stroke={r.hue} />
                <text className="ini" y={8} fill={r.hue}>{r.name[0]}</text>
                <text className="lbl" y={y > 0 ? 58 : -44}>{r.name}</text>
              </g>
            );
          })}
        </g>
      </svg>
      <figcaption>Un même mana, autant de façons de le porter. Touchez un peuple.</figcaption>
    </figure>
  );
}
