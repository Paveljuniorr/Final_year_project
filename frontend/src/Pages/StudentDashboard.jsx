import React, { useEffect, useState } from "react";
import API from "../API/axios";
import ComplaintModal from "../components/ComplaintModal"; 
import "../Styles/StudentDashboard.css";

const StudentDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await API.get("/complaints/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <h1>My Complaints</h1>
        <p className="subtitle">Track the status and view feedback for your submitted issues.</p>
      </header>
      
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your complaints...</p>
        </div>
      ) : complaints.length === 0 ? (
        <div className="empty-state">
          <p>You haven't submitted any complaints yet.</p>
        </div>
      ) : (
        <div className="complaint-grid">
          {complaints.map((c) => (
            <div 
              key={c._id} 
              className="complaint-card" 
              onClick={() => setSelectedComplaint(c)}
            >
              <div className="card-header">
                <h3 className="complaint-title">{c.title}</h3>
                <span className={`status-badge ${c.status.toLowerCase()}`}>
                  {c.status}
                </span>
              </div>
              
              <div className="card-body">
                <p className="category-info">
                  <strong>Category:</strong> {c.category}
                </p>
                <p className="description-preview">
                  {c.description?.length > 120 
                    ? `${c.description.substring(0, 120)}...` 
                    : c.description}
                </p>
              </div>

              <div className="card-footer">
                <button className="details-btn">View Details & Feedback</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedComplaint && (
        <ComplaintModal 
          complaint={selectedComplaint} 
          isAdmin={false} 
          onClose={() => setSelectedComplaint(null)} 
        />
      )}
    </div>
  );
};

export default StudentDashboard;