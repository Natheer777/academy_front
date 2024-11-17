import './Student_Card.css'
import { useState , useEffect } from 'react';
import axios from 'axios';
export default function Student_Card() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // جلب البيانات من API
    axios
      .get("https://academy-backend-pq91.onrender.com/allusers")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students data:", error);
      });
  }, []);

  // تصنيف الطلاب حسب المستوى
  const levels = {
    "المستوى الاحترافي (N1)": [],
    "المستوى المتقدم جدًا (N2)": [],
    "المستوى المتقدم (N3)": [],
    "المستوى المتوسط (N4)": [],
    "المستوى المبتدئ (N5)": [],
  };

  students.forEach((student) => {
    if (levels[student.Level]) {
      levels[student.Level].push(student);
    }
  });

  return (
    <div className="App">
      <h1>بيانات الطلاب حسب المستوى</h1>

      {/* عرض كروت الطلاب حسب المستوى */}
      {Object.keys(levels).map((level) => (
        <div key={level}>
          <h2>{level}</h2>
          <div className="cards-container">
            {levels[level].map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const StudentCard = ({ student }) => {
  return (
    <div className="card">
      <h3>
        {student.firstName} {student.lastName}
      </h3>
      <p>
        <strong>البلد:</strong> {student.country}
      </p>
      <p>
        <strong>العمر:</strong> {student.age}
      </p>
      <p>
        <strong>الجنس:</strong> {student.gender}
      </p>
      <p>
        <strong>المستوى:</strong> {student.Level}
      </p>
      <p>
        <strong>البريد الإلكتروني:</strong> {student.email}
      </p>
    </div>
  )
}
