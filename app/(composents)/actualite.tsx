'use client'

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import AnimateSeparator from './animateSeparator';

interface ChapterMeta {
  title: string;
  date: string;
  slug: string;
  content: string;
}

interface Chapter extends ChapterMeta {
  content: string;
}

export default function Actualite() {

  const [actualites, setActualites] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/api/articles'); // Appel à l'API interne
      const data = await response.json();
      setActualites(data.chapters);
    };
    fetchArticles();
  }, []);

  return (
    <div className="h-[45vh] md:h-[50vh] lg:h-[60vh] flex flex-col bg-black/50 pt-8 px-4 md:px-8 lg:px-12">
      <h2 className="font-[MedievalSharp] text-xl md:text-2xl lg:text-3xl ml-6">ACTUALITÉ</h2>
      <AnimateSeparator />
      <div className="flex flex-col overflow-y-scroll px-2 custom-scrollbar">
        {actualites.map((chapter: Chapter) => (
          <div key={chapter.slug} className="border-l-4 rounded-xl border-violet-700 px-3 py-1 bg-black/50 mb-4">
            <ReactMarkdown
              components={{
                h1: ({ ...props }) => <h1 className="text-xl md:text-2xl lg:text-3xl font-[MedievalSharp] border-b-2 mb-3" {...props} />,
                h2: ({ ...props }) => <h2 className="text-3xl font-semibold" {...props} />,
                p: ({ ...props }) => <p className="text-base md:text-lg lg:text-xl" {...props} />,
              }}
            >
              {chapter.content}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
}