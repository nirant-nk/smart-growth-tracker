import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },
    type: { type: String, enum: ["sam", "mam", "nutrition", "followup"] },
    message: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    confirmed: { type: Boolean, default: false },
    confirmedAt: Date,
    method: { type: String, enum: ["otp", "signature", "manual"] },
  },
  { timestamps: true }
);

export default mongoose.model("Recommendation", recommendationSchema);
