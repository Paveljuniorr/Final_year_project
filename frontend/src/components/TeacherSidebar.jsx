import {NavLink} from "react-router-dom";

export default function TeacherSidebar(){

return(

<div className="sidebar">

<h2>Teacher Panel</h2>

<nav>

<NavLink to="/teacher">Dashboard</NavLink>

<NavLink to="/teacher/complaints">Complaints</NavLink>

</nav>

</div>

)

}