import Complaint from "../models/Complaint.js"

//
// STUDENT - CREATE COMPLAINT
//
export const createComplaint = async (req, res) => {

  try {

    const { title, description } = req.body

    const complaint = new Complaint({
      title,
      description,
      student: req.user.id,
      status: "pending"
    })

    await complaint.save()

    res.json({
      message: "Complaint submitted",
      complaint
    })

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

//
// STUDENT - GET THEIR COMPLAINTS
//
export const getMyComplaints = async (req, res) => {

  try {

    const complaints = await Complaint.find({
      student: req.user.id
    }).sort({ createdAt: -1 })

    res.json(complaints)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

//
// ADMIN - GET ALL COMPLAINTS
//
export const getAllComplaints = async (req, res) => {

  try {

    const complaints = await Complaint
      .find()
      .populate("student", "name email")
      .sort({ createdAt: -1 })

    res.json(complaints)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

//
// ADMIN - UPDATE COMPLAINT STATUS
//
export const updateComplaintStatus = async (req, res) => {

  try {

    const { status } = req.body

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    res.json(complaint)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}