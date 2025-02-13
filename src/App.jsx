import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { FaArrowAltCircleUp } from "react-icons/fa";

import {
  About,
  Dash,
  Date_lisson,
  Home,
  Login,
  Questions,
  Articles,
  Level_division,
  Register,
  Teachers,
  Study_materials,
  More_services,
  Support,
  Fees,
  Login_users,
  Register_accounts,
  Dash_users,
  Privacy,
  CommetS,
  Term,
  Dash_Teachers,
} from "./pages/index";



// import {VerifyAccount , Register_account} from "./sections/index";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from "../src/assets/Logo/الشعار-2-png.png";
import { FaLine } from "react-icons/fa";
import ProtectedRoute from "./components/ProtectedRoute";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Cookies, ScrollToTop } from "./components";
import { MeetingNow } from "./sections";

function App() {

  /////////////////////////////////////////////

  // const [cookiesAccepted, setCookiesAccepted] = useState(false);

  // useEffect(() => {
  //   // التحقق إذا كان المستخدم قد وافق على ملفات تعريف الارتباط
  //   const acceptCookies = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("acceptCookies="));
  //   if (acceptCookies && acceptCookies.split("=")[1] === "true") {
  //     setCookiesAccepted(true);
  //   }
  // }, []);

  // const handleAcceptCookies = () => {
  //   fetch("https://academy-backend-pq91.onrender.com/accept-cookies")
  //     .then((response) => response.json())
  //     .then(() => setCookiesAccepted(true))
  //     .catch((err) => console.error(err));
  // };

  // const handleRejectCookies = () => {
  //   setCookiesAccepted(true);
  // };

  ///////////////////////////////////




  /////////////////////////////////////////////
  const [isLoaded, setIsLoaded] = useState(false); // حالة التحكم في عرض الموقع

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true); // تفعيل الموقع بعد انتهاء الرسوم المتحركة
    }, 1300); // بعد انتهاء الرسوم المتحركة (مثال: بعد 2 ثانية)

    return () => clearTimeout(timer); // تنظيف المؤقت
  }, []);
  /////////////////////////////////////////////
  // useEffect(() => {
  //   setInterval(() => {
  //     const observer = new IntersectionObserver((entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add("show");
  //         } else {
  //           entry.target.classList.remove("show");
  //         }
  //       });
  //     });

  //     const Elements = document.querySelectorAll(".left ,.right ,.top ,.hidden");
  //     Elements.forEach((el) => observer.observe(el));

  //     return () => {
  //       Elements.forEach((el) => observer.unobserve(el));
  //     };
  //   });
  // }, []);

  ////////////////////////////////////

  const [loading, setLoading] = useState(true); // اجعل البداية true

  useEffect(() => {
    const loadResources = async () => {
      await document.fonts.ready; // انتظر تحميل الخطوط
      setTimeout(() => {
        setLoading(false);
      }, 500); // تأخير بسيط لإعطاء إحساس بالسلاسة
    };
  
    loadResources();
  }, []);
  
  
  ///////////////////////////////////

  const [showIcons, setShowIcons] = useState(false);

  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };

  ///////////////////

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsAuthenticated(auth === "true");
  }, []);
  ////////////////////////////////////////

  useEffect(() => {
    const up = document.querySelectorAll(".up");

    const handleScroll = () => {
      window.scrollY >= 120
        ? up.forEach((item) => item.classList.add("look"))
        : up.forEach((item) => item.classList.remove("look"));
    };

    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener("scroll", handleScroll);
    up.forEach((item) => item.addEventListener("click", handleScrollToTop));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      up.forEach((item) =>
        item.removeEventListener("click", handleScrollToTop)
      );
    };
  }, []);

  /////////


  const [hideSocial, setHideSocial] = useState(false);

  useEffect(() => {
    // التحقق من حالة العنصر في localStorage
    const hide = localStorage.getItem('hideSocial');
    if (hide === 'true') {
      setHideSocial(true);
    }

    return () => {
      // إعادة الوضع الطبيعي عندما يغادر المستخدم الصفحة
      setHideSocial(false);
    };
  }, []);


  const OpenPage = () => {
    return localStorage.getItem("token") && localStorage.getItem("userEmail")
  }

  return (
    <>

      {/* <div>
        {!cookiesAccepted && (
          <div className="cookie-banner">
            <p className="mb-4">
              مرحبًا بكم في موقع أكاديمية اللغة اليابانية! <br />
              نحن نستخدم ملفات تعريف الارتباط (الكوكيز) لتحسين تجربتكم في
              التصفح، وتحليل استخدام الموقع. بالضغط على ”قبول جميع ملفات تعريف
              الارتباط“، فإنكم توافقون على استخدامها لأغراض التحليل والتخصيص.
              يمكنكم أيضًا اختيار ”إعدادات ملفات تعريف الارتباط“ لتخصيص
              التفضيلات أو رفض بعض الملفات. <br />
              لمزيد من التفاصيل حول كيفية استخدامنا لملفات تعريف الارتباط، يُرجى
              الاطلاع على <a href="/Privacy">سياسة الخصوصية</a>.
            </p>
            <div className="buttonsCookies">
              <button className="mb-4" onClick={handleAcceptCookies}>
                قبول جميع ملفات تعريف الارتباط
              </button>
              <button className="mb-4">إعدادات تعريف ملفات الارتباط</button>
              <button onClick={handleRejectCookies}>رفض</button>
            </div>
          </div>
        )}
      </div> */}
      {/* {!isLoaded && <Curtain />}  */}
      {/* {isLoaded && ( */}
      <>
        <Cookies />
        <button className="up">
          <FaArrowAltCircleUp />
        </button>

        <div className={`social ${hideSocial ? 'noneSocial' : ''}`}>
          <ul onClick={toggleIcons} style={{ cursor: "pointer" }}>
            <li className="click">
              <IoChatbubbleEllipsesOutline />
            </li>
            {showIcons && (
              <>
                <li className="line top">
                  <a href="https://line.me/ti/p/IuAqVt59QV">
                    <FaLine />
                  </a>
                </li>
                <li className="email top">
                  <a href="mailto:contact@sawagroup.jp">
                    <MdEmail />
                  </a>
                </li>
                <li className="whatsapp top">
                  <a href="https://wa.link/mr0gya">
                    <FaWhatsapp />
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
        {loading ? (
          <img className="Loading" src={Logo} alt="" />
        ) : (
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Date" element={<Date_lisson />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Articles" element={<Articles />} />
              <Route path="/Level_division" element={<Level_division />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Teachers" element={<Teachers />} />
              <Route path="/Study_materials" element={<Study_materials />} />
              <Route path="/More_services" element={<More_services />} />
              <Route path="/Support" element={<Support />} />
              <Route path="/Fees" element={<Fees />} />
              <Route
                path="/Register_account"
                element={OpenPage() ? <Navigate to="/" /> : <Register_accounts />}
              />
              <Route
                path="/Login_users"
                element={OpenPage() ? <Navigate to="/" /> : <Login_users />}
              />
              <Route path="/Dash_users/:userId" element={<Dash_users />} />
              <Route path="/Comments" element={<CommetS />} />
              <Route path="/Questions" element={<Questions />} />
              <Route path="/Privacy" element={<Privacy />} />
              <Route path="/Terms" element={<Term />} />
              <Route path="/Dash_Teachers" element={<Dash_Teachers />} />
              <Route path="/MeetingNow" element={<MeetingNow />} />

              <Route
                path="/Dash"
                element={
                  <ProtectedRoute
                    isAuthenticated={!!localStorage.getItem("auth")}
                  >
                    <Dash />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        )}
      </>
      {/* )}  */}
    </>
  );
}

export default App;
