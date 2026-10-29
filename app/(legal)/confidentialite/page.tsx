import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité · Dimension Novel",
  description: "Ce que le site Dimension Novel garde (presque rien) et vos droits.",
};

export default function Confidentialite() {
  return <LegalPage slug="confidentialite" />;
}
