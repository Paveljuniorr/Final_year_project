import { useEffect, useState } from "react"
import API from "../API/axios"

export default function StudentDashboard(){

const [complaints,setComplaints] = useState([])

useEffect(()=>{

  const fetchComplaints = async ()=>{

    try{

      const token = localStorage.getItem("token")

      const res = await API.get("/complaints/my",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      setComplaints(res.data)

    }catch(err){
      console.error(err)
    }

  }

  fetchComplaints()

},[])


return(

<div>

<h2>My Complaints</h2>

<ul>

{complaints.map(c => (

<li key={c._id}>
{c.title} - {c.status}
</li>

))}

</ul>

</div>

)

}