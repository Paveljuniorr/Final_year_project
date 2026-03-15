import AdminSidebar from "../components/AdminSidebar";
import AdminDashboard from "../Pages/AdminDashboard";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-main">
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
