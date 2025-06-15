import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },
    growthRecord: { type: mongoose.Schema.Types.ObjectId, ref: "GrowthRecord" },
    level: { type: String, enum: ["normal", "mam", "sam"], required: true },
    message: String,
    resolved: { type: Boolean, default: false },
    autoEscalated: { type: Boolean, default: false },
    escalatedAt: Date,
    supervisorNotified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);
