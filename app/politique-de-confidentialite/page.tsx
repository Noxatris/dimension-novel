import Footer from '../(composents)/footer';

export default function PolitiqueConfidentialite() {
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Politique de Confidentialité</h1>

        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <p>
          La présente politique de confidentialité décrit les pratiques de [Nom de l&apos;entreprise] en matière de collecte, d&apos;utilisation et de partage des informations que vous nous fournissez via notre site web [URL du site].
        </p>

        <h2 className="text-xl font-semibold mb-2">Informations collectées</h2>
        <p>
          Nous collectons les informations suivantes :
        </p>
        <ul className="list-disc list-inside">
          <li>Informations que vous nous fournissez directement : nom, adresse email, numéro de téléphone, etc.</li>
          <li>Informations collectées automatiquement : adresse IP, type de navigateur, pages visitées, etc.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Utilisation des informations</h2>
        <p>
          Les informations collectées sont utilisées pour :
        </p>
        <ul className="list-disc list-inside">
          <li>Fournir et améliorer nos services</li>
          <li>Communiquer avec vous</li>
          <li>Personnaliser votre expérience sur notre site</li>
          <li>Analyser l&apos;utilisation de notre site</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Partage des informations</h2>
        <p>
          Nous ne partageons pas vos informations personnelles avec des tiers, sauf dans les cas suivants :
        </p>
        <ul className="list-disc list-inside">
          <li>Avec votre consentement</li>
          <li>Pour se conformer à la loi</li>
          <li>Pour protéger nos droits et notre propriété</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Sécurité</h2>
        <p>
          Nous mettons en œuvre des mesures de sécurité pour protéger vos informations personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
        </p>

        <h2 className="text-xl font-semibold mb-2">Vos droits</h2>
        <p>
          Vous avez le droit de :
        </p>
        <ul className="list-disc list-inside">
          <li>Accéder à vos informations personnelles</li>
          <li>Demander la correction de vos informations personnelles</li>
          <li>Demander la suppression de vos informations personnelles</li>
          <li>Vous opposer au traitement de vos informations personnelles</li>
        </ul>
        <p>
          Pour exercer ces droits, veuillez nous contacter à l&apos;adresse suivante : [Adresse email].
        </p>

        <h2 className="text-xl font-semibold mb-2">Modifications de la politique de confidentialité</h2>
        <p>
          Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.
        </p>

        <h2 className="text-xl font-semibold mb-2">Contact</h2>
        <p>
          Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à l&apos;adresse suivante : [Adresse email].
        </p>
      </div>
      <Footer />
    </div>
  );
}