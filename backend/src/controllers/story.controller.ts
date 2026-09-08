import { Request, Response } from 'express';
import { prisma } from '../server';

export const getFeed = async (req: Request, res: Response) => {
  try {
    const { tab = 'for-you', limit = 20, page = 1 } = req.query;
    
    // In a real app, 'tab' dictates sorting and filtering.
    // For now, we'll return the latest stories.
    const stories = await prisma.story.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      orderBy: { publishedAt: 'desc' },
      include: {
        sources: { include: { source: true } },
        entities: { include: { entity: true } }
      }
    });

    res.json({
      success: true,
      data: stories,
      meta: {
        page: Number(page),
        limit: Number(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: (error as Error).message } });
  }
};

export const getStoryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const story = await prisma.story.findUnique({
      where: { slug },
      include: {
        aiSummary: true,
        impact: {
          include: { domains: true }
        },
        verification: {
          include: { claims: true }
        },
        timeline: true,
        sources: { include: { source: true } },
        entities: { include: { entity: true } }
      }
    });

    if (!story) {
      return res.status(404).json({ success: false, error: { message: 'Story not found' } });
    }

    res.json({ success: true, data: story });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: (error as Error).message } });
  }
};

