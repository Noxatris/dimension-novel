'use client'

import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ListeChapterNbr from '@/app/(composents)/listChapterNumber';
import MusicPlayer from '@/app/(composents)/MusicPlayer';
import BtnNextChapter from '@/app/(composents)/btnNextChapter';
import Header from '@/app/(composents)/header';
import Footer from '@/app/(composents)/footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage} from '@fortawesome/free-solid-svg-icons';

interface Chapter {
  title: string;
  content: string;
  slug: string;
}

export default function ChapterPage() {
  const params = useParams();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [nextChapter, setNextChapter] = useState<Chapter | null>(null);
  const [background, setBackground] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true); // État pour gérer la visibilité du menu
  const contentRef = useRef<HTMLDivElement>(null);
  let scrollTimeout: NodeJS.Timeout;

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
  }, [currentTrack, chapter, background]);

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
    h2: ({ ...props }) => <h2 className="text-3xl font-semibold" {...props} />,
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  if (!chapter) return <div className="flex w-screen justify-center mt-12 text-xl">Chargement de votre chapitre...</div>;

  return (
    <>
      <Head>
        <title>{chapter.title}</title>
        <meta name="description" content={`Lisez ${chapter.title} - Dimension Novel`} />
      </Head>

      <Header />
      <section className='w-screen relative'>
        
        <div className={`fixed top-32 right-2 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 overflow-hidden z-50`}>
          <div className="flex flex-col items-end space-y-4">
            <button onClick={() => setBackground(!background)} className={`w-[65px] h-[65px] px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${background
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
              : 'bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:from-gray-600 hover:to-gray-800'
              }`}>
              <FontAwesomeIcon icon={faImage} className="fa-fw" />
            </button>
            <MusicPlayer currentTrack={currentTrack}/>
          </div>
        </div>

        <div ref={contentRef} className={`xl:mx-[25vw] h-[auto] py-8 px-4 ${background ? 'bg-fixed bg-center shadow-shadowInset' : 'bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/20'} transition-all duration-300`} style={background ? { backgroundImage: `url(/bgChapter/${chapter.slug}.webp)` } : {}}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={renderers} // Utilisation du rendu personnalisé
          >
            {chapter.content}
          </ReactMarkdown>
        </div>

        <div className='w-screen h-[15vh] bg-gradient-to-b from-violet-950 to-gray-900 flex flex-wrap justify-around xl:px-[30vw] items-center'>
          <div className='w-screen flex justify-around items-center'>
            <ListeChapterNbr />
            <BtnNextChapter props={nextChapter} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}