import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRY } from "../constants.js";
import User from "../models/user.model.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, phone, password, role, village } = req.body;
    const existing = await User.findOne({ phone });
    if (existing)
      return res.status(400).json({ message: "Phone already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, phone, passwordHash, role, village }); //"asha", "anm", "parent"
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRY,
    });
    res.json({ token, role: user.role });
  } catch (err) {
    next(err);
  }
};
