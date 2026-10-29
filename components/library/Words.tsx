/* Découpe un titre en mots, rendus côté serveur, pour l'animation « mot à mot ».
   Chaque mot est masqué par son conteneur (.w) et le mot lui-même (.wi) monte à l'intérieur. */
export default function Words({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="w"><span className="wi">{w}</span></span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
