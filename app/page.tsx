import Sigil from "@/components/Sigil";
import SiteFooter from "@/components/SiteFooter";
import Ambience from "@/components/library/Ambience";
import { OpenBookButton } from "@/components/library/BookButtons";
import Bibliothecaire from "@/components/library/Bibliothecaire";
import LibraryMotion from "@/components/library/LibraryMotion";
import Shelf from "@/components/library/Shelf";
import Words from "@/components/library/Words";
import { frDate, listChapters, roman } from "@/lib/chapters";
import { AUTHOR, READABLE } from "@/lib/library";

/* Le hub : page SERVEUR. Seuls l'étagère, l'ambiance et le bouton « Lire » sont des composants client. */

export default async function Home() {
  const perWork = (await Promise.all(READABLE.map(async (w) => ({ work: w, chapters: await listChapters(w.id) }))))
    .filter((w) => w.chapters.length > 0);

  // la « dernière inscription » se calcule à partir des dates des chapitres, toutes œuvres confondues
  const latest = perWork
    .map(({ work, chapters }) => (chapters.length ? { work, chapter: chapters[chapters.length - 1] } : null))
    .filter((x) => x !== null)
    .sort((a, b) => (b.chapter.date ?? "").localeCompare(a.chapter.date ?? ""))[0];

  const openCount = perWork.length;
  const chapterCount = perWork.reduce((n, w) => n + w.chapters.length, 0);

  return (
    <div className="library">
      <Ambience />
      <div className="view">
        <header className="top wrap">
          <div className="inner">
            <a className="brand" href="/">
              <Sigil size={42} seed={3} count={16} mono="DN" />
              <div>
                <b>Dimension Novel</b>
                <span>Bibliothèque des mondes</span>
              </div>
            </a>
            <nav aria-label="Sections">
              <a href="#etagere">L’étagère</a>
              <a href="#bibliothecaire">Le bibliothécaire</a>
            </nav>
          </div>
        </header>

        <section className="intro wrap">
          <div className="inner intro-grid">
           <div className="intro-text">
            <div className="eyebrow" data-a>Salle de lecture · ouverte la nuit</div>
            <h1><Words text="Chaque livre est un monde." /></h1>
            <p data-a>Une bibliothèque où chaque œuvre garde son propre univers. Prenez un livre sur l’étagère, il vous emmène ailleurs.</p>
            {latest && (
              <div className="latest">
                <Sigil size={84} seed={11} count={22} star={7} mono={roman(latest.chapter.numero)} glow />
                <div className="what" data-a>
                  <small>{latest.chapter.date ? `Inscrit au registre le ${frDate(latest.chapter.date)}` : "Dernière inscription"}</small>
                  <b>{latest.work.title}, chapitre {roman(latest.chapter.numero)}</b>
                  <span>{latest.chapter.title}</span>
                </div>
                <span data-a><OpenBookButton id={latest.work.id}>Lire</OpenBookButton></span>
              </div>
            )}
           </div>
            {/* le grand sceau : occupe la moitié droite sur grand écran, masqué en dessous de 1100 px */}
            <figure className="intro-seal" aria-hidden="true">
              <Sigil size={520} seed={9} count={40} star={9} mono="DN" glow />
              <figcaption>
                <span>Sceau de la bibliothèque</span>
                <span>
                  {openCount} œuvre{openCount > 1 ? "s" : ""} ouverte{openCount > 1 ? "s" : ""} · {AUTHOR.sealedCount} scellée{AUTHOR.sealedCount > 1 ? "s" : ""} · {chapterCount} chapitres
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* l'étagère traverse toute la largeur : seul son titre reste dans la colonne */}
        <section className="shelf-sec" id="etagere" aria-labelledby="shelfTitle">
          <div className="wrap">
            <div className="inner shelf-head">
              <h2 id="shelfTitle" className="split"><Words text="L’étagère" /></h2>
              <span className="eyebrow" data-a>Survolez · ouvrez · la place ne manque pas</span>
            </div>
          </div>
          <Shelf />
        </section>

        <Bibliothecaire
          openWorks={openCount}
          chapterCount={chapterCount}
          lastDate={latest?.chapter.date ? frDate(latest.chapter.date) : null}
        />

        <SiteFooter />
      </div>
      <LibraryMotion />
    </div>
  );
}
