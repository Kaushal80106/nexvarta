import { Router } from 'express';
import userRoutes from './user.routes';
import storyRoutes from './story.routes';
// import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Define API routes here
router.use('/users', userRoutes);
router.use('/stories', storyRoutes);

export default router;

