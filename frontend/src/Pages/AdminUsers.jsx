import {useEffect,useState} from "react"
import API from "../API/axios"

export default function AdminUsers(){

const [users,setUsers] = useState([])

useEffect(()=>{
fetchUsers()
},[])

const fetchUsers = async()=>{

const token = localStorage.getItem("token")

const res = await API.get("/users",{
headers:{Authorization:`Bearer ${token}`}
})

setUsers(res.data)

}

const deleteUser = async(id)=>{

const token = localStorage.getItem("token")

await API.delete(`/users/${id}`,{
headers:{Authorization:`Bearer ${token}`}
})

fetchUsers()

}

return(

<div className="card">

<h2>Users</h2>

<table>

<thead>

<tr>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{users.map(u=>(

<tr key={u._id}>

<td>{u.name}</td>

<td>{u.email}</td>

<td>{u.role}</td>

<td>

<button
onClick={()=>deleteUser(u._id)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}