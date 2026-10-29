"use client";

import { useRef, type ReactNode } from "react";

/* Carte « Écrire » : copie l'adresse au clic (un lien mailto: ne marche pas partout).
   Si le presse-papiers est refusé, l'adresse est sélectionnée pour une copie manuelle. */
export default function MailPortal({ email, hint, children }: { email: string; hint: string; children: ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);

  const say = (msg: string) => {
    const el = ref.current?.querySelector<HTMLElement>(".pd");
    if (!el) return;
    el.textContent = msg;
    setTimeout(() => { el.textContent = hint; }, 3000);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      say("Adresse copiée.");
    } catch {
      const target = ref.current?.querySelector(".ph");
      if (target) {
        const range = document.createRange();
        range.selectNodeContents(target);
        const sel = getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      say("Adresse sélectionnée : copiez-la.");
    }
  };

  return (
    <button ref={ref} type="button" className="portal" onClick={copy} aria-label={`Copier l’adresse ${email}`}>
      {children}
    </button>
  );
}
