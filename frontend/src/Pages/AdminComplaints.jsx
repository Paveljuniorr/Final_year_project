import { useEffect, useState, useCallback } from "react";
import API from "../API/axios";
import ComplaintModal from "../components/ComplaintModal";
import "../Styles/AdminDashboard.css";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await API.get("/complaints", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(res.data);
    } catch (err) { 
      console.error("Failed to fetch complaints:", err.message); 
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { 
    fetchComplaints(); 
  }, [fetchComplaints]); 

  const updateStatus = async (id, status, feedback) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(`/complaints/${id}`, 
        { status, adminFeedback: feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status, adminFeedback: feedback } : c))
      );
      
      setSelectedComplaint(null);
    } catch (err) { 
      console.error("Update error:", err.message);
      alert("Failed to update status"); 
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>All Student Complaints</h2>
        {loading && <span className="loader">Refreshing...</span>}
      </div>

      <table className="complaint-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length === 0 && !loading ? (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No complaints found.</td></tr>
          ) : (
            complaints.map(c => (
              <tr key={c._id}>
                <td>{c.student?.name || "Unknown"}</td>
                <td>{c.title}</td>
                <td>
                  <span className={`status-badge ${c.status.toLowerCase()}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="view-btn" 
                    onClick={() => setSelectedComplaint(c)}
                  >
                    View & Action
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedComplaint && (
        <ComplaintModal 
          complaint={selectedComplaint} 
          isAdmin={true} 
          onClose={() => setSelectedComplaint(null)} 
          onUpdateStatus={updateStatus} 
        />
      )}
    </div>
  );
}