import { useEffect, useState } from "react"
import API from "../API/axios"
import TeacherSidebar from "../components/TeacherSidebar"

export default function TeacherDashboard(){

const [complaints,setComplaints] = useState([])

useEffect(()=>{

  const fetchComplaints = async ()=>{

    try{

      const token = localStorage.getItem("token")

      const res = await API.get("/complaints",{
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

<div className="dashboard-layout">

<TeacherSidebar/>

<div className="dashboard-content">

<h2>Teacher Complaints</h2>

<table>

<thead>
<tr>
<th>Student</th>
<th>Title</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{complaints.map(c => (

<tr key={c._id}>
<td>{c.student?.name}</td>
<td>{c.title}</td>
<td>{c.status}</td>
</tr>

))}

</tbody>

</table>

</div>

</div>

)

}