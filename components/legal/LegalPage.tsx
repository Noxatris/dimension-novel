import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Sigil from "@/components/Sigil";
import { readLegal, type LegalSlug } from "@/lib/legal";

/* Gabarit commun des pages légales : sobre, une colonne de lecture, dans la salle du hub. */

export default async function LegalPage({ slug }: { slug: LegalSlug }) {
  const { title, maj, content } = await readLegal(slug);
  return (
    <main className="legal wrap">
      <div className="legal-inner">
        <Link className="legal-back" href="/">← Retour à la bibliothèque</Link>
        <header className="legal-head">
          <Sigil size={64} seed={slug === "confidentialite" ? 88 : 77} count={16} star={7} />
          <h1>{title}</h1>
          {maj && <p className="legal-maj">Mise à jour le {maj}</p>}
        </header>
        <article className="legal-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // liens externes : nouvel onglet ; liens internes : navigation Next
              a: ({ href = "", children }) =>
                /^https?:\/\//.test(href) ? (
                  <a href={href} target="_blank" rel="noopener">{children}</a>
                ) : href.startsWith("/") ? (
                  <Link href={href}>{children}</Link>
                ) : (
                  <a href={href}>{children}</a>
                ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
