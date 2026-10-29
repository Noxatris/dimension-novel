/* TypeScript 6 vérifie désormais les imports « à effet de bord » (import "./fichier.css").
   Next.js déclare les CSS modules (*.module.css), mais pas les feuilles globales : on les déclare ici. */
declare module "*.css";
