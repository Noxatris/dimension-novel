import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

interface Chapter {
    title: string;
    content: string;
    slug: string;
  }

export default function ListeChapterNbr() {
    const params = useParams();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [showChapters, setShowChapters] = useState(false);


    useEffect(() => {
        const fetchChapter = async () => {
            // Fetch all chapters
            const allChaptersResponse = await fetch('/api/chapters');
            const allChaptersData = await allChaptersResponse.json();
            setChapters(allChaptersData.chapters);
        };
        fetchChapter();
    }, [params.slug]);

    const toggleChapters = () => {
        setShowChapters(!showChapters);
    };

    return (
        <div className='relative w-[65%] h-[80%] flex flex-col-reverse justify-center items-center z-10'>
            <button
                onClick={toggleChapters}
                className='w-full h-10 flex justify-between items-center rounded-full bg-gradient-to-r from-zinc-950 to-violet-700 gradientMoveAnimation z-20 px-2'
            >
                <FontAwesomeIcon icon={faArrowUp} className="fa-fw" />
                <h2 className='px-2 hover:cursor-pointer focus:cursor-pointer'>Liste des Chapitres</h2>
                <FontAwesomeIcon icon={faArrowUp} className="fa-fw" />
            </button>
            {showChapters && (
                <nav className="absolute max-h-[50vh] w-full bg-black/70 overflow-x-hidden overflow-y-scroll rounded-t-lg shadow-xl z-10 mb-[20vh]">
                    <ul className="flex flex-col w-full h-full items-center bg-gradient-to-b from-violet-700/60 to-gray-950/60">
                        {chapters.map((chap, index) => (
                            <li key={chap.slug} className='w-full'>
                                <Link href={`/eternalys/${chap.slug}`} className="w-full border-b-2 border-yellow-300 flex justify-center items-center py-2 hover:underline">
                                    Chapitre {index + 1}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}





