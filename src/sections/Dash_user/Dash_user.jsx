import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import './Dash_user.css'
function Dash_user() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = parseInt(localStorage.getItem("userId")); // تحويل userId إلى رقم



    // جلب بيانات المستخدمين من الخادم
    fetch(`https://api.japaneseacademy.jp/allusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // إرسال التوكن في العنوان
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        // العثور على المستخدم المتطابق مع userId
        const loggedUser = data.find((user) => user.id === userId);

        if (loggedUser) {
          setUserData(loggedUser); // تخزين بيانات المستخدم في الحالة
        } else {
          console.log("error")
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("حدث خطأ أثناء جلب البيانات. حاول مرة أخرى.");
        navigate("/Login_users");
      });
  }, [navigate]);

  if (!userData) {
    // إظهار رسالة تحميل حتى يتم جلب البيانات
    return <p>جارٍ تحميل البيانات...</p>;
  }

  return (
    <div className="dashboard container mt-5 mb-5 academy">
      <h3 className="fw-bold">مرحباً، <span>{userData.firstName} </span> <span>{userData.lastName}</span></h3>
      <p>البريد الإلكتروني: <span>{userData.email} </span></p>
      <p>الدولة: <span>{userData.country} </span></p>
      <p>العمر:<span> {userData.age} </span></p>
      <p>الجنس: <span>{userData.gender} </span></p>
      <p>المستوى التعليمي: <span>{userData.educationLevel} </span></p>
      <p>مستوى اللغة اليابانية: <span>{userData.japaneseLevel} </span></p>
      <p>رقم الهاتف: <span>{userData.phone} </span></p>
    </div>
  );
}

export default Dash_user;
