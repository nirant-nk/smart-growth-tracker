export const validateGrowthInput = (req, res, next) => {
  const { height, weight } = req.body;
  if (height <= 30 || height > 120)
    return res.status(400).json({ message: "Invalid height" });
  if (weight <= 1 || weight > 25)
    return res.status(400).json({ message: "Invalid weight" });
  next();
};
