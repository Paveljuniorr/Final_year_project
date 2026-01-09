
import express from "express";
import { generateCode } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/generate-code", protect, generateCode);
export default router;
