import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/* Rendu du markdown CÔTÉ SERVEUR : le texte arrive déjà dans le HTML de la page.
   Les marqueurs de musique gardent ta syntaxe actuelle :  #### music: nom-de-la-piste  */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const textOf = (node: any): string =>
  node?.children?.map((c: { value?: string; children?: unknown[] }) => c.value ?? textOf(c)).join("") ?? "";

const NOTE = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9 17.5a3 3 0 1 1-2-2.83V4l12-2v12.5a3 3 0 1 1-2-2.83V5.36L9 6.7z" />
  </svg>
);

const components: Components = {
  h4: ({ node, children }) => {
    const text = textOf(node).trim();
    if (text.startsWith("music:")) {
      const track = text.replace("music:", "").trim();
      return (
        <div className="r-music" data-music={track}>
          {NOTE}
          {track}
        </div>
      );
    }
    return <h4>{children}</h4>;
  },
  // un « # » dans le corps reste un titre de section ; le titre du chapitre est géré par la page
  h1: ({ children }) => <h2>{children}</h2>,
};

export default function ChapterBody({ markdown }: { markdown: string }) {
  return (
    <div className="r-text">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
