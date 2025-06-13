import Alert from "../models/alert.model.js";
import Child from "../models/child.model.js";
import GrowthRecord from "../models/growthRecord.model.js";
import Recommendation from "../models/recommendation.model.js";
import { calculateZScores, classifyZScore } from "../utils/zscoreCalculator.js";

function generateMessage(metric, level) {
  const tips = {
    sam: "Refer to NRC and initiate SAM protocol",
    mam: "Provide supplementary food and monitor closely",
  };
  return tips[level] || "Monitor growth parameters";
}

export const addGrowthRecord = async (req, res, next) => {
  try {
    const { childId } = req.params;
    const { date, height, weight, hasEdema } = req.body;
    const child = await Child.findById(childId);
    if (!child) return res.status(404).json({ message: "Child not found" });
    const ageMs = new Date(date) - new Date(child.dob);
    const ageInMonths = Math.floor(ageMs / (1000 * 60 * 60 * 24 * 30));
    const { waz, haz, whz } = calculateZScores({
      ageInMonths,
      height,
      weight,
      gender: child.gender,
    });
    const classification = {
      waz: classifyZScore(waz, hasEdema),
      haz: classifyZScore(haz, hasEdema),
      whz: classifyZScore(whz, hasEdema),
    };
    const record = new GrowthRecord({
      child: childId,
      date,
      ageInMonths,
      height,
      weight,
      waz,
      haz,
      whz,
      classification,
    });
    await record.save();
    child.growthRecords.push(record._id);
    if (hasEdema) child.hasEdema = true;
    await child.save();
    const alerts = [];
    const recs = [];
    for (const [metric, cls] of Object.entries(classification)) {
      if (cls !== "normal") {
        const alert = new Alert({
          child: childId,
          growthRecord: record._id,
          level: cls,
          message: `${metric.toUpperCase()} is ${cls.toUpperCase()}`,
        });
        await alert.save();
        alerts.push(alert);
        const rec = new Recommendation({
          child: childId,
          type: cls,
          message: generateMessage(metric, cls),
          createdBy: req.user.id,
        });
        await rec.save();
        recs.push(rec);
      }
    }
    res.status(201).json({ record, alerts, recommendations: recs });
  } catch (err) {
    next(err);
  }
};

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
