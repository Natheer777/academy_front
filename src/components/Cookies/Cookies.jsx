import  { useState, useEffect } from "react";
import "./Cookies.css";

export default function Cookies() {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [cookiesSettings, setCookiesSettings] = useState({
    necessary: true,
    analytics: true,
    preferences: true,
  });

  useEffect(() => {
    // تحميل إعدادات ملفات تعريف الارتباط من اللوكال ستورج عند تحميل الصفحة
    const savedSettings = localStorage.getItem("cookiesSettings");
    if (savedSettings) {
      setCookiesSettings(JSON.parse(savedSettings));
      setCookiesAccepted(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    setCookiesAccepted(true);
    document.cookie =
      "acceptCookies=true; path=/; max-age=" + 60 * 60 * 24 * 30;
    localStorage.setItem("cookiesSettings", JSON.stringify(cookiesSettings));
  };

  const handleRejectCookies = () => {
    setCookiesAccepted(true);
    document.cookie =
      "acceptCookies=false; path=/; max-age=" + 60 * 60 * 24 * 30;
  };

  const handleToggle = (type, isEnabled) => {
    setCookiesSettings((prevSettings) => ({
      ...prevSettings,
      [type]: isEnabled,
    }));
  };

  const handleSaveSettingsAndClose = () => {
    localStorage.setItem("cookiesSettings", JSON.stringify(cookiesSettings));
    document.cookie = `cookiesSettings=${JSON.stringify(
      cookiesSettings
    )}; path=/`;
    alert("تم حفظ إعدادات ملفات تعريف الارتباط بنجاح!");
    setCookiesAccepted(true); // إخفاء جميع نوافذ الكوكيز بعد الحفظ
    setShowSettingsModal(false); // إغلاق نافذة الإعدادات
  };

  return (
    <>
    <div className="Cookies">
      {!cookiesAccepted && (
        <div className="cookie-banner">
          <p className="mb-4">
            مرحبًا بكم في  <span className="academySpan">أكاديمية اللغة اليابانية</span> ! <br />
            نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتكم. بالضغط على "قبول
            جميع ملفات تعريف الارتباط"، فإنكم توافقون على استخدامها.
            <br />
            لمزيد من التفاصيل، يُرجى الاطلاع على{" "}
            <a className="SpanPrivacy" href="/Privacy">سياسة الخصوصية</a>.
          </p>
          <div className="buttonsCookies">
            <button className="mb-3" onClick={handleAcceptCookies}>
              قبول جميع ملفات تعريف الارتباط
            </button>
            <button className="mb-3" onClick={() => setShowSettingsModal(true)}>
              إعدادات تعريف ملفات الارتباط
            </button>
            <button onClick={handleRejectCookies}>رفض</button>
          </div>
        </div>
      )}

      {showSettingsModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>إعدادات ملفات تعريف الارتباط</h2>
            <p>
              قبل البدء بتصفح الموقع، يمكنك تعديل إعدادات ملفات تعريف الارتباط
              حسب تفضيلاتك.
            </p>

            <div className="cookie-option">
              <h3>1. ملفات الارتباط الضرورية</h3>
              <p>
                هذه الملفات ضرورية لتشغيل الموقع بشكل صحيح ولا يمكن تعطيلها.
              </p>
            </div>

            <div className="cookie-option">
              <h3>2. ملفات الارتباط التحليلية</h3>
              <p>تساعدنا في تحسين الأداء وتحليل سلوك المستخدم.</p>
              <button
                className={cookiesSettings.analytics ? "active_disable" : ""}
                onClick={() => handleToggle("analytics", true)}
              >
                تفعيل
              </button>
              <button
                className={!cookiesSettings.analytics ? "active_enable" : ""}
                onClick={() => handleToggle("analytics", false)}
              >
                تعطيل
              </button>
            </div>

            <div className="cookie-option">
              <h3>3. ملفات الارتباط الخاصة بالتفضيلات</h3>
              <p>تسمح بحفظ تفضيلاتك لتوفير تجربة مخصصة عند العودة للموقع.</p>
              <button
                className={cookiesSettings.preferences ? "active_disable" : ""}
                onClick={() => handleToggle("preferences", true)}
              >
                تفعيل
              </button>
              <button
                className={!cookiesSettings.preferences ? "active_enable" : ""}
                onClick={() => handleToggle("preferences", false)}
              >
                تعطيل
              </button>
            </div>

            <div className="actions">
              <button onClick={handleSaveSettingsAndClose}>
                حفظ الإعدادات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
