

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import bcrypt from "bcryptjs";
// import "./Login_user.css";

// export default function Login_user() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // طلب البيانات من API
//     fetch("https://academy-backend-pq91.onrender.com/allusers", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setIsLoading(false);

//         // البحث عن المستخدم من خلال البريد الإلكتروني
//         const user = data.find((user) => user.email === email);

//         if (user) {
//           // التحقق من تطابق كلمة المرور باستخدام bcrypt
//           bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) {
//               console.error("Error comparing passwords:", err);
//               setError("حدث خطأ أثناء التحقق من كلمة المرور");
//               return;
//             }

//             if (isMatch) {
//               // تسجيل الدخول بنجاح وتخزين التوكن
//               console.log("تم تسجيل الدخول بنجاح");
//               localStorage.setItem("token", user.verificationCode); // استخدام رمز التحقق كتجربة
//               navigate("/");
//             } else {
//               setError("كلمة المرور غير صحيحة");
//             }
//           });
//         } else {
//           setError("البريد الإلكتروني غير موجود");
//         }
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         console.error("Error:", error);
//         setError("حدث خطأ في الاتصال بالخادم");
//       });
      
//   };

//   return (
//     <form className="login-form academy container mt-5 mb-5" onSubmit={handleSubmit}>
//       <h1 className="fw-bold m-auto">تسجيل الدخول</h1>
//       <div className="w-100">
//         <label>البريد الإلكتروني:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <div className="w-100 mb-5">
//         <label>كلمة المرور:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit" disabled={isLoading}>
//         {isLoading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
//       </button>
//       {error && <p className="error-message">{error}</p>}
//     </form>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import "./Login_user.css";
import { Link } from "react-router-dom";
export default function Login_user() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    fetch("https://academy-backend-pq91.onrender.com/allusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);

        const user = data.find((user) => user.email === email);

        if (user) {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              setError("حدث خطأ أثناء التحقق من كلمة المرور");
              return;
            }

            if (isMatch) {
              console.log("تم تسجيل الدخول بنجاح");
              localStorage.setItem("token", user.verificationCode);
              localStorage.setItem('userEmail', user.email);
                            navigate("/"); // توجيه المستخدم إلى لوحة التحكم
            } else {
              setError("كلمة المرور غير صحيحة");
            }
          });
        } else {
          setError("البريد الإلكتروني غير مسجل");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
        setError("حدث خطأ في الاتصال بالخادم. الرجاء المحاولة لاحقًا.");
      });
    };

  return (
    <form className="login-form academy container mt-5 mb-5" onSubmit={handleSubmit}>
      <h1 className="fw-bold m-auto">تسجيل الدخول</h1>
      <div className="w-100">
        <label>البريد الإلكتروني:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="w-100 mb-5">
        <label>كلمة المرور:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
      </button>
      {error && <p className="error-message">{error}</p>}
    <h5 className="text-center m-auto mt-5 Dont_have_account"> لا تمتلك حساب؟ 
      <Link to='/Register_account'>
      <span>إنشاء حساب </span>
      </Link>
      </h5>
    </form>

  );
}
