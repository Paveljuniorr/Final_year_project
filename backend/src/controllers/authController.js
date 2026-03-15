import User from "../models/User.js";
import bcrypt from "bcryptjs";
import e from "express";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password, 
    role
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  });
};

export const login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);
    const {email,password,role} = req.body;

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    console.log("USER FROM DB:", user);

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "User does not exits" });
    }

    console.log("PLAIN PASSWORD:", password);
    console.log("HASHED PASSWORD:", user.password);

    const isMatch = await bcrypt.compare(password,user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: "failed credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    console.log("✅ LOGIN SUCCESS");

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};
export default { register, login };