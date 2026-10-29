import Sigil from "@/components/Sigil";
import { AUTHOR, type Passage } from "@/lib/library";
import MailPortal from "./MailPortal";
import Words from "./Words";

/* Section « Le bibliothécaire » : présentation, ex-libris et liens. Composant serveur. */

interface Props {
  openWorks: number;
  chapterCount: number;
  /** date de la dernière inscription, déjà formatée */
  lastDate: string | null;
}

function PortalInner({ p }: { p: Passage }) {
  return (
    <>
      <Sigil size={58} seed={p.seed} count={14} star={5 + (p.seed % 4)} mono={p.mono} />
      <span className="pn">{p.name}</span>
      <span className="ph">{p.handle}</span>
      <span className="pd">{p.desc}</span>
      <span className="go" aria-hidden="true">{p.email ? "✉" : "↗"}</span>
    </>
  );
}

export default function Bibliothecaire({ openWorks, chapterCount, lastDate }: Props) {
  return (
    <section className="about wrap" id="bibliothecaire" aria-labelledby="aboutTitle">
      <div className="inner">
        <div className="about-grid">
          <div className="about-text">
            <div className="eyebrow" data-a>Celui qui tient le registre</div>
            <h2 id="aboutTitle" className="split"><Words text="Le bibliothécaire" /></h2>
            {AUTHOR.bio.map((p, i) => <p key={i} data-a>{p}</p>)}
            <div className="signature" data-a>
              <span>{AUTHOR.signature}</span>
              <svg viewBox="0 0 320 40" aria-hidden="true"><path d="M4 26 C 58 4, 116 44, 176 20 S 262 8, 316 24" /></svg>
            </div>
          </div>

          <div className="bookplate" aria-label="Ex-libris">
            <span className="ex">Ex libris</span>
            <Sigil size={104} seed={5} count={24} star={9} mono="DN" glow />
            <b>Dimension Novel</b>
            <dl>
              <dt>Œuvres</dt><dd>{openWorks} ouverte{openWorks > 1 ? "s" : ""} · {AUTHOR.sealedCount} scellée{AUTHOR.sealedCount > 1 ? "s" : ""}</dd>
              <dt>Chapitres</dt><dd>{chapterCount} inscrits</dd>
              {lastDate && <><dt>Dernier</dt><dd>{lastDate}</dd></>}
            </dl>
          </div>
        </div>

        <div className="passages">
          <div className="passages-head">
            <h3 className="split"><Words text="Les passages" /></h3>
            <p data-a>Pour suivre les sorties, lire ailleurs, ou simplement écrire.</p>
          </div>
          <ul className="portals">
            {AUTHOR.passages.map((p) => (
              <li key={p.name}>
                {p.email ? (
                  <MailPortal email={p.email} hint={p.desc}><PortalInner p={p} /></MailPortal>
                ) : (
                  <a className="portal" href={p.href} target="_blank" rel="noopener"><PortalInner p={p} /></a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
