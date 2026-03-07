import { Routes, Route } from "react-router-dom"

import Login from "./Pages/Login"

import StudentLayout from "./layouts/StudentLayout"

import StudentDashboard from "./Pages/StudentDashboard"
import StudentProfile from "./Pages/StudentProfile"
import AddComplaint from "./Pages/AddComplaint"
import StudentComplaints from "./Pages/StudentComplaints"

import TeacherDashboard from "./Pages/TeacherDashboard"

import AdminDashboard from "./Pages/AdminDashboard"
import AdminUsers from "./Pages/AdminUsers"

import ProtectedRoute from "./components/ProtectedRoute"

function App() {

return (

<Routes>

<Route path="/" element={<Login />} />
<Route path="/login" element={<Login />} />

{/* STUDENT ROUTES */}

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


{/* TEACHER ROUTE */}

<Route
path="/teacher"
element={
<ProtectedRoute allowedRoles={["teacher"]}>
<TeacherDashboard />
</ProtectedRoute>
}
/>


{/* ADMIN ROUTES */}

<Route
path="/admin"
element={
<ProtectedRoute allowedRoles={["admin"]}>
<AdminDashboard />
</ProtectedRoute>
}
/>

<Route
path="/admin/users"
element={
<ProtectedRoute allowedRoles={["admin"]}>
<AdminUsers />
</ProtectedRoute>
}
/>

</Routes>

)

}

export default App