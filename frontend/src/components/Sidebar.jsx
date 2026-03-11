import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar" style={{ width: "250px", height: "100vh", background: "#1e293b", color: "white" }}>
      <h2 style={{ padding: "20px" }}>Campus Portal</h2>
      <ul style={{ listStyle: "none", padding: "20px" }}>
        {role === "student" && (
          <>
            <li><Link to="/student" style={{ color: "white" }}>Dashboard</Link></li>
            <li><Link to="/student/add-complaint" style={{ color: "white" }}>New Complaint</Link></li>
          </>
        )}
        
        {role === "teacher" && (
          <>
            <li><Link to="/teacher" style={{ color: "white" }}>All Complaints</Link></li>
          </>
        )}

        {role === "admin" && (
          <>
            <li><Link to="/admin" style={{ color: "white" }}>Overview</Link></li>
            <li><Link to="/admin/complaints" style={{ color: "white" }}>Manage Complaints</Link></li>
            <li><Link to="/admin/users" style={{ color: "white" }}>Users</Link></li>
          </>
        )}
      </ul>
      <button onClick={handleLogout} style={{ margin: "20px", padding: "10px" }}>Logout</button>
    </div>
  );
};
export default Sidebar;