import './Student_Card.css'
import { useEffect, useState } from 'react'

export default function Student_Card() {
  const [student, setStudent] = useState([])
  useEffect(() => {
    fetch('https://api.japaneseacademy.jp/allusers')
      .then(response => response.json())
      .then(data => {
        const FilterStudnet = data.filter(user => user.role === 'student');
        setStudent(FilterStudnet)
      })
      .catch(error => console.error('error fetching data :', error))
  }, [])
  return (
    <>
      <div className="cards-container container mt-5 mb-5">
        {
          student.map(student => (
            <div
            className='card'
              key={student.id}
            >
              <h2>{student.firstName}</h2>
              <p><strong>البلد:</strong> {student.country}</p>
              <p><strong>العمر:</strong> {student.age}</p>
              <p><strong>الجنس:</strong> {student.gender}</p>
              <p><strong>مستوى التعليم:</strong> {student.educationLevel}</p>
              <p><strong>مستوى اليابانية:</strong> {student.japaneseLevel}</p>
              <p><strong>الهاتف:</strong> {student.phone}</p>
              <p><strong>البريد الإلكتروني:</strong> {student.email}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}
