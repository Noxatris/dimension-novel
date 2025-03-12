'use client'
import Header from "../(composents)/header";
import Footer from "../(composents)/footer";

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import AnimateSeparator from "../(composents)/animateSeparator";
import AltActualite from '../(composents)/Squeltron/alt_actualite';

interface ChapterMeta {
  title: string;
  date: string;
  slug: string;
}

interface Chapter extends ChapterMeta {
  content: string;
}

export default function Actualite() {
  const [actualites, setActualites] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles'); // Appel à l'API interne
        const data = await response.json();
        setActualites(data.chapters);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <>
      <Header />
      <div className="h-[80vh] md:h-[350px] lg:min-h-[80vh] flex flex-col md:items-center pt-8 px-4 md:px-8 lg:px-12 md:mb-8">
        <h2 className="medievalFont text-xl md:text-2xl lg:text-3xl ml-6 md:ml-0">Actualité</h2>
        <AnimateSeparator />
        <div className="flex flex-col-reverse items-center overflow-y-scroll px-2 custom-scrollbar md:mt-2">
          {loading ? (
            <AltActualite />
          ) : (
            actualites.map((chapter: Chapter) => (
              <div key={chapter.slug} className="md:w-[95%] border-l-4 rounded-xl border-violet-700 px-3 py-1 bg-black/50 mb-4">
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => <h1 className="text-xl md:text-2xl font-[MedievalSharp] border-b-2 mb-3" {...props} />,
                    h2: ({ ...props }) => <h2 className="text-3xl font-semibold" {...props} />,
                    p: ({ ...props }) => <p className="text-base md:text-lg lg:text-xl" {...props} />,
                  }}
                >
                  {chapter.content}
                </ReactMarkdown>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}