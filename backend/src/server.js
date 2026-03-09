import 'dotenv/config';
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import complaintRoutes from "./routes/ComplaintRoutes.js"


const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/complaints", complaintRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/smart-campus")

app.listen(7000, () => {
  console.log("Server running on port 7000")
})