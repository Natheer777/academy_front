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
  Login_users,
  Register_accounts,
  Dash_users,

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
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Date" element={<Date_lisson />} />
                <Route path="/Questions" element={<Questions />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Articles" element={<Articles />} />
                <Route path="/Level_division" element={<Level_division />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Teachers" element={<Teachers />} />
                <Route path="/Study_materials" element={<Study_materials />} />
                <Route path="/More_services" element={<More_services />} />
                <Route path="/Support" element={<Support />} />
                <Route path="/Fees" element={<Fees />} />
                <Route path="/Register_account" element={<Register_accounts />} />
                <Route path="/Login_users" element={<Login_users />} />
                <Route path="/Dash_users/:userId" element={<Dash_users />} />
                <Route path="/Questions" element={<Questions />} />
                <Route
                  path="/Dash"
                  element={
                    <ProtectedRoute isAuthenticated={!!localStorage.getItem('auth')}>
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
