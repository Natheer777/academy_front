import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login_user.css";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

export default function Login_user() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // إضافة حالة لعرض/إخفاء كلمة المرور
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [direction, setDirection] = useState("ltr"); // الاتجاه الافتراضي

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // إرسال طلب تسجيل الدخول إلى الخادم
    fetch("https://api.japaneseacademy.jp/login_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }) // إرسال البريد وكلمة المرور
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);

        // التحقق من أن الخادم أرسل التوكن
        if (data.token) {
          console.log("تم تسجيل الدخول بنجاح");

          // تخزين التوكن في localStorage
          localStorage.setItem("token", data.token);

          // تخزين بيانات المستخدم في localStorage إذا لزم الأمر
          localStorage.setItem('firstName', data.user.firstName);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('userRole', data.user.role);
          localStorage.setItem('showVideoCall', data.user.showVideoCall);
          localStorage.setItem('uid' , 0)

          // التوجيه إلى الصفحة الرئيسية أو لوحة التحكم
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
    // التحقق من وجود الحروف العربية
    if (/[\u0600-\u06FF]/.test(value)) {
      setDirection("rtl"); // الكتابة من اليمين لليسار
    } else {
      setDirection("ltr"); // الكتابة من اليسار لليمين
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // التبديل بين عرض/إخفاء كلمة المرور
  };

  return (
    <>
      <form className="login-form academy container mt-5 mb-5" onSubmit={handleSubmit}>
        <h1 className="fw-bold m-auto">تسجيل الدخول</h1>
        <div className="w-100">
          <label className="mb-2">البريد الإلكتروني:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleInputChange(e);
            }}
            required
            style={{
              direction: direction
            }}
          />
        </div>
        <div className="w-100 mb-5">
          <label className="mb-2">كلمة المرور:</label>
          <div style={{ position: "relative" }}>
            <input
              type={passwordVisible ? "text" : "password"} // تغيير نوع الحقل بناءً على حالة كلمة المرور
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                direction: direction,
                paddingRight: "30px" // لإتاحة المساحة لأيقونة العين
              }}
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
              {passwordVisible ? <FaEyeSlash /> : <IoEyeSharp />} {/* أيقونة العين */}
            </span>
          </div>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
        {error && <p className="error-message">{error}</p>}

        <h5 className="text-center m-auto mt-4 Dont_have_account">
          <Link to='/Register_account'>
            <span>إنشاء حساب</span>
          </Link>
        </h5>
      </form>
    </>
  );
}
