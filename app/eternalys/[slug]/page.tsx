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
  const [nextChapter, setNextChapter] = useState<number | null>(null);
  const [background, setBackground] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const fetchChapter = async () => {
      const response = await fetch(`/api/chapters/${params.slug}`);
      const data = await response.json();
      setChapter(data.chapter);

      if (params.slug !== undefined && params.slug < data.maxChapter) {
        setNextChapter(Number(params.slug) + 1);
      }
      if (params?.slug) {
        localStorage.setItem('lastReadChapter', params.slug.toString());
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    fetchChapter();
  }, [params.slug]);

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
    }, 4000);

    return () => clearInterval(interval);
  }, [chapter, currentTrack]);

  const renderers = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h4: ({ node, ...props }: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const text = node.children?.map((child: any) => child.value).join('');
      if (typeof text === 'string' && text.startsWith('music:')) {
        const track = text.replace('music:', '').trim();
        return (
          <div
            data-music={track}
            className="music-marker w-full h-[2px] bg-pink-500 my-8 rounded-xl"
          />
        );
      }
      return <h4 className="text-lg mb-4" {...props} />;
    },
    p: ({ ...props }) => <p className="text-lg mb-4 leading-relaxed text-gray-200" {...props} />,
    h1: ({ ...props }) => <h1 className="text-2xl font-bold mb-8 text-white" {...props} />,
    h2: ({ ...props }) => <h2 className="text-3xl font-semibold mb-6 mt-16 text-pink-400" {...props} />,
  };

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

  if (!chapter) {
    return (
      <div className="flex items-center justify-center text-pink-400 text-xl h-[80vh]">
        <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-2" />
        Chargement du chapitre...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{chapter.title}</title>
        <meta name="description" content={`Lisez ${chapter.title} - Dimension Novel`} />
      </Head>

      {/* ✅ Image de fond plein écran fixe */}
      {background && (
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center transition-opacity duration-700 opacity-100 shadow-shadowBgDarker"
          style={{ backgroundImage: `url(/bgChapter/${chapter.bgImage})` }}
        />
      )}

      <section className="relative z-10 w-full">
        {/* Boutons latéraux */}
        <div className={`fixed top-32 right-4 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-end space-y-4">
            <button
              onClick={() => setBackground(!background)}
              className={`w-[65px] h-[65px] flex items-center justify-center rounded-full shadow-lg transition-all duration-300
              ${background
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                  : 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white'}
            `}
            >
              <FontAwesomeIcon icon={faImage} />
            </button>
            <MusicPlayer currentTrack={currentTrack} />
          </div>
        </div>

        {/* Contenu principal sur fond flou */}
        <div
          ref={contentRef}
          className="relative mx-auto max-w-4xl px-6 py-12 rounded-2xl shadow-lg transition-all duration-500
                   bg-gradient-to-b from-black/70 via-gray-900/50 to-gray-900/10 "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>
            {chapter.content}
          </ReactMarkdown>

          <div className="w-full mt-12 pt-6 border-t border-pink-400 flex flex-col md:flex-row md:justify-between md:items-center">
            <ListeChapterNbr />
            <BtnNextChapter props={nextChapter} />
          </div>
        </div>
      </section>
    </>
  );
}
