// controllers/child.controller.js

import mongoose from "mongoose";
import Child from "../models/child.model.js";
import User from "../models/user.model.js";

// Helper to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// POST /children - Register a new child
export const createChild = async (req, res, next) => {
  try {
    const parentId = req.user.id;
    if (!isValidObjectId(parentId)) {
      return res.status(400).json({ message: "Invalid parent ID" });
    }
    const { name, dob, gender, village } = req.body;
    const uniqueId = `CHILD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const child = new Child({
      name,
      dob,
      gender,
      village,
      uniqueId,
      createdBy: parentId,
    });
    await child.save();
    await User.findByIdAndUpdate(
      parentId,
      { $addToSet: { children: child._id } },
      { new: true }
    );
    res.status(201).json({ child });
  } catch (err) {
    next(err);
  }
};

// GET /children - List all children for parent
export const getChildrens = async (req, res, next) => {
  try {
    const parentId = req.user.id;
    if (!isValidObjectId(parentId)) {
      return res.status(400).json({ message: "Invalid parent ID" });
    }
    const children = await Child.find({ createdBy: parentId }).lean();
    res.json({ children });
  } catch (err) {
    next(err);
  }
};

// GET /children/:childId/history - Child growth history
export const getChildHistory = async (req, res, next) => {
  try {
    const { childId } = req.params;
    if (!isValidObjectId(childId)) {
      return res.status(400).json({ message: "Invalid child ID" });
    }
    const child = await Child.findById(childId)
      .populate({ path: "growthRecords", options: { sort: { date: 1 } } })
      .lean();
    if (!child) return res.status(404).json({ message: "Child not found" });
    res.json({ child, growthHistory: child.growthRecords });
  } catch (err) {
    next(err);
  }
};
