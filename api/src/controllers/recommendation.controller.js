import Recommendation from "../models/recommendation.model.js";

export const getRecommendations = async (req, res, next) => {
  try {
    const { childId } = req.params;
    const recs = await Recommendation.find({ child: childId })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ recommendations: recs });
  } catch (err) {
    next(err);
  }
};

export const confirmRecommendation = async (req, res, next) => {
  try {
    const { recId } = req.params;
    const { method } = req.body;
    const rec = await Recommendation.findById(recId);
    if (!rec)
      return res.status(404).json({ message: "Recommendation not found" });
    rec.confirmed = true;
    rec.confirmedAt = new Date();
    rec.method = method;
    await rec.save();
    res.json({ message: "Recommendation confirmed", recommendation: rec });
  } catch (err) {
    next(err);
  }
};
