import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import StudentLayout from "./layouts/StudentLayout";
import HomePage from "./Pages/HomePage";
import StudentDashboard from "./Pages/StudentDashboard";
import StudentProfile from "./Pages/StudentProfile";
import AddComplaint from "./Pages/AddComplaint";
import StudentComplaints from "./Pages/StudentComplaints";

import TeacherDashboard from "./Pages/TeacherDashboard";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminUsers from "./Pages/Admin/AdminUsers";
import AdminComplaints from "./Pages/AdminComplaints";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />

     
      <Route
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/add-complaint" element={<AddComplaint />} />
        <Route path="/student/complaints" element={<StudentComplaints />} />
      </Route>

     
      <Route
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <div style={{ display: "flex" }}>
              <Sidebar role="teacher" />
              <div style={{ flex: 1, padding: "20px" }}>
                <Outlet />
              </div>
            </div>
          </ProtectedRoute>
        }
      >
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Route>

    
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <div style={{ display: "flex" }}>
              <Sidebar role="admin" />
              <div style={{ flex: 1, padding: "20px" }}>
                <Outlet />
              </div>
            </div>
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
export default App;