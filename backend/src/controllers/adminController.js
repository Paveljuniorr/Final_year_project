
import RoleCode from "../models/RoleCode.js";
import crypto from "crypto";

export const generateCode = async (req, res) => {
  const { role } = req.body;
  const code = crypto.randomBytes(4).toString("hex");
  await RoleCode.create({ role, code });
  res.json({ role, code });
};
