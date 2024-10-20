import "./Navbar.css";
import Logo from "../../assets/Logo/الشعار-2-png.png";
import { FaHome } from "react-icons/fa";
// import axios from "axios";
import { useEffect, useState } from "react";
// import { IoPerson } from "react-icons/io5";
// import { GrServices } from "react-icons/gr";
import { Link } from "react-router-dom";
import { MdLibraryBooks } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { FaCashRegister } from "react-icons/fa6";
import { FaBook } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { GrMoreVertical } from "react-icons/gr";
import { FaMicrophoneLines } from "react-icons/fa6";

import { HiChevronDoubleDown } from "react-icons/hi";

export default function Navbar() {
  const [user, setUser] = useState(null); // حالة لتخزين بيانات المستخدم
  const [error, setError] = useState(null); // حالة لتخزين الأخطاء
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      // تحقق مما إذا كان التوكن موجودًا
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        "https://academy-backend-pq91.onrender.com/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Invalid token");
      }

      const data = await response.json();
      setUser(data.user); // تحديث حالة المستخدم بالبيانات
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message); // تحديث حالة الخطأ

      // إعادة التوجيه لصفحة تسجيل الدخول إذا كانت الجلسة غير صالحة
      // if (err.message === "Invalid token" || err.message === "No token found") {
      //   alert("Invalid session, please log in again.");
      //   localStorage.removeItem("token"); // إزالة التوكن من التخزين المحلي
      //   window.location.href = "/Login_users"; // إعادة التوجيه لصفحة تسجيل الدخول
      // }
    }
  };

  // استخدام useEffect لاستدعاء fetchUserData عند تحميل المكون
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData();
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-xl navbar-light  container">
        
        <a className="navbar-brand" href="#">
          <img src={Logo} alt="" />
        </a>
        <div className="buttons_mobile">
        {!user ? (
          <div className="buttons">
              <Link to="Login_users">
                <button className="login_nav">تسجيل الدخول</button>
              </Link>
              <Link to="/Register_account">
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
          <div className="buttons_pc">
        {!user ? (
          <div className="buttons">
              <Link to="Login_users">
                <button className="login_nav">تسجيل الدخول</button>
              </Link>
              <Link to="/Register_account">
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
          <ul className="navbar-nav">
            <div className="group">

            <div className="group_1">

            <li className="nav-item active item1 hidden">
              <Link className="nav-link" to="/">
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
              <Link className="nav-link" to="/Level_division">
                <MdLibraryBooks />
                تقسيم المستويات
              </Link>
            </li>
            <li className="nav-item item3 hidden">
              <Link className="nav-link" to="/Fees">
                <BsCashCoin />
                الرسوم
              </Link>
            </li>
            <li className="nav-item item4 hidden">
              <Link className="nav-link dropdown-item" to="/Register">
                <FaCashRegister />
                طريقة التسجيل
              </Link>
            </li>
                </div>
<div className="group_2">

            <li className="nav-item item4 hidden">
              <Link className="nav-link dropdown-item" to="/Study_materials">
                <FaBook />
                المواد الدراسية
              </Link>
            </li>
            <li className="nav-item item4 hidden">
              <Link className="nav-link dropdown-item" to="/Teachers">
                <FaUserGroup />
                التعريف بالأساتذة
              </Link>
            </li>
            <li className="nav-item item4 hidden">
              <Link className="nav-link dropdown-item" to="/More_services">
                <GrMoreVertical />
                خدمات إضافية
              </Link>
              </li>
            <li className="nav-item item4 hidden">
              <Link className="nav-link dropdown-item" to="/Support">
              <FaMicrophoneLines />
                الدعم الفني
              </Link>
            </li>
              <li>
              <Link className="nav-link dropdown-item" to="/Login">
                <FaCashRegister />
                لوحة التحكم
              </Link>
            </li>
            </div>

            </div>
            {/* <li className="nav-item dropdown">
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
                    to="/Study_materials"
                  >
                    المواد الدراسية
                  </Link>
                </div>
                <div className="nav-item item4 hidden">
                  <Link className="nav-link dropdown-item" to="/Teachers">
                    التعريف بالأساتذة
                  </Link>
                </div>
                <div className="nav-item item4 hidden">
                  <Link className="nav-link dropdown-item" to="/More_services">
                    خدمات إاضافية
                  </Link>
                  <Link className="nav-link dropdown-item" to="/Login">
                    لوحة التحكم
                  </Link>
                </div>
                <div className="nav-item item4 hidden">
                  <Link className="nav-link dropdown-item" to="/Support">
                    الدعم الفني
                  </Link>
                </div>
              </div>
            </li> */}
          </ul>
       
        </div>
      </nav>
    </>
  );
}
