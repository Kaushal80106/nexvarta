import { prisma } from '../server';
import crypto from 'crypto';

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

// GNews category → NexVarta category mapping
const CATEGORY_MAP: Record<string, string> = {
  technology: 'Technology',
  business: 'Business',
  sports: 'Sports',
  science: 'Science',
  health: 'World',
  world: 'World',
  entertainment: 'Entertainment',
  nation: 'India',
  general: 'World',
};

export interface FetchedArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: { name: string; url: string };
  category: string; // NexVarta category
}

// Helper to fetch from GNews with error resilience
async function fetchFromGNews(params: Record<string, string>): Promise<FetchedArticle[]> {
  if (!GNEWS_API_KEY) throw new Error('Missing GNEWS_API_KEY');

  const query = new URLSearchParams({ ...params, apikey: GNEWS_API_KEY }).toString();
  const url = `https://gnews.io/api/v4/top-headlines?${query}`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error(`GNews error: ${response.status} ${response.statusText}`);
    return [];
  }

  const data = await response.json();
  return data.articles || [];
}

export async function fetchTrendingNews() {
  if (!GNEWS_API_KEY) {
    throw new Error('Missing GNEWS_API_KEY in environment variables');
  }

  const allFetched: FetchedArticle[] = [];

  // ─────────────────────────────────────────────
  // PRIORITY 1: INDIA — top headlines in India
  // ─────────────────────────────────────────────
  console.log('  → Fetching Indian news (top headlines)...');
  const indiaGeneral = await fetchFromGNews({ country: 'in', lang: 'en', max: '5' });
  allFetched.push(...indiaGeneral.map(a => ({ ...a, category: 'India' })));

  // India-specific categories
  const indiaCategories = ['technology', 'business', 'sports'];
  for (const cat of indiaCategories) {
    const articles = await fetchFromGNews({ country: 'in', category: cat, lang: 'en', max: '2' });
    allFetched.push(...articles.map(a => ({ ...a, category: CATEGORY_MAP[cat] || 'India' })));
    await new Promise(r => setTimeout(r, 300)); // avoid rate limit
  }

  // ─────────────────────────────────────────────
  // PRIORITY 2: GLOBAL — international categories
  // ─────────────────────────────────────────────
  console.log('  → Fetching global news (world categories)...');
  const globalCategories = ['technology', 'business', 'science', 'world', 'sports'];
  for (const cat of globalCategories) {
    const articles = await fetchFromGNews({ category: cat, lang: 'en', max: '3' });
    allFetched.push(...articles.map(a => ({ ...a, category: CATEGORY_MAP[cat] || 'World' })));
    await new Promise(r => setTimeout(r, 300));
  }

  const uniqueArticles = deduplicateByUrl(allFetched);
  console.log(`Fetched ${uniqueArticles.length} unique articles (India + Global). Processing...`);

  // Save all articles to DB
  for (const article of uniqueArticles) {
    let source = await prisma.source.findFirst({
      where: { name: article.source.name }
    });

    if (!source) {
      try {
        const domain = new URL(article.source.url || article.url).hostname;
        source = await prisma.source.create({
          data: { name: article.source.name, domain }
        });
      } catch {
        continue;
      }
    }

    const hash = crypto.createHash('sha256').update(article.url).digest('hex');
    await prisma.article.upsert({
      where: { hash },
      update: {},
      create: {
        title: article.title,
        url: article.url,
        hash,
        publishedAt: new Date(article.publishedAt),
        sourceId: source.id
      }
    });
  }

  console.log('News ingestion completed successfully.');
  return { success: true, articles: uniqueArticles };
}

// Remove duplicate URLs across India + Global fetch
function deduplicateByUrl(articles: FetchedArticle[]): FetchedArticle[] {
  const seen = new Set<string>();
  return articles.filter(a => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });
}
