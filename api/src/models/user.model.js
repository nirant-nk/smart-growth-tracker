import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["asha", "anm", "parent"], required: true },
    name: { type: String, required: true },
    phone: { type: String, unique: true },
    village: String,
    passwordHash: String,
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Child" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
