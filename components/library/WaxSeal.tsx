/* Cachet de cire des livres scellés. Le bord irrégulier est calculé une fois, au chargement du module. */

const EDGE = (() => {
  const pts: string[] = [];
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    const r = 24 + (i % 2 ? 1.6 : -0.6) + Math.sin(i * 2.7) * 1.2;
    pts.push(`${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`);
  }
  return "M" + pts.join("L") + "Z";
})();

export default function WaxSeal({ mono = "DN", className = "" }: { mono?: string; className?: string }) {
  return (
    <svg className={className} viewBox="-30 -30 60 60" aria-hidden="true">
      <path d={EDGE} fill="#7a1f24" />
      <circle r={17} fill="none" stroke="#f3d9c4" strokeOpacity={0.3} strokeWidth={1.2} />
      <text textAnchor="middle" dy={5.5} fill="#f3d9c4" fontFamily="var(--f-display)" fontSize={15}>
        {mono}
      </text>
    </svg>
  );
}
