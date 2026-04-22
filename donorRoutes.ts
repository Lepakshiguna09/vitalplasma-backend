import express from 'express';
import { createDonor, searchDonors } from '../controllers/donorController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createDonor);
router.get('/search', searchDonors);

export default router;
