import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { 
  getAllUsers, 
  adminCreateUser, 
  updateUserRole, 
  deleteUser 
} from '../controllers/UserController.js';
import { getStats } from "../controllers/UserController.js";
import { admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/create-user", protect, isAdmin, adminCreateUser);
router.get("/", protect, isAdmin, getAllUsers);
router.get("/stats", protect, isAdmin, getStats);

router.put("/:id/role", protect, isAdmin, updateUserRole);

router.delete("/:id", protect, isAdmin, deleteUser);

router.post("/create", async (req, res) => {
    try {
        const hashed = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashed,
            role: req.body.role
        });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export const getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("name _id department");
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching teachers" });
  }
};

router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});

router.get("/stats", protect, admin, getStats);

export default router;