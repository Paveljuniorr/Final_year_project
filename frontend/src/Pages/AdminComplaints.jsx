import { useEffect,useState } from "react"
import API from "../API/axios"

export default function AdminComplaints(){

const [complaints,setComplaints] = useState([])

useEffect(()=>{
fetchComplaints()
},[])

const fetchComplaints = async()=>{

const token = localStorage.getItem("token")

const res = await API.get("/complaints/admin",{
headers:{Authorization:`Bearer ${token}`}
})

setComplaints(res.data)

}

const updateStatus = async(id,status)=>{

const token = localStorage.getItem("token")

await API.put(`/complaints/${id}/status`,
{status},
{headers:{Authorization:`Bearer ${token}`}}
)

fetchComplaints()

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

{complaints.map(c=>(

<tr key={c._id}>

<td>{c.student?.name}</td>

<td>{c.title}</td>

<td>
<span className={`badge ${c.status}`}>
{c.status}
</span>
</td>

<td>

<button
onClick={()=>updateStatus(c._id,"resolved")}
>
Resolve
</button>

<button
onClick={()=>updateStatus(c._id,"rejected")}
>
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