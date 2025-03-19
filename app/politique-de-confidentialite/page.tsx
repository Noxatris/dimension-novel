import Header from '../(composents)/header';
import Footer from '../(composents)/footer';

export default function PolitiqueConfidentialite() {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 min-h-[80vh]">
        <h1 className="text-2xl font-bold mb-4">Politique de Confidentialité</h1>

        <h2 className="text-xl font-semibold mb-2">Données collectées</h2>
        <p>
          Ce site ne collecte pas de données personnelles à l&apos;exception des informations envoyées par e-mail via l&apos;adresse de contact.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">Cookies</h2>
        <p>
          Ce site n&apos;utilise pas de cookies à des fins de suivi ou de publicité.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">Droits des utilisateurs</h2>
        <p>
        Conformément au RGPD, toute personne peut demander la suppression ou l&apos;accès à ses éventuelles données envoyées par e-mail en contactant <a href="mailto:noxatrisdev@gmail.com" className="hover:underline text-blue-400">noxatrisdev@gmail.com</a>.
        </p>
      </div>
      <Footer />
    </div>
  );
}