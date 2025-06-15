// routes/recommendation.routes.js
import express from "express";
import { confirmRecommendation, getRecommendations } from "../controllers/recommendation.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router({ mergeParams: true });
router.use(authMiddleware);
router.get("/", getRecommendations);
router.post("/:recId/confirm", confirmRecommendation);
export default router;
