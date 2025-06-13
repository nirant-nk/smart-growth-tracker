import Child from "../models/child.model.js";
import User from "../models/user.model.js";

export const createChild = async (req, res, next) => {
  try {
    const { name, dob, gender, village, parentId } = req.body;
    const uniqueId = `CHILD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const child = new Child({
      name,
      dob,
      gender,
      village,
      uniqueId,
      parent: parentId,
      createdBy: req.user.id,
    });
    await child.save();
    if (parentId)
      await User.findByIdAndUpdate(parentId, {
        $push: { children: child._id },
      });
    res.status(201).json({ child });
  } catch (err) {
    next(err);
  }
};

export const getChildHistory = async (req, res, next) => {
  try {
    const { childId } = req.params;
    const child = await Child.findById(childId)
      .populate({ path: "growthRecords", options: { sort: { date: 1 } } })
      .lean();
    if (!child) return res.status(404).json({ message: "Child not found" });
    res.json({ child, growthHistory: child.growthRecords });
  } catch (err) {
    next(err);
  }
};
