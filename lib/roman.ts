/* Chiffres romains. Module sans dépendance serveur : utilisable dans les composants client comme serveur. */
const ROMAN: [number, string][] = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
export function roman(n: number): string {
  let out = "";
  for (const [v, r] of ROMAN) while (n >= v) { out += r; n -= v; }
  return out;
}
