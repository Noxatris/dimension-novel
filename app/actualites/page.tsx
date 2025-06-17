'use client';

import Header from "../(composents)/header";
import Footer from "../(composents)/footer";

import { useEffect, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Clock, Loader2, SunMedium, Moon, Filter, Tag } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Article {
  title: string;
  date: string;
  slug: string;
  content: string;
  category?: string;
  cover?: string;
  excerpt?: string;
  tags?: string[];
}

export default function ActualitesTimeline() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [theme, setTheme] = useState<'light' | 'dark'>(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  );
  const [activeCategory, setActiveCategory] = useState<string>('Tout');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/articles');
        const data = await res.json();
        setArticles(data.articles as Article[]);
      } catch (err) {
        console.error('Erreur de chargement des articles', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach(a => a.category && set.add(a.category));
    return ['Tout', ...Array.from(set)];
  }, [articles]);

  const filtered = useMemo(() => {
    if (activeCategory === 'Tout') return articles;
    return articles.filter(a => a.category === activeCategory);
  }, [articles, activeCategory]);

  const latest = filtered[0];

  const toggleExpand = (slug: string) =>
    setExpanded(p => ({ ...p, [slug]: !p[slug] }));

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className={theme === 'light' ? 'light' : 'dark'}>
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8e9ff] via-[#d7d8ff] to-[#ccccff] dark:from-[#2c2d3a] dark:via-[#38394a] dark:to-[#2c2d3a] pb-24 pt-16 transition-colors duration-300">
        <button
          aria-label="Basculer le thème"
          onClick={toggleTheme}
          className="absolute right-6 top-6 z-10 rounded-full p-2 bg-white/50 backdrop-blur-md dark:bg-black/40 hover:scale-105 transition transform"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <SunMedium className="h-5 w-5" />}
        </button>

        <h1 className="text-center text-4xl md:text-5xl font-bold medievalFont text-violet-700 dark:text-yellow-300 mb-4">
          Journal du Projet
        </h1>
        <p className="text-center text-lg max-w-2xl mx-auto text-gray-700 dark:text-violet-200">
          Suivez toutes les annonces liées au site, à <strong>Eternalys</strong> et aux prochains univers.
        </p>

        <div className="flex justify-center mt-10 gap-3 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transition-transform hover:scale-105
                ${activeCategory === cat
                  ? 'bg-violet-700 text-white'
                  : 'bg-white/50 dark:bg-black/40 text-gray-800 dark:text-violet-200'}`}
            >
              <Filter className="h-4 w-4" /> {cat}
            </button>
          ))}
        </div>

        {latest && (
          <div className="relative mt-16 max-w-5xl mx-auto shadow-lg rounded-2xl overflow-hidden">
            {latest.cover && (
              <Image
                src={latest.cover}
                alt={latest.title}
                fill
                className="object-cover opacity-40 dark:opacity-30"
              />
            )}
            <div className="relative z-10 p-10 bg-white/70 dark:bg-black/70 backdrop-blur-md">
              <h2 className="text-2xl md:text-3xl font-semibold text-violet-800 dark:text-yellow-300 mb-2">
                {latest.title}
              </h2>
              <div className="flex items-center text-sm text-gray-600 dark:text-pink-300 mb-4">
                <Clock className="h-4 w-4 mr-2" /> {latest.date}
              </div>
              <ReactMarkdown className="prose max-w-none dark:prose-invert line-clamp-4">
                {latest.excerpt || latest.content.slice(0, 400) + '...'}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </section>

      <section className="px-4 md:px-8 lg:px-24 py-24 bg-gradient-to-b from-transparent via-white/50 to-transparent dark:via-white/5">
        {loading ? (
          <div className="flex justify-center items-center text-violet-400 text-xl">
            <Loader2 className="animate-spin h-6 w-6 mr-3" /> Chargement des actualités..
          </div>
        ) : (
          <div className="relative border-l-2 border-violet-600/60 pl-6 space-y-12 max-w-4xl mx-auto">
            {filtered.map((art, idx) => {
              const year = new Date(art.date).getFullYear();
              const prevYear = idx > 0 ? new Date(filtered[idx - 1].date).getFullYear() : null;
              const showYear = year !== prevYear;
              return (
                <motion.div
                  key={art.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="relative"
                >
                  {showYear && (
                    <div className="absolute -left-[70px] top-0 text-2xl font-bold text-violet-600 dark:text-yellow-300">
                      {year}
                    </div>
                  )}
                  <div className="absolute -left-[13px] top-1 w-6 h-6 rounded-full bg-violet-600 border-4 border-white dark:border-black"></div>

                  <article className="bg-white/60 dark:bg-black/50 backdrop-blur-md border border-violet-600/30 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                    <header className="flex flex-col md:flex-row justify-between md:items-center mb-3 gap-2">
                      <h3 className="text-xl text-violet-800 dark:text-yellow-200 font-semibold medievalFont">
                        {art.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-700 dark:text-pink-300">
                        <Clock className="h-4 w-4 mr-2" /> {art.date}
                      </div>
                    </header>

                    {art.tags && art.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {art.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-violet-100 text-violet-800 dark:bg-violet-700 dark:text-white"
                          >
                            <Tag className="w-3 h-3" /> {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <ReactMarkdown className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
                      {expanded[art?.slug]
                        ? art?.content
                        : (art?.excerpt || (art?.content ? art.content.slice(0, 250) : '')) + ((art?.content && art.content.length > 250) ? '...' : '')
                      }
                    </ReactMarkdown>

                    {art.content && art.content.length > 250 && (
                      <button
                        onClick={() => toggleExpand(art.slug)}
                        className="mt-4 text-sm font-semibold text-violet-700 dark:text-violet-300 hover:underline"
                      >
                        {expanded[art.slug] ? 'Lire moins ▲' : 'Lire plus ▼'}
                      </button>
                    )}

                  </article>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
