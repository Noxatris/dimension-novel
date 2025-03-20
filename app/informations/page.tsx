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
            <section className="flex flex-col items-center pt-8 px-4 md:px-8 lg:px-12 lg:mt-[5vh]">
                <h2 className="text-xl xl:text-3xl medievalFont border-b-4 border-violet-700 py-4 w-full xl:w-auto md:px-16 mb-6 xl:mb-6">Mes Réseaux</h2>
                <p>Pour le moment vous pourrez me retrouver uniquement sur mon discord</p>
                <Link href="https://discord.gg/sqMJfa3BG5" className="px-4 py-2 border-purple-600 border-2 animate-pulse rounded-xl mt-8"><FontAwesomeIcon icon={faDiscord} className="fa-fw text-white mr-2" />Discord</Link>
            </section>
            <section className="flex flex-col md:items-center pt-8 px-4 md:px-8 lg:px-12 lg:mt-[5vh]">
                <h2 className="text-xl xl:text-3xl medievalFont border-b-4 border-violet-700 py-4 md:px-16 mb-6 xl:mb-8">Soutenir le projet</h2>
                <p>Mon objectif est de toujours garder mes chapitres accessibles pour tous.</p>
                <p>À terme, je compte ajouter un grade spécial sur mon discord pour obtenir des chapitres en avance pour ceux me soutenant financièrement.</p>
                <p>Je compte aussi ajouter la possibilité à ceux soutenant le projet (pas uniquement financièrement) d&apos;intervenir sur l&apos;histoire via des sondages.</p>
                <p>Mais vous pouvez soutenir le projet en likant mon novel sur les différentes plateformes.</p>
                <h3 className="mt-4 mb-8 text-xl border-b-2 border-violet-700 px-8 pb-2 w-full xl:w-auto flex justify-center items-center">Liste des plateformes</h3>
                <ul className="flex flex-col md:flex-row justify-center items-center w-full md:w-auto gap-4 md:gap-8">
                    <li><Link href="https://www.wattpad.com/story/385719600-eternalys-%C3%A9veil-et-vengeance" className="px-4 py-2 border-purple-600 border-2 animate-pulse rounded-xl mt-8">Wattpad</Link></li>
                    <li><Link href="https://www.webnovel.com/book/32232151300096205" className="px-4 py-2 border-purple-600 border-2 animate-pulse rounded-xl mt-8">WebNovel</Link></li>
                    <li><Link href="https://www.goodnovel.com/book/Eternalys-%C3%89veil-et-Vengeance_31000967473" className="px-4 py-2 border-purple-600 border-2 animate-pulse rounded-xl mt-8">GoodNovel</Link></li>
                    <li><Link href="https://www.atelierdesauteurs.com/text/1497936210/eternalys---eveil-et-vengeance" className="px-4 py-2 border-purple-600 border-2 animate-pulse rounded-xl mt-8">Atelier des auteurs</Link></li>
                </ul>
            </section>
            <section className="flex flex-col md:items-center pt-8 mb-8 px-4 md:px-8 lg:px-12 lg:mt-[5vh]">
                <h2 className="text-xl xl:text-3xl medievalFont border-b-4 border-violet-700 py-4 md:px-16 mb-6 xl:mb-12">Le Future</h2>
                <ul className="list-disc ml-8">
                    <li><p>Possibilité de création de compte, avec zone de commentaire, chapitre favori etc...</p></li>
                    <li><p>Héberger les novels d&apos;autres auteurs, aucune interface n&apos;est prévue pour le moment, contactez-moi si intéressé.</p></li>
                </ul>
            </section>
            <Footer />
        </>
    )
}