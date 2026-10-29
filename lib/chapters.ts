import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

/* ============================================================
   Contenu FROID : les chapitres en .md, lus côté serveur au build.
   Rangement attendu :
     content/<oeuvre>/chapitres/1.md   (ou 001.md, chapitre-1.md…)
   Frontmatter facultatif :
     ---
     title: Némésis
     date: 2026-10-28
     bgImage: chapitre-56.jpg      # fichier dans public/bgChapter/
     ---
   Sans frontmatter, le titre est pris sur la première ligne « # Titre ».
   ============================================================ */

export interface ChapterMeta {
  numero: number;
  title: string;
  date: string | null;
  bgImage: string | null;
  /** temps de lecture estimé */
  minutes: number;
}
export interface Chapter extends ChapterMeta {
  content: string;
}

const ROOT = path.join(process.cwd(), "content");

const MOIS = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
const iso = (y: number, m: number, d: number) => {
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d
    ? `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`
    : null;
};

/**
 * Date de frontmatter → "AAAA-MM-JJ", ou null si illisible (jamais d'exception).
 * Accepte : objet Date (YAML transforme 2026-10-28 en Date), "2026-10-28", "28/10/2026",
 * "28-10-2026", "28.10.2026", "28 octobre 2026" (avec ou sans accents).
 */
function parseDate(v: unknown): string | null {
  if (v == null || v === "") return null;
  if (v instanceof Date) return Number.isNaN(v.getTime()) ? null : v.toISOString().slice(0, 10);
  const s = String(v).trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return iso(+m[1], +m[2], +m[3]);
  m = s.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (m) return iso(+m[3], +m[2], +m[1]);
  m = s.match(/^(\d{1,2})(?:er)?\s+([a-z]+)\.?\s+(\d{4})$/);
  if (m) {
    const w = m[2];
    let mo = MOIS.indexOf(w);
    if (mo < 0) mo = MOIS.findIndex((x) => x.startsWith(w.slice(0, 4)));
    if (mo >= 0) return iso(+m[3], mo + 1, +m[1]);
  }
  const t = new Date(s);
  return Number.isNaN(t.getTime()) ? null : t.toISOString().slice(0, 10);
}
const dirOf = (oeuvre: string) => path.join(ROOT, oeuvre, "chapitres");

/** Numéro tiré du nom de fichier : "12.md", "012.md", "chapitre-12.md" → 12 */
const numeroOf = (file: string) => Number(file.replace(/\.md$/, "").match(/(\d+)\s*$/)?.[1] ?? NaN);

const files = cache(async (oeuvre: string) => {
  // une œuvre sans dossier de chapitres (pas encore publiée) n'a simplement aucun chapitre
  const list = await fs.readdir(dirOf(oeuvre)).catch(() => [] as string[]);
  const map = new Map<number, string>();
  for (const f of list) {
    const n = numeroOf(f);
    if (f.endsWith(".md") && Number.isFinite(n)) map.set(n, f);
  }
  return map;
});

export const readChapter = cache(async (oeuvre: string, numero: number): Promise<Chapter | null> => {
  const file = (await files(oeuvre)).get(numero);
  if (!file) return null;
  const raw = await fs.readFile(path.join(dirOf(oeuvre), file), "utf8");
  const { data, content } = matter(raw);

  // le titre peut venir du frontmatter ou de la première ligne « # Titre » (qu'on retire alors du corps)
  let body = content.trim();
  let title: string | undefined = typeof data.title === "string" ? data.title : undefined;
  const h1 = body.match(/^#\s+(.+)\n?/);
  if (h1) {
    title ??= h1[1].trim();
    body = body.slice(h1[0].length).trim();
  }

  const words = body.replace(/[#>*_`-]/g, " ").split(/\s+/).filter(Boolean).length;
  const date = parseDate(data.date);
  if (data.date && !date) console.warn(`[chapters] date illisible dans ${oeuvre}/${file} : ${JSON.stringify(data.date)} (ignorée)`);

  return {
    numero,
    title: title ?? `Chapitre ${numero}`,
    date,
    bgImage: typeof data.bgImage === "string" ? data.bgImage : null,
    minutes: Math.max(1, Math.round(words / 230)),
    content: body,
  };
});

/** Tous les chapitres d'une œuvre (sans le texte), triés. Sert au codex, à « dernière inscription », etc. */
export const listChapters = cache(async (oeuvre: string): Promise<ChapterMeta[]> => {
  const nums = [...(await files(oeuvre)).keys()].sort((a, b) => a - b);
  const all = await Promise.all(nums.map((n) => readChapter(oeuvre, n)));
  return all.filter((c): c is Chapter => c !== null).map((c) => {
    // on retire le texte du chapitre : la liste ne garde que les métadonnées (plus légère à transmettre au client)
    const meta: Partial<Chapter> = { ...c };
    delete meta.content;
    return meta as ChapterMeta;
  });
});

/* ---------- petits utilitaires d'affichage ---------- */

// chiffres romains : dans lib/roman.ts (utilisable aussi côté client), réexportés ici
export { roman } from "./roman";

const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
export function frDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
