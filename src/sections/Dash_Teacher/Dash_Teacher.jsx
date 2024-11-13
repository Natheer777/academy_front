import './Dash_Teacher.css'
import { useEffect , useState } from 'react';
import axios from 'axios';
export default function Dash_Teacher() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // استدعاء البيانات من الـ API
        axios.get('https://academy-backend-pq91.onrender.com/allusers')
            .then(response => {
                setUsers(response.data); // تخزين البيانات المسترجعة
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);
  
    return (
    <>
      <div className="user-list-container">
            <h2 className="header">قائمة الطلاب</h2>
            {users.length > 0 ? (
                <div className="user-cards academy">
                    {users.map((user) => (
                        <div className="user-card" key={user.id}>
                            <h2>{user.firstName} {user.lastName}</h2>
                            <p><strong>الدولة:</strong> {user.country}</p>
                            <p><strong>العمر:</strong> {user.age}</p>
                            <p><strong>الجنس:</strong> {user.gender === 'male' ? 'ذكر' : 'أنثى'}</p>
                            <p><strong>المستوى التعليمي:</strong> {user.educationLevel}</p>
                            <p><strong>مستوى اللغة اليابانية:</strong> {user.japaneseLevel}</p>
                            <p><strong>الهاتف:</strong> {user.phone}</p>
                            <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
                            <p><strong>حالة التحقق من البريد:</strong> {user.emailVerified ? 'تم التحقق' : 'لم يتم التحقق'}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>جارٍ تحميل البيانات...</p>
            )}
        </div>

    </>
  )
}
