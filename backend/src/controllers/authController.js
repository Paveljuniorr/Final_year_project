
import User from "../models/User.js";
import RoleCode from "../models/RoleCode.js";
import jwt from "jsonwebtoken";

const genToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.json({ token: genToken(user._id, user.role) });
};

export const login = async (req, res) => {
  const { email, password, role, code } = req.body;
  const user = await User.findOne({ email });

  if(!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  if(role !== "student"){
    const roleCode = await RoleCode.findOne({ role, code, used: false });
    if(!roleCode) return res.status(403).json({ message: "Invalid role code" });
    roleCode.used = true;
    await roleCode.save();
    user.role = role;
    await user.save();
  }

  res.json({ token: genToken(user._id, user.role), role: user.role });
};

export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const adminExists = await User.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await User.create({
      name: "Admin",
      email,
      password,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin created successfully",
      adminId: admin._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
