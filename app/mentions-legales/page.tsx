import Footer from '../(composents)/footer';

export default function MentionLegal() {
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Mentions Légales</h1>

        <h2 className="text-xl font-semibold mb-2">Éditeur du site</h2>
        <p>
          <strong>Nom de l'entreprise</strong><br />
          Adresse de l'entreprise<br />
          Code postal et ville<br />
          Pays<br />
          Téléphone : [Numéro de téléphone]<br />
          Email : [Adresse email]<br />
          Site web : [URL du site]
        </p>

        <h2 className="text-xl font-semibold mb-2">Hébergement</h2>
        <p>
          <strong>Nom de l'hébergeur</strong><br />
          Adresse de l'hébergeur<br />
          Code postal et ville<br />
          Pays<br />
          Téléphone : [Numéro de téléphone]<br />
          Email : [Adresse email]<br />
          Site web : [URL du site]
        </p>

        <h2 className="text-xl font-semibold mb-2">Propriété intellectuelle</h2>
        <p>
          Le contenu du site (textes, images, vidéos, etc.) est la propriété exclusive de [Nom de l'entreprise] sauf mention contraire. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de [Nom de l'entreprise].
        </p>
        <p>
          Les droits des musiques utilisées dans les chapitres appartiennent à leurs créateurs respectifs. [Nom de l'entreprise] n'a aucun droit sur ces musiques et les utilise uniquement à des fins d'illustration.
        </p>

        <h2 className="text-xl font-semibold mb-2">Responsabilité</h2>
        <p>
          [Nom de l'entreprise] ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site [URL du site], et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.
        </p>

        <h2 className="text-xl font-semibold mb-2">Données personnelles</h2>
        <p>
          Pour plus d'informations sur la gestion de vos données personnelles, veuillez consulter notre <a href="/politique-de-confidentialite" className="text-blue-500 hover:underline">Politique de Confidentialité</a>.
        </p>

        <h2 className="text-xl font-semibold mb-2">Contact</h2>
        <p>
          Pour toute question ou demande d'information concernant le site, vous pouvez nous contacter à l'adresse suivante : [Adresse email].
        </p>
      </div>
      <Footer />
    </div>
  );
}