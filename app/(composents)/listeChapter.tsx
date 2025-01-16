'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AltListeChapter from './Squeltron/alt_listeChapter';

interface Chapter {
    title: string;
    slug: string;
}

export default function ListeChapter() {
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await fetch('/api/chapters');
                const data = await response.json();
                setChapters(data.chapters);
            } catch (error) {
                console.error('Error fetching chapters:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchChapters();
    }, []);

    return (
        <>
            <div className='w-screen h-1 bg-gradient-to-r from-violet-500 to-purple-800'></div>
            <ul className='w-full px-4 flex flex-col items-center shadow-xl bg-fixed bg-gradient-to-b from-zinc-950 to-gray-900'>
                <h2 className='text-2xl px-8 py-2 rounded-b-full mb-12 bg-gradient-to-r from-gray-900 via-violet-700 to-purple-900 text-white animate-gradientMove shadow-md medievalFont'>
                    Liste des chapitres
                </h2>
                {loading ? (
                    <AltListeChapter />
                ) : (
                    chapters.map((chapter: Chapter) => (
                        <li key={chapter.slug} className='w-[90%] mb-6'>
                            <Link href={`/eternalys/${chapter.slug}`} passHref>
                                <div className='flex items-center border-l-4 border-violet-600 w-full p-3 text-[1.2em] rounded-r-lg bg-gray-800/90 shadow-lg hover:bg-gradient-to-r hover:from-violet-600 hover:to-yellow-300 hover:text-black hover:border-yellow-300 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer'>
                                    <span className='text-yellow-300 font-semibold'>{chapter.title}</span>
                                </div>
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </>
    );
}
