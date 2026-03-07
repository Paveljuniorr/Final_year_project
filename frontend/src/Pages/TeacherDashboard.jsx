import {useEffect,useState} from "react";
import API from "../API/axios";

export default function TeacherDashboard(){

const [complaints,setComplaints] = useState([]);

useEffect(()=>{

fetchComplaints();

},[]);

const fetchComplaints = async()=>{

const token = localStorage.getItem("token");

const res = await API.get(
"/complaints/all",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setComplaints(res.data);

};

return(

<div>

<h2>Student Complaints</h2>

{complaints.map(c=>(
<div key={c._id}>

<h3>{c.title}</h3>

<p>{c.description}</p>

<p>Status: {c.status}</p>

<p>Student: {c.student?.name}</p>

</div>
))}

</div>

)

}