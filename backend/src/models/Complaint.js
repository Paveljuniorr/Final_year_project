import mongoose from "mongoose"

const complaintSchema = new mongoose.Schema({

  title:{
    type:String,
    required:true
  },

  description:{
    type:String,
    required:true
  },

  student:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  status:{
    type:String,
    enum:["pending","resolved","rejected"],
    default:"pending"
  }

},{timestamps:true})

const Complaint = mongoose.model("Complaint",complaintSchema)

export default Complaint