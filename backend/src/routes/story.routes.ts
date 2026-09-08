import { Router, Request, Response } from 'express';
import { prisma } from '../server';

const router = Router();

// Helper to format a story for the frontend
function formatStory(story: any) {
  return {
    id: story.id,
    slug: story.slug,
    category: story.category,
    headline: story.headline,
    subheadline: story.subheadline,
    publishedAt: story.publishedAt.toISOString(),
    updatedAt: story.updatedAt?.toISOString() || story.publishedAt.toISOString(),
    sourceCount: story.sources?.length || 0,
    isTrending: story.isTrending,
    trendingScore: story.trendingScore,
    readTimeMinutes: story.readTimeMinutes || 3,
    readTime: `${story.readTimeMinutes || 3} min read`,
    aiSummary: {
      short: story.aiSummary?.short || '',
      detailed: story.aiSummary?.detailed || '',
      keyFacts: story.aiSummary?.keyFacts || [],
      comprehensive: []
    },
    impact: {
      potentialLevel: story.impact?.potentialLevel || 'LOW',
      direction: story.impact?.direction || 'Neutral',
      confidence: story.impact?.confidence || 0,
      timeHorizon: story.impact?.timeHorizon || 'Short-term',
      whyItMatters: story.impact?.whyItMatters || '',
      domains: story.impact?.domains || [],
      uncertaintyNotes: story.impact?.uncertaintyNotes || ''
    },
    verification: {
      status: story.verification?.status || 'Unverified',
      confidence: story.verification?.confidence || 0,
      consensus: story.verification?.consensus || [],
      differences: story.verification?.differences || [],
      unclear: story.verification?.unclear || [],
      claims: story.verification?.claims || [],
      lastCheckedAt: 'Just now'
    },
    sources: (story.sources || []).map((s: any) => ({
      id: s.source.id,
      name: s.source.name,
      domain: s.source.domain,
      credibilityScore: s.source.credibilityScore,
      // Use real article URL if stored, otherwise fall back to source homepage
      originalUrl: s.articleUrl || `https://${s.source.domain}`,
      logo: `https://logo.clearbit.com/${s.source.domain}`,
      headline: s.articleTitle || `Coverage from ${s.source.name}`,
      publishedAt: story.publishedAt.toISOString(),
      summary: `Independent coverage from ${s.source.name}.`,
      perspective: 'Factual'
    })),
    relatedEntities: (story.entities || []).map((e: any) => ({
      id: e.entity.id,
      name: e.entity.name,
      type: e.entity.type,
      slug: e.entity.slug || e.entity.name.toLowerCase().replace(/ /g, '-')
    })),
    timeline: [],
    location: undefined,
    originalArticle: {
      publisher: 'NexVarta Intelligence',
      url: '#',
      note: 'AI-synthesized intelligence report from multiple verified sources.'
    }
  };
}

// Prisma include block (reused by multiple routes)
const storyInclude = {
  aiSummary: true,
  impact: { include: { domains: true } },
  verification: { include: { claims: true } },
  sources: { include: { source: true } },
  entities: { include: { entity: true } }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/stories/feed
// Latest stories — supports ?page=1&limit=20&category=Technology
// ─────────────────────────────────────────────────────────────────────────────
router.get('/feed', async (req: Request, res: Response) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page  as string) || 1);
    const limit = Math.min(50, parseInt(req.query.limit as string) || 20);
    const category = req.query.category as string | undefined;
    const skip  = (page - 1) * limit;

    const where = category && category !== 'All' ? { category } : {};

    const [stories, total] = await Promise.all([
      prisma.story.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        include: storyInclude
      }),
      prisma.story.count({ where })
    ]);

    res.json({
      stories: stories.map(formatStory),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + stories.length < total
      }
    });
  } catch (error) {
    console.error('Error fetching feed:', error);
    res.status(500).json({ error: 'Failed to fetch feed' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/stories/archive
// All past stories ordered by date — same pagination as feed
// ─────────────────────────────────────────────────────────────────────────────
router.get('/archive', async (req: Request, res: Response) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page  as string) || 1);
    const limit = Math.min(50, parseInt(req.query.limit as string) || 20);
    const skip  = (page - 1) * limit;

    const [stories, total] = await Promise.all([
      prisma.story.findMany({
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        include: storyInclude
      }),
      prisma.story.count()
    ]);

    res.json({
      stories: stories.map(formatStory),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + stories.length < total
      }
    });
  } catch (error) {
    console.error('Error fetching archive:', error);
    res.status(500).json({ error: 'Failed to fetch archive' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/stories/:id
// Single story by ID
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const story = await prisma.story.findUnique({
      where: { id: req.params.id },
      include: storyInclude
    });

    if (!story) {
      res.status(404).json({ error: 'Story not found' });
      return;
    }

    res.json(formatStory(story));
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ error: 'Failed to fetch story' });
  }
});

export default router;
