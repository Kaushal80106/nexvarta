import { Router } from 'express';
import { getProfile, updatePreferences } from '../controllers/user.controller';

const router = Router();

// In a real app, these would be protected by an auth middleware (e.g. Clerk verifyToken)
// For MVP/testing, we'll pass userId via headers or just use a mock user ID
router.get('/profile', getProfile);
router.patch('/preferences', updatePreferences);

export default router;

