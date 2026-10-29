import Ambience from "@/components/library/Ambience";
import SiteFooter from "@/components/SiteFooter";

/* Layout des pages légales : la salle du hub (fond de nuit, lampe, poussière), sans l'étagère. */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="library legal-page">
      <Ambience />
      <div className="view">
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}
