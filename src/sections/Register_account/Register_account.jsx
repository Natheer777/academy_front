import { useState, useEffect, useRef } from "react";
import "./Register_account.css";
import { useNavigate, Link } from "react-router-dom";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
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
    const isArabic = lang.startsWith("ar");

    const selectElement = document.querySelector("select");
    if (selectElement) {
      selectElement.style.direction = isArabic ? "rtl" : "ltr";
      selectElement.style.textAlign = isArabic ? "right" : "left";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("بيانات الإرسال:", formData);

    // التحقق من تطابق البريد الإلكتروني وتأكيده
    if (formData.email !== confirmEmail) {
      setErrorEmail("يجب أن يكون البريد الإلكتروني صحيحًا ومتطابقًا.");
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
        "يجب أن تحتوي كلمة السر على ٨ أحرف على الأقل، حرف كبير واحد، حرف صغير واحد، رقم واحد، ورمز خاص."
      );
      return;
    } else {
      setPasswordError("");
    }

    setIsRegistering(true);

    try {
      const response = await fetch("https://api.japaneseacademy.jp/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, country: selectedCountry }),
      });

      const data = await response.json();
      if (data.error) {
        alert(`حدث خطأ: ${data.error}`);
      } else {
        alert("تم التسجيل بنجاح، تحقق من بريدك الإلكتروني لتفعيل الحساب");
        setShowVerificationField(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsRegistering(false);
    }
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
    { code: "DZ", name: "الجزائر", flag: "https://flagcdn.com/w320/dz.png" },
    { code: "BH", name: "البحرين", flag: "https://flagcdn.com/w320/bh.png" },
    { code: "KM", name: "جزر القمر", flag: "https://flagcdn.com/w320/km.png" },
    { code: "DJ", name: "جيبوتي", flag: "https://flagcdn.com/w320/dj.png" },
    { code: "EG", name: "مصر", flag: "https://flagcdn.com/w320/eg.png" },
    { code: "IQ", name: "العراق", flag: "https://flagcdn.com/w320/iq.png" },
    { code: "JO", name: "الأردن", flag: "https://flagcdn.com/w320/jo.png" },
    { code: "KW", name: "الكويت", flag: "https://flagcdn.com/w320/kw.png" },
    { code: "LB", name: "لبنان", flag: "https://flagcdn.com/w320/lb.png" },
    { code: "LY", name: "ليبيا", flag: "https://flagcdn.com/w320/ly.png" },
    { code: "MR", name: "موريتانيا", flag: "https://flagcdn.com/w320/mr.png" },
    { code: "MA", name: "المغرب", flag: "https://flagcdn.com/w320/ma.png" },
    { code: "OM", name: "عمان", flag: "https://flagcdn.com/w320/om.png" },
    { code: "PS", name: "فلسطين", flag: "https://flagcdn.com/w320/ps.png" },
    { code: "QA", name: "قطر", flag: "https://flagcdn.com/w320/qa.png" },
    { code: "SA", name: "السعودية", flag: "https://flagcdn.com/w320/sa.png" },
    { code: "SO", name: "الصومال", flag: "https://flagcdn.com/w320/so.png" },
    { code: "SD", name: "السودان", flag: "https://flagcdn.com/w320/sd.png" },
    { code: "SY", name: "سوريا", flag: "https://flagcdn.com/w320/sy.png" },
    { code: "TN", name: "تونس", flag: "https://flagcdn.com/w320/tn.png" },
    { code: "AE", name: "الإمارات", flag: "https://flagcdn.com/w320/ae.png" },
    { code: "YE", name: "اليمن", flag: "https://flagcdn.com/w320/ye.png" },

    // باقي الدول بترتيبها السابق
    { code: "AF", name: "أفغانستان", flag: "https://flagcdn.com/w320/af.png" },
    { code: "AL", name: "ألبانيا", flag: "https://flagcdn.com/w320/al.png" },
    {
      code: "AS",
      name: "ساموا الأمريكية",
      flag: "https://flagcdn.com/w320/as.png",
    },
    { code: "AD", name: "أندورا", flag: "https://flagcdn.com/w320/ad.png" },
    { code: "AO", name: "أنغولا", flag: "https://flagcdn.com/w320/ao.png" },
    {
      code: "AG",
      name: "أنتيغوا وباربودا",
      flag: "https://flagcdn.com/w320/ag.png",
    },
    { code: "AR", name: "الأرجنتين", flag: "https://flagcdn.com/w320/ar.png" },
    { code: "AM", name: "أرمينيا", flag: "https://flagcdn.com/w320/am.png" },
    { code: "AU", name: "أستراليا", flag: "https://flagcdn.com/w320/au.png" },
    { code: "AT", name: "النمسا", flag: "https://flagcdn.com/w320/at.png" },
    { code: "AZ", name: "أذربيجان", flag: "https://flagcdn.com/w320/az.png" },
    { code: "BS", name: "الباهاما", flag: "https://flagcdn.com/w320/bs.png" },
    { code: "BD", name: "بنغلاديش", flag: "https://flagcdn.com/w320/bd.png" },
    { code: "BB", name: "بربادوس", flag: "https://flagcdn.com/w320/bb.png" },
    { code: "BY", name: "بيلاروس", flag: "https://flagcdn.com/w320/by.png" },
    { code: "BE", name: "بلجيكا", flag: "https://flagcdn.com/w320/be.png" },
    { code: "BZ", name: "بليز", flag: "https://flagcdn.com/w320/bz.png" },
    { code: "BJ", name: "بنين", flag: "https://flagcdn.com/w320/bj.png" },
    { code: "BT", name: "بوتان", flag: "https://flagcdn.com/w320/bt.png" },
    { code: "BO", name: "بوليفيا", flag: "https://flagcdn.com/w320/bo.png" },
    {
      code: "BA",
      name: "البوسنة والهرسك",
      flag: "https://flagcdn.com/w320/ba.png",
    },
    { code: "BW", name: "بوتسوانا", flag: "https://flagcdn.com/w320/bw.png" },
    { code: "BR", name: "البرازيل", flag: "https://flagcdn.com/w320/br.png" },
    { code: "BN", name: "بروناي", flag: "https://flagcdn.com/w320/bn.png" },
    { code: "BG", name: "بلغاريا", flag: "https://flagcdn.com/w320/bg.png" },
    {
      code: "BF",
      name: "بوركينا فاسو",
      flag: "https://flagcdn.com/w320/bf.png",
    },
    { code: "BI", name: "بوروندي", flag: "https://flagcdn.com/w320/bi.png" },
    {
      code: "CV",
      name: "الرأس الأخضر",
      flag: "https://flagcdn.com/w320/cv.png",
    },
    { code: "KH", name: "كمبوديا", flag: "https://flagcdn.com/w320/kh.png" },
    { code: "CM", name: "الكاميرون", flag: "https://flagcdn.com/w320/cm.png" },
    { code: "CA", name: "كندا", flag: "https://flagcdn.com/w320/ca.png" },
    {
      code: "CF",
      name: "جمهورية أفريقيا الوسطى",
      flag: "https://flagcdn.com/w320/cf.png",
    },
    { code: "TD", name: "تشاد", flag: "https://flagcdn.com/w320/td.png" },
    { code: "CL", name: "تشيلي", flag: "https://flagcdn.com/w320/cl.png" },
    { code: "CN", name: "الصين", flag: "https://flagcdn.com/w320/cn.png" },
    { code: "CO", name: "كولومبيا", flag: "https://flagcdn.com/w320/co.png" },
    { code: "CG", name: "الكونغو", flag: "https://flagcdn.com/w320/cg.png" },
    {
      code: "CD",
      name: "الكونغو الديمقراطية",
      flag: "https://flagcdn.com/w320/cd.png",
    },
  ];

  const handleCountryChange = (countryCode) => {
    const countryName =
      countries.find((c) => c.code === countryCode)?.name || "";
    setSelectedCountry(countryName);
    setErrorCountry(false);
    setFormData((prev) => ({ ...prev, country: countryName }));
  };

  return (
    <div className="container mb-5 mt-3">
      <div className="row RegisteR">
        <div className="register_half col-lg-6">
          <Register_header />
        </div>

        <div className="col-lg-6">
          <form
            className="form-container academy p-5 m-auto"
            onSubmit={handleSubmit}
          >
            <h1 className="fw-bold m-auto mb-4 mt-4">إنشاء حساب</h1>

            <div>
              <label>
                <span style={{ color: "red" }}>*</span> الاسم الشخصي:
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={(e) => {
                  handleChange(e); // استدعاء الدالة الأولى
                  handleInputChange(e); // استدعاء الدالة الثانية
                }}
                style={{ direction }}
              />
            </div>

            <div>
              <label>
                <span style={{ color: "red" }}>*</span> اسم العائلة:
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={(e) => {
                  handleChange(e); // استدعاء الدالة الأولى
                  handleInputChange(e); // استدعاء الدالة الثانية
                }}
                style={{ direction }}
              />
            </div>

            <div>
              <label>
                <span style={{ color: "red" }}>*</span> دولة الإقامة:
              </label>
              <select
                ref={countrySelectRef}
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="country-select"
              >
                <option value="" disabled>
                  اختر دولة
                </option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {/* <img src={country.flag} alt={country.name} className="img-fluid" style={{ width: "50px", height: "30px" }} /> */}

                    {country.name}
                  </option>
                ))}
              </select>
              {errorCountry && (
                <span style={{ color: "red", fontSize: "16px" }}>
                  يرجى اختيار دولة.
                </span>
              )}
            </div>

            <div>
              <label>
                <span style={{ color: "red" }}>*</span> العمر:
              </label>
              <select
                ref={ageSelectRef}
                name="age"
                required
                onChange={handleChange}
              >
                <option value="">اختر العمر</option>
                {Array.from({ length: 100 }, (_, i) => i + 1).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>
                <span style={{ color: "red" }}>*</span> الجنس:
              </label>
              <select
                ref={genderSelectRef}
                name="gender"
                required
                onChange={handleChange}
              >
                <option value="">اختر الجنس</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
            </div>

            <div>
              <label>
                <span style={{ color: "red" }}>*</span> المستوى التعليمي:
              </label>
              <select
                ref={educationSelectRef}
                name="educationLevel"
                required
                onChange={handleChange}
              >
                <option value="">اختر المستوى التعليمي</option>
                <option value="المرحلة الابتدائية">المرحلة الابتدائية</option>
                <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>
                <option value="المرحلة الثانوية">المرحلة الثانوية</option>
                <option value="مرحلة التعليم الجامعي">
                  مرحلة التعليم الجامعي
                </option>
                <option value="مرحلة المعاهد المتوسطة">
                  مرحلة المعاهد المتوسطة
                </option>
                <option value="مرحلة الدراسات العليا (ماجستير)">
                  مرحلة الدراسات العليا (ماجستير)
                </option>
                <option value="مرحلة الدراسات العليا (دكتوراه)">
                  مرحلة الدراسات العليا (دكتوراه)
                </option>
              </select>
            </div>

            <div>
              <label>
                <span style={{ color: "red" }}>*</span> مستوى اللغة اليابانية:
              </label>
              <select
                ref={japaneseLevelSelectRef}
                name="japaneseLevel"
                required
                onChange={handleChange}
              >
                <option value="">اختر مستوى اللغة اليابانية</option>
                {Array.from({ length: 16 }, (_, index) => `J${index + 1}`).map(
                  (value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  )
                )}
              </select>
              <h5 className="japaneseLevelLink">
                يُرجى الضغط <Link to="/Level_division">هنا</Link> للاطلاع على
                تفاصيل المستويات الدراسية.
              </h5>
            </div>

            <div>
              <label>رقم الواتساب:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{ direction }}
              />
            </div>

            <div>
              <label>
                <span style={{ color: "red" }}>*</span> البريد الإلكتروني:
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email} // استخدام formData.email بدلاً من confirmEmail
                onChange={handleChange}
                style={{ direction: "ltr" }}
              />

              {errorEmail && (
                <span
                  style={{ direction: "ltr", color: "red", fontSize: "16px" }}
                >
                  {error}
                </span>
              )}
            </div>

            <div>
              <label>
                <span style={{ color: "red" }}>*</span> تأكيد البريد الإلكتروني:
              </label>
              <input
                type="email"
                required
                value={confirmEmail}
                onPaste={handlePaste}
                onChange={(e) => setConfirmEmail(e.target.value)}
                style={{ direction: "ltr" }}
              />
              {errorEmail && (
                <span
                  style={{ direction: "ltr", color: "red", fontSize: "16px" }}
                >
                  {error}
                </span>
              )}
            </div>

            <div>
              <div>
                <label>
                  <span style={{ color: "red" }}>*</span> كلمة السر:
                </label>
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
                    {passwordVisible ? <FaEyeSlash /> : <IoEyeSharp />}{" "}
                    {/* رموز العين */}
                  </span>
                </div>
                {passwordError && (
                  <p style={{ color: "red" }}>{passwordError}</p>
                )}
                <ul className="password">
                  <li
                    style={{ color: passwordCriteria.length ? "green" : "red" }}
                  >
                    {passwordCriteria.length
                      ? "-  تحتوي على 8 أحرف على الأقل."
                      : "- يجب أن تحتوي على 8 أحرف على الأقل."}
                  </li>
                  <li
                    style={{
                      color: passwordCriteria.uppercase ? "green" : "red",
                    }}
                  >
                    {passwordCriteria.uppercase
                      ? "-  تحتوي على حرف كبير واحد على الأقل."
                      : "- يجب أن تحتوي على حرف كبير واحد على الأقل."}
                  </li>
                  <li
                    style={{
                      color: passwordCriteria.lowercase ? "green" : "red",
                    }}
                  >
                    {passwordCriteria.lowercase
                      ? "-  تحتوي على حرف صغير واحد على الأقل."
                      : "- يجب أن تحتوي على حرف صغير واحد على الأقل."}
                  </li>
                  <li
                    style={{ color: passwordCriteria.number ? "green" : "red" }}
                  >
                    {passwordCriteria.number
                      ? "-  تحتوي على رقم واحد على الأقل."
                      : "- يجب أن تحتوي على رقم واحد على الأقل."}
                  </li>
                  <li
                    style={{
                      color: passwordCriteria.specialChar ? "green" : "red",
                    }}
                  >
                    {passwordCriteria.specialChar
                      ? "- تحتوي على رمز واحد على الأقل (!@#$%^&*~-_.)."
                      : "- يجب أن تحتوي على رمز واحد على الأقل (!@#$%^&*~-_.)."}
                  </li>
                </ul>
              </div>

              <div>
                <label>
                  <span style={{ color: "red" }}>*</span> تأكيد كلمة السر:
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      handleChange(e); // استدعاء الدالة الأولى
                      handleInputChange(e); // استدعاء الدالة الثانية
                    }}
                    onPaste={handlePaste} // منع اللصق
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
                    {confirmPasswordVisible ? <FaEyeSlash /> : <IoEyeSharp />}{" "}
                    {/* رموز العين */}
                  </span>
                </div>
              </div>
            </div>
            <button className="mt-4" type="submit" disabled={isRegistering}>
              {isRegistering ? "جاري التسجيل..." : "سجل الآن"}
            </button>
          </form>

          {showVerificationField && (
            <form
              className="form-container academy"
              onSubmit={handleVerification}
            >
              <label className="fs-5">أدخل كود التحقق:</label>
              <input
                type="text"
                placeholder="أدخل كود التحقق"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value);
                  handleInputChange(e);
                }}
              />
              <button
                className="mt-4 mb-5"
                type="submit"
                disabled={isVerifying}
              >
                {isVerifying ? "جاري التحقق..." : "تحقق"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
