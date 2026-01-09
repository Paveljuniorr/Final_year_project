
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
  roleCode: String
}, { timestamps: true });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.matchPassword = async function(pw){
  return bcrypt.compare(pw, this.password);
};

export default mongoose.model("User", userSchema);
