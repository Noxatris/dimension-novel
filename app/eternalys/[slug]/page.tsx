'use client'

import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ListeChapterNbr from '@/app/(composents)/listChapterNumber';
import BtnHome from "@/app/(composents)/btnHome";
import MusicPlayer from '@/app/(composents)/MusicPlayer';
import BtnNextChapter from '@/app/(composents)/btnNextChapter';

interface Chapter {
  title: string;
  content: string;
  slug: string;
}

export default function ChapterPage() {
  const params = useParams();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [nextChapter, setNextChapter] = useState<Chapter | null>(null);
  const [isImmersive, setIsImmersive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChapter = async () => {
      const response = await fetch(`/api/chapters/${params.slug}`);
      const data = await response.json();
      setChapter(data.chapter);

      // Fetch next chapter
      const nextResponse = await fetch(`/api/chapters/${data.chapter.slug}?next=true`);
      const nextData = await nextResponse.json();
      setNextChapter(nextData.chapter);
    };
    fetchChapter();
  }, [params.slug]);

  // Gérer l'observateur d'intersection pour les marqueurs de musique
  useEffect(() => {
    if (contentRef.current) {
      const musicMarkers = Array.from(contentRef.current.querySelectorAll('[data-music]'));
      console.log('Markers found:', musicMarkers); // Vérifier si les marqueurs sont trouvés

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const track = entry.target.getAttribute('data-music');
            if (track && track !== currentTrack) {
              console.log(`Changing track to: ${track}`); // Debug: voir quel track est joué
              setCurrentTrack(track);
            }
          }
        });
      }, { threshold: 0 }); // Observer dès qu'une petite partie de l'élément est visible

      musicMarkers.forEach((marker) => {
        observer.observe(marker);
        console.log('Observing marker:', marker); // Debug: vérifier quels éléments sont observés
      });

      // Cleanup observer
      return () => {
        musicMarkers.forEach((marker) => observer.unobserve(marker));
      };
    }
  }, [currentTrack, chapter, isImmersive]);

  // Transformer les balises h4 contenant "music:" en div avec data-music
  const renderers = {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    h4: ({ node, ...props }: any) => {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const text = node.children?.map((child: any) => child.value).join('');
      if (typeof text === 'string' && text.startsWith('music:')) {
        const track = text.replace('music:', '').trim();
        return <div data-music={track} className="music-marker" style={{ border: '2px solid red', padding: '10px' }} />; // Débogage avec une bordure rouge
      }
      return <h4 className="text-lg mb-4" {...props} />;
    },
    p: ({ ...props }) => <p className="text-lg mb-4" {...props} />,
    h1: ({ ...props }) => <h1 className="text-xl font-bold mb-8" {...props} />,
    h2: ({ ...props }) => <h2 className="text-3xl font-semibold" {...props} />,
  };

  if (!chapter) return <div className="flex w-screen justify-center mt-12 text-xl">Chargement de votre chapitre...</div>;

  return (
    <>
      <Head>
        <title>{chapter.title}</title>
        <meta name="description" content={`Lisez le ${chapter.title} - Dimension Novel`} />
      </Head>

      <div ref={contentRef} className={`h-[auto] pt-8 px-4 overflow-y-scroll ${isImmersive ? 'bg-fixed bg-center shadow-shadowInset' : 'bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/20'} transition-all duration-300`} style={isImmersive ? { backgroundImage: `url(/bgChapter/${chapter.slug}.webp)` } : {}}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={renderers} // Utilisation du rendu personnalisé
        >
          {chapter.content}
        </ReactMarkdown>
      </div>

      <div className="w-screen h-[15vh] bg-gradient-to-b from-violet-950 to-gray-900 flex flex-wrap justify-around items-center absolute bottom-0 sticky">
        {isImmersive && (
          <>
            <MusicPlayer currentTrack={currentTrack} />
          </>
        )}
        <div>
          <button onClick={() => setIsImmersive(!isImmersive)} className={`px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${isImmersive
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-violet-400 text-black hover:bg-violet-500'
            }`}>
            {isImmersive ? 'Standard' : 'Immersion'}
          </button>
        </div>
        <div className='w-screen flex justify-around items-center'>
          <BtnHome />
          <ListeChapterNbr />
          <BtnNextChapter props={nextChapter} />
        </div>
      </div>
    </>
  );
}