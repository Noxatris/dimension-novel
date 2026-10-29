import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";

/* Pages légales : contenu froid, écrit dans content/legal/<slug>.md
   Frontmatter : title (obligatoire), maj (date de mise à jour, ex. « 28 octobre 2026 »). */

export const LEGAL_SLUGS = ["mentions-legales", "confidentialite"] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export const readLegal = cache(async (slug: LegalSlug) => {
  const raw = await fs.readFile(path.join(process.cwd(), "content", "legal", `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  // une date YAML non entre guillemets (2026-10-28) arrive en objet Date : on la remet en toutes lettres
  const maj =
    data.maj instanceof Date
      ? data.maj.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
      : data.maj
        ? String(data.maj)
        : null;
  return { title: String(data.title ?? slug), maj, content };
});
