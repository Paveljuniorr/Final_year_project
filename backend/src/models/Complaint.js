import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  
  
  recipientRole: {
    type: String,
    enum: ["admin", "teacher"],
    default: "admin",
    required: true
  },

  assignedTeacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    default: null 
  },

  status: {
    type: String,
    enum: ["pending", "resolved", "rejected"],
    default: "pending"
  },

  adminFeedback: { 
    type: String, 
    default: "" 
  }
}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);