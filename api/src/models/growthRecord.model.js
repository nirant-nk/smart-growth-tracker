import mongoose from "mongoose";

const growthRecordSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },
    date: { type: Date, required: true },
    ageInMonths: Number,
    height: Number,
    weight: Number,
    waz: Number,
    haz: Number,
    whz: Number,
    classification: {
      waz: { type: String, enum: ["normal", "mam", "sam"] },
      haz: { type: String, enum: ["normal", "mam", "sam"] },
      whz: { type: String, enum: ["normal", "mam", "sam"] },
    },
    trendDrop: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("GrowthRecord", growthRecordSchema);
