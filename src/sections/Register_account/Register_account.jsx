import { useState } from "react";
import "./Register_account.css";
import { useNavigate } from "react-router-dom";
import register_img from "../../assets/Image/undraw_Team_page_re_cffb.png";

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

  const [isRegistering, setIsRegistering] = useState(false); // للتحكم في حالة الزر أثناء التسجيل
  const [isVerifying, setIsVerifying] = useState(false); // للتحكم في حالة الزر أثناء التحقق

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password") {
      const password = e.target.value;
      setPasswordCriteria({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[@$!%*?&]/.test(password),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("كلمات السر غير متطابقة");
      return;
    }

    if (
      !passwordCriteria.length ||
      !passwordCriteria.uppercase ||
      !passwordCriteria.lowercase ||
      !passwordCriteria.number ||
      !passwordCriteria.specialChar
    ) {
      setPasswordError(
        "يجب أن تحتوي كلمة السر على ٨ أحرف على الأقل، حرف كبير واحد، حرف صغير واحد، رقم واحد، ورمز واحد."
      );
      return;
    } else {
      setPasswordError("");
    }

    setIsRegistering(true); // تغيير الزر إلى "جاري التسجيل"

    fetch("https://academy-backend-pq91.onrender.com/register", {
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
          setShowVerificationField(true); // إظهار حقل التحقق
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsRegistering(false); // إعادة الزر إلى حالته الطبيعية
      });
  };

  const handleVerification = (e) => {
    e.preventDefault();

    setIsVerifying(true); // تغيير الزر إلى "جاري التحقق"

    fetch("https://academy-backend-pq91.onrender.com/verify", {
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
          navigate("/Login_users/"); // تحويل إلى الصفحة الرئيسية بعد التحقق
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsVerifying(false); // إعادة الزر إلى حالته الطبيعية
      });
  };

  return (
    <>
      <div className="container">
        <div className="row RegisteR">
          <div className="register_half  col-lg-6">
            <div>
              <img className="m-auto d-flex" src={register_img} alt="" />
              <p className=" m-auto d-flex ">
                قم بتعبئة نموذج التسجيل باستخدام بريدك الإلكتروني أو حسابات
                التواصل الاجتماعي. بعد ذلك، ستتلقى رسالة تأكيد بالبريد
                الإلكتروني.
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <form
              className="form-container academy p-5 mt-5 mb-5 m-auto"
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
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>
                  <span style={{ color: "red" }}>*</span> اسم العائلة:
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>
                  <span style={{ color: "red" }}>*</span> دولة الإقامة:
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>
                  <span style={{ color: "red" }}>*</span> العمر:
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>
                  <span style={{ color: "red" }}>*</span> الجنس:
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value=""></option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>

              <div>
                <label>
                  <span style={{ color: "red" }}>*</span> المستوى التعليمي:
                </label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  required
                >
                  <option value=""></option>
                  <option value="المرحلة الابتدائية">المرحلة الابتدائية</option>
                  <option value="المرحلة الإعدادية">المرحلة الإعدادية</option>
                  <option value="المرحلة الثانوية">المرحلة الثانوية</option>
                  <option value="مرحلة المعاهد المتوسطة">
                    مرحلة المعاهد المتوسطة
                  </option>
                  <option value="مرحلة التعليم الجامعي">
                    مرحلة التعليم الجامعي
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
                <span style={{ color: "red" }}>*</span> مستوى اللغة اليابانية:</label>
                <select
                  name="japaneseLevel"
                  value={formData.japaneseLevel}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="beginner">
                    المستوى المبتدئ 
                    (قبل البدء بتعلم اللغة اليابانية)
                  </option>
                  <option value="beginnerIntermediate">
                  المستوى المبتدئ المتوسط
(إمكانية قراءة وكتابة الهيراغانا والكتاكانا وبعض حروف الكانجي البسيطة، وقراءة وفهم بعض الكلمات والجمل)

                  </option>
                  <option value="beginnerAdvanced">
                  المستوى المبتدئ المتقدم (N5)
(إجادة قراءة وكتابة الهيراغانا والكاتاكانا وحوالي 100 حرف كانجي، والقدرة على التعريف بالنفس، وقراءة وكتابة جمل بسيطة)

                  </option>
                  <option value="intermediateBeginner">
                  المستوى المتوسط المبتدئ (N4)
(إجادة قراءة وكتابة حوالي 200 حرف كانجي بالإضافة إلى الهيراغانا والكتاكانا، والتعريف بالنفس مع القدرة على فهم الأسئلة المتعلقة بالحياة اليومية والإجابة عنها)

                  </option>
                  <option value="intermediate">المستوى المتوسط (N3)</option>
                  <option value="intermediateAdvanced">
                    المستوى المتوسط المتقدم
                  </option>
                  <option value="advancedBeginner">
                    المستوى المتقدم المبتدئ (N2)
                  </option>
                  <option value="advancedIntermediate">
                    المستوى المتقدم المتوسط
                  </option>
                  <option value="advanced">المستوى المتقدم (N1)</option>
                  <option value="postAdvanced">ما بعد المستوى المتقدم
                  (طلاب الدراسات العليا المتخصصون باللغة اليابانية والأدب الياباني)</option>
                </select>
              </div>

              <div>
                <label>
                  <span style={{ color: "red" }}>*</span> رقم الواتساب:
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>
                  <span style={{ color: "red" }}>*</span> البريد الإلكتروني:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>
                  <span style={{ color: "red" }}>*</span> كلمة السر:
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {passwordError && (
                  <p style={{ color: "red" }}>{passwordError}</p>
                )}
                <ul className="password">
                  <li
                    style={{ color: passwordCriteria.length ? "green" : "red" }}
                  >
                    {passwordCriteria.length
                      ? "-  تحتوي على 8 أحرف على الأقل"
                      : "- يجب أن تحتوي على 8 أحرف على الأقل"}
                  </li>
                  <li
                    style={{
                      color: passwordCriteria.uppercase ? "green" : "red",
                    }}
                  >
                    {passwordCriteria.uppercase
                      ? "-  تحتوي على حرف كبير واحد على الأقل"
                      : "- يجب أن تحتوي على حرف كبير واحد على الأقل"}
                  </li>
                  <li
                    style={{
                      color: passwordCriteria.lowercase ? "green" : "red",
                    }}
                  >
                    {passwordCriteria.lowercase
                      ? "-  تحتوي على حرف صغير واحد على الأقل"
                      : "- يجب أن تحتوي على حرف صغير واحد على الأقل"}
                  </li>
                  <li
                    style={{ color: passwordCriteria.number ? "green" : "red" }}
                  >
                    {passwordCriteria.number
                      ? "-  تحتوي على رقم واحد على الأقل"
                      : "- يجب أن تحتوي على رقم واحد على الأقل"}
                  </li>
                  <li
                    style={{
                      color: passwordCriteria.specialChar ? "green" : "red",
                    }}
                  >
                    {passwordCriteria.specialChar
                      ? "-  تحتوي على رمز واحد على الأقل"
                      : "- يجب أن تحتوي على رمز واحد على الأقل"}
                  </li>
                </ul>
              </div>

              <div>
                <label>
                <span style={{ color: "red" }}>*</span> تأكيد كلمة السر:
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
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
                  onChange={(e) => setVerificationCode(e.target.value)}
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
    </>
  );
}
