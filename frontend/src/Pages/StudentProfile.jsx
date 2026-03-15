import React, { useState, useEffect } from "react";
import API from "../API/axios";
import "../Styles/StudentDashboard.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.error("Profile Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="loading-state">Loading your profile...</div>;
  if (!profile) return <div className="empty-state">User profile not found.</div>;

  return (
    <div className="profile-page-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="profile-name">{profile.name}</h2>
          <span className="profile-role-badge">{profile.role}</span>
        </div>

        <div className="profile-details-grid">
          <div className="detail-group">
            <label>Full Name</label>
            <p>{profile.name}</p>
          </div>
          
          <div className="detail-group">
            <label>Email Address</label>
            <p>{profile.email}</p>
          </div>

          <div className="detail-group">
            <label>Account Status</label>
            <p className="status-active">Verified Student</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;