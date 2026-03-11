import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API/axios";

const AddComplaint = () => {
  const [formData, setFormData] = useState({ title: "", description: "", category: "General" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You must be logged in to submit a complaint.");
        return;
      }

      await API.post("/complaints", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Complaint submitted successfully!");
      // Redirect to dashboard so the student can see their new complaint
      setTimeout(() => navigate("/student/dashboard"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div className="add-complaint-container">
      <h2>Submit a Complaint</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <select name="category" onChange={handleChange}>
          <option value="General">General</option>
          <option value="Hostel">Hostel</option>
          <option value="Academic">Academic</option>
          <option value="Facilities">Facilities</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddComplaint;