import { NavLink, useNavigate } from "react-router-dom";

const StudentNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="student-navbar">
      <h2>Student Panel</h2>

      <nav>
        <NavLink to="/student">Dashboard</NavLink>
        <NavLink to="/student/add-complaint">Add Complaint</NavLink>
        <NavLink to="/student/profile">Profile</NavLink>
      </nav>

      <button onClick={logout}>Logout</button>
    </header>
  );
};

export default StudentNavbar;