import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faBookOpen } from '@fortawesome/free-solid-svg-icons';

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
        <div className='relative w-[70%] h-[80%] flex flex-col-reverse justify-center items-center z-10'>
            <button
                onClick={toggleChapters}
                className='w-full h-10 flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 gradientMoveAnimation z-20 px-4 shadow-lg'
            >
                <h2 className='w-5/6 pr-2 text-white font-semibold hover:cursor-pointer focus:cursor-pointer'>
                    Liste des Chapitres
                </h2>
                <FontAwesomeIcon icon={faArrowUp} className="fa-fw text-white" />
            </button>
            {showChapters && (
                <nav className="absolute max-h-[40vh] w-full bg-white/80 overflow-x-hidden overflow-y-scroll rounded-t-lg shadow-xl z-10 mb-[3vh] transition-all duration-300 ease-in-out bottom-0">
                    <ul className="flex flex-col w-full h-full items-center bg-gradient-to-b from-purple-600/60 to-gray-900/60 px-4 pb-4 rounded-t-lg">
                        {chapters.map((chap, index) => (
                            <li key={chap.slug} className='w-full'>
                                <Link href={`/eternalys/${chap.slug}`}>
                                    <div className="w-full border-b-2 border-yellow-300 flex justify-center items-center py-3 px-4 hover:bg-yellow-300/20 transition-all duration-200 ease-in-out rounded-md">
                                        <FontAwesomeIcon icon={faBookOpen} className="fa-fw text-yellow-400 mr-3" />
                                        <span className="text-white font-medium truncate flex items-center hover:cursor-pointer focus:cursor-pointer">
                                            Chapitre {index + 1}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}




