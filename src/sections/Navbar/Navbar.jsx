import "./Navbar.css";
import Logo from "../../assets/Logo/الشعار-2-png.png";
import { FaHome } from "react-icons/fa";
// import axios from "axios";
import { useEffect, useState } from "react";
// import { IoPerson } from "react-icons/io5";
// import { GrServices } from "react-icons/gr";
import { Link } from "react-router-dom";
import { HiChevronDoubleDown } from "react-icons/hi";


export default function Navbar() {
  const [user, setUser] = useState(null); // حالة لتخزين بيانات المستخدم
  const [error, setError] = useState(null); // حالة لتخزين الأخطاء
  const fetchUserData = async () => {
    
    try {
      const token = localStorage.getItem('token');
      
      // تحقق مما إذا كان التوكن موجودًا
      if (!token) {
        throw new Error("No token found");
      }
      
      const response = await fetch("https://academy-backend-pq91.onrender.com/user", {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Invalid token");
      }
  
      const data = await response.json();
      setUser(data.user); // تحديث حالة المستخدم بالبيانات
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message); // تحديث حالة الخطأ
  
      // إعادة التوجيه لصفحة تسجيل الدخول إذا كانت الجلسة غير صالحة
      if (err.message === "Invalid token" || err.message === "No token found") {
        alert("Invalid session, please log in again.");
        localStorage.removeItem("token"); // إزالة التوكن من التخزين المحلي
        window.location.href = "/academy/Login_users"; // إعادة التوجيه لصفحة تسجيل الدخول
      }
    }
  };
  

  // استخدام useEffect لاستدعاء fetchUserData عند تحميل المكون
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    }
  }, []);
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light  container">
        <a className="navbar-brand" href="#">
          <img src={Logo} alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active item1 hidden">
              <Link className="nav-link" to="/academy">
                <FaHome />
                الصفحة الرئيسية
                <span className="sr-only"></span>
              </Link>
            </li>
            {/* <li className="nav-item item2 hidden">
              <Link className="nav-link" to="/academy/about">
                <IoPerson /> من نحن ؟
              </Link>
            </li> */}
            {/* <li className="nav-item item3 hidden">
              <Link className="nav-link" to="/academy/Date">
                <GrServices /> محتويات الدروس
              </Link>
            </li> */}
            <li className="nav-item item2 hidden">
              <Link className="nav-link" to="/academy/Level_division">
                تقسيم المستويات
              </Link>
            </li>
            <li className="nav-item item3 hidden">
              <Link className="nav-link" to="/academy/Fees">
                الرسوم
              </Link>
            </li>
            <li className="nav-item item4 hidden">
              <Link className="nav-link dropdown-item" to="/academy/Register">
                طريقة التسجيل
              </Link>
            </li>

            <li className="nav-item item4 hidden">
              <Link className="nav-link dropdown-item" to="/academy/Teachers">
                التعريف بالأساتذة
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <HiChevronDoubleDown /> باقي الأقسام
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <div className="nav-item item4 hidden">
                  <Link
                    className="nav-link dropdown-item"
                    to="/academy/Study_materials"
                  >
                    المواد الدراسية
                  </Link>
                </div>
                <div className="nav-item item4 hidden">
                  <Link
                    className="nav-link dropdown-item"
                    to="/academy/More_services"
                  >
                    خدمات إاضافية
                  </Link>
                </div>
                <div className="nav-item item4 hidden">
                  <Link
                    className="nav-link dropdown-item"
                    to="/academy/Support"
                  >
                    الدعم الفني
                  </Link>
                </div>
              </div>
            </li>
          </ul>
          {!user ? (
            <div className="buttons">
              <Link to="Login_users">
                <button className="login_nav">تسجيل الدخول</button>
              </Link>
              <Link to="/academy/Register_account">
                <button className="register_nav">سجل الان</button>
              </Link>
            </div>
          ) : (
            // عرض معلومات المستخدم إذا كان مسجل الدخول
            <div className="user-info">
              <span className="user-icon">{/* يمكنك إضافة أيقونة هنا */}</span>
              <span className="user-name">مرحباً، {user.firstName}</span>
              <button
  className="logout_nav register_nav"
  onClick={() => {
    localStorage.removeItem("token"); // إزالة التوكن من التخزين المحلي
    sessionStorage.removeItem("token"); // إزالة التوكن من sessionStorage
    localStorage.removeItem("user"); // إزالة بيانات المستخدم

    // عمل reload للصفحة
    window.location.reload();
  }}
>
  تسجيل الخروج
</button>

            </div>
          )}
        </div>
      </nav>
    </>
  );
}
