import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, default: "pending" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
 
  adminFeedback: { type: String, default: "" }, 
}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);