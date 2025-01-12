'use client'

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface Chapter {
  title: string;
  content: string;
  slug: string;
}

export default function ChapterPage() {
  const params = useParams();
  const [chapter, setChapter] = useState<Chapter | null>(null);

  useEffect(() => {
    const fetchChapter = async () => {
      const response = await fetch(`/api/chapters/${params.slug}`); // Appel à l'API interne
      const data = await response.json();
      setChapter(data.chapter);
    };
    fetchChapter();
  }, [params.slug]);

  if (!chapter) return <div>Chargement...</div>;

  return (
    <>
      <Head>
        <title>{chapter.title}</title>
        <meta name="description" content={`Lisez le ${chapter.title} - Dimension Novel`} />
      </Head>
      <div className="pt-32 px-4">
        <ReactMarkdown
          components={{
            h1: ({  ...props }) => <h1 className="text-xl font-bold mb-8" {...props} />,
            h2: ({  ...props }) => <h2 className="text-3xl font-semibold" {...props} />,
            p: ({  ...props }) => <p className="text-lg mb-4" {...props} />,
          }}
        >
          {chapter.content}
        </ReactMarkdown>
      </div>
      <div>
        
      </div>
    </>
  );
}