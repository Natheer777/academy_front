import  { useEffect, useState } from 'react';
import './Curtain.css'; // استدعاء ملف CSS للرسوم المتحركة

const Curtain = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setIsOpen(true), 500); // يفتح الستارة بعد نصف ثانية
      return () => clearTimeout(timer); // تنظيف المؤقت إذا تم إزالة المكون
    }, []); // المصفوفة الفارغة تعني أن `useEffect` سيتم تشغيله مرة واحدة فقط عند تحميل المكون
  

  return (
    <div className={`curtain ${isOpen ? 'open' : ''}`}>
      <div className="curtain-panel left-panel"></div>
      <div className="curtain-panel right-panel"></div>
    </div>
  );
};

export default Curtain;