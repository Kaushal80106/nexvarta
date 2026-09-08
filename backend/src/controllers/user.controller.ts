import { Request, Response } from 'express';
import { prisma } from '../server';

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Hardcoded to our seeded user for now. 
    // In production, this would be extracted from req.user (JWT)
    const userId = 'usr-kaushal';

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        preferences: true,
        notificationPrefs: true,
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, error: { message: 'User not found' } });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: (error as Error).message } });
  }
};

export const updatePreferences = async (req: Request, res: Response) => {
  try {
    const userId = 'usr-kaushal';
    const { languages, briefingTime, defaultFeed } = req.body;

    const updated = await prisma.userPreference.upsert({
      where: { userId },
      create: {
        userId,
        languages: languages || ['English'],
        briefingTime: briefingTime || '07:30 AM',
        defaultFeed: defaultFeed || 'for-you'
      },
      update: {
        ...(languages && { languages }),
        ...(briefingTime && { briefingTime }),
        ...(defaultFeed && { defaultFeed })
      }
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: (error as Error).message } });
  }
};

