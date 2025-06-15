// controllers/growth.controller.js

import Alert from "../models/alert.model.js";
import Child from "../models/child.model.js";
import GrowthRecord from "../models/growthRecord.model.js";
import Recommendation from "../models/recommendation.model.js";
import { calculateZScores, classifyZScore } from "../utils/zscoreCalculator.js";

// Helper: Generate recommendation message
function generateMessage(level) {
  const tips = {
    sam: "Severe Acute Malnutrition detected. Refer to NRC and begin emergency intervention.",
    mam: "Moderate Acute Malnutrition. Provide supplementary nutrition and monitor closely.",
    normal: "No intervention required.",
  };
  return tips[level] || "Monitor growth parameters.";
}

// POST /children/:childId/growth - Add growth record
export const addGrowthRecord = async (req, res, next) => {
  try {
    const { childId } = req.params;
    const { date, height, weight, hasEdema } = req.body;
    const child = await Child.findById(childId);
    if (!child) return res.status(404).json({ message: "Child not found" });

    const ageMs = new Date(date) - new Date(child.dob);
    const ageInMonths = Math.floor(ageMs / (1000 * 60 * 60 * 24 * 30));
    const { whz } = calculateZScores({
      ageInMonths,
      height,
      weight,
      gender: child.gender,
    });
    const whzClassification = classifyZScore(whz, hasEdema);

    const record = await GrowthRecord.create({
      child: childId,
      date,
      ageInMonths,
      height,
      weight,
      whz,
      classification: { whz: whzClassification },
    });

    child.growthRecords.push(record._id);
    if (hasEdema) child.hasEdema = true;
    await child.save();

    const alerts = [];
    const recommendations = [];
    if (whzClassification !== "normal") {
      const alert = await Alert.create({
        child: childId,
        growthRecord: record._id,
        level: whzClassification,
        message: `WHZ indicates ${whzClassification.toUpperCase()} condition.`,
      });
      alerts.push(alert);

      const recommendation = await Recommendation.create({
        child: childId,
        type: whzClassification,
        message: generateMessage(whzClassification),
        createdBy: req.user.id,
      });
      recommendations.push(recommendation);
    }

    return res.status(201).json({
      record,
      alerts,
      recommendations,
    });
  } catch (err) {
    next(err);
  }
};

// GET /children/:childId/alerts - List active alerts for child
export const getAlerts = async (req, res, next) => {
  try {
    const { childId } = req.params;
    const alerts = await Alert.find({ child: childId, resolved: false })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ alerts });
  } catch (err) {
    next(err);
  }
};
