import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface ChapterMeta {
  title: string;
  date: string;
  slug: number;
  content: string;
}

interface Chapter extends ChapterMeta {
  content: string;
}

interface ChapterList {
  slug: string;
}

interface Article {
  title: string;
  date: string;
  slug: string;
  category?: string;
  cover?: string;
  excerpt?: string;
  tags?: string[];
  
}

const contentDirectory = path.join(process.cwd(), 'content');
const articleDirectory = path.join(process.cwd(), 'article');


// Fonction pour récupérer tous les chapitres
export function getAllChapters(): Chapter[] {
  const fileNames = fs.readdirSync(contentDirectory);
  const chapters = fileNames.map((fileName) => {
    const filePath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convertir le contenu Markdown en HTML
    const processedContent = remark().use(html).processSync(content).toString();

    return {
      title: data.title,
      date: data.date,
      slug: data.slug,
      content: processedContent,
    } as Chapter;
  });
  return chapters;
}

export function getChaptersList(): ChapterList[] {
  const fileNames = fs.readdirSync(contentDirectory);
  const chaptersList = fileNames.map((fileName) => {
    const filePath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: data.slug,
    } as ChapterList;
  });
  return chaptersList;
}

// Fonction pour récupérer un chapitre spécifique par slug
export function getChapterBySlug(slug: string): Chapter {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    date: data.date,
    slug: data.slug,
    bgImage: data.bgImage,
    content: content, // Return raw markdown content
  } as Chapter;
}

export function getAllArticle(): Article[] {
  const fileNames = fs.readdirSync(articleDirectory);
  const articles = fileNames.map((fileName) => {
    const filePath = path.join(articleDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      title: data.title,
      date: data.date,
      slug: data.slug,
      category: data.category,
      cover: data.cover || null,
      excerpt: data.excerpt || null,
      tags: data.tags || [],
    } as Article;
  });
  return articles;
}
