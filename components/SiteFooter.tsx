import Link from "next/link";
import { glyph } from "@/components/Sigil";

/* Le pied de page commun : hub, pages d'œuvre, lecteur, pages légales.
   Composant serveur. Ses couleurs suivent l'univers où il est posé :
   --w-* dans une œuvre (.oeuvre-<id>), les tokens du hub ailleurs (.library). */

const RUNES = [61, 62, 63, 64, 65];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-foot">
      <div className="sf-inner">
        {/* filet runique : deux traits et cinq runes, comme un ex-libris */}
        <svg className="sf-rule" viewBox="-60 -8 120 16" aria-hidden="true">
          {RUNES.map((s, i) => (
            <path key={s} d={glyph(s, 10)} transform={`translate(${(i - 2) * 16},0)`} />
          ))}
        </svg>

        <div className="sf-row">
          <p className="sf-name">
            Dimension Novel <span>· bibliothèque des mondes</span>
          </p>
          <nav className="sf-legal" aria-label="Informations légales">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Confidentialité</Link>
          </nav>
          <a className="sf-forge" href="https://noxatris.dev" target="_blank" rel="noopener">
            Façonné par <b>Noxatris</b>
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </div>

        <p className="sf-copy">© {year} Dimension Novel · Textes, personnages et univers protégés : toute reproduction demande l’accord de l’auteur.</p>
      </div>
    </footer>
  );
}
