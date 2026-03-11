import React, { useEffect, useState } from "react";
import API from "../API/axios";
import "../Styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ students: 0, teachers: 0, reports: 0 });

  useEffect(() => {
    const fetchStats = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await API.get("/users/stats", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStats(data);
  } catch (err) {
    console.error("Failed to fetch stats. Is the route defined in the backend?", err.message);
  }
};
    fetchStats();
  }, []);

  return (
    <div className="admin-layout">
      
      <main className="admin-content">
        <h1>Admin Dashboard</h1>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Students</h3>
            <p>{stats.students?.toString().padStart(2, '0') || "00"}</p>
          </div>
          <div className="stat-card">
            <h3>Total Teachers</h3>
            <p>{stats.teachers?.toString().padStart(2, '0') || "00"}</p>
          </div>
          <div className="stat-card">
            <h3>Total Reports</h3>
            <p>{stats.reports?.toString().padStart(2, '0') || "00"}</p>
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