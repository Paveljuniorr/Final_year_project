import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Any logged-in user
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// Only admin
router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin 👑" });
  }
);

// Teacher or admin
router.get(
  "/staff",
  protect,
  authorizeRoles("teacher", "admin"),
  (req, res) => {
    res.json({ message: "Welcome Staff 👨‍🏫" });
  }
);

export default router;
