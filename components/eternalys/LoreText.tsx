/* Texte de lore avec notes en marge (composant serveur).
   Syntaxe : [[passage souligné|note dans la marge]]. Le reste est du texte brut. */

const NOTE = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;

export default function LoreText({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(NOTE)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <span key={m.index} className="note" tabIndex={0}>
        {m[1]}
        <span className="margin">{m[2]}</span>
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
