# Dimension Novel · bibliothèque des mondes

Le prototype découpé pour Next.js (App Router) : hub, page d'œuvre avec le codex, transition
d'ouverture entre les pages, et lecteur de chapitre.

## Mise en place

1. Dépendances : `npm i gsap gray-matter` (react-markdown et remark-gfm sont déjà dans ton projet).
2. Copie les dossiers `app/`, `components/`, `lib/`, `styles/` dans ton projet (alias `@/` à la racine).
3. Dans ton `app/layout.tsx`, reprends les quatre éléments de `app/layout.example.tsx` :
   les polices (`fontVars`), `import "@/styles/library.css"`, le petit script `js-anim` dans `<head>`
   (avec `suppressHydrationWarning` sur `<html>`) et `<BookTransitionProvider>` autour de `children`.
   Le calque de la transition doit vivre là : il ne se démonte pas pendant la navigation.
4. Range tes chapitres dans `content/eternalys/chapitres/` (voir plus bas).

## Organisation

```
app/
  layout.example.tsx                       ce qu'il faut ajouter à ton layout racine
  fonts.ts                                 Gloock, Spectral, IM Fell English (+ SC)
  page.tsx                                 le hub (serveur)
  (eternalys)/eternalys/layout.tsx         couleurs de l'œuvre + reader.css
  (eternalys)/eternalys/page.tsx           page de l'œuvre : héros, codex, lore (serveur)
  (eternalys)/eternalys/chapitre/[numero]/page.tsx   lecteur (serveur)
components/
  Sigil.tsx                                sceau runique (runes inventées, générées par graine)
  library/BookTransition.tsx               transition d'ouverture / fermeture du livre (client)
  library/Shelf.tsx                        l'étagère (client : clic, ruban du signet)
  library/Codex.tsx                        le registre des chapitres (client : ouverture 3D, cahiers)
  library/BookButtons.tsx                  « Lire », « Reposer le livre », « Reprendre au chapitre N »
  library/Ambience.tsx                     lampe selon l'heure et poussière lumineuse (canvas)
  library/LibraryMotion.tsx                animation d'arrivée et de scroll du hub (GSAP + ScrollTrigger)
  library/Bibliothecaire.tsx               section auteur : bio, signature, ex-libris, « les passages »
  library/MailPortal.tsx                   carte « Écrire » : copie l'adresse au clic
  library/Words.tsx                        découpe un titre en mots pour l'animation
  library/WaxSeal.tsx                      cachet de cire des livres scellés
  reader/ReaderChrome.tsx                  rail, musique, fil d'or, signet (client)
  reader/ChapterBody.tsx                   markdown → HTML (serveur)
lib/
  library.ts                               œuvres, étagère, signet, auteur et liens  ← c'est ici qu'on ajoute un livre ou un lien
  chapters.ts                              lecture des .md (serveur)
styles/
  library.css                              hub, œuvre, codex, transition (global)
  reader.css                               lecteur + couleurs par œuvre
```

Ce qui est calculé au build à partir des `.md` : la « dernière inscription » du hub, le nombre de chapitres,
tout l'index du codex. Il n'y a plus rien à mettre à jour à la main quand tu publies un chapitre.

## L'animation du hub

`LibraryMotion` joue une seule fois par visite :
- **à l'arrivée** : la lampe s'allume, la poussière apparaît, le titre monte mot à mot, le sceau de la dernière inscription se dessine ;
- **l'étagère** : les livres viennent se ranger un à un (après l'arrivée si l'étagère est visible tout de suite) ;
- **au scroll** : le bibliothécaire (titre, texte, ex-libris qui s'ouvre, sceau et signature qui se tracent), puis les passages ;
- **en continu** : la lumière de la lampe glisse doucement quand on descend.

Pour éviter le flash du contenu avant l'animation, le script `js-anim` masque les éléments dès le `<head>`,
et `LibraryMotion` retire ce masquage une fois les états de départ posés. Si le JS ne se charge pas,
tout réapparaît seul au bout de 2,5 s. Avec « réduire les animations », rien n'est masqué ni animé.

Les éléments animés sont repérés par `data-a` (apparition), `.split` + `<Words>` (titres mot à mot).

## La transition entre pages

`BookTransition.tsx` fait l'animation en deux temps :
- **ouvrir** : la tranche grandit jusqu'à couvrir l'écran, prend la couleur de l'univers, puis `router.push` ;
  quand la nouvelle page est affichée (`usePathname` change), le calque s'efface ;
- **reposer** : le fond de l'univers couvre l'écran, retour au hub, puis le calque rétrécit jusqu'à la tranche
  (`[data-book="eternalys"]`).
Si la navigation échoue, le calque se retire seul au bout de 3 s. Avec « réduire les animations », on navigue directement.

## Les .md

Ta syntaxe actuelle ne change pas : `#### music: nom-de-la-piste` reste un marqueur de musique.
Un frontmatter est possible (facultatif) :

```md
---
title: Némésis
date: 2026-10-28
bgImage: chapitre-56.jpg
---
```

Sans `title`, le titre est pris sur la première ligne `# Titre`, qui est alors retirée du corps.
`bgImage` pointe toujours vers `public/bgChapter/`. Sans image, le bouton « illustration » n'apparaît pas.

La musique est cherchée dans `public/music/<nom>.mp3` : adapte `trackUrl` en haut de `ReaderChrome.tsx`
si tes fichiers sont rangés autrement. Le rail remplace ton `MusicPlayer` (fondu enchaîné entre les pistes inclus) ;
si tu préfères garder ton composant, passe-lui simplement `track` à la place de l'élément `<audio>`.

## Ce qui change par rapport à l'ancienne version

| Avant | Maintenant |
|---|---|
| `fetch` côté client, écran « Chargement… » | chapitre rendu au build, HTML statique, affichage immédiat |
| `next/head` (ignoré dans l'App Router : le titre ne changeait pas) | `generateMetadata`, vrai titre et description par chapitre |
| `params.slug < data.maxChapter` compare une chaîne à un nombre | numéros convertis, existence vérifiée chapitre par chapitre |
| `setInterval` toutes les 4 s pour trouver la piste | `IntersectionObserver` : la piste change au moment où le marqueur passe au milieu de l'écran |
| `setState` à chaque scroll | le fil de progression est écrit directement dans le DOM |
| FontAwesome pour 2 icônes | SVG en ligne |
| `lastReadChapter` | `dn-eternalys-mark` (par œuvre) ; `lastReadChapter` est toujours écrit pour l'ancien code |

Le signet n'avance que quand le lecteur arrive à la fin du chapitre (94 %), et jamais en arrière.

## Ajouter une œuvre du monde commun

1. Dans `lib/library.ts`, ajouter l'œuvre à `WORKS` et remplacer un livre scellé de `SHELF` par `{ kind: "work", id: "…" }`.
2. Copier le dossier `app/(eternalys)` en `app/(mon-oeuvre)` et y changer l'identifiant et les textes.
3. Dans son `layout.tsx`, utiliser la classe `oeuvre-mon-oeuvre`, et définir ses couleurs `--w-*` dans `reader.css`
   (un exemple est en commentaire). `--w-cover` doit reprendre la couleur de reliure de `WORKS`.
