'use client'

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import BtnNextChapter from '@/app/(composents)/btnNextChapter';
import ListeChapterNbr from '@/app/(composents)/listChapterNumber';
import BtnHome from "@/app/(composents)/btnHome";

interface Chapter {
  title: string;
  content: string;
  slug: string;
}

export default function ChapterPage() {
  const params = useParams();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [nextChapter, setNextChapter] = useState<Chapter | null>(null);

  useEffect(() => {
    const fetchChapter = async () => {
      const response = await fetch(`/api/chapters/${params.slug}`); // Appel à l'API interne
      const data = await response.json();
      setChapter(data.chapter);

      // Fetch next chapter
      const nextResponse = await fetch(`/api/chapters/${data.chapter.slug}?next=true`);
      const nextData = await nextResponse.json();
      setNextChapter(nextData.chapter);

    };
    fetchChapter();
  }, [params.slug]);

  if (!chapter) return <div className='flex w-screen justify-center mt-12 text-xl'>Chargement de votre chapitre...</div>;

  return (
    <>
      <Head>
        <title>{chapter.title}</title>
        <meta name="description" content={`Lisez le ${chapter.title} - Dimension Novel`} />
      </Head>
      <div className="pt-8 px-4 pb-8 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/20">
        <ReactMarkdown
          components={{
            h1: ({ ...props }) => <h1 className="text-xl font-bold mb-8" {...props} />,
            h2: ({ ...props }) => <h2 className="text-3xl font-semibold" {...props} />,
            p: ({ ...props }) => <p className="text-lg mb-4" {...props} />,
          }}
        >
          {chapter.content}
        </ReactMarkdown>
      </div>

      <div className='w-screen h-[12vh] bg-gradient-to-b from-violet-950 to-gray-900 flex justify-around items-center'>
        <BtnHome />
        <ListeChapterNbr />
        <BtnNextChapter props={nextChapter} />
      </div>
    </>
  );
}