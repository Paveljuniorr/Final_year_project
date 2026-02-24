import AdminSidebar from "../components/AdminSidebar";
import "../Styles/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <h1>Admin Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Students</h3>
            <p>00</p>
          </div>

          <div className="stat-card">
            <h3>Total Teachers</h3>
            <p>00</p>
          </div>

          <div className="stat-card">
            <h3>Total Reports</h3>
            <p>00</p>
          </div>

          <div className="stat-card">
            <h3>System Status</h3>
            <p className="ok">Online</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
