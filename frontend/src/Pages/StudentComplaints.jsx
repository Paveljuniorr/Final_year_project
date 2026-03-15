import React, { useEffect, useState } from "react";
import API from "../API/axios";
import "../Styles/StudentDashboard.css"; 

const StudentComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/complaints/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filtered = complaints
    .filter((c) => {
      const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filter === "all" || c.status === filter;
      return matchesSearch && matchesStatus;
    });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-bold">My Complaints</h2>
        
        <div className="flex gap-2">
          <input
            className="border p-2 rounded"
            placeholder="Search complaint..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); 
            }}
          />

          <select 
            className="border p-2 rounded"
            onChange={(e) => {
                setFilter(e.target.value);
                setPage(1); 
            }}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3">Title</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length > 0 ? (
            paginated.map((c) => (
              <tr key={c._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{c.title}</td>
                <td className="p-3">
                  <span className={`badge ${c.status}`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No complaints found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {filtered.length > itemsPerPage && (
        <div className="pagination mt-4 flex justify-center items-center gap-4">
          <button 
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage(page - 1)} 
            disabled={page === 1}
          >
            Prev
          </button>
          
          <span className="font-medium">
            Page {page} of {totalPages || 1}
          </span>

          <button 
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentComplaints;