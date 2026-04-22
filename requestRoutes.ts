import express from 'express';
import { createRequest, matchDonors, getMyRequests } from '../controllers/requestController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createRequest);
router.get('/my', authMiddleware, getMyRequests);
router.get('/match/:id', authMiddleware, matchDonors);

export default router;
