import { NextResponse } from 'next/server';
import { getAllChapters } from '../../../lib/markdown';

export async function GET() {
  const chapters = getAllChapters(); // Récupère tous les chapitres depuis le fichier Markdown
  return NextResponse.json({ chapters });
}