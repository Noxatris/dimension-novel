import { NextResponse } from 'next/server';
import { getAllArticle } from '../../../lib/markdown';

export async function GET() {
  const chapters = getAllArticle(); // Récupère tous les chapitres depuis le fichier Markdown
  return NextResponse.json({ chapters });
}