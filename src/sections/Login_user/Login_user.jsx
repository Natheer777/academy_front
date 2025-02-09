import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login_user.css";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import LoginImg from '../../assets/Login/snapedit_1739098994814-removebg-preview.png';

export default function Login_user() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [direction, setDirection] = useState("ltr");
  const [rememberMe, setRememberMe] = useState(false);

  // ✅ عند تحميل الصفحة، تحقق من البيانات المحفوظة في localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && savedPassword && savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    fetch("https://api.japaneseacademy.jp/login_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);

        if (data.token) {
          console.log("تم تسجيل الدخول بنجاح");

          // ✅ حفظ البيانات في localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("firstName", data.user.firstName);
          localStorage.setItem("userEmail", data.user.email);
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("userRole", data.user.role);
          localStorage.setItem("showVideoCall", data.user.showVideoCall);
          localStorage.setItem("uid", 0);

          // ✅ حفظ البريد وكلمة المرور إذا كان "تذكرني" مفعّلًا
          if (rememberMe) {
            localStorage.setItem("savedEmail", email);
            localStorage.setItem("savedPassword", password);
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("savedEmail");
            localStorage.removeItem("savedPassword");
            localStorage.removeItem("rememberMe");
          }

          navigate("/");
        } else {
          setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
        setError("حدث خطأ في الاتصال بالخادم. الرجاء المحاولة لاحقًا.");
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setDirection(/[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <form className="login-form academy container mt-5 mb-5" onSubmit={handleSubmit}>
              <img className="LoginImg" src={LoginImg} alt="" />

              <h1 className="fw-bold m-auto">تسجيل الدخول</h1>
              <div className="w-100">
                <label className="mb-3">البريد الإلكتروني:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleInputChange(e);
                  }}
                  required
                  style={{ direction: direction }}
                />
              </div>
              <div className="w-100 mb-3">
                <label className="mb-2">كلمة المرور:</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ direction: direction, paddingRight: "30px" }}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      cursor: "pointer",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <IoEyeSharp />}
                  </span>
                </div>

                <div className="rememberMe">
                  <input
                    id="rememberMe"
                    className="mt-2"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="rememberMe" className="me-2">حفظ البريد الإلكتروني وكلمة المرور</label>
                </div>
              </div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
              </button>
              {error && <p className="error-message">{error}</p>}
              <p className="ForgetPassword">هل نسيت كلمة المرور؟</p>
              <p className="or">أو</p>
              <h5 className="createAcount text-center m-auto mt-4 Dont_have_account">
                <Link to="/Register_account">
                  <button>إنشاء حساب جديد</button>
                </Link>
              </h5>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
