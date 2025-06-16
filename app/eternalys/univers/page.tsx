'use client'

import { useState, useEffect } from 'react';

// Exemple de composants personnalisés pour chaque section
function Factions() {
    return <div>Contenu personnalisé pour la section Factions</div>;
}

function Personnages() {
    return <div>Contenu personnalisé pour la section Personnages</div>;
}

function Chronologie() {
    return <div>Contenu personnalisé pour la section Chronologie</div>;
}

const sections = [
    {
        id: 'factions',
        title: 'Factions',
        description:
            'Découvrez les groupes majeurs qui façonnent le monde : alliances, conflits, idéologies.',
        image: '/bgChapter/conseilRoom.png',
        link: '/eternalys/univers/factions',
        Component: Factions,
    },
    {
        id: 'personnages',
        title: 'Personnages',
        description:
            "Accédez aux fiches des protagonistes et figures marquantes de l'univers.",
        image: '/bgChapter/classroom.webp',
        link: '/eternalys/personnage',
        Component: Personnages,
    },
    {
        id: 'chronologie',
        title: 'Chronologie',
        description:
            'Un fil temporel interactif retraçant les événements majeurs ayant bouleversé Eternalys.',
        image: '/bgChapter/neant.png',
        link: '/eternalys/univers/chronologie',
        Component: Chronologie,
    },
    {
        id: 'lieux',
        title: 'Lieux',
        description: "Visitez les zones clés d'Eternalys, des ruines oubliées aux bastions de pouvoir.",
        image: '/bgChapter/luneEveillerQG.png',
        link: '/eternalys/univers/lieux',
        Component: Chronologie,
    },
    {
        id: 'pouvoirs',
        title: 'Technologies & Pouvoirs',
        description: "Explorez les arcanes des Éveillés, leurs dons et les technologies qui les entourent.",
        image: '/bgChapter/openspace.png',
        link: '/eternalys/univers/pouvoirs',
        Component: Chronologie,
    },
    {
        id: 'documents',
        title: 'Documents & Archives',
        description: "Des extraits, lettres, et rapports pour enrichir l'univers depuis l'intérieur.",
        image: '/bgChapter/immeubleChantier.webp',
        link: '/eternalys/univers/documents',
        Component: Chronologie,
    },
    // etc.
];

export default function UniversPage() {
    const [scrollY, setScrollY] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrollY(y);
            const index = Math.round(y / screenHeight);
            setActiveIndex(index);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [screenHeight]);

    const scrollToSection = (index: number) => {
        window.scrollTo({
            top: index * screenHeight,
            behavior: 'smooth',
        });
    };

    return (
        <div className="relative w-full font-sans">
            {/* Background layers */}
            <div className="fixed top-0 left-0 w-full h-screen -z-10 pointer-events-none">
                {sections.map((section, index) => {
                    const progress = scrollY / screenHeight;
                    let opacity = 0;

                    if (progress >= index && progress < index + 1) {
                        opacity = 1 - (progress - index);
                    } else if (progress >= index - 1 && progress < index) {
                        opacity = progress - (index - 1);
                    } else if (progress === index) {
                        opacity = 1;
                    }

                    opacity = Math.min(Math.max(opacity, 0), 1);

                    return (
                        <div
                            key={section.id}
                            className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-300"
                            style={{
                                backgroundImage: `url(${section.image})`,
                                opacity,
                                zIndex: index,
                            }}
                        />
                    );
                })}
            </div>

            {/* Pagination verticale */}
            <nav className="fixed top-1/2 right-6 transform -translate-y-1/2 z-20 flex flex-col gap-4">
                {sections.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToSection(index)}
                        aria-label={`Aller à la section ${sections[index].title}`}
                        className={`w-4 h-4 rounded-full border-2 border-yellow-400 transition-colors ${index === activeIndex ? 'bg-yellow-400' : 'bg-transparent'
                            } hover:bg-yellow-300`}
                        style={{ cursor: 'pointer' }}
                    />
                ))}
            </nav>

            {/* Contenu des sections */}
            <div className="relative z-10">
                {sections.map(({ id, title, description, link, Component }, index) => (
                    <section
                        key={id}
                        className="h-screen flex flex-col items-center justify-center px-4 md:px-16"
                        style={{ zIndex: 100 + index }}
                    >
                        <div className="bg-black/60 backdrop-blur p-8 rounded-xl max-w-4xl shadow-xl text-center">
                            <h2 className="font-[medievalSharp] text-3xl md:text-4xl font-bold text-yellow-300 mb-4">
                                {title}
                            </h2>
                            <p className="mb-6 text-lg text-white">{description}</p>
                            <Component />
                            <a
                                href={link}
                                className="inline-block mt-8 px-6 py-2 rounded-full bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition"
                            >
                                Explorer
                            </a>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
