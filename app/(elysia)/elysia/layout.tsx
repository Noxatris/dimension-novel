import SiteFooter from "@/components/SiteFooter";
import "@/styles/reader.css";

/* Layout d'Elysia : pose les couleurs du monde commun (classe .oeuvre-elysia, définie dans reader.css).
   Quand Crime Persionnelle aura ses chapitres, son lecteur pourra vivre sous ce même layout. */
export default function ElysiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="oeuvre oeuvre-elysia">
      {children}
      <SiteFooter />
    </div>
  );
}
