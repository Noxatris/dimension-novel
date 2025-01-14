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
                const response = await fetch('/api/chapters'); // Appel à l'API interne
                const data = await response.json();
                setChapters(data.chapters);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchChapters();
    }, []);

    return (
        <>
            <div className='w-screen h-1 bg-violet-700'></div>
            <ul className='w-full px-4 flex flex-col items-center bg-black/70 shadow-xl bg-center bg-cover sticky' style={{ backgroundImage: 'url(/bgMain.jpg)' }}>
                <h2 className='text-xl px-8 pb-2 rounded-b-full mb-4 bg-gradient-to-r from-zinc-950 to-violet-700 animate-gradientMove'>Liste des chapitres</h2>
                {loading ? (
                    <AltListeChapter />
                ) : (
                    chapters.map((chapter: Chapter) => (
                        <li key={chapter.slug} className='w-[90%] mb-6'>
                            <Link href={`/eternalys/${chapter.slug}`} passHref>
                                <div className='flex items-center border-l-4 border-violet-700 w-full p-2 text-[1.1em] rounded-r-lg bg-gray-900/80 shadow-xl hover:bg-violet-800 hover:border-yellow-300 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer'>
                                    <span className='text-yellow-300'>{chapter.title}</span>
                                </div>
                            </Link>
                        </li>
                    ))
                )}

            </ul>
        </>
    )
}