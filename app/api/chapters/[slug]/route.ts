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
  const currentIndex = chapters.findIndex(chapter => String(chapter.slug) === String(slug));

  /*
  if (next) {
    let nextChapter = null;
    if (chapters.length > Number(slug) ){
      nextChapter = Number(slug) + 1;
      console.log("Next chapter slug:", nextChapter);
    }
    if (nextChapter) {
      return NextResponse.json({ chapter: nextChapter });
    } else {
      return NextResponse.json({ chapter: null });
    }
  }
  */

  const chapter = getChapterBySlug(slug);
  const maxChapter = chapters.length;
  return NextResponse.json({ chapter, maxChapter });
}