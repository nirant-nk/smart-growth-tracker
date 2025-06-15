import mongoose from "mongoose";

const childSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    village: String,
    uniqueId: { type: String, unique: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    growthRecords: [
      { type: mongoose.Schema.Types.ObjectId, ref: "GrowthRecord" },
    ],
    hasEdema: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Child", childSchema);
