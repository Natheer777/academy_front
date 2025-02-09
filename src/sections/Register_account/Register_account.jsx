// import { useState, useEffect, useRef } from "react";
// import "./Register_account.css";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Choices from 'choices.js';
// import 'choices.js/public/assets/styles/choices.min.css';
// import Register_header from "../Register_header/Register_header";
// import WorldFlagsSelect from "react-flags-select";

// export default function Register_account() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     country: "",
//     age: "",
//     gender: "",
//     educationLevel: "",
//     japaneseLevel: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [verificationCode, setVerificationCode] = useState("");
//   const [showVerificationField, setShowVerificationField] = useState(false);
//   const [passwordError, setPasswordError] = useState("");
//   const [passwordCriteria, setPasswordCriteria] = useState({
//     length: false,
//     uppercase: false,
//     lowercase: false,
//     number: false,
//     specialChar: false,
//   });

//   const [isRegistering, setIsRegistering] = useState(false); // للتحكم في حالة الزر أثناء التسجيل
//   const [isVerifying, setIsVerifying] = useState(false); // للتحكم في حالة الزر أثناء التحقق
//   const [direction, setDirection] = useState("ltr"); // الاتجاه الافتراضي

//   const ageSelectRef = useRef(null);
//   const genderSelectRef = useRef(null);
//   const educationSelectRef = useRef(null);
//   const japaneseLevelSelectRef = useRef(null);

//   useEffect(() => {
//     // تهيئة القوائم المنسدلة باستخدام Choices.js
//     const ageChoices = new Choices(ageSelectRef.current, {
//       searchEnabled: false,
//       removeItemButton: true,
//       direction: "ltr",
//     });

//     const genderChoices = new Choices(genderSelectRef.current, {
//       searchEnabled: false,
//       removeItemButton: true,
//       direction: "rtl",
//     });

//     const educationChoices = new Choices(educationSelectRef.current, {
//       searchEnabled: false,
//       removeItemButton: true,
//       direction: "rtl",
//     });

//     const japaneseLevelChoices = new Choices(japaneseLevelSelectRef.current, {
//       searchEnabled: false,
//       removeItemButton: true,
//       direction: "rtl",
//     });

//     // تنظيف عند إزالة المكون
//     return () => {
//       ageChoices.destroy();
//       genderChoices.destroy();
//       educationChoices.destroy();
//       japaneseLevelChoices.destroy();
//     };
//   }, []);




//   const navigate = useNavigate();

//   const handleChange = (e) => {


//     e.preventDefault();

//     // التحقق من تطابق البريد الإلكترونيين
//     if (email !== confirmEmail) {
//       setError("البريد الإلكتروني وتأكيد البريد الإلكتروني غير متطابقين.");
//     } else {
//       setError("");
//       // إرسال البيانات أو العمليات المطلوبة هنا
//       console.log("تم إرسال البيانات بنجاح!");
//     }


//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//     if (e.target.name === "password") {
//       const password = e.target.value;
//       setPasswordCriteria({
//         length: password.length >= 8,
//         uppercase: /[A-Z]/.test(password),
//         lowercase: /[a-z]/.test(password),
//         number: /\d/.test(password),
//         specialChar: /[@$!%*?&]/.test(password),
//       });
//     }
//   };

//   const handleSubmit = (e) => {

//     e.preventDefault();
//     if (!email.includes(".com")) {
//       setError("يرجى إدخال بريد إلكتروني صالح (يجب أن يحتوي على .com)");
//       return;
//     }
//     setErrorEmail("");



//     e.preventDefault();
//     if (!selectedCountry || selectedCountry === "") {
//       setErrorCountry(true); // عرض رسالة خطأ إذا لم يتم اختيار دولة
//       return;
//     }
//     console.log("Selected Country:", selectedCountry);

//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("كلمات السر غير متطابقة");
//       return;
//     }


//     if (
//       !passwordCriteria.length ||
//       !passwordCriteria.uppercase ||
//       !passwordCriteria.lowercase ||
//       !passwordCriteria.number ||
//       !passwordCriteria.specialChar
//     ) {
//       setPasswordError(
//         "يجب أن تحتوي كلمة السر على ٨ أحرف على الأقل، حرف كبير واحد، حرف صغير واحد، رقم واحد، ورمز واحد."
//       );
//       return;
//     } else {
//       setPasswordError("");
//     }

//     setIsRegistering(true); // تغيير الزر إلى "جاري التسجيل"

//     fetch("https://api.japaneseacademy.jp/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error) {
//           alert("حدث خطأ: " + data.error);
//         } else {
//           alert("تم التسجيل بنجاح، تحقق من بريدك الإلكتروني لتفعيل الحساب");
//           setShowVerificationField(true); // إظهار حقل التحقق
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       })
//       .finally(() => {
//         setIsRegistering(false); // إعادة الزر إلى حالته الطبيعية
//       });
//   };

//   const handleVerification = (e) => {
//     e.preventDefault();

//     setIsVerifying(true); // تغيير الزر إلى "جاري التحقق"

//     fetch("https://api.japaneseacademy.jp/verify", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email: formData.email, verificationCode }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error) {
//           alert("رمز التحقق غير صحيح");
//         } else {
//           alert("تم التحقق من البريد الإلكتروني بنجاح");
//           navigate("/Login_users/"); // تحويل إلى الصفحة الرئيسية بعد التحقق
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       })
//       .finally(() => {
//         setIsVerifying(false); // إعادة الزر إلى حالته الطبيعية
//       });
//   };
//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     // التحقق من وجود الحروف العربية
//     if (/[\u0600-\u06FF]/.test(value)) {
//       setDirection("rtl"); // الكتابة من اليمين لليسار
//     } else {
//       setDirection("ltr"); // الكتابة من اليسار لليمين
//     }
//   };


//   useEffect(() => {
//     const lang = navigator.language || navigator.userLanguage;
//     const isArabic = lang.startsWith('ar');

//     const selectElement = document.querySelector('select');
//     if (selectElement) {
//       selectElement.style.direction = isArabic ? 'rtl' : 'ltr';
//       selectElement.style.textAlign = isArabic ? 'right' : 'left';
//     }
//   }, []);


//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [errorCountry, setErrorCountry] = useState(false);

//   const handleCountryChange = (countryCode) => {
//     setSelectedCountry(countryCode);
//     setErrorCountry(false); // إزالة رسالة الخطأ عند اختيار الدولة
//   };

//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");


//   // const [email, setEmail] = useState("");
//   const [confirmEmail, setConfirmEmail] = useState("");
//   const [errorEmail, setErrorEmail] = useState("");



//   return (
//     <>
//       <div className="container mb-5 mt-3">
//         <div className="row RegisteR">
//           <div className="register_half  col-lg-6">
//             <Register_header />

//           </div>

//           <div className="col-lg-6">
//             <form
//               className="form-container academy p-5 m-auto"
//               onSubmit={handleSubmit}
//             >
//               <h1 className="fw-bold m-auto mb-4 mt-4">إنشاء حساب</h1>

//               <div>
//                 <label>
//                   <span style={{ color: "red" }}>*</span> الاسم الشخصي:
//                 </label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={(e) => {
//                     handleChange(e); // استدعاء الدالة الأولى
//                     handleInputChange(e); // استدعاء الدالة الثانية
//                   }}
//                   required
//                   style={{ direction: direction }}
//                 />
//               </div>

//               <div>
//                 <label>
//                   <span style={{ color: "red" }}>*</span> اسم العائلة:
//                 </label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={(e) => {
//                     handleChange(e); // استدعاء الدالة الأولى
//                     handleInputChange(e); // استدعاء الدالة الثانية
//                   }}
//                   style={{ direction: direction }}

//                   required
//                 />
//               </div>

//               <div>
//                 <label>
//                   <span style={{ color: "red" }}>*</span> دولة الإقامة:
//                 </label>
//                 <WorldFlagsSelect
//                   onSelect={handleCountryChange}
//                   selected={selectedCountry}
//                   searchable
//                   placeholder="اختر دولة"
//                   className="country-select"
//                 />
//                 {errorCountry && (
//                   <span style={{ color: "red", fontSize: "16px" }}>
//                     يرجى اختيار دولة.
//                   </span>
//                 )}
//               </div>

//               <div>
//                 <label>
//                   <span style={{ color: "red" }}>*</span> العمر:
//                 </label>
//                 <select
//                   ref={ageSelectRef}
//                   name="age"
//                   value={formData.age}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">اختر العمر</option>
//                   {Array.from({ length: 100 }, (_, i) => i + 1).map((value) => (
//                     <option key={value} value={value}>
//                       {value}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label>
//                   <span style={{ color: "red" }}>*</span> الجنس:
//                 </label>

//                 <select
//                   ref={genderSelectRef}
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">اختر الجنس</option>
//                   <option value="ذكر">ذكر</option>
//                   <option value="أنثى">أنثى</option>
//                 </select>
//               </div>

//               <div>
//                 <label>
//                   <span style={{ color: "red" }}>*</span> المستوى التعليمي:
//                 </label>
//                 <select
//                   ref={educationSelectRef}
//                   name="educationLevel"
//                   value={formData.educationLevel}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">اختر المستوى التعليمي</option>
//                   <option value="المرحلة الابتدائية">المرحلة الابتدائية</option>
//                   <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>
//                   <option value="المرحلة الثانوية">المرحلة الثانوية</option>
//                   <option value="مرحلة المعاهد المتوسطة">
//                     مرحلة المعاهد المتوسطة
//                   </option>
//                   <option value="مرحلة التعليم الجامعي">
//                     مرحلة التعليم الجامعي
//                   </option>
//                   <option value="مرحلة الدراسات العليا (ماجستير)">
//                     مرحلة الدراسات العليا (ماجستير)
//                   </option>
//                   <option value="مرحلة الدراسات العليا (دكتوراه)">
//                     مرحلة الدراسات العليا (دكتوراه)
//                   </option>
//                 </select>
//               </div>

//               <div>

//                 <label>
//                   <span style={{ color: "red" }}>*</span> مستوى اللغة اليابانية:</label>
//                 <select
//                   ref={japaneseLevelSelectRef}
//                   name="japaneseLevel"
//                   value={formData.japaneseLevel}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">اختر المستوى</option>
//                   <option value="J1">J1</option>
//                   <option value="J2">J2</option>
//                   <option value="J3">J3</option>
//                   <option value="J4">J4</option>
//                   <option value="J5">J5</option>
//                   <option value="J6">J6</option>
//                   <option value="J7">J7</option>
//                   <option value="J8">J8</option>
//                   <option value="J9">J9</option>
//                   <option value="J10">J10</option>
//                   <option value="J11">J11</option>
//                   <option value="J12">J12</option>
//                   <option value="J13">J13</option>
//                   <option value="J14">J14</option>
//                   <option value="J15">J15</option>
//                   <option value="J16">J16</option>
//                 </select>
//                 <h5 className="japaneseLevelLink">يُرجى الضغط <Link to="/Level_division">هنا</Link> للاطلاع على تفاصيل المستويات الدراسية.</h5>
//               </div>

//               <div>
//                 <label>
//                   <span>*</span> رقم الواتساب:
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={(e) => {
//                     handleChange(e); // استدعاء الدالة الأولى
//                     handleInputChange(e); // استدعاء الدالة الثانية
//                   }}
//                   style={{ direction: direction }}
//                 />
//               </div>

//               <div>
//                 <label>
//                   <span style={{ color: "red" }}>*</span> البريد الإلكتروني:
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     setError(""); // إزالة رسالة الخطأ عند الكتابة
//                   }}
//                   style={{ direction: "ltr" }}
//                   required
//                   onPaste={(e) => e.preventDefault()} // تعطيل اللصق
//                 />
//                 {errorEmail && (
//                   <span style={{ color: "red", fontSize: "16px" }}>{error}</span>
//                 )}
//               </div>

//               <div>
//                 <label>
//                   <span style={{ color: "red" }}>*</span> تأكيد البريد الإلكتروني:
//                 </label>
//                 <input
//                   type="email"
//                   value={confirmEmail}
//                   onChange={(e) => {
//                     setConfirmEmail(e.target.value);
//                     setError(""); // إزالة رسالة الخطأ عند الكتابة
//                   }}
//                   style={{ direction: "ltr" }}
//                   required
//                   onPaste={(e) => e.preventDefault()} // تعطيل اللصق
//                 />
//                 {errorEmail && (
//                   <span style={{ color: "red", fontSize: "16px" }}>{error}</span>
//                 )}
//               </div>

//               <div>
//                 <label>
//                   <span style={{ color: "red" }}>*</span> كلمة السر:
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={(e) => {
//                     handleChange(e); // استدعاء الدالة الأولى
//                     handleInputChange(e); // استدعاء الدالة الثانية
//                   }}
//                   style={{ direction: direction }}

//                   required
//                 />
//                 {passwordError && (
//                   <p style={{ color: "red" }}>{passwordError}</p>
//                 )}
//                 <ul className="password">
//                   <li
//                     style={{ color: passwordCriteria.length ? "green" : "red" }}
//                   >
//                     {passwordCriteria.length
//                       ? "-  تحتوي على 8 أحرف على الأقل."
//                       : "- يجب أن تحتوي على 8 أحرف على الأقل."}
//                   </li>
//                   <li
//                     style={{
//                       color: passwordCriteria.uppercase ? "green" : "red",
//                     }}
//                   >
//                     {passwordCriteria.uppercase
//                       ? "-  تحتوي على حرف كبير واحد على الأقل."
//                       : "- يجب أن تحتوي على حرف كبير واحد على الأقل."}
//                   </li>
//                   <li
//                     style={{
//                       color: passwordCriteria.lowercase ? "green" : "red",
//                     }}
//                   >
//                     {passwordCriteria.lowercase
//                       ? "-  تحتوي على حرف صغير واحد على الأقل."
//                       : "- يجب أن تحتوي على حرف صغير واحد على الأقل."}
//                   </li>
//                   <li
//                     style={{ color: passwordCriteria.number ? "green" : "red" }}
//                   >
//                     {passwordCriteria.number
//                       ? "-  تحتوي على رقم واحد على الأقل."
//                       : "- يجب أن تحتوي على رقم واحد على الأقل."}
//                   </li>
//                   <li
//                     style={{
//                       color: passwordCriteria.specialChar ? "green" : "red",
//                     }}
//                   >
//                     {passwordCriteria.specialChar
//                       ? "-  تحتوي على رمز واحد على الأقل."
//                       : "- يجب أن تحتوي على رمز واحد على الأقل."}
//                   </li>
//                 </ul>
//               </div>

//               <div>
//                 <label>
//                   <span style={{ color: "red" }}>*</span> تأكيد كلمة السر:
//                 </label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={(e) => {
//                     handleChange(e); // استدعاء الدالة الأولى
//                     handleInputChange(e); // استدعاء الدالة الثانية
//                   }}
//                   style={{ direction: direction }}
//                   onPaste={(e) => e.preventDefault()}
//                   required
//                 />
//               </div>

//               <button className="mt-4" type="submit" disabled={isRegistering}>
//                 {isRegistering ? "جاري التسجيل..." : "سجل الآن"}
//               </button>
//             </form>

//             {showVerificationField && (
//               <form
//                 className="form-container academy"
//                 onSubmit={handleVerification}
//               >
//                 <label className="fs-5">أدخل كود التحقق:</label>
//                 <input
//                   type="text"
//                   placeholder="أدخل كود التحقق"
//                   value={verificationCode}
//                   onChange={(e) => setVerificationCode(e.target.value)}
//                 />
//                 <button
//                   className="mt-4 mb-5"
//                   type="submit"
//                   disabled={isVerifying}
//                 >
//                   {isVerifying ? "جاري التحقق..." : "تحقق"}
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }




import { useState, useEffect, useRef } from "react";
import "./Register_account.css";
import { useNavigate, Link } from "react-router-dom";
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import Register_header from "../Register_header/Register_header";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";


export default function Register_account() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    age: "",
    gender: "",
    educationLevel: "",
    japaneseLevel: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [direction, setDirection] = useState("ltr");

  const ageSelectRef = useRef(null);
  const countrySelectRef = useRef(null);
  const genderSelectRef = useRef(null);
  const educationSelectRef = useRef(null);
  const japaneseLevelSelectRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [errorCountry, setErrorCountry] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const ageChoices = new Choices(ageSelectRef.current, {
      searchEnabled: false,
      removeItemButton: true,
      direction: "ltr",
    });

    const countryChoices = new Choices(countrySelectRef.current, {
      searchEnabled: false,
      removeItemButton: true,
      direction: "ltr",
    });

    const genderChoices = new Choices(genderSelectRef.current, {
      searchEnabled: false,
      removeItemButton: true,
      direction: "rtl",
    });

    const educationChoices = new Choices(educationSelectRef.current, {
      searchEnabled: false,
      removeItemButton: true,
      direction: "rtl",
    });

    const japaneseLevelChoices = new Choices(japaneseLevelSelectRef.current, {
      searchEnabled: false,
      removeItemButton: true,
      direction: "rtl",
    });

    return () => {
      ageChoices.destroy();
      genderChoices.destroy();
      educationChoices.destroy();
      japaneseLevelChoices.destroy();
      countryChoices.destroy();
    };
  }, []);

  

  useEffect(() => {
    const lang = navigator.language || navigator.userLanguage;
    const isArabic = lang.startsWith('ar');

    const selectElement = document.querySelector('select');
    if (selectElement) {
      selectElement.style.direction = isArabic ? 'rtl' : 'ltr';
      selectElement.style.textAlign = isArabic ? 'right' : 'left';
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*~\-_.]/.test(password),
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


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes(".com")) {
      setErrorEmail("يرجى إدخال بريد إلكتروني صالح (يجب أن يحتوي على .com)");
      return;
    }

    if (!selectedCountry) {
      setErrorCountry(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("كلمات السر غير متطابقة");
      return;
    }

    if (!Object.values(passwordCriteria).every(Boolean)) {
      setPasswordError(
        "يجب أن تحتوي كلمة السر على ٨ أحرف على الأقل، حرف كبير واحد، حرف صغير واحد، رقم واحد، ورمز واحد."
      );
      return;
    } else {
      setPasswordError("");
    }

    setIsRegistering(true);

    fetch("https://api.japaneseacademy.jp/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("حدث خطأ: " + data.error);
        } else {
          alert("تم التسجيل بنجاح، تحقق من بريدك الإلكتروني لتفعيل الحساب");
          setShowVerificationField(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsRegistering(false);
      });
  };

  const handleVerification = (e) => {
    e.preventDefault();
    setIsVerifying(true);

    fetch("https://api.japaneseacademy.jp/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formData.email, verificationCode }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("رمز التحقق غير صحيح");
        } else {
          alert("تم التحقق من البريد الإلكتروني بنجاح");
          navigate("/Login_users/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsVerifying(false);
      });
  };

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    setErrorCountry(false);
  };


  const handlePaste = (e) => {
    e.preventDefault(); // منع اللصق
    alert("لا يُسمح بلصق النص هنا.");
  };


  const [passwordVisible, setPasswordVisible] = useState(false); // حالة لرؤية كلمة المرور
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // حالة لرؤية تأكيد كلمة المرور


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const countries = [
    { code: "AF", name: "أفغانستان", flag: "https://flagcdn.com/w320/af.png" },
    { code: "AL", name: "ألبانيا", flag: "https://flagcdn.com/w320/al.png" },
    { code: "DZ", name: "الجزائر", flag: "https://flagcdn.com/w320/dz.png" },
    { code: "AS", name: "ساموا الأمريكية", flag: "https://flagcdn.com/w320/as.png" },
    { code: "AD", name: "أندورا", flag: "https://flagcdn.com/w320/ad.png" },
    { code: "AO", name: "أنغولا", flag: "https://flagcdn.com/w320/ao.png" },
    { code: "AG", name: "أنتيغوا وباربودا", flag: "https://flagcdn.com/w320/ag.png" },
    { code: "AR", name: "الأرجنتين", flag: "https://flagcdn.com/w320/ar.png" },
    { code: "AM", name: "أرمينيا", flag: "https://flagcdn.com/w320/am.png" },
    { code: "AU", name: "أستراليا", flag: "https://flagcdn.com/w320/au.png" },
    { code: "AT", name: "النمسا", flag: "https://flagcdn.com/w320/at.png" },
    { code: "AZ", name: "أذربيجان", flag: "https://flagcdn.com/w320/az.png" },
    { code: "BS", name: "الباهاما", flag: "https://flagcdn.com/w320/bs.png" },
    { code: "BH", name: "البحرين", flag: "https://flagcdn.com/w320/bh.png" },
    { code: "BD", name: "بنغلاديش", flag: "https://flagcdn.com/w320/bd.png" },
    { code: "BB", name: "بربادوس", flag: "https://flagcdn.com/w320/bb.png" },
    { code: "BY", name: "بيلاروس", flag: "https://flagcdn.com/w320/by.png" },
    { code: "BE", name: "بلجيكا", flag: "https://flagcdn.com/w320/be.png" },
    { code: "BZ", name: "بليز", flag: "https://flagcdn.com/w320/bz.png" },
    { code: "BJ", name: "بنين", flag: "https://flagcdn.com/w320/bj.png" },
    { code: "BT", name: "بوتان", flag: "https://flagcdn.com/w320/bt.png" },
    { code: "BO", name: "بوليفيا", flag: "https://flagcdn.com/w320/bo.png" },
    { code: "BA", name: "البوسنة والهرسك", flag: "https://flagcdn.com/w320/ba.png" },
    { code: "BW", name: "بوتسوانا", flag: "https://flagcdn.com/w320/bw.png" },
    { code: "BR", name: "البرازيل", flag: "https://flagcdn.com/w320/br.png" },
    { code: "BN", name: "بروناي", flag: "https://flagcdn.com/w320/bn.png" },
    { code: "BG", name: "بلغاريا", flag: "https://flagcdn.com/w320/bg.png" },
    { code: "BF", name: "بوركينا فاسو", flag: "https://flagcdn.com/w320/bf.png" },
    { code: "BI", name: "بوروندي", flag: "https://flagcdn.com/w320/bi.png" },
    { code: "CV", name: "الرأس الأخضر", flag: "https://flagcdn.com/w320/cv.png" },
    { code: "KH", name: "كمبوديا", flag: "https://flagcdn.com/w320/kh.png" },
    { code: "CM", name: "الكاميرون", flag: "https://flagcdn.com/w320/cm.png" },
    { code: "CA", name: "كندا", flag: "https://flagcdn.com/w320/ca.png" },
    { code: "CF", name: "جمهورية أفريقيا الوسطى", flag: "https://flagcdn.com/w320/cf.png" },
    { code: "TD", name: "تشاد", flag: "https://flagcdn.com/w320/td.png" },
    { code: "CL", name: "تشيلي", flag: "https://flagcdn.com/w320/cl.png" },
    { code: "CN", name: "الصين", flag: "https://flagcdn.com/w320/cn.png" },
    { code: "CO", name: "كولومبيا", flag: "https://flagcdn.com/w320/co.png" },
    { code: "KM", name: "جزر القمر", flag: "https://flagcdn.com/w320/km.png" },
    { code: "CG", name: "الكونغو", flag: "https://flagcdn.com/w320/cg.png" },
    { code: "CD", name: "الكونغو الديمقراطية", flag: "https://flagcdn.com/w320/cd.png" },
    { code: "CR", name: "كوستاريكا", flag: "https://flagcdn.com/w320/cr.png" },
    { code: "CI", name: "ساحل العاج", flag: "https://flagcdn.com/w320/ci.png" },
    { code: "HR", name: "كرواتيا", flag: "https://flagcdn.com/w320/hr.png" },
    { code: "CU", name: "كوبا", flag: "https://flagcdn.com/w320/cu.png" },
    { code: "CY", name: "قبرص", flag: "https://flagcdn.com/w320/cy.png" },
    { code: "CZ", name: "التشيك", flag: "https://flagcdn.com/w320/cz.png" },
    { code: "DK", name: "الدنمارك", flag: "https://flagcdn.com/w320/dk.png" },
    { code: "DJ", name: "جيبوتي", flag: "https://flagcdn.com/w320/dj.png" },
    { code: "DM", name: "دومينيكا", flag: "https://flagcdn.com/w320/dm.png" },
    { code: "DO", name: "جمهورية الدومينيكان", flag: "https://flagcdn.com/w320/do.png" },
    { code: "EC", name: "الإكوادور", flag: "https://flagcdn.com/w320/ec.png" },
    { code: "EG", name: "مصر", flag: "https://flagcdn.com/w320/eg.png" },
    { code: "SV", name: "السلفادور", flag: "https://flagcdn.com/w320/sv.png" },
    { code: "GQ", name: "غينيا الاستوائية", flag: "https://flagcdn.com/w320/gq.png" },
    { code: "ER", name: "إريتريا", flag: "https://flagcdn.com/w320/er.png" },
    { code: "EE", name: "إستونيا", flag: "https://flagcdn.com/w320/ee.png" },
    { code: "SZ", name: "إسواتيني", flag: "https://flagcdn.com/w320/sz.png" },
    { code: "ET", name: "إثيوبيا", flag: "https://flagcdn.com/w320/et.png" },
    { code: "FJ", name: "فيجي", flag: "https://flagcdn.com/w320/fj.png" },
    { code: "FI", name: "فنلندا", flag: "https://flagcdn.com/w320/fi.png" },
    { code: "FR", name: "فرنسا", flag: "https://flagcdn.com/w320/fr.png" },
    { code: "GA", name: "الغابون", flag: "https://flagcdn.com/w320/ga.png" },
    { code: "GM", name: "غامبيا", flag: "https://flagcdn.com/w320/gm.png" },
    { code: "GE", name: "جورجيا", flag: "https://flagcdn.com/w320/ge.png" },
    { code: "DE", name: "ألمانيا", flag: "https://flagcdn.com/w320/de.png" },
    { code: "GH", name: "غانا", flag: "https://flagcdn.com/w320/gh.png" },
    { code: "GR", name: "اليونان", flag: "https://flagcdn.com/w320/gr.png" },
    { code: "GD", name: "غرينادا", flag: "https://flagcdn.com/w320/gd.png" },
    { code: "GT", name: "غواتيمالا", flag: "https://flagcdn.com/w320/gt.png" },
    { code: "GN", name: "غينيا", flag: "https://flagcdn.com/w320/gn.png" },
    { code: "GW", name: "غينيا بيساو", flag: "https://flagcdn.com/w320/gw.png" },
    { code: "GY", name: "غيانا", flag: "https://flagcdn.com/w320/gy.png" },
    { code: "HT", name: "هايتي", flag: "https://flagcdn.com/w320/ht.png" },
    { code: "HN", name: "هندوراس", flag: "https://flagcdn.com/w320/hn.png" },
    { code: "HU", name: "المجر", flag: "https://flagcdn.com/w320/hu.png" },
    { code: "IS", name: "أيسلندا", flag: "https://flagcdn.com/w320/is.png" },
    { code: "IN", name: "الهند", flag: "https://flagcdn.com/w320/in.png" },
    { code: "ID", name: "إندونيسيا", flag: "https://flagcdn.com/w320/id.png" },
    { code: "IR", name: "إيران", flag: "https://flagcdn.com/w320/ir.png" },
    { code: "IQ", name: "العراق", flag: "https://flagcdn.com/w320/iq.png" },
    { code: "IE", name: "أيرلندا", flag: "https://flagcdn.com/w320/ie.png" },
    { code: "FA", name: "فلسطين", flag: "https://flagcdn.com/w320/il.png" },
    { code: "IT", name: "إيطاليا", flag: "https://flagcdn.com/w320/it.png" },
    { code: "JM", name: "جامايكا", flag: "https://flagcdn.com/w320/jm.png" },
    { code: "JP", name: "اليابان", flag: "https://flagcdn.com/w320/jp.png" },
    { code: "JO", name: "الأردن", flag: "https://flagcdn.com/w320/jo.png" },
    { code: "KZ", name: "كازاخستان", flag: "https://flagcdn.com/w320/kz.png" },
    { code: "KE", name: "كينيا", flag: "https://flagcdn.com/w320/ke.png" },
    { code: "KI", name: "كيريباتي", flag: "https://flagcdn.com/w320/ki.png" },
    { code: "KP", name: "كوريا الشمالية", flag: "https://flagcdn.com/w320/kp.png" },
    { code: "KR", name: "كوريا الجنوبية", flag: "https://flagcdn.com/w320/kr.png" },
    { code: "KW", name: "الكويت", flag: "https://flagcdn.com/w320/kw.png" },
    { code: "KG", name: "قيرغيزستان", flag: "https://flagcdn.com/w320/kg.png" },
    { code: "LA", name: "لاوس", flag: "https://flagcdn.com/w320/la.png" },
    { code: "LV", name: "لاتفيا", flag: "https://flagcdn.com/w320/lv.png" },
    { code: "LB", name: "لبنان", flag: "https://flagcdn.com/w320/lb.png" },
    { code: "LS", name: "ليسوتو", flag: "https://flagcdn.com/w320/ls.png" },
    { code: "LR", name: "ليبيريا", flag: "https://flagcdn.com/w320/lr.png" },
    { code: "LY", name: "ليبيا", flag: "https://flagcdn.com/w320/ly.png" },
    { code: "LI", name: "ليختنشتاين", flag: "https://flagcdn.com/w320/li.png" },
    { code: "LT", name: "ليتوانيا", flag: "https://flagcdn.com/w320/lt.png" },
    { code: "LU", name: "لوكسمبورغ", flag: "https://flagcdn.com/w320/lu.png" },
    { code: "MG", name: "مدغشقر", flag: "https://flagcdn.com/w320/mg.png" },
    { code: "MW", name: "مالاوي", flag: "https://flagcdn.com/w320/mw.png" },
    { code: "MY", name: "ماليزيا", flag: "https://flagcdn.com/w320/my.png" },
    { code: "MV", name: "المالديف", flag: "https://flagcdn.com/w320/mv.png" },
    { code: "ML", name: "مالي", flag: "https://flagcdn.com/w320/ml.png" },
    { code: "MT", name: "مالطا", flag: "https://flagcdn.com/w320/mt.png" },
    { code: "MH", name: "جزر مارشال", flag: "https://flagcdn.com/w320/mh.png" },
    { code: "MR", name: "موريتانيا", flag: "https://flagcdn.com/w320/mr.png" },
    { code: "MU", name: "موريشيوس", flag: "https://flagcdn.com/w320/mu.png" },
    { code: "MX", name: "المكسيك", flag: "https://flagcdn.com/w320/mx.png" },
    { code: "FM", name: "ميكرونيزيا", flag: "https://flagcdn.com/w320/fm.png" },
    { code: "MD", name: "مولدوفا", flag: "https://flagcdn.com/w320/md.png" },
    { code: "MC", name: "موناكو", flag: "https://flagcdn.com/w320/mc.png" },
    { code: "MN", name: "منغوليا", flag: "https://flagcdn.com/w320/mn.png" },
    { code: "ME", name: "الجبل الأسود", flag: "https://flagcdn.com/w320/me.png" },
    { code: "MA", name: "المغرب", flag: "https://flagcdn.com/w320/ma.png" },
    { code: "MZ", name: "موزمبيق", flag: "https://flagcdn.com/w320/mz.png" },
    { code: "MM", name: "ميانمار", flag: "https://flagcdn.com/w320/mm.png" },
    { code: "NA", name: "ناميبيا", flag: "https://flagcdn.com/w320/na.png" },
    { code: "NR", name: "ناورو", flag: "https://flagcdn.com/w320/nr.png" },
    { code: "NP", name: "نيبال", flag: "https://flagcdn.com/w320/np.png" },
    { code: "NL", name: "هولندا", flag: "https://flagcdn.com/w320/nl.png" },
    { code: "NZ", name: "نيوزيلندا", flag: "https://flagcdn.com/w320/nz.png" },
    { code: "NI", name: "نيكاراغوا", flag: "https://flagcdn.com/w320/ni.png" },
    { code: "NE", name: "النيجر", flag: "https://flagcdn.com/w320/ne.png" },
    { code: "NG", name: "نيجيريا", flag: "https://flagcdn.com/w320/ng.png" },
    { code: "NO", name: "النرويج", flag: "https://flagcdn.com/w320/no.png" },
    { code: "OM", name: "عمان", flag: "https://flagcdn.com/w320/om.png" },
    { code: "PK", name: "باكستان", flag: "https://flagcdn.com/w320/pk.png" },
    { code: "PW", name: "بالاو", flag: "https://flagcdn.com/w320/pw.png" },
    { code: "PS", name: "فلسطين", flag: "https://flagcdn.com/w320/ps.png" },
    { code: "PA", name: "بنما", flag: "https://flagcdn.com/w320/pa.png" },
    { code: "PG", name: "بابوا غينيا الجديدة", flag: "https://flagcdn.com/w320/pg.png" },
    { code: "PY", name: "باراغواي", flag: "https://flagcdn.com/w320/py.png" },
    { code: "PE", name: "بيرو", flag: "https://flagcdn.com/w320/pe.png" },
    { code: "PH", name: "الفلبين", flag: "https://flagcdn.com/w320/ph.png" },
    { code: "PL", name: "بولندا", flag: "https://flagcdn.com/w320/pl.png" },
    { code: "PT", name: "البرتغال", flag: "https://flagcdn.com/w320/pt.png" },
    { code: "QA", name: "قطر", flag: "https://flagcdn.com/w320/qa.png" },
    { code: "RO", name: "رومانيا", flag: "https://flagcdn.com/w320/ro.png" },
    { code: "RU", name: "روسيا", flag: "https://flagcdn.com/w320/ru.png" },
    { code: "RW", name: "رواندا", flag: "https://flagcdn.com/w320/rw.png" },
    { code: "KN", name: "سانت كيتس ونيفيس", flag: "https://flagcdn.com/w320/kn.png" },
    { code: "LC", name: "سانت لوسيا", flag: "https://flagcdn.com/w320/lc.png" },
    { code: "VC", name: "سانت فنسنت وجزر غرينادين", flag: "https://flagcdn.com/w320/vc.png" },
    { code: "WS", name: "ساموا", flag: "https://flagcdn.com/w320/ws.png" },
    { code: "SM", name: "سان مارينو", flag: "https://flagcdn.com/w320/sm.png" },
    { code: "ST", name: "ساو تومي وبرينسيب", flag: "https://flagcdn.com/w320/st.png" },
    { code: "SA", name: "المملكة العربية السعودية", flag: "https://flagcdn.com/w320/sa.png" },
    { code: "SN", name: "السنغال", flag: "https://flagcdn.com/w320/sn.png" },
    { code: "RS", name: "صربيا", flag: "https://flagcdn.com/w320/rs.png" },
    { code: "SC", name: "سيشل", flag: "https://flagcdn.com/w320/sc.png" },
    { code: "SL", name: "سيراليون", flag: "https://flagcdn.com/w320/sl.png" },
    { code: "SG", name: "سنغافورة", flag: "https://flagcdn.com/w320/sg.png" },
    { code: "SK", name: "سلوفاكيا", flag: "https://flagcdn.com/w320/sk.png" },
    { code: "SI", name: "سلوفينيا", flag: "https://flagcdn.com/w320/si.png" },
    { code: "SB", name: "جزر سليمان", flag: "https://flagcdn.com/w320/sb.png" },
    { code: "SO", name: "الصومال", flag: "https://flagcdn.com/w320/so.png" },
    { code: "ZA", name: "جنوب أفريقيا", flag: "https://flagcdn.com/w320/za.png" },
    { code: "ES", name: "إسبانيا", flag: "https://flagcdn.com/w320/es.png" },
    { code: "LK", name: "سريلانكا", flag: "https://flagcdn.com/w320/lk.png" },
    { code: "SD", name: "السودان", flag: "https://flagcdn.com/w320/sd.png" },
    { code: "SR", name: "سورينام", flag: "https://flagcdn.com/w320/sr.png" },
    { code: "SE", name: "السويد", flag: "https://flagcdn.com/w320/se.png" },
    { code: "CH", name: "سويسرا", flag: "https://flagcdn.com/w320/ch.png" },
    { code: "SY", name: "سوريا", flag: "https://flagcdn.com/w320/sy.png" },
    { code: "TJ", name: "طاجيكستان", flag: "https://flagcdn.com/w320/tj.png" },
    { code: "TZ", name: "تنزانيا", flag: "https://flagcdn.com/w320/tz.png" },
    { code: "TH", name: "تايلاند", flag: "https://flagcdn.com/w320/th.png" },
    { code: "TL", name: "تيمور الشرقية", flag: "https://flagcdn.com/w320/tl.png" },
    { code: "TG", name: "توغو", flag: "https://flagcdn.com/w320/tg.png" },
    { code: "TO", name: "تونغا", flag: "https://flagcdn.com/w320/to.png" },
    { code: "TT", name: "ترينيداد وتوباغو", flag: "https://flagcdn.com/w320/tt.png" },
    { code: "TN", name: "تونس", flag: "https://flagcdn.com/w320/tn.png" },
    { code: "TR", name: "تركيا", flag: "https://flagcdn.com/w320/tr.png" },
    { code: "TM", name: "تركمانستان", flag: "https://flagcdn.com/w320/tm.png" },
    { code: "TV", name: "توفالو", flag: "https://flagcdn.com/w320/tv.png" },
    { code: "UG", name: "أوغندا", flag: "https://flagcdn.com/w320/ug.png" },
    { code: "UA", name: "أوكرانيا", flag: "https://flagcdn.com/w320/ua.png" },
    { code: "AE", name: "الإمارات العربية المتحدة", flag: "https://flagcdn.com/w320/ae.png" },
    { code: "GB", name: "المملكة المتحدة", flag: "https://flagcdn.com/w320/gb.png" },
    { code: "US", name: "الولايات المتحدة الأمريكية", flag: "https://flagcdn.com/w320/us.png" },
    { code: "UY", name: "أوروغواي", flag: "https://flagcdn.com/w320/uy.png" },
    { code: "UZ", name: "أوزبكستان", flag: "https://flagcdn.com/w320/uz.png" },
    { code: "VU", name: "فانواتو", flag: "https://flagcdn.com/w320/vu.png" },
    { code: "VA", name: "الفاتيكان", flag: "https://flagcdn.com/w320/va.png" },
    { code: "VE", name: "فنزويلا", flag: "https://flagcdn.com/w320/ve.png" },
    { code: "VN", name: "فيتنام", flag: "https://flagcdn.com/w320/vn.png" },
    { code: "YE", name: "اليمن", flag: "https://flagcdn.com/w320/ye.png" },
    { code: "ZM", name: "زامبيا", flag: "https://flagcdn.com/w320/zm.png" },
    { code: "ZW", name: "زيمبابوي", flag: "https://flagcdn.com/w320/zw.png" }
  ];


  return (
    <div className="container mb-5 mt-3">
      <div className="row RegisteR">
        <div className="register_half col-lg-6">
          <Register_header />
        </div>

        <div className="col-lg-6">
          <form className="form-container academy p-5 m-auto" onSubmit={handleSubmit}>
            <h1 className="fw-bold m-auto mb-4 mt-4">إنشاء حساب</h1>

            <div>
              <label><span style={{ color: "red" }}>*</span> الاسم الشخصي:</label>
              <input type="text" name="firstName" required
                value={formData.firstName}
                onChange={(e) => {
                  handleChange(e); // استدعاء الدالة الأولى
                  handleInputChange(e); // استدعاء الدالة الثانية
                }}
                style={{ direction }}
              />
            </div>

            <div>
              <label><span style={{ color: "red" }}>*</span> اسم العائلة:</label>
              <input type="text" name="lastName" required
                value={formData.lastName}
                onChange={(e) => {
                  handleChange(e); // استدعاء الدالة الأولى
                  handleInputChange(e); // استدعاء الدالة الثانية
                }}
                style={{ direction }}
              />
            </div>

            <div>
              <label><span style={{ color: "red" }}>*</span> دولة الإقامة:</label>
              <select
              ref={countrySelectRef}
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="country-select"
              >
                <option value="" disabled>اختر دولة</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {/* <img src={country.flag} alt={country.name} width="50px" height="30px" /> */}

                    {country.name}
                  </option>
                ))}
              </select>
              {errorCountry && (
                <span style={{ color: "red", fontSize: "16px" }}>يرجى اختيار دولة.</span>
              )}
            </div>

            <div>
              <label><span style={{ color: "red" }}>*</span> العمر:</label>
              <select ref={ageSelectRef} name="age" required onChange={handleChange}>
                <option value="">اختر العمر</option>
                {Array.from({ length: 100 }, (_, i) => i + 1).map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>

            <div>
              <label><span style={{ color: "red" }}>*</span> الجنس:</label>
              <select ref={genderSelectRef} name="gender" required onChange={handleChange}>
                <option value="">اختر الجنس</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
            </div>

            <div>
              <label><span style={{ color: "red" }}>*</span> المستوى التعليمي:</label>
              <select ref={educationSelectRef} name="educationLevel" required onChange={handleChange}>
                <option value="">اختر المستوى التعليمي</option>
                <option value="المرحلة الابتدائية">المرحلة الابتدائية</option>
                <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>
                <option value="المرحلة الثانوية">المرحلة الثانوية</option>
                <option value="مرحلة المعاهد المتوسطة">مرحلة المعاهد المتوسطة</option>
                <option value="مرحلة التعليم الجامعي">مرحلة التعليم الجامعي</option>
                <option value="مرحلة الدراسات العليا (ماجستير)">مرحلة الدراسات العليا (ماجستير)</option>
                <option value="مرحلة الدراسات العليا (دكتوراه)">مرحلة الدراسات العليا (دكتوراه)</option>
              </select>
            </div>

            <div>
              <label><span style={{ color: "red" }}>*</span> مستوى اللغة اليابانية:</label>
              <select ref={japaneseLevelSelectRef} name="japaneseLevel" required onChange={handleChange}>
                <option value="">اختر مستوى اللغة اليابانية</option>
                {Array.from({ length: 16 }, (_, index) => `J${index + 1}`).map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
              <h5 className="japaneseLevelLink">
                يُرجى الضغط <Link to="/Level_division">هنا</Link> للاطلاع على تفاصيل المستويات الدراسية.
              </h5>
            </div>

            <div>
              <label>رقم الواتساب:</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ direction }} />
            </div>

            <div>
              <label><span style={{ color: "red" }}>*</span> البريد الإلكتروني:</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ direction: "ltr" }} />
              {errorEmail && <span style={{ direction: "ltr", color: "red", fontSize: "16px" }}>{error}</span>}
            </div>

            <div>
              <label><span style={{ color: "red" }}>*</span> تأكيد البريد الإلكتروني:</label>
              <input type="email" required value={confirmEmail} onPaste={handlePaste} onChange={(e) => setConfirmEmail(e.target.value)} style={{ direction: "ltr" }} />
              {errorEmail && <span style={{ direction: "ltr", color: "red", fontSize: "16px" }}>{error}</span>}
            </div>

            <div>
              <div>
                <label><span style={{ color: "red" }}>*</span> كلمة السر:</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={(e) => {
                      handleChange(e); // استدعاء الدالة الأولى
                      handleInputChange(e); // استدعاء الدالة الثانية
                    }}
                    onPaste={handlePaste} // منع اللصق
                    style={{ direction: "ltr", paddingRight: "30px" }}
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
                    {passwordVisible ? <FaEyeSlash /> : <IoEyeSharp />} {/* رموز العين */}
                  </span>
                </div>
                {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
                <ul className="password">
                  <li style={{ color: passwordCriteria.length ? "green" : "red" }}>
                    {passwordCriteria.length ? "-  تحتوي على 8 أحرف على الأقل." : "- يجب أن تحتوي على 8 أحرف على الأقل."}
                  </li>
                  <li style={{ color: passwordCriteria.uppercase ? "green" : "red" }}>
                    {passwordCriteria.uppercase ? "-  تحتوي على حرف كبير واحد على الأقل." : "- يجب أن تحتوي على حرف كبير واحد على الأقل."}
                  </li>
                  <li style={{ color: passwordCriteria.lowercase ? "green" : "red" }}>
                    {passwordCriteria.lowercase ? "-  تحتوي على حرف صغير واحد على الأقل." : "- يجب أن تحتوي على حرف صغير واحد على الأقل."}
                  </li>
                  <li style={{ color: passwordCriteria.number ? "green" : "red" }}>
                    {passwordCriteria.number ? "-  تحتوي على رقم واحد على الأقل." : "- يجب أن تحتوي على رقم واحد على الأقل."}
                  </li>
                  <li style={{ color: passwordCriteria.specialChar ? "green" : "red" }}>
                  {passwordCriteria.specialChar
    ? "- تحتوي على رمز واحد على الأقل (!@#$%^&*~-_.)."
    : "- يجب أن تحتوي على رمز واحد على الأقل (!@#$%^&*~-_.)."}
                  </li>
                </ul>
              </div>

              <div>
                <label><span style={{ color: "red" }}>*</span> تأكيد كلمة السر:</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      handleChange(e); // استدعاء الدالة الأولى
                      handleInputChange(e); // استدعاء الدالة الثانية
                    }} onPaste={handlePaste} // منع اللصق
                    style={{ direction: "ltr", paddingRight: "30px" }}
                  />
                  <span
                    onClick={toggleConfirmPasswordVisibility}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      cursor: "pointer",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <IoEyeSharp />} {/* رموز العين */}
                  </span>
                </div>
              </div>
            </div>
            <button className="mt-4" type="submit" disabled={isRegistering}>
              {isRegistering ? "جاري التسجيل..." : "سجل الآن"}
            </button>
          </form>

          {showVerificationField && (
            <form className="form-container academy" onSubmit={handleVerification}>
              <label className="fs-5">أدخل كود التحقق:</label>
              <input type="text" placeholder="أدخل كود التحقق" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
              <button className="mt-4 mb-5" type="submit" disabled={isVerifying}>
                {isVerifying ? "جاري التحقق..." : "تحقق"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}