'use client'
// app/novel/[slug]/page.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useParams } from 'next/navigation';

interface ChapterProps {
  chapter: {
    title: string;
    content: string;
    slug: string;
  };
}

export default function ChapterPage() {
  const [chapter, setChapter] = useState<ChapterProps | null>(null);
  const params = useParams()

  useEffect(() => {
    const fetchChapter = async () => {;
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
      <div>
        <h1>{chapter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
      </div>
    </>
  );
}