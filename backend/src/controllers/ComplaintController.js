import Complaint from "../models/Complaint.js";


export const createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newComplaint = new Complaint({
      title,
      description,
      category,
      student: req.user.id, 
    });

    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAllComplaints = async (req, res) => {
  try {
    
    const complaints = await Complaint.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.user.id })
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