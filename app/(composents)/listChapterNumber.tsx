'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface Chapter {
    title: string;
    slug: string;
}

export default function ListeChapterNbr() {
    const params = useParams();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [open, setOpen] = useState(false);

    /* ─── Récupération & tri ────────────────────────────────────────────────── */
    useEffect(() => {
        const fetchChapters = async () => {
            const res = await fetch('/api/chapters');
            const { chapters: all } = await res.json();
            setChapters(
                (all as Chapter[]).sort(
                    (a, b) => parseInt(a.slug, 10) - parseInt(b.slug, 10)
                )
            );
        };
        fetchChapters();
    }, [params.slug]);

    /* ─── Rendu ─────────────────────────────────────────────────────────────── */
    return (
        <div className="relative w-full md:w-[60%]">
            {/* Bouton d’ouverture / fermeture */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full h-12 flex items-center justify-between px-5 rounded-full
                   bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500
                   text-black font-bold shadow-lg hover:brightness-110 transition"
            >
                Liste des Chapitres
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <FontAwesomeIcon icon={faChevronUp} />
                </motion.span>
            </button>

            {/* Drawer des chapitres */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                        className="absolute left-0 right-0 bottom-[calc(100%+0.5rem)]
             bg-zinc-900/90 backdrop-blur-md rounded-2xl
             shadow-xl overflow-hidden"
                    >
                        <ul className="overflow-y-auto max-h-[50vh] custom-scrollbar px-4 py-4 space-y-3">
                            {chapters.map((chap, i) => (
                                <li key={chap.slug}>
                                    <Link
                                        href={`/eternalys/${chap.slug}`}
                                        className="flex items-center gap-3 w-full
                     bg-zinc-800/60 hover:bg-zinc-700/60
                     border border-pink-500/40 hover:border-pink-500
                     rounded-xl px-4 py-2 transition"
                                    >
                                        <FontAwesomeIcon icon={faBookOpen} className="text-pink-400 shrink-0" />
                                        <span className="text-gray-200">Chapitre {String(i + 1).padStart(2, '0')}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>

                )}
            </AnimatePresence>
        </div>
    );
}
