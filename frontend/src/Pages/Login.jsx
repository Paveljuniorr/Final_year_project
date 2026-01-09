import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/axios";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
    roleCode: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
        role: form.role,
        roleCode: form.role !== "student" ? form.roleCode : undefined,
      });

      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "student") navigate("/student");
      if (role === "teacher") navigate("/teacher");
      if (role === "admin") navigate("/admin");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Smart Campus Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

        {form.role !== "student" && (
          <input
            type="text"
            name="roleCode"
            placeholder="Enter Role Code"
            required
            onChange={handleChange}
          />
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
