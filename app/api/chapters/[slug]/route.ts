import { NextResponse } from 'next/server';
import { getChapterBySlug, getAllChapters } from '../../../../lib/markdown';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.pathname.split('/').pop();

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const chapters = getAllChapters();

  const chapter = getChapterBySlug(slug);
  const maxChapter = chapters.length;
  return NextResponse.json({ chapter, maxChapter });
}