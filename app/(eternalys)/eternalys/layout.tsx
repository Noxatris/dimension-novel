import SiteFooter from "@/components/SiteFooter";
import "@/styles/reader.css";

/* Layout propre à Eternalys : il pose les couleurs de l'œuvre (classe .oeuvre-eternalys).
   Une œuvre du monde commun aura son propre layout avec sa propre classe, sans rien toucher d'autre. */
export default function EternalysLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="oeuvre oeuvre-eternalys">
      {children}
      <SiteFooter />
    </div>
  );
}
