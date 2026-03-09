import { useState } from "react"
import API from "../API/axios"

export default function AddComplaint(){

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")

 const submitComplaint = async () => {
  try {

    const token = localStorage.getItem("token")

    await API.post(
      "/complaints",
      {
        title,
        description
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )

    alert("Complaint submitted successfully")

    setTitle("")
    setDescription("")

  } catch(error){
    console.error(error)
    alert("Error submitting complaint")
  }
}
  return(

    <div className="dashboard-content">

      <div className="card">

        <h2>Add Complaint</h2>

        <input
          placeholder="Complaint Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          placeholder="Describe your issue"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        ></textarea>

        <button className="primary" onClick={submitComplaint}>
          Submit Complaint
        </button>

      </div>

    </div>

  )
}