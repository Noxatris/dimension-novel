import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Sigil from "@/components/Sigil";
import { CloseBookButton, ResumeActions } from "@/components/library/BookButtons";
import Codex from "@/components/library/Codex";
import TitleLetters from "@/components/library/TitleLetters";
import Words from "@/components/library/Words";
import WorkAmbience from "@/components/library/WorkAmbience";
import WorkMotion from "@/components/library/WorkMotion";
import CityPlan from "@/components/eternalys/CityPlan";
import LoreText from "@/components/eternalys/LoreText";
import { CHOEUR, FRAGMENTS, PERSONAE, VILLE } from "@/lib/eternalys";
import { frDate, listChapters, roman } from "@/lib/chapters";
import { WORKS } from "@/lib/library";

/* La page de l'œuvre : page SERVEUR. L'ambiance, le codex, les boutons de reprise et l'animation sont client. */

const W = WORKS.eternalys;

export const metadata: Metadata = {
  title: `${W.title} · Dimension Novel`,
  description: "Une vengeance qui prend la forme d’une tragédie grecque, au cœur d’une ville qui ne dort jamais.",
};

export default async function EternalysPage() {
  const chapters = await listChapters(W.id);
  const first = chapters[0]?.numero ?? 1;
  const last = chapters.at(-1)?.numero ?? 1;
  const recent = chapters.slice(-4).reverse();

  return (
    <div className="work">
      {/* braises orange sodium et rouges, comme la ville d'Eternalys */}
      <WorkAmbience colors={["240,162,74", "214,58,58"]} />

      <header className="top wrap">
        <div className="inner">
          <CloseBookButton id={W.id} />
          <Sigil size={40} seed={3} count={16} mono="DN" className="w-seal-small" />
        </div>
      </header>

      <section className="w-hero wrap">
        <div className="inner w-hero-grid">
          <div className="w-hero-text">
            <div className="w-kicker">{W.cycle} · {W.genre} · {roman(chapters.length)} chapitres</div>
            {/* la 7e lettre (le « l ») est la lettre rouge qui s'allume comme un néon */}
            <h1 className="w-title" aria-label={W.title} style={{ "--n": W.title.length } as CSSProperties}><TitleLetters text={W.title} accent={6} /></h1>
            <p className="w-pitch">
              Une vengeance qui prend la forme d’une <i>tragédie grecque</i>, au cœur d’une ville qui ne dort jamais.
            </p>
            <ResumeActions id={W.id} first={first} last={last} />
          </div>
          <figure className="w-seal" aria-hidden="true">
            <Sigil size={520} seed={W.seed} count={36} star={7} mono={W.cote} />
            <figcaption>
              <span>Sceau d’{W.title}</span>
              <span>{W.cycle} · {roman(chapters.length)} chapitres · tragédie urbaine</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="registre wrap" id="registre" aria-labelledby="regTitle">
        <div className="inner reg-grid">
          <div className="reg-text">
            <h2 id="regTitle" className="split"><Words text="Le registre" /></h2>
            <p className="sub" data-a>Tous les chapitres, inscrits à la main. Ouvrez le codex, ou reprenez aux dernières inscriptions.</p>
            <div className="recent-label" data-a>Dernières inscriptions</div>
            <ol className="recent">
              {recent.map((c) => (
                <li key={c.numero}>
                  <Link href={`/${W.id}/chapitre/${c.numero}`}>
                    <span className="rn">{roman(c.numero)}</span>
                    <span className="rt">{c.title}</span>
                    <span className="rd">{c.date ? frDate(c.date) : ""}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <div className="reg-codex">
            <Codex
              oeuvre={W.id}
              title={W.title}
              seed={W.seed}
              mono={W.cote}
              chapters={chapters.map((c) => ({ numero: c.numero, title: c.title, date: c.date ? frDate(c.date) : null }))}
            />
          </div>
        </div>
      </section>

      <section className="lore wrap" aria-labelledby="loreTitle">
        <div className="inner">
          <div className="u-intro">
            <h2 id="loreTitle" className="split"><Words text="L’univers" /></h2>
            <p className="sub" data-a>La distribution, la ville et quelques pages arrachées au registre. Survolez les passages soulignés : d’anciens lecteurs y ont laissé des notes.</p>
          </div>

          {/* le chœur : la réplique s'allume mot à mot au défilement */}
          <figure className="choeur">
            <blockquote>
              {CHOEUR.line.split(" ").map((w, i) =>
                CHOEUR.accent && w.replace(/[^\p{L}’']/gu, "") === CHOEUR.accent
                  ? <em key={i} className="cwd">{w} </em>
                  : <span key={i} className="cwd">{w} </span>,
              )}
            </blockquote>
            <figcaption data-a>— {CHOEUR.source}</figcaption>
          </figure>

          {/* dramatis personae : pas de portrait, un masque-sceau par personnage */}
          <div className="u-block">
            <div className="u-head">
              <span className="u-eyebrow" data-a>Dramatis personae</span>
              <h3 className="split"><Words text="La distribution" /></h3>
            </div>
            <ol className="personae">
              {PERSONAE.map((p, i) => (
                <li key={i} className="persona" data-a tabIndex={0}>
                  <span className="pn">{roman(i + 1)}</span>
                  <Sigil size={84} seed={p.seed} count={14} star={5} mono={p.mono ?? p.name.replace(/[^\p{L}]/gu, "")[0] ?? "?"} className="mask" />
                  <div className="pid">
                    <span className="prole">{p.role}</span>
                    <span className="pname">{p.name}</span>
                  </div>
                  <p className="pline">{p.line}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="u-block">
            <div className="u-head">
              <span className="u-eyebrow" data-a>La ville</span>
              <h3 className="split"><Words text={VILLE.name} /></h3>
            </div>
            <CityPlan name={VILLE.name} lieux={VILLE.lieux} seed={W.seed} />
          </div>

          <div className="u-block">
            <div className="u-head">
              <span className="u-eyebrow" data-a>Pages arrachées</span>
              <h3 className="split"><Words text="Fragments" /></h3>
            </div>
            <div className="fragments">
              {FRAGMENTS.map((f, i) => (
                <article key={i} className="fragment" data-a>
                  <span className="fn">Fragment {roman(i + 1)}</span>
                  <h4>{f.title}</h4>
                  <p><LoreText text={f.text} /></p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WorkMotion />
    </div>
  );
}
