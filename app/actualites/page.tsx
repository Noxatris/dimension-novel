'use client'
import Header from "../(composents)/header";
import Footer from "../(composents)/footer";

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import AltActualite from '../(composents)/Squeltron/alt_actualite';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";

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
      <section className="h-[80vh] md:h-[350px] lg:min-h-[80vh] flex flex-col md:items-center pt-8 px-4 md:px-8 lg:px-12 md:mb-8">
        <h2 className="text-xl xl:text-3xl medievalFont border-b-4 border-violet-700 py-4 w-full xl:w-auto md:px-16 mb-6 xl:mb-6">Actualité</h2>
        <div className="flex flex-col-reverse items-center overflow-y-scroll px-2 custom-scrollbar md:mt-2">
          {loading ? (
            <AltActualite />
          ) : (
            actualites.map((chapter: Chapter) => (
              <div key={chapter.slug} className="md:w-[95%] border-l-4 rounded-r-xl border-violet-700 px-3 py-1 bg-black/50 mb-4">
                <div className="flex justify-between items-center text-xl md:text-2xl font-[MedievalSharp] mb-4">
                  <div className="flex items-center border-b-2 pb-1 pl-2 pr-6 border-violet-700">
                    <FontAwesomeIcon icon={faNewspaper} className="fa-fw text-white mr-2" />
                    <h3 className="">{chapter.title}</h3>
                  </div>
                  <div className="flex items-center text-pink-500">
                    <FontAwesomeIcon icon={faClock} className="fa-fw mr-2" />
                    <p>{chapter.date}</p>
                  </div>
                </div>
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => <h1 className="" {...props} />,
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
      </section>
      <Footer />
    </>
  );
}