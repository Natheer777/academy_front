import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Dash_user() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن التوكن موجودًا
      navigate("/Login_users");
      return;
    }

    // جلب بيانات المستخدمين من الخادم
    fetch(`https://api.japaneseacademy.jp/allusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // العثور على المستخدم الذي يتطابق التوكن الخاص به
        const loggedUser = data.find((user) => user.token === user.token);

        if (loggedUser) {
          setUserData(loggedUser); // عرض بيانات المستخدم
        } else {
          alert("خدث خطأ أثناء تسجيل الدخول")
          // إعادة التوجيه إذا لم يتم العثور على المستخدم
          navigate("/Login_users");
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
  );
}

export default Dash_user;
