import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales · Dimension Novel",
  description: "Éditeur, hébergeur et propriété intellectuelle du site Dimension Novel.",
};

export default function MentionsLegales() {
  return <LegalPage slug="mentions-legales" />;
}
