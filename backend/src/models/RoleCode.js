
import mongoose from "mongoose";

const roleCodeSchema = new mongoose.Schema({
  role: { type: String, enum: ["teacher", "admin"] },
  code: String,
  used: { type: Boolean, default: false }
});

export default mongoose.model("RoleCode", roleCodeSchema);
