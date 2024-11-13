import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// الروابط الخاصة بموقعك
const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'daily', priority: 0.8 },
  { url: '/Date', changefreq: 'daily', priority: 0.8 },
  { url: '/Login', changefreq: 'daily', priority: 0.8 },
  { url: '/Articles', changefreq: 'daily', priority: 0.8 },
  { url: '/Level_division', changefreq: 'daily', priority: 0.8 },
  { url: '/Register', changefreq: 'daily', priority: 0.8 },
  { url: '/Teachers', changefreq: 'daily', priority: 0.8 },
  { url: '/Study_materials', changefreq: 'daily', priority: 0.8 },
  { url: '/More_services', changefreq: 'daily', priority: 0.8 },
  { url: '/Support', changefreq: 'daily', priority: 0.8 },
  { url: '/Register_account', changefreq: 'daily', priority: 0.8 },
  { url: '/Login_users', changefreq: 'daily', priority: 0.8 },
  { url: '/Dash_users/:userId', changefreq: 'daily', priority: 0.8 },
  { url: '/Comments', changefreq: 'daily', priority: 0.8 },
  { url: '/Questions', changefreq: 'daily', priority: 0.8 },
  { url: '/Terms', changefreq: 'daily', priority: 0.8 },
  { url: '/Dash', changefreq: 'daily', priority: 0.8 },
];

const userIds = [1, 2, 3];
userIds.forEach((userId) => {
  pages.push({ url: `/Dash_users/${userId}`, changefreq: 'daily', priority: 0.8 });
});

(async () => {
  const sitemapStream = new SitemapStream({ hostname: 'https://japaneseacademy.online/' });

  pages.forEach((page) => {
    sitemapStream.write(page);
  });
  sitemapStream.end();

  const sitemapData = await streamToPromise(sitemapStream).then((data) => data.toString());

  const outputPath = resolve(__dirname, 'sitemap.xml');
  createWriteStream(outputPath).write(sitemapData);

  console.log('Sitemap created successfully!');
})();
