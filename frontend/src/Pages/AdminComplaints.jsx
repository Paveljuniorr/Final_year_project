import { useEffect, useState } from "react"
import API from "../API/axios"

export default function AdminComplaints(){

const [complaints,setComplaints] = useState([])

useEffect(()=>{

  const fetchComplaints = async ()=>{

    try{

      const token = localStorage.getItem("token")

      const res = await API.get("/complaints",{
        headers:{ Authorization:`Bearer ${token}` }
      })

      setComplaints(res.data)

    }catch(err){
      console.error(err)
    }

  }

  fetchComplaints()

},[])


const updateStatus = async(id,status)=>{

  const token = localStorage.getItem("token")

  await API.put(`/complaints/${id}`,
    {status},
    {headers:{Authorization:`Bearer ${token}`}}
  )

  // refresh complaints
  const res = await API.get("/complaints",{
    headers:{Authorization:`Bearer ${token}`}
  })

  setComplaints(res.data)

}


return(

<div className="card">

<h2>All Complaints</h2>

<table>

<thead>
<tr>
<th>Student</th>
<th>Title</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{complaints.map(c => (

<tr key={c._id}>

<td>{c.student?.name}</td>
<td>{c.title}</td>
<td>{c.status}</td>

<td>

<button onClick={()=>updateStatus(c._id,"resolved")}>
Resolve
</button>

<button onClick={()=>updateStatus(c._id,"rejected")}>
Reject
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}