import { useEffect, useState } from "react"
import API from "../API/axios"

export default function StudentDashboard(){

  const [complaints,setComplaints] = useState([])

  useEffect(()=>{

    const fetchComplaints = async ()=>{

      try{

        const token = localStorage.getItem("token")

        const res = await API.get("/complaints/student",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })

        setComplaints(res.data)

      }catch(err){
        console.log(err)
      }

    }

    fetchComplaints()

  },[])

  const total = complaints.length
  const pending = complaints.filter(c=>c.status==="pending").length
  const resolved = complaints.filter(c=>c.status==="resolved").length

  return(

    <div className="dashboard-content">

      <h1>Student Dashboard</h1>

      <div className="stats">

        <div className="card">
          <h3>Total Complaints</h3>
          <p>{total}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>

        <div className="card">
          <h3>Resolved</h3>
          <p>{resolved}</p>
        </div>

      </div>

    </div>

  )
}