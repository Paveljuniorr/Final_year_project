import { NavLink, useNavigate } from "react-router-dom"

export default function StudentSidebar(){

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/login")
  }

  return(

    <div className="sidebar">

      <h2>Student Panel</h2>

      <nav>

        <NavLink to="/student">
          Dashboard
        </NavLink>

        <NavLink to="/student/add-complaint">
          Add Complaint
        </NavLink>

        <NavLink to="/student/complaints">
          My Complaints
        </NavLink>
         <NavLink to="/student/profile">View Profile</NavLink>
        <button onClick={logout}>
          Logout
        </button>

      </nav>

    </div>

  )
}

    
