import { NextResponse } from 'next/server';
import { getChapterBySlug } from '../../../../lib/markdown';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.pathname.split('/').pop();

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const chapter = getChapterBySlug(slug); // Récupère un chapitre spécifique
  return NextResponse.json({ chapter });
}