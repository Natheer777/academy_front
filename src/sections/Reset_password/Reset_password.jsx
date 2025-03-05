import { useState } from "react";
import axios from "axios";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import "./Reset_password.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState("ltr");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.japaneseacademy.jp/forgot-password",
        { email }
      );
      setMessage(response.data.message);
      setShowVerification(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "حدث خطأ أثناء إرسال الرمز.");
      setMessage("");
    } finally {
      setIsLoading(false); // تأكد من إعادة isLoading إلى false بعد انتهاء الطلب
    }
};


  const handlePast = (e) => {
    e.preventDefault();
    alert("لا يُسمح بلصق النص هنا.");
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setDirection(/[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr");
  };

  const handleResendCode = async () => {
    try {
      const response = await axios.post(
        "https://api.japaneseacademy.jp/resend-verification-code",
        { email }
      );
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response.data.error);
      setMessage("");
    }
  };

  const handleVerifyCode = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.japaneseacademy.jp/verify",
        { email, verificationCode }
      );
      setMessage(response.data.message);
      setError("");
      setShowVerification(false);
      setShowPasswordFields(true);
    } catch (err) {
      setError(err.response?.data?.error || "حدث خطأ أثناء التحقق.");
      setMessage("");
    } finally {
      setIsLoading(false); // إرجاع isLoading إلى false بعد الانتهاء
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

  const handleResetPassword = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("كلمة المرور غير متطابقة.");
      setIsLoading(false);
      return;
    }

    if (!Object.values(passwordCriteria).every(Boolean)) {
      setPasswordError(
        "يجب أن تحتوي كلمة السر على ٨ أحرف على الأقل، حرف كبير واحد، حرف صغير واحد، رقم واحد، ورمز واحد."
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.japaneseacademy.jp/reset-password",
        {
          email,
          verificationCode,
          newPassword,
        }
      );
      setMessage(response.data.message);
      navigate("/");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "حدث خطأ أثناء إعادة تعيين كلمة المرور.");
      setMessage("");
    } finally {
      setIsLoading(false); // تأكد من إرجاع isLoading إلى false في كل الحالات
    }
};


  return (
    <div className="login-form resendPassword academy m-auto mt-5 mb-5">
      <div className="content_resetPasswpord">
        <h2 className="mb-4">نسيت كلمة المرور</h2>
        <RiLockPasswordFill />
      </div>
      {!showVerification && !showPasswordFields ? (
        <form onSubmit={handleSubmit}>
          <label className="m-auto mt-5 mb-4" >
            البريد الإلكتروني:
            <input
              className="mt-3 mb-3"
              type="email"
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange(e);
              }}
              style={{ direction: direction }}
              required
            />
          <button className="mt-4 mb-2" type="submit" disabled={isLoading}>
            {isLoading ? "جاري إرسال رمز التحقيق..." : "إرسال الرمز"}
          </button>
          </label>
        </form>
      ) : showVerification && !showPasswordFields ? (
        <div>
          <form onSubmit={handleVerifyCode}>
            <label>
              رمز التحقق:
              <input
                className="mt-3"
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value);
                  handleInputChange(e);
                }}
                style={{ direction: direction }}
                required
              />
            <button className="mb-4 mt-4" type="submit" disabled={isLoading}>
              {isLoading ? "جاري التحقق..." : "تحقق" }
            </button>
            <button
              className="mb-3"
              type="button"
              onClick={(e) =>{handleResendCode(e)}}
            >
             إعادة إرسال الرمز
            </button>
            </label>
          </form>
        </div>
      ) : (
        <form onSubmit={handleResetPassword}>
          <label className="w-100">

            كلمة المرور الجديدة:
            
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                validatePassword(e.target.value);
                handleInputChange(e)
              }}
              onPaste={handlePast}
              required
              style={{direction:direction}}
            />
          </label>
          {passwordError && (
            <p className="note" style={{ color: "red" }}>
              {passwordError}
            </p>
          )}
          <ul className="password">
            <li style={{ color: passwordCriteria.length ? "green" : "red" }}>
              {passwordCriteria.length
                ? "-  تحتوي على 8 أحرف على الأقل."
                : "- يجب أن تحتوي على 8 أحرف على الأقل."}
            </li>
            <li style={{ color: passwordCriteria.uppercase ? "green" : "red" }}>
              {passwordCriteria.uppercase
                ? "-  تحتوي على حرف كبير واحد على الأقل."
                : "- يجب أن تحتوي على حرف كبير واحد على الأقل."}
            </li>
            <li style={{ color: passwordCriteria.lowercase ? "green" : "red" }}>
              {passwordCriteria.lowercase
                ? "-  تحتوي على حرف صغير واحد على الأقل."
                : "- يجب أن تحتوي على حرف صغير واحد على الأقل."}
            </li>
            <li style={{ color: passwordCriteria.number ? "green" : "red" }}>
              {passwordCriteria.number
                ? "-  تحتوي على رقم واحد على الأقل."
                : "- يجب أن تحتوي على رقم واحد على الأقل."}
            </li>
            <li
              style={{ color: passwordCriteria.specialChar ? "green" : "red" }}
            >
              {passwordCriteria.specialChar
                ? "- تحتوي على رمز واحد على الأقل (!@#$%^&*~-_.)."
                : "- يجب أن تحتوي على رمز واحد على الأقل (!@#$%^&*~-_.)."}
            </li>
          </ul>
          <label>
            تأكيد كلمة المرور:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {setConfirmPassword(e.target.value);
                handleInputChange(e)
              }}
              onPaste={handlePast}
              required
              style={{direction:direction}}
            />
          <button className="mt-4 mb-4" type="submit" disabled={isLoading}>{isLoading ? "جاري إعادة تعيين كلمة المرور..." : "إعادة تعيين كلمة المرور"}</button>
          </label>
        </form>
      )}
      {error && (
        <p style={{ color: "red", marginTop: "20px", fontSize: "20px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
