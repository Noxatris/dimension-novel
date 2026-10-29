/* ============================================================
   L'univers d'Eternalys : contenu de la section « L'univers » de la page de l'œuvre.
   Contenu froid, lu au build. TOUT CE QUI SUIT EST UN GABARIT À REMPLIR :
   remplace les textes entre [crochets] par les tiens, ajoute ou retire des entrées librement.

   Notes en marge : dans un texte, écris [[passage souligné|note qui apparaît dans la marge]].
   ============================================================ */

/** Le chœur : une réplique qui s'allume mot à mot quand on descend. Une phrase forte du roman, sans divulgâcher. */
export const CHOEUR = {
  line: "Vous faites erreur sur mon compte, je n’ai jamais cherché la rédemption.",
  // le mot à allumer en rouge, comme la lettre du titre (laisser vide pour aucun)
  accent: "rédemption",
  source: "Adrien",
};

/** Dramatis personae : la distribution, comme en tête d'une pièce. Pas d'illustration : un masque-sceau par personnage. */
export interface Persona {
  name: string;
  /** son rôle dans la tragédie : le protagoniste, la némésis, le chœur, le messager… */
  role: string;
  /** une phrase qui le résume, sans rien dévoiler */
  line: string;
  /** initiale au centre du masque (par défaut la première lettre du nom) */
  mono?: string;
  /** graine du masque : la garder fixe pour qu'il ne change jamais */
  seed: number;
}

export const PERSONAE: Persona[] = [
  { name: "Adrien", role: "Chef de l'unité Delta", line: "Chef de l'unité Delta et stratège hors-pair", seed: 101 },
  { name: "Élodie", role: "Chef en Second", line: "Ancienne leader de l'unité Delta au destin lié avec Adrien", seed: 102 },
  { name: "Gabriel", role: "Ancien Soldat", line: "Ancien soldat ayant quitté l'armée pour rejoindre et défendre les civils", seed: 103 },
  { name: "Sarah", role: "Ingénieur", line: "Jeune ingénieur ayant décide de mettre son savoir à disposition en quête de changement", seed: 104 },
  { name: "Bastien", role: "Responsable Armement", line: "Ancien compagnon de bataille de Gabriel, polyvalent et avec beaucoup de sang-froid", seed: 105 },
];

/** La ville : un plan schématique (rues générées, pas de dessin). x et y en pourcentage du plan (0 à 100). */
export interface Lieu {
  name: string;
  text: string;
  x: number;
  y: number;
}

export const VILLE = {
  name: "Eternalys",
  lieux: [
    { name: "Secteur Lune Éveillée", text: "Reprendre le centre-ville est la seule solution.", x: 72, y: 60 },
    { name: "Secteur Recycleur", text: "Tout a de la valeur, il suffit de savoir l’exploiter.", x: 50, y: 50 },
    { name: "Secteur Sang-Divin", text: "Les Éveillés ont été choisis par les dieux, alors prosternez-vous.", x: 45, y: 22 },
    { name: "Secteur des Oubliés", text: "Si seulement les Éveillés n’avaient jamais existé…", x: 10, y: 72 },
  ] as Lieu[],
};

/** Fragments : courtes pages de lore, avec des notes laissées en marge par « d'anciens lecteurs ». */
export const FRAGMENTS: { title: string; text: string }[] = [
  {
    title: "Avis à la population",
    text: "Par décision du centre-ville, tout Éveillé non déclaré devra se présenter au registre avant la nouvelle lune. Les secteurs qui en abriteront seront [[tenus pour responsables|Ils l'étaient déjà avant l'avis.]]. Que la ville reste unie.",
  },
  {
    title: "Écrit sur un mur du secteur des Oubliés",
    text: "Ils ont eu les dieux, nous avons eu les restes. Un jour, [[ils nous rendront des comptes|L'encre est plus récente que le reste.]].",
  },
];
