import { useState } from "react";
import "./Cookies.css";

export default function Cookies() {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [cookiesSettings, setCookiesSettings] = useState({
    necessary: true, // دائمًا مفعلة لأنها أساسية
    analytics: false,
    preferences: false,
  });

  const handleAcceptCookies = () => {
    setCookiesAccepted(true);
    document.cookie =
      "acceptCookies=true; path=/; max-age=" + 60 * 60 * 24 * 30;
  };

  const handleRejectCookies = () => {
    setCookiesAccepted(true);
    document.cookie =
      "acceptCookies=false; path=/; max-age=" + 60 * 60 * 24 * 30;
  };

  const handleToggle = (type) => {
    setCookiesSettings((prevSettings) => ({
      ...prevSettings,
      [type]: !prevSettings[type],
    }));
  };

  const handleAcceptAll = () => {
    setCookiesSettings({
      necessary: true,
      analytics: true,
      preferences: true,
    });
  };

  const handleSaveSettings = () => {
    document.cookie = `cookiesSettings=${JSON.stringify(
      cookiesSettings
    )}; path=/`;
    alert("تم حفظ إعدادات ملفات تعريف الارتباط بنجاح!");
    setShowSettingsModal(false); // إغلاق النافذة بعد الحفظ
  };

  return (
    <div className="Cookies">

      {!cookiesAccepted && (
        <div className="cookie-banner">
          <p className="mb-4">
          مرحبًا بكم في موقع أكاديمية اللغة اليابانية! <br />
نحن نستخدم ملفات تعريف الارتباط (الكوكيز) لتحسين تجربتكم في التصفح، وتحليل استخدام الموقع. بالضغط على ”قبول جميع ملفات تعريف الارتباط“، فإنكم توافقون على استخدامها لأغراض التحليل والتخصيص. يمكنكم أيضًا اختيار ”إعدادات ملفات تعريف الارتباط“ لتخصيص التفضيلات أو رفض بعض الملفات. <br />
لمزيد من التفاصيل حول كيفية استخدامنا لملفات تعريف الارتباط، يُرجى الاطلاع على  .
            <a href="/Privacy">سياسة الخصوصية</a>.
          </p>
          <div className="buttonsCookies">
            <button className="mb-4" onClick={handleAcceptCookies}>
              قبول جميع ملفات تعريف الارتباط
            </button>
            <button className="mb-4" onClick={() => setShowSettingsModal(true)}>
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
            قبل البدء بتصفح موقع أكاديمية اللغة اليابانية، يمكنك تعديل إعدادات ملفات الارتباط حسب تفضيلاتك لضمان تجربة تصفح مخصصة وآمنة. وتشمل ملفات تعريف الارتباط الخيارات التالية:
            </p>

            <div className="cookie-option">
              <h3>1. ملفات الارتباط الضرورية</h3>
              <p>
              هذه الملفات ضرورية لتشغيل الموقع بشكل صحيح، مثل تسجيل الدخول وتقديم المحتوى الأساسي. لا يمكن تعطيلها لأنها أساسية لوظائف الموقع.
              </p>
            </div>

            <div className="cookie-option">
              <h3>2. ملفات الارتباط التحليلية</h3>
              <p>
              تساعدنا هذه الملفات في تتبع زيارات الموقع وتحليل سلوك المستخدم لتحسين الأداء وتطوير المحتوى. يمكنك اختيار تفعيلها أو تعطيلها حسب رغبتك.
              </p>
              <button onClick={() => handleToggle("analytics")}>
                {cookiesSettings.analytics ? "تعطيل" : "تفعيل"}
              </button>
            </div>

            <div className="cookie-option">
              <h3>3. ملفات الارتباط الخاصة بالتفضيلات</h3>
              <p>
              تسمح بحفظ تفضيلاتك، مثل إعدادات العرض وغيرها، لتوفير تجربة مخصصة عند العودة للموقع. يمكن تفعيلها أو تعطيلها حسب احتياجاتك.
تفعيل. تعطيل

              </p>
              <button onClick={() => handleToggle("preferences")}>
                {cookiesSettings.preferences ? "تعطيل" : "تفعيل"}
              </button>
            </div>

            <div className="actions">
              <button onClick={handleAcceptAll}>
                تفعيل جميع ملفات الارتباط
              </button>
              <button onClick={handleSaveSettings}>حفظ الإعدادات</button>
              <button onClick={() => setShowSettingsModal(false)}>إغلاق</button>
            </div>
            <hr />
          <p className="mt-2">يمكنك ضبط إعدادات ملفات الارتباط هذه من خلال نافذة إعدادات الخصوصية التي تظهر عند زيارتك الأولى للموقع، ويمكنك تعديل تفضيلاتك في أي وقت من خلال إعدادات الخصوصية في الموقع.</p>
          </div>
        </div>
      )}
    </div>
  );
}
