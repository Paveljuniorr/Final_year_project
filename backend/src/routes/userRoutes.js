const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")

// GET ALL USERS
router.get("/",async(req,res)=>{

  const users = await User.find()

  res.json(users)

})


// CREATE USER
router.post("/create",async(req,res)=>{

  const hashed = await bcrypt.hash(req.body.password,10)

  const user = await User.create({

    name:req.body.name,
    email:req.body.email,
    password:hashed,
    role:req.body.role

  })

  res.json(user)

})


// DELETE USER
router.delete("/:id",async(req,res)=>{

  await User.findByIdAndDelete(req.params.id)

  res.json({message:"User deleted"})

})

module.exports = router