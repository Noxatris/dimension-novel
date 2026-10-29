/* ============================================================
   Configuration de la bibliothèque : les œuvres et l'étagère.
   Pas de texte ici : les chapitres viennent de content/<oeuvre>/chapitres.
   ============================================================ */

export interface Work {
  id: string;            // dossier dans content/ et segment d'URL
  title: string;
  cote: string;          // trois lettres, comme une cote de bibliothèque
  genre: string;
  cycle: string;         // « Hors cycle », « Le monde commun »…
  /** couleurs de la reliure et du fond de l'univers (utilisées par la transition) */
  color: string;
  ink: string;
  bg: string;
  /** graine du sceau : la garder fixe pour que l'œuvre ait toujours le même sceau */
  seed: number;
  /** « work » : une œuvre avec des chapitres ; « world » : un univers (atlas), sans chapitres */
  kind: "work" | "world";
}

export const WORKS: Record<string, Work> = {
  eternalys: {
    id: "eternalys",
    title: "Eternalys",
    cote: "ETR",
    genre: "Urban fantasy",
    cycle: "Hors cycle",
    color: "#5b1720",
    ink: "#f1dfd2",
    bg: "#121214",
    seed: 17,
    kind: "work",
  },
  elysia: {
    id: "elysia",
    title: "Elysia",
    cote: "ELY",
    genre: "Hard fantasy",
    cycle: "Le monde commun",
    color: "#17414a",
    ink: "#e6efec",
    bg: "#08151a",
    seed: 23,
    kind: "world",
  },
};

/** Les œuvres qui ont des chapitres (pour le registre, les statistiques, la dernière inscription). */
export const READABLE = Object.values(WORKS).filter((w) => w.kind === "work");

export type ShelfBook =
  | {
      kind: "work"; id: string; h: number; w: number;
      /** facultatif : un autre titre sur la tranche, d'autres couleurs, une ancre à l'arrivée (ex. « recits ») */
      label?: string; color?: string; ink?: string; anchor?: string; tip?: string; medal?: number;
    }
  | { kind: "sealed"; h: number; w: number; color: string; tip: string; seed: number }
  | { kind: "ref"; h: number; w: number; color: string; ink: string; label: string; tip: string; href: string };

export interface ShelfGroup {
  plaque: string;
  books: ShelfBook[];
}

/** L'étagère, de gauche à droite. Hauteurs et largeurs en px, pour un alignement irrégulier. */
export const SHELF: ShelfGroup[] = [
  { plaque: "Hors cycle", books: [{ kind: "work", id: "eternalys", h: 300, w: 66 }] },
  {
    plaque: "Elysia",
    books: [
      // l'atlas ouvre la page du monde ; Crime Persionnelle l'ouvre directement sur « Les récits »
      { kind: "work", id: "elysia", h: 334, w: 78, label: "Elysia · Atlas", tip: "Le monde commun · ouvrir l’atlas", medal: 23 },
      { kind: "work", id: "elysia", anchor: "recits", h: 292, w: 60, label: "Crime Persionnelle", color: "#2b2340", ink: "#efe6f5", tip: "En cours d’écriture", medal: 31 },
      { kind: "sealed", h: 318, w: 64, color: "#22324a", tip: "La saga d’Elysia · scellée", seed: 33 },
      { kind: "sealed", h: 262, w: 56, color: "#2f3a2a", tip: "Scellé · non catalogué", seed: 45 },
    ],
  },
  {
    plaque: "Référence",
    books: [{ kind: "ref", h: 236, w: 50, color: "#c9bfa6", ink: "#2a2620", label: "Le bibliothécaire", tip: "Ouvrage de référence", href: "#bibliothecaire" }],
  },
];

/** Clé du signet d'une œuvre dans le navigateur (partagée avec le lecteur). */
export const markKey = (oeuvre: string) => `dn-${oeuvre}-mark`;
export function readMark(oeuvre: string): number | null {
  try {
    const v = Number(localStorage.getItem(markKey(oeuvre)));
    return v > 0 ? v : null;
  } catch {
    return null;
  }
}

/* ============================================================
   Le bibliothécaire : présentation et liens (« les passages »).
   Remplace les pseudos et les adresses par les tiens.
   ============================================================ */

export interface Passage {
  name: string;        // Wattpad, Instagram…
  handle: string;      // @pseudo, ou une courte étiquette
  desc: string;        // une phrase : ce qu'on y trouve
  href?: string;       // lien externe (absent pour l'e-mail)
  email?: string;      // si présent, la carte copie l'adresse au lieu d'ouvrir un lien
  mono: string;        // lettre au centre du sceau
  seed: number;        // graine du sceau
}

export const AUTHOR = {
  signature: "le bibliothécaire",
  bio: [
    "J’écris des mondes qui ne se ressemblent pas. La plupart partagent un même univers de hard fantasy, avec ses lois, sa magie et ses cartes ; quelques-uns vivent hors du cycle, comme Eternalys.",
    "Cette bibliothèque est l’endroit où ils se rangent côte à côte. Chaque chapitre y est inscrit dès sa sortie ; les livres scellés attendent leur heure.",
  ],
  sealedCount: SHELF.flatMap((g) => g.books).filter((b) => b.kind === "sealed").length,
  passages: [
    { name: "Wattpad", handle: "@Noxatris", desc: "Les chapitres y paraissent aussi, avec les commentaires des lecteurs.", href: "https://www.wattpad.com/user/Noxatris", mono: "W", seed: 41 },
    { name: "WebNovel", handle: "@Noxatris", desc: "Les premiers chapitre sont aussi disponible ici.", href: "https://www.webnovel.com/fr/profile/4502412347", mono: "I", seed: 52 },
    { name: "Discord", handle: "La salle commune", desc: "Théories, lore et questions à l’auteur, entre lecteurs.", href: "https://discord.gg/sqMJfa3BG5", mono: "D", seed: 63 },
    { name: "Écrire", handle: "contact@noxatrisdev.fr", desc: "Touchez pour copier l’adresse.", email: "contact@noxatrisdev.fr", mono: "@", seed: 74 },
  ] as Passage[],
};
