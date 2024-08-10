import express from 'express';
import { signup, signin } from '../controller/authController.js';
import { validateRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', validateRole, signup);
router.post('/signin', signin);

export default router;