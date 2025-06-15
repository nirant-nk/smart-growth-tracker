// routes/growth.routes.js
import express from "express";
import { addGrowthRecord, getAlerts } from "../controllers/growth.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateGrowthInput } from "../utils/validators.js";

const router = express.Router({ mergeParams: true });
router.use(authMiddleware);
router.post("/", validateGrowthInput, addGrowthRecord);
router.get("/alerts", getAlerts);
export default router;