// routes/child.routes.js
import express from 'express';
import { createChild, getChildHistory, getChildrens } from '../controllers/child.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/', authMiddleware, createChild);
router.get('/', authMiddleware, getChildrens);
router.get('/:childId/history', authMiddleware, getChildHistory);
export default router;



