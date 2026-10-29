/* ============================================================
   Elysia, le monde commun : contenu de l'atlas.
   Les textes reprennent ce qui est établi du monde ; ce sont des brouillons à réécrire à ta voix.
   Rien ici ne doit dévoiler l'intrigue des récits.
   ============================================================ */

export interface Race {
  id: string;
  name: string;
  /** couleur du peuple (sceau, bordure, étiquettes) */
  hue: string;
  seed: number;
  spe: string[];
  text: string;
}

export const RACES: Race[] = [
  {
    id: "eurilyde", name: "Eurilyde", hue: "#b9a6ff", seed: 91, spe: ["Inscriptions"],
    text: "Leur magie s’écrit : ils la gravent en inscriptions. Leurs ailes grandissent avec leur mana, et le mana renforce leurs os creux.",
  },
  {
    id: "gondarians", name: "Gondarians", hue: "#e58a52", seed: 92, spe: ["Forge", "Runes"],
    text: "Tous dépassent les deux mètres, la peau écailleuse par endroits, d’une force hors du commun. Maîtres de la forge et des runes.",
  },
  {
    id: "tryks", name: "Tryks", hue: "#d9c35b", seed: 93, spe: ["Artéfacts"],
    text: "Petits, poilus et inventifs. Leur génie tient plus de l’atelier que du grimoire : ce sont les artisans des artéfacts.",
  },
  {
    id: "alguaros", name: "Alguaros", hue: "#57d1e0", seed: 94, spe: ["Bêtes de mana"],
    text: "Peuple des profondeurs, capable de vivre à la surface. Leur peau translucide laisse voir leurs circuits de mana ; ils se lient à une bête de mana.",
  },
  {
    id: "humains", name: "Humains", hue: "#e6e1d3", seed: 95, spe: ["Alchimie", "Filouterie"],
    text: "Polyvalents, sans don dominant, mais redoutables là où on ne les attend pas : alchimistes, filous, touche-à-tout.",
  },
];

export const MAGIC = [
  {
    title: "Le cœur de mana", seed: 81, star: 5,
    text: "Chaque être porte un cœur de mana, propre à son peuple. C’est lui qui décide de la forme que prend sa magie : des ailes chez les Eurilyde, des circuits lumineux chez les Alguaros.",
  },
  {
    title: "L’héritage élémentaire", seed: 82, star: 6,
    text: "Les affinités se transmettent par le sang. On naît avec l’élément de sa lignée, et certains héritages, comme la lumière, sont devenus rarissimes.",
  },
  {
    title: "Innés et fusionnés", seed: 83, star: 7,
    text: "Il y a deux façons d’être mage : naître avec la magie, ou l’acquérir par fusion. Deux chemins, et deux façons très différentes de la vivre.",
  },
];

export interface Recit {
  title: string;
  status: string;
  text: string;
  /** couleur de la reliure */
  color: string;
  mono: string;
  seed: number;
  sealed?: boolean;
  /** quand les chapitres existeront : l'identifiant de l'œuvre (page /<id>) */
  workId?: string;
}

export const RECITS: Recit[] = [
  {
    title: "Crime Persionnelle", status: "En cours d’écriture", color: "#2b2340", mono: "CP", seed: 31,
    text: "Velioh est un assassin. Sa cible : Iryssia, héritière d’une magie de lumière que le sang ne transmet presque plus. Une histoire courte, au cœur d’Elysia.",
  },
  {
    title: "La saga d’Elysia", status: "Scellé", color: "#22324a", mono: "E", seed: 33, sealed: true,
    text: "Le grand récit du monde. Il restera scellé tant qu’il n’est pas prêt.",
  },
];
