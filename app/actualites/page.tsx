'use client'
import Header from "../(composents)/header";
import Footer from "../(composents)/footer";

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import AltActualite from '../(composents)/Squeltron/alt_actualite';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSpinner } from '@fortawesome/free-solid-svg-icons';
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
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

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

  const toggleReadMore = (slug: string) => {
    setExpanded(prevState => ({ ...prevState, [slug]: !prevState[slug] }));
  };

  return (
    <>
      <Header />
      <section className="min-h-[80vh] flex flex-col items-center pt-8 px-4 md:px-8 lg:px-12 shadowTest" 
        style={{background: 'url(/bgMain.jpg) center/cover'}}>
        
        <h2 className="text-2xl xl:text-4xl medievalFont border-b-4 border-violet-700 py-4 w-full xl:w-[25%] text-center mb-8 
          relative after:absolute after:w-full after:h-[2px] after:bg-violet-500 after:left-0 after:bottom-0 after:animate-pulse">
          Actualité
        </h2>

        <div className="flex flex-col-reverse items-center w-full md:w-[90%] lg:w-[70%] xl:w-[60%]">
          {loading ? (
            <div className="flex items-center justify-center text-violet-400 text-xl">
              <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-2" />
              Chargement des actualités...
            </div>
          ) : (
            actualites.map((chapter: Chapter) => (
              <div key={chapter.slug} 
                className={`w-full md:w-[50%] border-l-4 rounded-r-xl border-pink-500 px-6 py-4 bg-black/80 mb-6 shadow-lg 
                hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.02] transition-transform duration-200 
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-500`}>
                
                <div className="flex justify-between items-center text-xl md:text-2xl font-[MedievalSharp] mb-4">
                  <div className="flex items-center border-b-2 pb-1 pl-2 pr-6 border-violet-700">
                    <FontAwesomeIcon icon={faNewspaper} className="fa-fw text-white mr-2" />
                    <h3 className="text-white">{chapter.title}</h3>
                  </div>
                  <div className="flex items-center text-pink-500">
                    <FontAwesomeIcon icon={faClock} className="fa-fw mr-2" />
                    <p>{chapter.date}</p>
                  </div>
                </div>
                
                <ReactMarkdown>
                  {expanded[chapter.slug] ? chapter.content : chapter.content.slice(0, 150) + (chapter.content.length > 150 ? "..." : "")}
                </ReactMarkdown>
                {chapter.content.length > 150 && (
                  <button onClick={() => toggleReadMore(chapter.slug)} className="text-violet-400 hover:underline mt-2">
                    {expanded[chapter.slug] ? "Lire moins" : "Lire plus"}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
