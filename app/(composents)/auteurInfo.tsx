import AnimateSeparator from "./animateSeparator";

export default function AuteurInfo() {
    return (
        <div className="flex flex-col pt-8 px-4 md:px-8 lg:px-12">
            <h2 className="font-[MedievalSharp] text-xl md:text-2xl lg:text-3xl ml-6">A PROPOS DE MOI</h2>
            <AnimateSeparator />
            <div className="flex flex-col px-2 custom-scrollbar gap-2 ">
                <p>La plupart des personnes me connaissent sous le pseudo de Noxatris,</p>
                <p>J'ai toujours aimée écrire depuis mon plus jeune âge mais j'ai fini par perdre de vue l'écriture lors de ma scolarité.</p>
                <p>Il y a maintenant sept ans, j'ai découvert le jeu de rôle et j'ai commencé à écrire des scénarios pour mes joueurs.</p>
                <p>Cependant il y a maintenant presque deux ans je suis arrivée a la limite, ou le modèle du jeu de rôle bridait mon imagination et ma creativité au point de devenir frustrant.</p>
                <p>J'ai donc décidé de me lancer dans l'écriture d'un novel, Eternalys : Éveil et Vengeance.</p>
                <p>Il se trouve qu'une autre grande de mes passion est l'informatique et plus précisement le dévelopement, j'ai donc décidé d'allier les deux sur un projet commun.</p>
                <p>L'objectif de se novels est de travailler mon style et de faire face au différente contrainte avant de sortir un second novel dans un univers que je travaille depuis des années.</p>
                <p>C'est pourquoi je suis toujours à la recherche de conseil et de critique constructive pour m'améliorer.</p>
                <p>Si vous êtes encore là je vous remercie pour votre temps et j'espère que vous passerez un bon moment sur mon site.</p>
            </div>
        </div>
    );
}