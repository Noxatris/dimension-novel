'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
            <div className='w-screen h-1 bg-gradient-to-r from-violet-500 to-purple-800 md:hidden'></div>
            <div className='w-full md:w-[40%] xl:w-[25%] md:max-h-[90vh] md:overflow-y-scroll flex flex-col items-center shadow-xl bg-fixed bg-gradient-to-b from-zinc-950 to-gray-900'>
                <div className='w-full flex justify-center items-center'>
                    <Image src="accolade.svg" width={0} height={0} alt="Titre Liste Chapitre" className='w-full' />
                </div>
                <ul className='w-full md:overflow-y-scroll custom-scrollbar pt-8 flex flex-col items-center'>
                    {loading ? (
                        <AltListeChapter />
                    ) : (
                        chapters.map((chapter: Chapter, index) => (
                            <li key={chapter.slug} className='w-[90%] mb-6 flex flex-col items-center px-4 border-b-4 md:border-b-2 border-gray-600 '>
                                <Link href={`/eternalys/${chapter.slug}`} passHref className='w-full'>
                                    <div className='flex items-center w-full p-3 text-[1.2em] rounded-lg hover:border-yellow-300 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer'>
                                        <span className='flex justify-center items-center p-4 rounded-full w-[15px] h-[15px] bg-gradient-to-r from-gray-800 to-indigo-600 text-xl mr-4'>{index + 1}</span>
                                        <span className='text-white font-semibold'>{chapter.title}</span>
                                    </div>
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
}
