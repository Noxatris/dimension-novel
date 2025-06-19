'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AltListeChapter from './Squeltron/alt_listeChapter';
import { motion, AnimatePresence } from 'framer-motion';

interface Chapter {
    title: string;
    slug: number;
}

interface Arc {
    title: string;
    from: number;
    to: number;
    chapters: Chapter[];
}

export default function ListeChapter() {
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState(true);
    const [openArcIdx, setOpenArcIdx] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [lastRead, setLastRead] = useState<string | null>(null);

    const arcDefinitions = [
        { title: 'Arc 1 – Opération Explosive', from: 1, to: 13 },
        { title: 'Arc 2 – Conseil', from: 14, to: 32 },
        { title: 'Arc 3 – Mission extérieure', from: 33, to: 999 },
    ];

    useEffect(() => {

        const saved = localStorage.getItem('lastReadChapter');
        if (saved) {
            setLastRead(saved);
        }

        (async () => {
            try {
                const res = await fetch('/api/chapters');
                const data = await res.json();
                setChapters((data.chapters as Chapter[]).sort((a, b) => a.slug - b.slug));
            } catch (err) {
                console.error('Error fetching chapters', err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // On filtre les chapitres selon searchTerm
    const filteredChapters = chapters.filter((chap) => {
        const term = searchTerm.toLowerCase();
        return (
            chap.title.toLowerCase().includes(term) ||
            chap.slug.toString().includes(term)
        );
    });

    // Groupement des arcs avec chapitres filtrés
    const groupedArcs: Arc[] = arcDefinitions.map((arc) => ({
        ...arc,
        chapters: filteredChapters.filter((c) => c.slug >= arc.from && c.slug <= arc.to),
    })).filter(arc => arc.chapters.length > 0); // on enlève les arcs sans chapitres

    // Si searchTerm change, on ouvre tous les arcs avec résultats
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setOpenArcIdx(0); // ouvre le premier arc par défaut quand recherche vide
        } else {
            setOpenArcIdx(null); // ferme tous pour éviter confusion
        }
    }, [searchTerm]);

    return (
        <aside className='w-full md:h-screen md:overflow-y-scroll md:w-[40%] lg:w-[30%] bg-zinc-900/90 backdrop-blur-md rounded-l-xl shadow-lg overflow-x-hidden relative custom-scrollbar'>
            {/* BACKGROUND FIXE */}
            <div className="fixed inset-0 -z-10 pointer-events-none" />

            <section className="w-full px-4 lg:px-5 py-10">
                <div className="max-w-screen-xl mx-auto">
                    <motion.h1
                        className="flex justify-center mb-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-300 to-red-500 drop-shadow-lg select-none"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Liste des Chapitres
                    </motion.h1>

                    {/* BARRE DE RECHERCHE */}
                    <div className="mb-8 max-w-md mx-auto">
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Rechercher un chapitre par titre ou numéro..."
                            className="w-full p-3 rounded-lg bg-zinc-900 text-white placeholder-zinc-500 border border-gray-700 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                            aria-label="Rechercher un chapitre"
                            autoComplete="off"
                        />
                    </div>

                    {lastRead && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8 mx-auto max-w-md"
                        >
                            <Link
                                href={`/eternalys/${lastRead}`}
                                className="flex items-center justify-between w-full px-6 py-4 bg-gradient-to-r from-violet-700 to-fuchsia-600 text-white rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                            >
                                <div>
                                    <p className="text-sm uppercase text-white/80 tracking-wider">Reprendre</p>
                                    <p className="text-xl font-bold">Continuer la lecture</p>
                                </div>
                                <span className="text-2xl">→</span>
                            </Link>
                        </motion.div>
                    )}

                    {loading ? (
                        <AltListeChapter />
                    ) : (
                        <div className="space-y-6">
                            {groupedArcs.length === 0 ? (
                                <p className="text-center text-gray-400 text-lg mt-10">Aucun chapitre trouvé.</p>
                            ) : (
                                groupedArcs.map((arc, arcIdx) => {
                                    const isOpen = openArcIdx === arcIdx || searchTerm.trim() !== '';

                                    return (
                                        <div key={arc.title} className="border border-gray-700 rounded-xl overflow-hidden shadow-lg">
                                            {/* Header de l'accordéon */}
                                            <button
                                                onClick={() => setOpenArcIdx(isOpen ? null : arcIdx)}
                                                className="w-full flex justify-between items-center bg-gradient-to-r from-yellow-400 via-orange-300 to-red-400 p-4 cursor-pointer select-none focus:outline-none"
                                                aria-expanded={isOpen}
                                                aria-controls={`arc-panel-${arcIdx}`}
                                            >
                                                <h2 className="text-xl font-extrabold text-black drop-shadow-md tracking-wide">
                                                    {arc.title}
                                                </h2>
                                                <motion.span
                                                    animate={{ rotate: isOpen ? 90 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="text-black text-2xl font-bold"
                                                >
                                                    ▶
                                                </motion.span>
                                            </button>

                                            {/* Contenu de l'accordéon */}
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        id={`arc-panel-${arcIdx}`}
                                                        initial="collapsed"
                                                        animate="open"
                                                        exit="collapsed"
                                                        variants={{
                                                            open: { height: 'auto', opacity: 1 },
                                                            collapsed: { height: 0, opacity: 0 },
                                                        }}
                                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                                        className="bg-zinc-900/90 backdrop-blur-md overflow-hidden"
                                                    >
                                                        <ul className="flex flex-col gap-4 p-6">
                                                            {arc.chapters.map((chap) => (
                                                                <motion.li
                                                                    key={chap.slug}
                                                                    initial={{ opacity: 0, x: -20 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    exit={{ opacity: 0, x: -20 }}
                                                                    transition={{ duration: 0.3 }}
                                                                >
                                                                    <Link href={`/eternalys/${chap.slug}`} className="group block rounded-lg p-4 border border-gray-700 hover:border-yellow-400 transition-colors duration-300">
                                                                        <div className="text-sm text-yellow-400 mb-1 font-mono">
                                                                            Chapitre {chap.slug.toString().padStart(2, '0')}
                                                                        </div>
                                                                        <div className="text-white font-semibold text-lg leading-snug group-hover:text-yellow-300">
                                                                            {chap.title}
                                                                        </div>
                                                                    </Link>
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>
            </section>
        </aside>
    );
}
