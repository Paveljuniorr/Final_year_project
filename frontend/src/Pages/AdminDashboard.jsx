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
        console.error("Failed to fetch stats:", err.message);
      }
    };
    fetchStats();
  }, []);

  return (
    
    <div className="admin-main-section">
      <div className="admin-top-bar">
        <h1 className="main-title">Admin Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="label">Total Students</p>
          <p className="value">{stats.students?.toString().padStart(2, '0') || "00"}</p>
        </div>

        <div className="stat-card">
          <p className="label">Total Teachers</p>
          <p className="value">{stats.teachers?.toString().padStart(2, '0') || "00"}</p>
        </div>

        <div className="stat-card">
          <p className="label">Total Reports</p>
          <p className="value">{stats.reports?.toString().padStart(2, '0') || "00"}</p>
        </div>

        <div className="stat-card">
          <p className="label">System Status</p>
          <p className="value" style={{ color: '#10b981' }}>Online</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;