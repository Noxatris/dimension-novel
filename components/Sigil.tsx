/* Sceau runique, généré en SVG. Composant serveur : rien n'est envoyé en JS au navigateur.
   Les runes sont inventées et tirées d'une graine : même graine = même sceau, à chaque build. */

function rand(seed: number) {
  let s = seed * 9301 + 49297;
  return () => (s = (s * 9301 + 49297) % 233280) / 233280;
}

/** Une rune : une hampe verticale et une à trois branches. */
export function glyph(seed: number, h = 10): string {
  const r = rand(seed + 7);
  const w = h * 0.55;
  let d = `M0,${-h / 2}V${h / 2}`;
  const n = 1 + Math.floor(r() * 3);
  for (let k = 0; k < n; k++) {
    const y = -h / 2 + r() * h * 0.8;
    const dir = r() < 0.5 ? -1 : 1;
    const down = r() < 0.5 ? 1 : -1;
    d += r() < 0.7
      ? `M0,${y.toFixed(1)}l${(dir * w).toFixed(1)},${(down * w * 0.8).toFixed(1)}`
      : `M0,${y.toFixed(1)}h${(dir * w * 0.8).toFixed(1)}`;
  }
  return d;
}

interface Props {
  size?: number;
  seed?: number;
  /** nombre de runes sur l'anneau */
  count?: number;
  /** nombre de branches de l'étoile */
  star?: number;
  /** texte au centre (chiffre romain, monogramme…) */
  mono?: string;
  glow?: boolean;
  className?: string;
}

export default function Sigil({ size = 100, seed = 3, count = 22, star = 7, mono = "", glow = false, className = "" }: Props) {
  const pts: [number, number][] = [];
  for (let i = 0; i < star; i++) {
    const a = (i * 2 * Math.PI) / star - Math.PI / 2;
    pts.push([Math.cos(a) * 27, Math.sin(a) * 27]);
  }
  const skip = Math.floor(star / 2.4) || 2;
  let starD = "";
  for (let i = 0; i < star; i++) {
    const a = pts[i], b = pts[(i + skip) % star];
    starD += `M${a[0].toFixed(1)},${a[1].toFixed(1)}L${b[0].toFixed(1)},${b[1].toFixed(1)}`;
  }

  return (
    <svg
      className={`sigil${glow ? " glow" : ""} ${className}`}
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <circle r={46} strokeWidth={1.2} />
        <circle r={43} strokeWidth={0.5} opacity={0.7} />
        <g className="ring" strokeWidth={1.1}>
          {Array.from({ length: count }, (_, i) => (
            <path key={i} transform={`rotate(${(360 / count) * i}) translate(0,-38)`} d={glyph(seed * 31 + i, 9)} />
          ))}
        </g>
        <circle r={31} strokeWidth={0.8} />
        <g className="ring rev" strokeWidth={0.7} opacity={0.85}>
          <path d={starD} />
        </g>
        <circle r={12} strokeWidth={1} />
      </g>
      {mono && (
        <text
          textAnchor="middle"
          dy={4.2}
          fill="currentColor"
          fontFamily="var(--f-display)"
          fontSize={Math.min(11.5, 34 / mono.length).toFixed(1)}
        >
          {mono}
        </text>
      )}
    </svg>
  );
}
