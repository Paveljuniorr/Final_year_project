import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, recipientRole, assignedTeacher } = req.body;

    const newComplaint = new Complaint({
      student: req.user.id,
      title,
      description,
      category,
      recipientRole: recipientRole || "admin",
     
      assignedTeacher: recipientRole === "teacher" ? assignedTeacher : null,
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully!", complaint: newComplaint });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "admin") {
     
      query = { recipientRole: "admin" };
    } else if (req.user.role === "teacher") {
     
      query = { assignedTeacher: req.user.id };
    }

    const complaints = await Complaint.find(query)
      .populate("student", "name email department")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.user.id })
      .populate("assignedTeacher", "name") 
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status, adminFeedback } = req.body;
    
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, adminFeedback },
      { new: true } 
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(updatedComplaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getTeachersList = async (req, res) => {
  try {
    
    const teachers = await User.find({ role: "teacher" }).select("name _id department");
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching teachers" });
  }
};