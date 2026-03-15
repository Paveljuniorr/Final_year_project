import express from "express"
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  getTeachersList,
  updateComplaintStatus
} from "../controllers/ComplaintController.js" 
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()


router.post("/", protect, createComplaint)
router.get("/my", protect, getMyComplaints)
router.get("/", protect, getAllComplaints)
router.put("/:id", protect, updateComplaintStatus)
router.get("/teachers", protect, getTeachersList);
export default router