import express from "express"
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
} from "../controllers/complaintController.js"

const router = express.Router()

// Student submits complaint
router.post("/", createComplaint)

// Student sees their complaints
router.get("/my", getMyComplaints)

// Admin sees all complaints
router.get("/", getAllComplaints)

// Admin updates status
router.put("/:id", updateComplaintStatus)

export default router