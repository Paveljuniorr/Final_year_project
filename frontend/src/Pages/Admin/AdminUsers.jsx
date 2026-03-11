import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import CreateUser from "./CreateUser";
import API from "../../API/axios"; // Ensure this matches your path

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- ADD THESE FUNCTIONS HERE ---

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await API.delete(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers(); // Refresh the list after deletion
      } catch (err) {
        alert(err.response?.data?.message || "Delete failed");
      }
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(`/users/${id}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); // Refresh the list after update
    } catch (err) {
      alert("Role update failed");
    }
  };

  // --- END OF NEW FUNCTIONS ---

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {showCreateForm ? "Close Form" : "+ Create New User"}
          </button>
        </div>

        {showCreateForm && (
          <div className="mb-8 bg-gray-50 p-4 rounded-lg border">
            <CreateUser onSuccess={() => { setShowCreateForm(false); fetchUsers(); }} />
          </div>
        )}

        <table className="w-full text-left bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-t">
                <td className="p-4">{user.name}</td>
                <td className="p-4">
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => handleDelete(user._id)} 
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminUsers;