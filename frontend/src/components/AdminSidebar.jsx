import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>SmartCampus</h2>
        <span>Admin Panel</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/admin" end>
          Dashboard
        </NavLink>

        <NavLink to="/admin/users">
          Users
        </NavLink>
        <NavLink to="/admin/reports">
          Reports
        </NavLink>

        <NavLink to="/admin/settings">
          Settings
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
