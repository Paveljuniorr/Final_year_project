import { useEffect,useState } from "react"
import API from "../API/axios"

export default function StudentComplaints(){

const [complaints,setComplaints] = useState([])
const [search,setSearch] = useState("")
const [filter,setFilter] = useState("all")
const [page,setPage] = useState(1)

const itemsPerPage = 5

useEffect(()=>{
fetchComplaints()
},[])

const fetchComplaints = async()=>{

const token = localStorage.getItem("token")

const res = await API.get("/complaints/student",{
headers:{Authorization:`Bearer ${token}`}
})

setComplaints(res.data)

}

const filtered = complaints
.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
.filter(c => filter==="all" ? true : c.status===filter)

const paginated = filtered.slice(
(page-1)*itemsPerPage,
page*itemsPerPage
)

return(

<div className="card">

<h2>My Complaints</h2>

<input
placeholder="Search complaint..."
onChange={(e)=>setSearch(e.target.value)}
/>

<select onChange={(e)=>setFilter(e.target.value)}>

<option value="all">All</option>
<option value="pending">Pending</option>
<option value="resolved">Resolved</option>
<option value="rejected">Rejected</option>

</select>

<table>

<thead>

<tr>
<th>Title</th>
<th>Status</th>
<th>Date</th>
</tr>

</thead>

<tbody>

{paginated.map(c=>(

<tr key={c._id}>

<td>{c.title}</td>

<td>
<span className={`badge ${c.status}`}>
{c.status}
</span>
</td>

<td>{new Date(c.createdAt).toLocaleDateString()}</td>

</tr>

))}

</tbody>

</table>

<div className="pagination">

<button onClick={()=>setPage(page-1)} disabled={page===1}>
Prev
</button>

<button onClick={()=>setPage(page+1)}>
Next
</button>

</div>

</div>

)

}