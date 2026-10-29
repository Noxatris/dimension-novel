import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Sigil from "@/components/Sigil";
import CompassRose from "@/components/elysia/CompassRose";
import ElysiaMotion from "@/components/elysia/ElysiaMotion";
import ManaCore from "@/components/elysia/ManaCore";
import { CloseBookButton } from "@/components/library/BookButtons";
import TitleLetters from "@/components/library/TitleLetters";
import WaxSeal from "@/components/library/WaxSeal";
import Words from "@/components/library/Words";
import WorkAmbience from "@/components/library/WorkAmbience";
import { MAGIC, RACES, RECITS } from "@/lib/elysia";
import { WORKS } from "@/lib/library";

/* L'atlas d'Elysia, le monde commun : page SERVEUR.
   Client : l'ambiance, le cœur de mana (clic sur un peuple), le bouton de retour et l'animation. */

const W = WORKS.elysia;
const NOMBRES = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"];
const enLettres = (n: number) => NOMBRES[n] ?? String(n);

export const metadata: Metadata = {
  title: "Elysia · le monde commun · Dimension Novel",
  description: "L’atlas d’Elysia, le monde de hard fantasy où se déroulent la plupart des récits : ses cinq peuples, sa magie et ses histoires.",
};

function SectionHead({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="sec-head">
      <div>
        <div className="eyebrow-e" data-a>{eyebrow}</div>
        <h2 className="sec split" id={id}><Words text={title} /></h2>
      </div>
      <p data-a>{children}</p>
    </div>
  );
}

export default function ElysiaPage() {
  return (
    <div className="work elysia">
      {/* particules de mana cyan et dorées, lentes, avec quelques orbes */}
      <WorkAmbience colors={["127,227,212", "241,220,162"]} mix={0.3} orbs speed={0.5} />

      <header className="top wrap">
        <div className="inner">
          <CloseBookButton id={W.id} label="← Reposer l’atlas" />
          <Sigil size={40} seed={3} count={16} mono="DN" className="w-seal-small" />
        </div>
      </header>

      <section className="w-hero wrap">
        <div className="inner w-hero-grid">
          <div className="w-hero-text">
            <div className="w-kicker">Le monde commun · hard fantasy · {enLettres(RACES.length)} peuples</div>
            {/* le « y » (3e lettre) s'illumine comme une magie de lumière */}
            <h1 className="w-title" aria-label={W.title} style={{ "--n": W.title.length } as CSSProperties}><TitleLetters text={W.title} accent={2} /></h1>
            <p className="w-pitch">
              Un monde où chaque peuple porte la magie à sa façon : <i>gravée, forgée, bricolée, liée ou distillée</i>. La plupart de mes récits s’y déroulent.
            </p>
            <div className="w-actions">
              <a className="btn primary" href="#peuples">Les {enLettres(RACES.length)} peuples</a>
              <a className="btn" href="#recits">Les récits</a>
            </div>
          </div>
          <ManaCore races={RACES} />
        </div>
      </section>

      <section className="e-sec wrap" id="peuples" aria-labelledby="peuplesT">
        <div className="inner">
          <SectionHead id="peuplesT" eyebrow="Les habitants" title={`Les ${enLettres(RACES.length)} peuples`}>
            Chacun porte un cœur de mana différent, et la magie n’y prend jamais la même forme.
          </SectionHead>
          <ul className="races">
            {RACES.map((r) => (
              <li key={r.id} className="race" id={`race-${r.id}`} style={{ "--h": r.hue } as CSSProperties} data-a>
                <Sigil size={64} seed={r.seed} count={14} star={5} mono={r.name[0]} />
                <h3>{r.name}</h3>
                <div className="spe">{r.spe.map((x) => <span key={x}>{x}</span>)}</div>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="e-sec wrap" id="magie" aria-labelledby="magieT">
        <div className="inner">
          <SectionHead id="magieT" eyebrow="Les lois du monde" title="La magie">
            <span className="sketch">Esquisse</span> Les grandes règles, sans rien dévoiler des récits.
          </SectionHead>
          <div className="magic">
            {MAGIC.map((m) => (
              <article key={m.title} className="magic-item" data-a>
                <Sigil size={54} seed={m.seed} count={14} star={m.star} />
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="e-sec wrap" id="carte" aria-labelledby="carteT">
        <div className="inner">
          <SectionHead id="carteT" eyebrow="Géographie" title="La carte">
            Elle se dessinera ici, région par région, à mesure que les récits avancent.
          </SectionHead>
          <div className="e-map" data-a>
            <div className="rose" aria-hidden="true"><CompassRose /></div>
            <div className="txt"><b>Terra incognita</b><span>La carte du monde n’est pas encore tracée.</span></div>
          </div>
        </div>
      </section>

      <section className="e-sec wrap e-last" id="recits" aria-labelledby="recitsT">
        <div className="inner">
          <SectionHead id="recitsT" eyebrow="Sur l’étagère" title="Les récits d’Elysia">
            Les histoires qui se déroulent dans ce monde, de la plus courte à la plus vaste.
          </SectionHead>
          <div className="recits">
            {RECITS.map((r) => (
              <article key={r.title} className={`recit${r.sealed ? " sealed" : ""}`} data-a>
                <div className="book" style={{ "--bc": r.color } as CSSProperties}>
                  <Sigil size={44} seed={r.seed} count={12} star={r.sealed ? 7 : 5} mono={r.mono} />
                </div>
                {r.sealed && <WaxSeal className="wax" />}
                <div>
                  <span className="status">{r.status}</span>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                  {r.workId && <a className="btn primary" href={`/${r.workId}`} style={{ marginTop: 14 }}>Ouvrir le livre</a>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ElysiaMotion />
    </div>
  );
}
