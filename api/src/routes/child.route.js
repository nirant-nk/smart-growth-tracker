import express from "express";
import {
    createChild,
    getChildHistory,
} from "../controllers/child.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);
router.post("/", createChild);
router.get("/:childId/history", getChildHistory);
export default router;
