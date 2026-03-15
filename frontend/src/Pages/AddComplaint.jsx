import React, { useState, useEffect } from "react";
import API from "../API/axios";
import "../Styles/StudentDashboard.css";

const AddComplaint = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Academic",
    recipientRole: "admin",
    assignedTeacher: ""
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/complaints/teachers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeachers(res.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/complaints", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Complaint successfully sent to ${formData.recipientRole}`);
      setFormData({ title: "", description: "", category: "Academic", recipientRole: "admin", assignedTeacher: "" });
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed.");
    }
  };

  return (
    <div className="add-complaint-container">
      <div className="form-card">
        <h2 className="title-dark">Submit a New Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              className="input-field"
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Send To:</label>
            <select 
              className="input-field"
              value={formData.recipientRole}
              onChange={(e) => setFormData({...formData, recipientRole: e.target.value, assignedTeacher: ""})}
            >
              <option value="admin">Administrator</option>
              <option value="teacher">Specific Teacher</option>
            </select>
          </div>

          {formData.recipientRole === "teacher" && (
            <div className="form-group">
              <label>Select Teacher:</label>
              <select 
                className="input-field"
                required
                value={formData.assignedTeacher}
                onChange={(e) => setFormData({...formData, assignedTeacher: e.target.value})}
              >
                <option value="">-- Choose a Teacher --</option>
                {teachers.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name} ({t.department || "Staff"})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Description</label>
            <textarea 
              className="input-field"
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Submit Complaint</button>
        </form>
      </div>
    </div>
  );
};

export default AddComplaint;