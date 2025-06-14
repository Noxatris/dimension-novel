'use client'

import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ListeChapterNbr from '@/app/(composents)/listChapterNumber';
import MusicPlayer from '@/app/(composents)/MusicPlayer';
import BtnNextChapter from '@/app/(composents)/btnNextChapter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface Chapter {
  title: string;
  content: string;
  slug: number;
  bgImage: string;
}

export default function ChapterPage() {
  const params = useParams();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [nextChapter, setNextChapter] = useState<Number | null>(null);
  const [background, setBackground] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true); // État pour gérer la visibilité du menu
  const contentRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const fetchChapter = async () => {
      const response = await fetch(`/api/chapters/${params.slug}`);
      const data = await response.json();
      setChapter(data.chapter);

      if (params.slug !== undefined && params.slug < data.maxChapter ) {
        setNextChapter(Number(params.slug) + 1);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    fetchChapter();
  }, [params.slug]);

  // Gérer l'observateur d'intersection pour les marqueurs de musique
  useEffect(() => {
    const interval = setInterval(() => {
      if (!contentRef.current) return;

      const markers = Array.from(contentRef.current.querySelectorAll('[data-music]'));
      let newTrack = currentTrack;

      for (const marker of markers) {
        const rect = marker.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          newTrack = marker.getAttribute('data-music');
          break;
        }
      }

      if (newTrack && newTrack !== currentTrack) {
        setCurrentTrack(newTrack);
      }
    }, 4000); // Vérifie toutes les 5 secondes

    return () => clearInterval(interval);
  }, [chapter, currentTrack]);

  // Transformer les balises h4 contenant "music:" en div avec data-music
  const renderers = {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    h4: ({ node, ...props }: any) => {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const text = node.children?.map((child: any) => child.value).join('');
      if (typeof text === 'string' && text.startsWith('music:')) {
        const track = text.replace('music:', '').trim();
        return <div data-music={track} className="music-marker" style={{ border: '2px solid red', padding: '2px' }} />; // Débogage avec une bordure rouge
      }
      return <h4 className="text-lg mb-4" {...props} />;
    },
    p: ({ ...props }) => <p className="text-lg mb-4" {...props} />,
    h1: ({ ...props }) => <h1 className="text-xl font-bold mb-8" {...props} />,
    h2: ({ ...props }) => <h2 className="text-3xl font-semibold mb-6 mt-16" {...props} />,
  };

  const handleScrollRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsVisible(window.scrollY < lastScrollY.current);
        lastScrollY.current = window.scrollY;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const scrollHandler = () => handleScrollRef.current?.();

    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  if (!chapter) return
  <div className="flex items-center justify-center text-violet-400 text-xl h-[80vh]">
    <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-2" />
    Chargement du chapitre...
  </div>;

  return (
    <>
      <Head>
        <title>{chapter.title}</title>
        <meta name="description" content={`Lisez ${chapter.title} - Dimension Novel`} />
      </Head>

      <section className='w-screen relative'>

        <div className={`fixed top-32 right-2 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 overflow-hidden z-50`}>
          <div className="flex flex-col items-end space-y-4">
            <button onClick={() => setBackground(!background)} className={`w-[65px] h-[65px] px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${background
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
              : 'bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:to-gray-800'
              }`}>
              <FontAwesomeIcon icon={faImage} className="fa-fw" />
            </button>
            <MusicPlayer currentTrack={currentTrack} />
          </div>
        </div>

        <div ref={contentRef} className={`xl:mx-[25vw] h-[auto] py-8 px-4 ${background ? 'bg-fixed bg-center bg-cover shadow-shadowBgDarker' : 'bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/20'} transition-all duration-300`} style={background ? { backgroundImage: `url(/bgChapter/${chapter.bgImage})` } : {}}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={renderers} // Utilisation du rendu personnalisé
          >
            {chapter.content}
          </ReactMarkdown>
          <div className='w-[95%] flex justify-around items-center border-t-4 border-pink-500 mt-8 pt-8'>
            <ListeChapterNbr />
            <BtnNextChapter props={nextChapter} />
          </div>
        </div>
      </section>
    </>
  );
}