import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["asha", "anm", "parent"], required: true },
    username: {type: String, required: false, unique: false},
    name: { type: String, required: true },
    phone: { type: String, unique: true },
    email: { type: String, unique: false, required: true },
    village: String,
    passwordHash: String,
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Child" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
