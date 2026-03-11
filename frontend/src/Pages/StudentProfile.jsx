import { useEffect, useState } from "react";
import axios from "axios";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:7000/api/student/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudent(res.data);
    };

    fetchProfile();
  }, []);

  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h1>My Profile</h1>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Department:</strong> {student.department}</p>
      <p><strong>Role:</strong> {student.role}</p>
    </div>
  );
};

export default StudentProfile;