export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error", error: err.message });
};
