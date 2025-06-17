'use client';

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

      <main className="relative z-10 px-4 md:px-8 lg:px-24 py-16 space-y-28 text-white bg-gradient-to-b from-black via-[#1a1a1a] to-black">

        {/* Section Réseaux */}
        <section className="max-w-3xl mx-auto glass-card">
          <h2 className="section-title">Me retrouver</h2>
          <p className="text-center text-lg mb-8">
            Pour l&apos;instant, vous pouvez échanger avec moi directement sur Discord.
          </p>
          <div className="flex justify-center">
            <Link
              href="https://discord.gg/sqMJfa3BG5"
              className="discord-button"
              target="_blank"
            >
              <FontAwesomeIcon icon={faDiscord} />
              Rejoindre le Discord
            </Link>
          </div>
        </section>

        {/* Section Soutien */}
        <section className="max-w-5xl mx-auto glass-card">
          <h2 className="section-title">Soutenir le projet</h2>
          <div className="space-y-5 text-lg">
            <p>Mon objectif est de garder <strong>Eternalys</strong> accessible à tous, gratuitement.</p>
            <p>À terme, un système de soutien donnera accès à certains chapitres en avant-première via un grade spécial sur Discord.</p>
            <p>Je prévois également des sondages communautaires pour influencer certains éléments de l&apos;histoire.</p>
            <p>Vous pouvez déjà m&apos;aider en likant et en suivant Eternalys sur ces plateformes :</p>
          </div>

          <h3 className="text-2xl mt-10 mb-4 border-b border-violet-600 text-center pb-2">
            Plateformes disponibles
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            {[
              { name: "Wattpad", url: "https://www.wattpad.com/story/385719600-eternalys-%C3%A9veil-et-vengeance" },
              { name: "WebNovel", url: "https://www.webnovel.com/book/32232151300096205" },
              { name: "GoodNovel", url: "https://www.goodnovel.com/book/Eternalys-%C3%89veil-et-Vengeance_31000967473" },
              { name: "Atelier des auteurs", url: "https://www.atelierdesauteurs.com/text/1497936210/eternalys---eveil-et-vengeance" }
            ].map((platform) => (
              <li key={platform.name}>
                <Link
                  href={platform.url}
                  target="_blank"
                  className="platform-button"
                >
                  {platform.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Section À venir */}
        <section className="max-w-3xl mx-auto glass-card">
          <h2 className="section-title">À venir</h2>
          <ul className="list-disc ml-6 space-y-3 text-lg">
            <li>Création de compte avec options personnalisées : favoris, commentaires, suivi...</li>
            <li>Hébergement d&apos;autres auteurs (me contacter si vous êtes intéressé·e).</li>
          </ul>
        </section>

      </main>
      <Footer />
    </>
  );
}