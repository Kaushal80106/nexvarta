import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

export const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL,
    ].filter(Boolean) as string[];

    // Allow any vercel.app subdomain (covers preview deployments too)
    const isVercel = origin.endsWith('.vercel.app');
    const isAllowed = allowedOrigins.includes(origin) || isVercel;

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`[CORS] Blocked origin: ${origin}`);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', async (req: Request, res: Response) => {
  try {
    // Simple DB ping
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'ok',
      db: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      db: 'disconnected',
      error: (error as Error).message
    });
  }
});

import apiRoutes from './routes';

// Basic routing setup
app.use('/api/v1', apiRoutes);

// ─────────────────────────────────────────────
// AUTO NEWS PIPELINE — runs every 4 hours
// ─────────────────────────────────────────────
async function runScheduledPipeline() {
  try {
    console.log(`\n[SCHEDULER] Running intelligence pipeline at ${new Date().toISOString()}`);
    const { fetchTrendingNews } = await import('./services/news-ingestion.service');
    const { synthesizeStoryFromArticles } = await import('./services/ai.service');

    const result = await fetchTrendingNews();
    if (!result?.success || !result.articles) {
      console.log('[SCHEDULER] Failed to fetch articles, skipping this run.');
      return;
    }

    // Group articles by category
    const groups: Record<string, any[]> = {};
    for (const article of result.articles) {
      const cat = article.category || 'World';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(article);
    }

    let saved = 0;
    for (const [category, articles] of Object.entries(groups)) {
      if (articles.length === 0) continue;
      try {
        const aiInput = articles.map((a: any) => ({
          title: a.title,
          content: a.description || a.title,
          source: a.source.name
        }));

        const aiDossier = await synthesizeStoryFromArticles(aiInput);

        const savedStory = await prisma.story.create({
          data: {
            slug: `story-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
            category: aiDossier.category,
            headline: aiDossier.headline,
            subheadline: aiDossier.subheadline,
            publishedAt: new Date(),
            isTrending: true,
            trendingScore: Math.floor(Math.random() * 20) + 80,
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
                domains: { create: aiDossier.impact.domains }
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
        for (const article of articles) {
          const src = await prisma.source.findFirst({ where: { name: article.source.name } });
          if (src) {
            const exists = await prisma.storySource.findFirst({
              where: { storyId: savedStory.id, sourceId: src.id }
            });
            if (!exists) {
              await prisma.storySource.create({
                data: {
                  storyId: savedStory.id,
                  sourceId: src.id,
                  articleUrl: article.url,
                  articleTitle: article.title
                }
              });
            }
          }
        }

        saved++;
        console.log(`[SCHEDULER] ✅ Saved story for category: ${category}`);
        await new Promise(r => setTimeout(r, 1500));
      } catch (err) {
        console.error(`[SCHEDULER] ❌ Failed for ${category}:`, (err as Error).message);
      }
    }

    console.log(`[SCHEDULER] Done. ${saved} new stories generated.\n`);
  } catch (err) {
    console.error('[SCHEDULER] Pipeline error:', err);
  }
}

// Start Server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`✅ Server running at http://localhost:${port}`);

    // Run once on startup to populate fresh stories immediately
    const runOnStartup = process.env.RUN_PIPELINE_ON_STARTUP !== 'false';
    if (runOnStartup) {
      console.log('[SCHEDULER] Running initial pipeline on startup...');
      runScheduledPipeline();
    }

    // Then schedule every 4 hours automatically
    const FOUR_HOURS = 4 * 60 * 60 * 1000;
    setInterval(runScheduledPipeline, FOUR_HOURS);
    console.log('[SCHEDULER] Auto-pipeline scheduled every 4 hours.');
  });
}

export default app;

