"use client";

import { useMemo, useState } from "react";
import { roman } from "@/lib/roman";
import type { Lieu } from "@/lib/eternalys";

/* Plan schématique de la ville : rues tirées d'une graine (aucun dessin à fournir), un fleuve,
   un boulevard circulaire, et les lieux en points de néon. Survoler un lieu de la liste l'allume sur le plan. */

const VW = 1000, VH = 620;

function rand(seed: number) {
  let s = seed * 9301 + 49297;
  return () => (s = (s * 9301 + 49297) % 233280) / 233280;
}

function streets(seed: number) {
  const r = rand(seed);
  const minor: string[] = [];
  // trame irrégulière : des rues « nord-sud » et « est-ouest » légèrement penchées, interrompues par endroits
  for (let x = 30; x < VW; x += 46 + r() * 34) {
    const tilt = (r() - 0.5) * 40;
    let y = 0;
    while (y < VH) {
      const len = 60 + r() * 140;
      if (r() > 0.22) minor.push(`M${(x + (tilt * y) / VH).toFixed(1)},${y.toFixed(1)}L${(x + (tilt * (y + len)) / VH).toFixed(1)},${Math.min(VH, y + len).toFixed(1)}`);
      y += len + 8;
    }
  }
  for (let y = 24; y < VH; y += 38 + r() * 30) {
    const tilt = (r() - 0.5) * 30;
    let x = 0;
    while (x < VW) {
      const len = 70 + r() * 180;
      if (r() > 0.25) minor.push(`M${x.toFixed(1)},${(y + (tilt * x) / VW).toFixed(1)}L${Math.min(VW, x + len).toFixed(1)},${(y + (tilt * (x + len)) / VW).toFixed(1)}`);
      x += len + 8;
    }
  }
  // trois grandes avenues qui traversent la ville en diagonale
  const avenues = [
    `M0,${(120 + r() * 80).toFixed(0)}L${VW},${(420 + r() * 120).toFixed(0)}`,
    `M${(180 + r() * 100).toFixed(0)},${VH}L${(640 + r() * 120).toFixed(0)},0`,
    `M${(520 + r() * 80).toFixed(0)},${VH}L${VW},${(220 + r() * 80).toFixed(0)}`,
  ];
  // le fleuve : une courbe douce d'un bord à l'autre
  const river = `M-20,${(470 + r() * 40).toFixed(0)}C${(260).toFixed(0)},${(380 + r() * 60).toFixed(0)} ${(420).toFixed(0)},${(560 + r() * 40).toFixed(0)} ${(640).toFixed(0)},${(470 + r() * 30).toFixed(0)}S${(880).toFixed(0)},${(330 + r() * 60).toFixed(0)} ${VW + 20},${(360 + r() * 40).toFixed(0)}`;
  return { minor, avenues, river };
}

export default function CityPlan({ name, lieux, seed = 17 }: { name: string; lieux: Lieu[]; seed?: number }) {
  const { minor, avenues, river } = useMemo(() => streets(seed), [seed]);
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="ville">
      <figure className="plan" aria-label={`Plan schématique de ${name}`}>
        <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="ptGlow">
              <stop offset="0" stopColor="currentColor" stopOpacity=".55" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g className="pl-minor">{minor.map((d, i) => <path key={i} d={d} />)}</g>
          <path className="pl-river" d={river} />
          <ellipse className="pl-ring" cx={VW * 0.52} cy={VH * 0.48} rx={VW * 0.34} ry={VH * 0.36} />
          <g className="pl-av">{avenues.map((d, i) => <path key={i} d={d} />)}</g>
          <g className="pl-pts">
            {lieux.map((l, i) => (
              <g
                key={i}
                className={`pt${active === i ? " on" : ""}`}
                transform={`translate(${(l.x / 100) * VW},${(l.y / 100) * VH})`}
              >
                <circle className="pt-glow" r={46} fill="url(#ptGlow)" />
                <circle className="pt-ring" r={15} />
                <circle className="pt-core" r={4.5} />
                <text className="pt-num" y={-24}>{roman(i + 1)}</text>
              </g>
            ))}
          </g>
        </svg>
        <figcaption>{name} · plan schématique</figcaption>
      </figure>

      <ol className="lieux">
        {lieux.map((l, i) => (
          <li
            key={i}
            data-a
            className={active === i ? "on" : ""}
            tabIndex={0}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            <span className="ln">{roman(i + 1)}</span>
            <div>
              <h4>{l.name}</h4>
              <p>{l.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
