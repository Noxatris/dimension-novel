"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Sigil, { glyph } from "@/components/Sigil";
import { SHELF, WORKS, readMark } from "@/lib/library";
import { useBook } from "./BookTransition";
import WaxSeal from "./WaxSeal";

/* L'étagère : tranches de livres en CSS, regroupées par cycle avec une plaque en laiton.
   La planche traverse tout l'écran ; de part et d'autre, des emplacements libres (silhouettes de livres à venir). */

function rand(seed: number) {
  let s = seed * 9301 + 49297;
  return () => (s = (s * 9301 + 49297) % 233280) / 233280;
}

/** Silhouettes générées une fois, identiques côté serveur et client (graine fixe). */
function ghostRow(seed: number, n = 26) {
  const r = rand(seed);
  const row: { h: number; w: number; kind: string; ml?: number; a?: number }[] = [];
  for (let i = 0; i < n; i++) {
    const h = 190 + Math.round(r() * 130), w = 38 + Math.round(r() * 30);
    let kind = r() < 0.08 ? " gap" : r() < 0.05 ? " lean" : "";
    if (kind === " lean" && row[i - 1]?.kind === " lean") kind = ""; // jamais deux livres penchés à la suite
    const g: (typeof row)[number] = { h, w, kind };
    if (kind === " lean") {
      // un livre penché pivote sur son coin bas gauche et vient S'APPUYER sur son voisin de gauche :
      // on lui réserve juste la place que prend son inclinaison, pour qu'il touche sans passer par-dessus.
      const a = Math.round((6 + r() * 3) * 10) / 10, rad = (a * Math.PI) / 180;
      const prev = row[i - 1];
      const hn = prev && prev.kind !== " gap" ? prev.h : 0;
      // appui sur le flanc du voisin s'il est plus haut que le livre penché, sinon sur son coin supérieur
      const reach = hn && hn < h * Math.cos(rad) ? hn * Math.tan(rad) : h * Math.sin(rad);
      g.a = -a;
      g.ml = Math.ceil(reach) - 5 + 1; // -5 : l'espace normal entre deux livres ; +1 : un pixel d'air
    }
    row.push(g);
  }
  return row;
}
const GHOSTS_L = ghostRow(31);
const GHOSTS_R = ghostRow(77);

function Ghosts({ side, items }: { side: "left" | "right"; items: typeof GHOSTS_L }) {
  return (
    <div className={`ghosts ${side}`} aria-hidden="true">
      {items.map((g, i) => <i key={i} className={`ghost${g.kind}`} style={{ width: g.w, height: g.h, marginLeft: g.ml, ...(g.a ? { "--a": `${g.a}deg` } : {}) } as CSSProperties} />)}
    </div>
  );
}

function RuneColumn({ seed, n = 5 }: { seed: number; n?: number }) {
  return (
    <svg className="runes" viewBox={`0 0 14 ${n * 20}`} preserveAspectRatio="xMidYMid meet" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <path key={i} transform={`translate(7,${10 + i * 20})`} d={glyph(seed * 13 + i, 11)} />
      ))}
    </svg>
  );
}

export default function Shelf() {
  const { open } = useBook();
  const [marks, setMarks] = useState<Record<string, number | null>>({});

  // le ruban marque-page n'apparaît que si le lecteur a déjà commencé l'œuvre
  useEffect(() => {
    setMarks(Object.fromEntries(Object.keys(WORKS).map((id) => [id, readMark(id)])));
  }, []);

  return (
    <div className="shelf-scroll">
      <div className="shelf">
        <Ghosts side="left" items={GHOSTS_L} />
        <div className="shelf-books">
        <i className="bookend" aria-hidden="true" />
        {SHELF.map((group) => (
          <div className="group" key={group.plaque}>
            {group.books.map((b, i) => {
              const size: CSSProperties = { width: b.w, height: b.h };

              if (b.kind === "work") {
                const w = WORKS[b.id];
                const mark = w.kind === "work" && !b.anchor ? marks[b.id] : null;
                const label = b.label ?? w.title;
                return (
                  <button
                    key={`${b.id}-${i}`}
                    type="button"
                    className="spine"
                    // seule la tranche principale sert de point d'arrivée quand on repose le livre
                    data-book={b.anchor ? undefined : b.id}
                    style={{ ...size, "--c": b.color ?? w.color, "--t": b.ink ?? w.ink } as CSSProperties}
                    aria-label={`Ouvrir ${label}`}
                    onClick={(e) => open({ ...w, color: b.color ?? w.color, ink: b.ink ?? w.ink }, e.currentTarget, `/${w.id}${b.anchor ? `#${b.anchor}` : ""}`)}
                  >
                    <i className="gild a" />
                    <span className="label" style={label.length > 14 ? { fontSize: 18 } : undefined}>{label}</span>
                    <i className="gild b" />
                    <span className="medal"><Sigil size={26} seed={b.medal ?? w.seed} count={10} star={5} /></span>
                    {mark && <span className="ribbon" aria-hidden="true" />}
                    <span className="tip">{mark ? `Signet · chapitre ${mark}` : b.tip ?? `${w.genre} · ouvrir`}</span>
                  </button>
                );
              }

              if (b.kind === "sealed") {
                return (
                  <button
                    key={i}
                    type="button"
                    className="spine sealed"
                    style={{ ...size, "--c": b.color, "--t": "#e8e0d0" } as CSSProperties}
                    aria-label={b.tip}
                    aria-disabled="true"
                  >
                    <i className="gild a" />
                    <RuneColumn seed={b.seed} />
                    <WaxSeal className="wax" />
                    <i className="gild b" style={{ bottom: 16 }} />
                    <span className="tip">{b.tip}</span>
                  </button>
                );
              }

              return (
                <a key={i} className="spine" href={b.href} style={{ ...size, "--c": b.color, "--t": b.ink } as CSSProperties}>
                  <i className="gild a" style={{ borderColor: "#8a6d39" }} />
                  <span className="label" style={{ fontSize: 17 }}>{b.label}</span>
                  <span className="tip">{b.tip}</span>
                </a>
              );
            })}
            <span className="plaque">{group.plaque}</span>
          </div>
        ))}
        <i className="bookend" aria-hidden="true" />
        </div>
        <Ghosts side="right" items={GHOSTS_R} />
      </div>
    </div>
  );
}
