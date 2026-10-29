/* Titre découpé en lettres (rendu serveur) pour l'animation « lettre à lettre ».
   La lettre à la position `accent` est mise en valeur (balise <em>, colorée par le CSS de l'œuvre). */
export default function TitleLetters({ text, accent }: { text: string; accent?: number }) {
  return (
    <span className="cw" aria-hidden="true">
      {[...text].map((c, i) =>
        i === accent ? <em key={i} className="ch">{c}</em> : <span key={i} className="ch">{c}</span>,
      )}
    </span>
  );
}
