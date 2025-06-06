import { NextResponse } from 'next/server';
import { getChapterBySlug, getAllChapters } from '../../../../lib/markdown';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.pathname.split('/').pop();
  const next = url.searchParams.get('next');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const chapters = getAllChapters();
  console.log("Les chapitre", chapters)
  const currentIndex = chapters.findIndex(chapter => String(chapter.slug) === String(slug));

  if (next) {
    console.log("Index", currentIndex)
    const nextChapter = chapters[currentIndex + 1];
    console.log(nextChapter)
    if (nextChapter) {
      return NextResponse.json({ chapter: nextChapter });
    } else {
      return NextResponse.json({ chapter: null });
    }
  }

  const chapter = getChapterBySlug(slug);
  return NextResponse.json({ chapter });
}