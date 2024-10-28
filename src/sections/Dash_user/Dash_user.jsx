import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Dash_user() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول إذا لم يكن مسجلاً
      navigate("/Login_users");
      return;
    }

    // جلب بيانات المستخدم باستخدام token
    fetch(`https://academy-backend-pq91.onrender.com/allusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // البحث عن المستخدم من خلال رمز التحقق (token)
        const loggedUser = data.find((user) => user.verificationCode === token);

        if (loggedUser) {
          setUserData(loggedUser);
        } else {
          // إعادة توجيه المستخدم إذا لم يُعثر على بياناته
          navigate("/Login_users");
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [navigate]);

  if (!userData) {
    return <p>جارٍ تحميل البيانات...</p>;
  }

  return (
    <>
      <div className="dashboard container mt-5">
        <h1 className="fw-bold">مرحباً، {userData.firstName} {userData.lastName}</h1>
        <p>البريد الإلكتروني: {userData.email}</p>
        <p>الدولة: {userData.country}</p>
        <p>العمر: {userData.age}</p>
        <p>الجنس: {userData.gender}</p>
        <p>المستوى التعليمي: {userData.educationLevel}</p>
        <p>مستوى اللغة اليابانية: {userData.japaneseLevel}</p>
        <p>رقم الهاتف: {userData.phone}</p>
      </div>
    </>
  );
}

export default Dash_user;
