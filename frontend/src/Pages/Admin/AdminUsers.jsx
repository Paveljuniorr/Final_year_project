import React, { useState, useEffect, useCallback } from "react";
import API from "../../API/axios";
import "../../Styles/AdminDashboard.css"; 

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUserData, setNewUserData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    role: "student",
    department: "General" 
  });

  const loadData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]); 

const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      
      
      await API.post("/users/admin/create-user", newUserData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("User Created Successfully!");
      setShowCreateForm(false);
      setNewUserData({ name: "", email: "", password: "", role: "student" });
      loadData(); 
    } catch (error) {
      console.error("Creation failed:", error.response?.data || error.message);
      alert("Creation failed. Please check the console.");
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await API.delete(`/users/${id}`, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        loadData();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="admin-main-section">
      <div className="admin-top-bar">
        <h1 className="main-title">User Management</h1>
        <button className="add-user-btn" onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? "Cancel" : "+ New User"}
        </button>
      </div>

      {showCreateForm && (
        <div className="form-container-box">
          <form onSubmit={handleCreateUser} className="inline-create-form">
            <input 
              type="text" 
              placeholder="Full Name" 
              required 
              value={newUserData.name}
              onChange={(e) => setNewUserData({...newUserData, name: e.target.value})} 
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              value={newUserData.email}
              onChange={(e) => setNewUserData({...newUserData, email: e.target.value})} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={newUserData.password}
              onChange={(e) => setNewUserData({...newUserData, password: e.target.value})} 
            />
            <select 
              value={newUserData.role}
              onChange={(e) => setNewUserData({...newUserData, role: e.target.value})}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="submit-btn">Save User</button>
          </form>
        </div>
      )}

      <div className="table-overflow-container">
        <table className="custom-admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="force-visible">{user.name}</td>
                <td className="force-visible">{user.email}</td>
                <td className="force-visible" style={{ textTransform: 'capitalize' }}>{user.role}</td>
                <td>
                  <button className="row-delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;