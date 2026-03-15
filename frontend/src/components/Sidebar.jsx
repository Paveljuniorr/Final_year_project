import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Users, LogOut, ShieldCheck } from "lucide-react";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-top-content">
        <div className="sidebar-header-top">
          <h2>CAMPUS PORTAL</h2>
        </div>

        <nav className="sidebar-links-group">
          {role === "teacher" && (
            <NavLink to="/teacher" className={({ isActive }) => isActive ? "sidebar-link-item active" : "sidebar-link-item"}>
              <ClipboardList size={20} />
              <span>All Complaints</span>
            </NavLink>
          )}

          {role === "admin" && (
            <>
              <NavLink to="/admin" end className={({ isActive }) => isActive ? "sidebar-link-item active" : "sidebar-link-item"}>
                <LayoutDashboard size={20} />
                <span>Overview</span>
              </NavLink>
              
              <NavLink to="/admin/complaints" className={({ isActive }) => isActive ? "sidebar-link-item active" : "sidebar-link-item"}>
                <ShieldCheck size={20} />
                <span>Complaints</span>
              </NavLink>
              
              <NavLink to="/admin/users" className={({ isActive }) => isActive ? "sidebar-link-item active" : "sidebar-link-item"}>
                <Users size={20} />
                <span>Users</span>
              </NavLink>
            </>
          )}
        </nav>
      </div>
      <button onClick={handleLogout} className="sidebar-logout-btn">
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;