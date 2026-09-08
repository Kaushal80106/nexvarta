import dotenv from 'dotenv';
dotenv.config();

import { fetchTrendingNews, FetchedArticle } from './services/news-ingestion.service';
import { synthesizeStoryFromArticles } from './services/ai.service';
import { prisma } from './server';

async function saveStory(aiDossier: any, articlesForStory: FetchedArticle[]) {
  const story = await prisma.story.create({
    data: {
      slug: `story-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
      category: aiDossier.category,
      headline: aiDossier.headline,
      subheadline: aiDossier.subheadline,
      publishedAt: new Date(),
      isTrending: true,
      trendingScore: Math.floor(Math.random() * 20) + 80, // 80–100

      aiSummary: {
        create: {
          short: aiDossier.aiSummary.short,
          detailed: aiDossier.aiSummary.detailed,
          keyFacts: aiDossier.aiSummary.keyFacts
        }
      },
      impact: {
        create: {
          potentialLevel: aiDossier.impact.potentialLevel,
          direction: aiDossier.impact.direction,
          confidence: aiDossier.impact.confidence,
          timeHorizon: aiDossier.impact.timeHorizon,
          whyItMatters: aiDossier.impact.whyItMatters,
          domains: {
            create: aiDossier.impact.domains
          }
        }
      },
      verification: {
        create: {
          status: aiDossier.verification.status,
          confidence: aiDossier.verification.confidence,
          consensus: aiDossier.verification.consensus,
          differences: aiDossier.verification.differences,
          unclear: aiDossier.verification.unclear
        }
      }
    }
  });

  // Link sources with real article URLs
  for (const article of articlesForStory) {
    const source = await prisma.source.findFirst({ where: { name: article.source.name } });
    if (source) {
      const exists = await prisma.storySource.findFirst({
        where: { storyId: story.id, sourceId: source.id }
      });
      if (!exists) {
        await prisma.storySource.create({
          data: {
            storyId: story.id,
            sourceId: source.id,
            articleUrl: article.url,        // ← real article URL
            articleTitle: article.title     // ← real article headline
          }
        });
      }
    }
  }

  return story;
}

async function runPipeline() {
  try {
    console.log('========================================');
    console.log('  NEXVARTA INTELLIGENCE PIPELINE');
    console.log('========================================\n');

    // STEP 1: Fetch articles across multiple categories
    console.log('[1/3] Fetching articles from GNews across all categories...');
    const result = await fetchTrendingNews();

    if (!result || !result.success || !result.articles) {
      throw new Error('Failed to fetch news from API.');
    }

    const allArticles = result.articles;

    // STEP 2: Group articles by category
    console.log('\n[2/3] Grouping articles by category for synthesis...');
    const groups: Record<string, FetchedArticle[]> = {};
    for (const article of allArticles) {
      const cat = article.category || 'World';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(article);
    }

    const categories = Object.keys(groups);
    console.log(`Found ${categories.length} category groups: ${categories.join(', ')}`);

    // STEP 3: For each category group, synthesize one intelligence story
    console.log('\n[3/3] Synthesizing one intelligence story per category...\n');

    let savedCount = 0;
    for (const [category, articles] of Object.entries(groups)) {
      if (articles.length === 0) continue;

      console.log(`  ▶ Processing category: ${category} (${articles.length} articles)...`);

      const aiInput = articles.map(a => ({
        title: a.title,
        content: a.description || a.title,
        source: a.source.name
      }));

      try {
        const aiDossier = await synthesizeStoryFromArticles(aiInput);
        const story = await saveStory(aiDossier, articles);
        console.log(`  ✅ Saved: "${aiDossier.headline}" (ID: ${story.id})`);
        savedCount++;

        // Small delay between AI calls to avoid rate limits
        await new Promise(r => setTimeout(r, 1500));
      } catch (err) {
        console.error(`  ❌ Failed for category ${category}:`, (err as Error).message);
      }
    }

    console.log(`\n🎉 Pipeline complete! Generated ${savedCount} new intelligence stories.`);

  } catch (error) {
    console.error('\n❌ Pipeline Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

runPipeline();
