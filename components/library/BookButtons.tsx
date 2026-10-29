"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WORKS, readMark } from "@/lib/library";
import { useBook } from "./BookTransition";

/* Petits boutons clients utilisés dans des pages serveur. */

/** « Lire » : ouvre le livre depuis sa tranche sur l'étagère (ou depuis le bouton si l'étagère est hors écran). */
export function OpenBookButton({ id, children, className = "btn" }: { id: string; children: React.ReactNode; className?: string }) {
  const { open } = useBook();
  const w = WORKS[id];
  return (
    <button
      type="button"
      className={className}
      onClick={(e) => {
        const spine = document.querySelector(`[data-book="${id}"]`);
        const r = spine?.getBoundingClientRect();
        const visible = r && r.bottom > 0 && r.top < innerHeight;
        open(w, visible ? spine! : e.currentTarget, `/${id}`);
      }}
    >
      {children}
    </button>
  );
}

/** « Reposer le livre » : retour au hub avec la transition inverse. */
export function CloseBookButton({ id, label = "← Reposer le livre" }: { id: string; label?: string }) {
  const { close } = useBook();
  return (
    <button type="button" className="back" onClick={() => close(WORKS[id])}>
      {label}
    </button>
  );
}

/** Boutons du haut de la page d'une œuvre : reprendre là où on s'est arrêté, ou commencer. */
export function ResumeActions({ id, first, last }: { id: string; first: number; last: number }) {
  const [mark, setMark] = useState<number | null>(null);
  useEffect(() => setMark(readMark(id)), [id]);
  const resume = mark ? Math.min(mark + 1, last) : null; // le signet marque le dernier chapitre fini
  return (
    <div className="w-actions">
      {resume && (
        <Link className="btn primary" href={`/${id}/chapitre/${resume}`}>
          Reprendre au chapitre {resume}
        </Link>
      )}
      <Link className={`btn${resume ? "" : " primary"}`} href={`/${id}/chapitre/${first}`}>
        Commencer au chapitre {first}
      </Link>
    </div>
  );
}
