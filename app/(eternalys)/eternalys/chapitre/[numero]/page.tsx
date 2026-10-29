import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Sigil from "@/components/Sigil";
import ChapterLink from "@/components/reader/ChapterLink";
import ChapterBody from "@/components/reader/ChapterBody";
import ReaderChrome from "@/components/reader/ReaderChrome";
import { frDate, listChapters, readChapter, roman } from "@/lib/chapters";

/* Page SERVEUR : chaque chapitre devient une page HTML statique au build.
   Plus de fetch côté client, plus d'écran « Chargement du chapitre… ». */

const OEUVRE = "eternalys";
const TITRE_OEUVRE = "Eternalys";
const SCEAU = 17; // graine du sceau de l'œuvre (garder la même partout)

export const dynamicParams = false; // un numéro inexistant renvoie une 404

export async function generateStaticParams() {
  return (await listChapters(OEUVRE)).map((c) => ({ numero: String(c.numero) }));
}

type Props = { params: Promise<{ numero: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { numero } = await params;
  const ch = await readChapter(OEUVRE, Number(numero));
  if (!ch) return {};
  return {
    title: `${ch.title} · Chapitre ${ch.numero} · ${TITRE_OEUVRE}`,
    description: `Lisez le chapitre ${ch.numero} d’${TITRE_OEUVRE}, « ${ch.title} », sur Dimension Novel.`,
  };
}

export default async function ChapterPage({ params }: Props) {
  const { numero } = await params;
  const n = Number(numero);
  const ch = await readChapter(OEUVRE, n);
  if (!ch) notFound();

  const all = await listChapters(OEUVRE);
  const has = (k: number) => all.some((c) => c.numero === k);
  const base = `/${OEUVRE}/chapitre`;

  return (
    <ReaderChrome oeuvre={OEUVRE} numero={n} bgImage={ch.bgImage ? `/bgChapter/${ch.bgImage}` : null}>
      <header className="r-top wrap">
        <div className="inner">
          <Link className="back" href={`/${OEUVRE}#registre`}>← Le registre</Link>
          <span className="r-where">{TITRE_OEUVRE} · {roman(n)}</span>
        </div>
      </header>

      <article key={n} className="r-col wrap" aria-labelledby="chapterTitle">
        <div className="r-sheet">
          <header className="r-head">
            <Sigil size={92} seed={11 + n} count={22} star={7} mono={roman(n)} />
            <div className="r-kicker">Chapitre {roman(n)}</div>
            <h1 className="r-title" id="chapterTitle">{ch.title}</h1>
            <div className="r-meta">
              {ch.date ? `inscrit le ${frDate(ch.date)} · ` : ""}env. {ch.minutes} min de lecture
            </div>
          </header>

          <ChapterBody markdown={ch.content} />

          <footer className="r-end">
            <Sigil size={64} seed={SCEAU} count={18} star={5} mono="ETR" />
            <p>Fin du chapitre {roman(n)}</p>
            <nav className="r-nav" aria-label="Chapitres">
              {has(n - 1)
                ? <ChapterLink className="btn prev" href={`${base}/${n - 1}`}>‹ Chapitre {roman(n - 1)}</ChapterLink>
                : <span className="btn prev" aria-disabled="true">‹ Début</span>}
              <Link className="btn mid" href={`/${OEUVRE}#registre`}>Le registre</Link>
              {has(n + 1)
                ? <ChapterLink className="btn next" href={`${base}/${n + 1}`}>Chapitre {roman(n + 1)} ›</ChapterLink>
                : <span className="btn next" aria-disabled="true">Suite en cours d’écriture</span>}
            </nav>
          </footer>
        </div>
      </article>
    </ReaderChrome>
  );
}
