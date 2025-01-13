'use client'

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface Chapter {
  title: string;
  content: string;
  slug: string;
}

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [nextChapter, setNextChapter] = useState<Chapter | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    const fetchChapter = async () => {
      const response = await fetch(`/api/chapters/${params.slug}`); // Appel à l'API interne
      const data = await response.json();
      setChapter(data.chapter);

      // Fetch next chapter
      const nextResponse = await fetch(`/api/chapters/${data.chapter.slug}?next=true`);
      const nextData = await nextResponse.json();
      setNextChapter(nextData.chapter);

      // Fetch all chapters
      const allChaptersResponse = await fetch('/api/chapters');
      const allChaptersData = await allChaptersResponse.json();
      setChapters(allChaptersData.chapters);
    };
    fetchChapter();
  }, [params.slug]);

  if (!chapter) return <div>Chargement...</div>;

  const handleNextChapter = () => {
    if (nextChapter) {
      router.push(`/eternalys/${nextChapter.slug}`);
    }
  };

  return (
    <>
      <Head>
        <title>{chapter.title}</title>
        <meta name="description" content={`Lisez le ${chapter.title} - Dimension Novel`} />
      </Head>
      <div className="pt-8 px-4">
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
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handleNextChapter}
          disabled={!nextChapter}
          className={`px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
            nextChapter
              ? 'bg-yellow-300 text-black hover:bg-yellow-400'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {nextChapter ? 'Chapitre Suivant' : 'Pas de chapitre suivant'}
        </button>
      </div>
      <nav className="mt-8">
        <ul className="flex space-x-4">
          {chapters.map((chap, index) => (
            <li key={chap.slug}>
              <Link href={`/eternalys/${chap.slug}`}>
                Chapitre {index + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}