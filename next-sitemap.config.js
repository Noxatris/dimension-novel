/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://dimension-novel.fr', // 🔁 Mets ici ton domaine personnalisé (avec https)
  generateRobotsTxt: true,       // ✅ Pour générer aussi le fichier robots.txt
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
};