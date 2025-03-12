import Header from "../(composents)/header";
import LandingContent from "../(composents)/landingContent";
import Footer from "../(composents)/footer";

import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';


export default function Information() {
    return (
        <>
            <Header />
            <LandingContent />
            <section className="flex flex-col md:items-center pt-8 px-4 md:px-8 lg:px-12 lg:mt-[5vh]">
                <h2 className="text-xl xl:text-3xl medievalFont border-b-4 border-violet-700 py-4 md:px-16 mb-6 xl:mb-6">Mes Réseaux</h2>
                <p>Pour le moment vous pourrez me retrouvez sur mon discord</p>
                <Link href="https://discord.gg/sqMJfa3BG5" className="px-4 py-2 border-purple-600 border-2 animate-pulse rounded-xl mt-8"><FontAwesomeIcon icon={faDiscord} className="fa-fw text-white mr-2" />Discord</Link>
            </section>
            <section className="flex flex-col md:items-center pt-8 px-4 md:px-8 lg:px-12 lg:mt-[5vh]">
                <h2 className="text-xl xl:text-3xl medievalFont border-b-4 border-violet-700 py-4 md:px-16 mb-6 xl:mb-8">Soutenir le projet</h2>
                <p>Mon objectif est de toujours garder mes chapitres accessible pour tous.</p>
                <p>A terme je compte ajouter un grade spécial sur mon discord pour obtenir des chapitres en avances pour ceux me soutenant financièrement.</p>
                <p>Je compte aussi ajouter la possibilité a ceux soutenant le projet (pas uniquement financièrement) d&apos;intervenir sur l&apos;histoire via des sondages.</p>
                <p>Mais vous pouvez soutenir le projet en likant mon novels sur les différentes plateformes.</p>
                <h3 className="mt-4 mb-8 text-xl border-b-2 border-violet-700 px-8 pb-2">Liste des plateformes</h3>
                <ul>
                    <li><Link href="https://www.wattpad.com/story/385719600-eternalys-%C3%A9veil-et-vengeance" className="px-4 py-2 border-purple-600 border-2 animate-pulse rounded-xl mt-8">Wattpad</Link></li>
                </ul>
            </section>
            <section className="flex flex-col md:items-center pt-8 mb-8 px-4 md:px-8 lg:px-12 lg:mt-[5vh]">
                <h2 className="text-xl xl:text-3xl medievalFont border-b-4 border-violet-700 py-4 md:px-16 mb-6 xl:mb-12">Le Future</h2>
                <ul>
                    <li><p>Possibilité de création de compte, avec zone de commentaire, chapitre favori etc...</p></li>
                    <li><p>Héberger les novels d&apos;autre auteur, aucune interface n&apos;est prévu pour le moment, me contactez si intéressé.</p></li>
                </ul>
            </section>
            <Footer />
        </>
    )
}