import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/create-admin", async (req, res) => {
  const { secret, name, email, password } = req.body;

  if (secret !== process.env.ADMIN_SETUP_SECRET) {
    return res.status(403).json({ message: "Unauthorized setup attempt" });
  }

  const adminExists = await User.findOne({ role: "admin" });
  if (adminExists) {
    return res.status(403).json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin"
  });

  res.status(201).json({
    message: "Admin created successfully",
    adminId: admin._id
  });
});

export default router;
