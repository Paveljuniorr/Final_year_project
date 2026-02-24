import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import StudentDashboard from "./Pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentNavbar from "./components/StudentNavbar";
import StudentProfile from "./Pages/StudentProfile";
import AddComplaint from "./Pages/AddComplaint";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route
        element={< StudentLayout /> } > 
         <Route path="/student" element={ "StudentDashboard" } />
          <Route path="/student/add-complaint" element={ "AddComplaint" } />
          <Route path="/student/profile" element={ "StudentProfile" } />
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        </Route>
      

      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
          
        }
      />
    
         

    </Routes>
  );
}

export default App;
