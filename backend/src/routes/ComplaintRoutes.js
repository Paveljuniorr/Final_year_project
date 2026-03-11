import express from "express"
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
} from "../controllers/ComplaintController.js" // Note: fixed the capitalization here too!
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// Apply 'protect' so req.user is populated!
router.post("/", protect, createComplaint)
router.get("/my", protect, getMyComplaints)
router.get("/", protect, getAllComplaints)
router.put("/:id", protect, updateComplaintStatus)

export default router