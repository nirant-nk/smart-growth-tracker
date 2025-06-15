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
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    whz: { type: Number, required: true },
    classification: {
      whz: {
        type: String,
        enum: ["normal", "mam", "sam"],
        required: true,
      },
    },
    trendDrop: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("GrowthRecord", growthRecordSchema);
