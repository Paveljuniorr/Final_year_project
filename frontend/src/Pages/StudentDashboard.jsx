import { useState } from "react";
import "../Styles/StudentDashboard.css";

const StudentDashboard = () => {
  const [filterStatus, setFilterStatus] = useState("all");

  const complaints = [
    { id: 1, title: "Library Issue", status: "pending", date: "Mar 10" },
    { id: 2, title: "Hostel Water Problem", status: "resolved", date: "Mar 5" },
    { id: 3, title: "Cafeteria Hygiene", status: "rejected", date: "Mar 1" },
  ];

  const filteredComplaints =
    filterStatus === "all"
      ? complaints
      : complaints.filter((c) => c.status === filterStatus);

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
    rejected: complaints.filter((c) => c.status === "rejected").length,
  };
  const StudentDashboard = () => {
  return (
    <div>
      <h1>Welcome Student</h1>
      <p>This is your dashboard overview.</p>
    </div>
  );
};

  return (
    <div className="student-dashboard">
      <h1>🎓 Student Dashboard</h1>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Complaints</h3>
          <p>{stats.total}</p>
        </div>

        <div className="stat-card pending">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>

        <div className="stat-card resolved">
          <h3>Resolved</h3>
          <p>{stats.resolved}</p>
        </div>

        <div className="stat-card rejected">
          <h3>Rejected</h3>
          <p>{stats.rejected}</p>
        </div>
      </div>

      {/* Filter + List */}
      <div className="complaints-card">
        <div className="complaints-header">
          <h2>My Complaints</h2>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.title}</td>
                <td className={complaint.status}>
                  {complaint.status}
                </td>
                <td>{complaint.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;

 

