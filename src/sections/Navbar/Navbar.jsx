import "./Navbar.css";
import Logo from "../../assets/Logo/الشعار-2-png.png";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdLibraryBooks } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { FaBook } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { GrMoreVertical } from "react-icons/gr";
import { FaMicrophoneLines } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [role, setRole] = useState(null);

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const userEmail = localStorage.getItem("userEmail");
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("لا يوجد توكن. يرجى تسجيل الدخول.");
        return;
      }

      const response = await fetch(
        "https://api.japaneseacademy.jp/allusers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new ("توكن غير صالح");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new ("الرد من الخادم ليس بصيغة JSON");
      }

      const data = await response.json();

      // استبدال البحث عن المستخدم باستخدام شرط محدد (مثال: باستخدام id أو email)
      const currentUser = data.find((user) => user.email === userEmail); // استخدم بريد المستخدم هنا

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
  useEffect(() => {
    // جلب الدور من localStorage
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole); // تعيين الدور في الحالة
    }
  }, []);

  useEffect(() => {
    fetchUserData();
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
              <Link to="/Login_users">
                <button className="login_nav">تسجيل الدخول</button>
              </Link>
              <Link to="/Register_account">
                <button className="register_nav">سجل الآن</button>
              </Link>
            </div>
          ) : (
            // عرض معلومات المستخدم إذا كان مسجل الدخول
            <div className="user-info">
              <div className="user-info-buttons">
                <span className="user-icon">
                  {/* يمكنك إضافة أيقونة هنا */}
                </span>
                <Link to={`/Dash_users/${user.id}`}>
                  <button className="register_nav">لوحة التحكم </button>
                </Link>
                <button
                  className="logout_nav register_nav"
                  onClick={() => {
                    localStorage.removeItem("auth"); // إزالة التوكن من التخزين المحلي
                    localStorage.removeItem("token"); // إزالة التوكن من التخزين المحلي
                    localStorage.removeItem("userEmail"); // إزالة التوكن من التخزين المحلي
                    localStorage.removeItem("userId");
                    localStorage.removeItem("userRole");
                    localStorage.removeItem("firstName");
                    localStorage.removeItem("showVideoCall");
                    localStorage.removeItem("uid");
                    // إزالة بيانات المستخدم
                    sessionStorage.removeItem("auth"); // إزالة التوكن من sessionStorage
                    // sessionStorage.removeItem("token"); // إزالة التوكن من sessionStorage
                    // sessionStorage.removeItem("userEmail"); // إزالة التوكن من sessionStorage
                    // sessionStorage.removeItem("userId"); // إزالة التوكن من sessionStorage
                    // sessionStorage.removeItem("userRole"); // إزالة التوكن من sessionStorage
                   

                    // عمل reload للصفحة
                    window.location.reload();
                  }}
                >
                  تسجيل الخروج
                </button>
                {/* <p className="user-name">{user.firstName}</p> */}
              </div>
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
                <Link to="/Register_account">
                  <button className="register_nav">سجل الآن</button>
                </Link>
                <Link to="/Login_users">
                  <button className="login_nav">تسجيل الدخول</button>
                </Link>
              </div>
            ) : (
              // عرض معلومات المستخدم إذا كان مسجل الدخول
              <div className="user-info">
                <span className="user-icon">
                  {/* يمكنك إضافة أيقونة هنا */}
                </span>
                {/* <h4 className="user-name">{user.firstName}</h4> */}
                <Link to={`/Dash_users/${user.id}`}>
                  <button className="register_nav">لوحة التحكم </button>
                </Link>
                <button
                  className="logout_nav register_nav"
                  onClick={() => {
                    localStorage.removeItem("auth"); // إزالة التوكن من التخزين المحلي
                    localStorage.removeItem("token"); // إزالة التوكن من التخزين المحلي
                    localStorage.removeItem("userEmail"); // إزالة التوكن من التخزين المحلي
                    localStorage.removeItem("userId");
                    localStorage.removeItem("userRole");
                    localStorage.removeItem("firstName");
                    localStorage.removeItem("showVideoCall");
                    localStorage.removeItem("uid");

                    // إزالة بيانات المستخدم
                    sessionStorage.removeItem("auth"); // إزالة التوكن من sessionStorage
                    // sessionStorage.removeItem("token"); // إزالة التوكن من sessionStorage
                    // sessionStorage.removeItem("userEmail"); // إزالة التوكن من sessionStorage
                    // sessionStorage.removeItem("userId"); // إزالة التوكن من sessionStorage
                    // sessionStorage.removeItem("userRole"); // إزالة التوكن من sessionStorage
                   
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
                  <Link className="nav-a" to="/">
                    <FaHome />
                    الصفحة الرئيسية
                    <span className="sr-only"></span>
                  </Link>
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
                <li className="nav-item item4 hidden">
                  <Link className="nav-a dropdown-item" to="/Teachers">
                    <FaUserGroup />
                    الهيئة التدريسية
                  </Link>
                </li>

                <li className="nav-item item2 hidden">
                  <Link className="nav-a" to="/Level_division">
                    <MdLibraryBooks />
                    المستويات الدراسية
                  </Link>
                </li>

                <li className="nav-item item4 hidden">
                  <Link className="nav-a dropdown-item" to="/Study_materials">
                    <FaBook />
                    المواد الدراسية
                  </Link>
                </li>

                {/* <li className="nav-item item4 hidden">
              <Link className="nav-a dropdown-item" to="/Register">
              <FaCashRegister />
              طريقة التسجيل
              </Link>
              </li>
              */}
              </div>
              <div className="group_2">
                <li className="nav-item item3 hidden">
                  <Link className="nav-a" to="/Fees">
                    <BsCashCoin />
                    الرسوم الدراسية
                  </Link>
                </li>

                <li className="nav-item item4 hidden">
                  <Link className="nav-a dropdown-item" to="/Questions">
                    <FaQuestionCircle />
                    الأسئلة الشائعة
                  </Link>
                </li>

                <li className="nav-item item4 hidden">
                  <Link className="nav-a dropdown-item" to="/Comments">
                    <FaCommentAlt />
                    آراء الطلاب
                  </Link>
                </li>
                <li className="nav-item item4 hidden">
                  <Link className="nav-a dropdown-item" to="/More_services">
                    <GrMoreVertical />
                    خدمات إضافية
                  </Link>
                </li>
                <li className="nav-item item4 hidden">
                  <Link className="nav-a dropdown-item" to="/Support">
                    <FaMicrophoneLines />
                    الدعم الفني
                  </Link>
                </li>

                {/* <li>
              <Link className="nav-a dropdown-item" to="/Login">
              <FaCashRegister />
              لوحة التحكم
              </Link>
              </li> */}
              </div>
              <div className="group_3">
                {role === "teacher" && (
                  <li className="nav-item item4">
                    <Link className="nav-a dropdown-item" to="/Dash_Teachers">
                      لوحة تحكم الأساتذة
                    </Link>
                  </li>
                )}
                {/* <li className="nav-item item4 hidden">
              <Link className="nav-a dropdown-item" to="/Privacy">
              <MdPrivacyTip />
              سياسة الخصوصية
              </Link>
            </li>
          <li className="nav-item item4 hidden">
              <Link className="nav-a dropdown-item" to="/Terms"> 
              <FaHandshake />
              شروط الاستخدام
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
