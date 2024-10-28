import "./Navbar.css";
import Logo from "../../assets/Logo/الشعار-2-png.png";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdLibraryBooks } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { FaCashRegister } from "react-icons/fa6";
import { FaBook } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { GrMoreVertical } from "react-icons/gr";
import { FaMicrophoneLines } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const userEmail = localStorage.getItem('userEmail')
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(null);
const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("لا يوجد توكن. يرجى تسجيل الدخول.");
      return;
    }

    const response = await fetch("https://academy-backend-pq91.onrender.com/allusers", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("توكن غير صالح");
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("الرد من الخادم ليس بصيغة JSON");
    }

    const data = await response.json();

    // استبدال البحث عن المستخدم باستخدام شرط محدد (مثال: باستخدام id أو email)
    const currentUser = data.find(user => user.email === userEmail); // استخدم بريد المستخدم هنا

    if (currentUser) {
      setUser(currentUser);
    } else {
      setError("اسم المستخدم أو كلمة المرور خطأ");
    }
  } catch (err) {
    console.error("Error:", err.message);
    setError(err.message);
  }
};

  
  // استخدام useEffect لاستدعاء fetchUserData عند تحميل المكون
  useEffect(() => {
    fetchUserData();
  }, []);
  

  // استخدام useEffect لاستدعاء fetchUserData عند تحميل المكون
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     fetchUserData();
  //   }


  // }, []);

  return (
    <>
      <nav className="navbar navbar-expand-xl navbar-light  container">
        
        <a className="navbar-brand" href="#">
          <img src={Logo} alt="" />
        </a>
        <div className="buttons_mobile">
        {!user ? (
          <div className="buttons">
              <a href="Login_users">
                <button className="login_nav">تسجيل الدخول</button>
              </a>
              <a href="/Register_account">
                <button className="register_nav">سجل الآن</button>
              </a>
            </div>
          ) : (
            // عرض معلومات المستخدم إذا كان مسجل الدخول
            <div className="user-info">
              <span className="user-icon">{/* يمكنك إضافة أيقونة هنا */}</span>
              <h3 className="user-name">مرحباً، {user.firstName}</h3>
              <Link to={`/Dash_users/${user.id}`}>
              <button className="register_nav">لوحة التحكم </button>
              </Link>
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
              <a href="/Login_users">
                <button className="login_nav">تسجيل الدخول</button>
              </a>
              <a href="/Register_account">
                <button className="register_nav">سجل  الآن</button>
              </a>
            </div>
          ) : (
            // عرض معلومات المستخدم إذا كان مسجل الدخول
            <div className="user-info">
              <span className="user-icon">{/* يمكنك إضافة أيقونة هنا */}</span>
              <h3 className="user-name">مرحباً، {user.firstName}</h3>
              <Link to={`/Dash_users/${user.id}`}>
              <button className="register_nav">لوحة التحكم </button>
              </Link>
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
              <a className="nav-a" href="/">
                <FaHome />
                الصفحة الرئيسية
                <span className="sr-only"></span>
              </a>
            </li>
            {/* <li className="nav-item item2 hidden">
              <a className="nav-a" href="/academy/about">
                <IoPerson /> من نحن ؟
              </a>
            </li> */}
            {/* <li className="nav-item item3 hidden">
              <a className="nav-a" href="/academy/Date">
                <GrServices /> محتويات الدروس
                </a>
                </li> */}
            <li className="nav-item item2 hidden">
              <a className="nav-a" href="#Level_division">
                <MdLibraryBooks />
                تقسيم المستويات
              </a>
            </li>
            <li className="nav-item item3 hidden">
              <a className="nav-a" href="#Fees">
                <BsCashCoin />
                الرسوم
              </a>
            </li>
            <li className="nav-item item4 hidden">
              <a className="nav-a dropdown-item" href="#Register">
                <FaCashRegister />
                طريقة التسجيل
              </a>
            </li>
            <li className="nav-item item4 hidden">
              <a className="nav-a dropdown-item" href="#Questions">
              <FaQuestionCircle />
                الأسئلة الشائعة
              </a>
            </li>
        
                </div>
<div className="group_2">

            <li className="nav-item item4 hidden">
              <a className="nav-a dropdown-item" href="#Study_materials">
                <FaBook />
                المواد الدراسية
              </a>
            </li>
            <li className="nav-item item4 hidden">
              <a className="nav-a dropdown-item" href="#Teachers">
                <FaUserGroup />
                التعريف بالأساتذة
              </a>
            </li>
            <li className="nav-item item4 hidden">
              <a className="nav-a dropdown-item" href="#Comments">
              <FaCommentAlt />
                اراء الطلاب
              </a>
            </li>
            <li className="nav-item item4 hidden">
              <a className="nav-a dropdown-item" href="#More_services">
                <GrMoreVertical />
                خدمات إضافية
              </a>
              </li>
            <li className="nav-item item4 hidden">
              <a className="nav-a dropdown-item" href="#Support">
              <FaMicrophoneLines />
                الدعم الفني
              </a>
            </li>
        
              {/* <li>
              <Link className="nav-a dropdown-item" to="/Login">
                <FaCashRegister />
                لوحة التحكم
              </Link>
            </li> */}
            </div>

            </div>
            {/* <li className="nav-item dropdown">
              <a
              className="nav-a dropdown-toggle"
                href="#"
                id="navbarDropdownMenua"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <HiChevronDoubleDown /> باقي الأقسام
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenua"
              >
                <div className="nav-item item4 hidden">
                  <a
                    className="nav-a dropdown-item"
                    href="/Study_materials"
                  >
                    المواد الدراسية
                  </a>
                </div>
                <div className="nav-item item4 hidden">
                  <a className="nav-a dropdown-item" href="/Teachers">
                    التعريف بالأساتذة
                  </a>
                </div>
                <div className="nav-item item4 hidden">
                  <a className="nav-a dropdown-item" href="/More_services">
                    خدمات إاضافية
                  </a>
                  <a className="nav-a dropdown-item" href="/Login">
                    لوحة التحكم
                  </a>
                </div>
                <div className="nav-item item4 hidden">
                  <a className="nav-a dropdown-item" href="/Support">
                    الدعم الفني
                  </a>
                </div>
              </div>
            </li> */}
          </ul>
       
        </div>
      </nav>
    </>
  );
}
