/* Rose des vents de la carte à venir : seize pointes en traits simples. Composant serveur. */
export default function CompassRose() {
  let d = "";
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI) / 8;
    const L = i % 4 === 0 ? 170 : i % 2 === 0 ? 110 : 70;
    const w = i % 4 === 0 ? 16 : 9;
    const [cx, cy] = [Math.cos(a), Math.sin(a)], [px, py] = [-cy, cx];
    d += `M${(cx * L).toFixed(1)},${(cy * L).toFixed(1)}L${(px * w).toFixed(1)},${(py * w).toFixed(1)}L${(-px * w).toFixed(1)},${(-py * w).toFixed(1)}Z`;
  }
  return (
    <svg viewBox="-190 -190 380 380" fill="none" stroke="currentColor" strokeWidth={1} aria-hidden="true">
      <circle r={150} />
      <circle r={120} strokeDasharray="2 6" />
      <circle r={180} opacity={0.5} />
      <path d={d} />
      <text y={-178} textAnchor="middle" fill="currentColor" stroke="none" fontFamily="var(--f-sc)" fontSize={16}>N</text>
    </svg>
  );
}
