import Header from '../(composents)/header';
import Footer from '../(composents)/footer';

export default function MentionLegal() {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 min-h-[80vh]">
        <h1 className="text-2xl font-bold mb-4">Mentions Légales</h1>

        <h2 className="text-xl font-semibold mb-2">Éditeur du site</h2>
        <p>
          Le présent site est édité par <strong>Noxatris</strong>, un particulier agissant sous pseudonyme.<br />
          Adresse Mail : <a href="mailto:noxatrisdev@gmail.com" className="hover:underline text-blue-400">noxatrisdev@gmail.com</a><br />
          Conformément à l&apos;article 6-III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN), l&apos;identité complète de l&apos;éditeur est communiquée à l&apos;hébergeur.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">Hébergement</h2>
        <p>
          Le site est hébergé par :<br />
          <strong>Vercel Inc.</strong><br />
          440 N Barranca Ave #4133, Covina, CA 91723, USA <br />
          Site web : <a href="https://vercel.com">https://vercel.com</a>
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus présents sur ce site (textes, images, design, etc.) est la propriété exclusive de <strong>Noxatris</strong>, sauf mention contraire. Toute reproduction, distribution ou modification sans autorisation est interdite.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">Images et musiques</h2>
        <p>
          Les images présentes sur le site sont générées par intelligence artificielle.
        </p>
        <p>
          Les musiques utilisées ne sont pas la propriété de l&apos;éditeur, mais elles sont libres d&apos;utilisation conformément aux licences associées.
        </p>

        <h2 className="text-xl font-semibold mb-2 mt-6">Données personnelles</h2>
        <p>
          Pour plus d&apos;informations sur la gestion de vos données personnelles, veuillez consulter notre <a href="/politique-de-confidentialite" className="text-blue-400 hover:underline">Politique de Confidentialité</a>.
        </p>

      </div>
      <Footer />
    </div>
  );
}