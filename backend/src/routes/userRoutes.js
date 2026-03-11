import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { 
  getAllUsers, 
  getAdminStats, 
  adminCreateUser, 
  updateUserRole, 
  deleteUser 
} from '../controllers/UserController.js';

const router = express.Router();

// --- ADMIN ROUTES (Protected) ---


router.get("/", protect, isAdmin, getAllUsers);
router.get("/stats", protect, isAdmin, getAdminStats);

router.post("/admin/create-user", protect, isAdmin, adminCreateUser);

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

export default router;