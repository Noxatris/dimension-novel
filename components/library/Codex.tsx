"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Sigil from "@/components/Sigil";
import { readMark } from "@/lib/library";

/* Le registre des chapitres : un codex relié qui s'ouvre en 3D.
   Page de gauche : dernière inscription et signet. Page de droite : l'index, par cahiers de dix. */

export interface CodexEntry {
  numero: number;
  title: string;
  /** date déjà formatée (« 28 octobre 2026 ») ou null */
  date: string | null;
}

interface Props {
  oeuvre: string;
  title: string;
  seed: number;
  /** texte au centre du sceau de couverture (la cote de l'œuvre) */
  mono?: string;
  /** chapitres triés par numéro croissant */
  chapters: CodexEntry[];
}

const PER = 10;
const ROMAN: [number, string][] = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
const roman = (n: number) => ROMAN.reduce((s, [v, r]) => { while (n >= v) { s += r; n -= v; } return s; }, "");

export default function Codex({ oeuvre, title, seed, mono, chapters }: Props) {
  const [open, setOpen] = useState(false);
  const [cahier, setCahier] = useState(0); // 0 = le plus récent
  const [mark, setMark] = useState<number | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMark(readMark(oeuvre)), [oeuvre]);
  // ouverture directe depuis le lecteur (lien « Le registre » → /oeuvre#registre)
  useEffect(() => { if (location.hash === "#registre") setOpen(true); }, []);

  const latest = chapters.at(-1);
  if (!latest) return null;

  const desc = [...chapters].reverse();
  const cahiers = Math.ceil(desc.length / PER);
  const page = desc.slice(cahier * PER, cahier * PER + PER);
  const hi = page[0]?.numero ?? 0, lo = page.at(-1)?.numero ?? 0;
  const resume = mark ? Math.min(mark + 1, latest.numero) : chapters[0].numero;

  const turn = (dir: 1 | -1) => {
    const next = cahier + dir;
    if (next < 0 || next >= cahiers) return;
    const el = pageRef.current;
    if (!el?.animate || matchMedia("(prefers-reduced-motion: reduce)").matches) { setCahier(next); return; }
    const out = el.animate([{ transform: "rotateY(0)", opacity: 1 }, { transform: `rotateY(${dir > 0 ? -80 : 80}deg)`, opacity: 0 }], { duration: 260, easing: "ease-in" });
    out.onfinish = () => {
      setCahier(next);
      el.animate([{ transform: `rotateY(${dir > 0 ? 80 : -80}deg)`, opacity: 0 }, { transform: "rotateY(0)", opacity: 1 }], { duration: 300, easing: "ease-out" });
    };
  };

  return (
    <>
      <div className="codex-stage">
        <div className={`codex${open ? " open" : ""}`}>
          <div className="cover">
            <button className="front" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="codexIndex">
              <Sigil size={150} seed={seed} count={26} star={7} mono={mono ?? title.slice(0, 3).toUpperCase()} glow />
              <span className="t">Registre des chapitres</span>
              <span className="s">{title}</span>
              <span className="hint">Ouvrir le codex</span>
            </button>

            <div className="back vellum left">
              <div className="head">Dernière inscription</div>
              <Sigil size={128} seed={seed - 6} count={24} star={7} mono={roman(latest.numero)} glow />
              <div className="ins">
                <b>Chapitre {roman(latest.numero)}</b>
                {latest.date ? `inscrit le ${latest.date}` : latest.title}
              </div>
              <div className="signet">
                <p>
                  {mark
                    ? `Signet au chapitre ${roman(mark)}. Il avance seul quand vous finissez un chapitre.`
                    : "Pas encore de signet. Il se pose seul quand vous finissez un chapitre."}
                </p>
                <Link className="btn" href={`/${oeuvre}/chapitre/${resume}`}>
                  {mark ? "Reprendre la lecture" : "Commencer la lecture"}
                </Link>
              </div>
            </div>
          </div>

          <div className="page page-r vellum" id="codexIndex">
            <div className="page-content" ref={pageRef}>
              <div className="head">Cahier {roman(cahiers - cahier)} · chapitres {roman(lo)} à {roman(hi)}</div>
              <ol className="index">
                {page.map((c) => (
                  <li key={c.numero}>
                    <Link href={`/${oeuvre}/chapitre/${c.numero}`} className={c.numero === mark ? "marked" : undefined}>
                      <span className="num">{roman(c.numero)}</span>
                      <span className="ttl">
                        {c.title}
                        {c.numero === latest.numero && <span className="new">· nouveau</span>}
                      </span>
                      <span className="lead" />
                      <span className="ar">{c.numero}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
            <div className="turn">
              <button type="button" onClick={() => turn(-1)} disabled={cahier === 0} aria-label="Cahier plus récent">‹ récents</button>
              <span>{cahier + 1} / {cahiers}</span>
              <button type="button" onClick={() => turn(1)} disabled={cahier === cahiers - 1} aria-label="Cahier plus ancien">anciens ›</button>
            </div>
          </div>
        </div>
      </div>
      <button className="close-codex" type="button" onClick={() => setOpen(false)} style={{ visibility: open ? "visible" : "hidden" }}>
        Refermer le codex
      </button>
    </>
  );
}
