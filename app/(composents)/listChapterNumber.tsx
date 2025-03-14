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
                className='w-full h-10 flex items-center rounded-full bg-gradient-to-r from-gray-800 to-blue-500 gradientMoveAnimation z-20 px-4 shadow-lg'
            >
                <h2 className='w-5/6 pr-2 text-white font-semibold hover:cursor-pointer focus:cursor-pointer'>
                    Liste des Chapitres
                </h2>
                <FontAwesomeIcon icon={faArrowUp} className="fa-fw text-white" />
            </button>
            {showChapters && (
                <nav className="absolute max-h-[40vh] w-full overflow-x-hidden overflow-y-scroll custom-scrollbar2 rounded-t-2xl shadow-xl z-10 mb-[3vh] transition-all duration-300 ease-in-out bottom-0">
                    <ul className="flex flex-col w-full h-full items-center bg-gradient-to-b from-gray-800/80 to-indigo-600/80 px-4 pb-4 rounded-t-lg">
                        {chapters.map((chap, index) => (
                            <li key={chap.slug} className='w-full'>
                                <Link href={`/eternalys/${chap.slug}`}>
                                    <div className="w-full border-l-4 bg-gradient-to-b from-indigo-600 to-indigo-800 border-pink-600 flex justify-center items-center py-2 shadow-xl rounded-r-lg my-2 hover:bg-blue-500/20 transition-all duration-200 ease-in-out">
                                        <FontAwesomeIcon icon={faBookOpen} className="fa-fw text-pink-600 mr-3" />
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




