import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
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
  Login_users
} from "./pages/index";

// import {VerifyAccount , Register_account} from "./sections/index";
import Curtain  from './components/Curtain/Curtain'
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from "../src/assets/Logo/الشعار-2-png.png";
import { FaLine } from "react-icons/fa";
import ProtectedRoute from "./pages/ProtectedRoute";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import {Register_account } from './sections/index'

function App() {
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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
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

  return (
    <>
      {/* {!isLoaded && <Curtain />}  */}
      {/* {isLoaded && ( */}
        <>
          <div className="social">
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
              <Routes>
                <Route path="/academy/" element={<Home />} />
                <Route path="/academy/About" element={<About />} />
                <Route path="/academy/Date" element={<Date_lisson />} />
                <Route path="/academy/Questions" element={<Questions />} />
                <Route path="/academy/Login" element={<Login />} />
                <Route path="/academy/Articles" element={<Articles />} />
                <Route path="/academy/Level_division" element={<Level_division />} />
                <Route path="/academy/Register" element={<Register />} />
                <Route path="/academy/Teachers" element={<Teachers />} />
                <Route path="/academy/Study_materials" element={<Study_materials />} />
                <Route path="/academy/More_services" element={<More_services />} />
                <Route path="/academy/Support" element={<Support />} />
                <Route path="/academy/Fees" element={<Fees />} />
                <Route path="/academy/Register_account" element={<Register_account />} />
                <Route path="/academy/Login_users" element={<Login_users />} />
                <Route
                  path="/academy/Dash"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
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
