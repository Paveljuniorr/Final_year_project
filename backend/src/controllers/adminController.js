import User from "../models/User.js";
import Complaint from "../models/Complaint.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalComplaints = await Complaint.countDocuments(); 
    const pendingComplaints = await Complaint.countDocuments({ status: "Pending" });

    res.json({ totalUsers, totalComplaints, pendingComplaints });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};