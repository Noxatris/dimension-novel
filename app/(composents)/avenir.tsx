import AnimateSeparator from "./animateSeparator";

export default function Avenir() {
    return (
        <div className="flex flex-col md:items-center pt-8 px-4 md:px-8 lg:px-12">
            <h2 className="medievalFont text-xl md:text-2xl lg:text-3xl ml-6 md:ml-0">A Venir</h2>
            <AnimateSeparator />
            <div className="flex flex-col px-2">
                <ul className="list-disc ml-6">
                    <li className="mb-4">Création de compte et ajout d&apos;un espace commentaire sous chaque chapitre</li>
                    <li className="mb-4">Ajout d&apos;un espace de vote pour les futures intrigues</li>
                    <li className="mb-4">Ajout de novels d&apos;autre créateur</li>
                </ul>
            </div>
        </div>
    );
}