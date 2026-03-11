import { NavLink, useNavigate } from "react-router-dom"

export default function AdminSidebar(){

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/login")
  }

  return(

    <div className="sidebar">

      <h2>Admin Panel</h2>

      <nav>
       
        <NavLink to="/admin">Dashboard</NavLink>

        <NavLink to="/admin/users">Users</NavLink>

        <NavLink to="/admin/complaints">Complaints</NavLink>
        
        <button onClick={logout}>
          Logout
        </button>

      </nav>

    </div>

  )

}

