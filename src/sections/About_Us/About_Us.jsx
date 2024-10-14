import "./About_Us.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";

export default function About_Us() {
  return (
    <>
      <div className="container">
      <div className="TitleAbout text-center mt-5">
            <h2 className="mb-5 fw-bold">من نحن</h2>
            <p>
              أكاديميّة افتراضيّة عالمية، متخصّصة في تعليم اللّغة العربيّة،
              بأحدث الطرق والأساليب الإبداعية، مع كادر تعليميّ تربويّ مؤهّل
              مدرّب، تحت إشراف أكاديميّ فعّال.
            </p>
            </div>
          <div className="options mb-5 pb-5">
            <ul>
              <li> مسارات الدراسة </li>
              <li> كيف أسجل ابني </li>
              <li> للتسجيل في مسار الدروس المسجلة  </li>
              <li> ضمان الجودة </li>
              <li> المناهج التعليمية </li>
              <li> من آراء الطلاب </li>
              <li> النظام الدراسي </li>
              <li> البرامج والمستويات </li>
              <li> سياسية دفع الرسوم واستردادها </li>
              <li> من آراء الأهالي </li>
            </ul>
          </div>
        <div className="row">

 
          <div className="Howregister col-xl-6 col-lg-6">
            <h4 className="mb-4 fw-bold">كيف أسجل ابني في أكاديمية اللغة العربية؟</h4>
            <p>
              للتسجيل في مسار الدروس المباشرة (الفردي أو الجماعي) من خلال موقع
              الأكاديمية أو من خلال التواصل على وتساب الأكاديمية تستطيع:
            </p>
            <ul>

            <li><IoIosArrowDropleftCircle /> 
              حجز موعد اختبار تحديد المستوى لأبنائك، في الوقت الذي يناسبك.
             </li>
            <li><IoIosArrowDropleftCircle /> 
              ستزودك الأكاديمية بنتائج تحديد المستوى في أقل من 24 ساعة، وتختار
              المستوى المناسب له.
             </li>
            <li><IoIosArrowDropleftCircle /> 
              يمكنك اختيار المسار المناسب لكم (الخاص أو الجماعي)، وبعدها تزودك
              الإدارة برابط الزوم ومواعيد الدروس وبيانات دخول المنصة
             </li>
            <li><IoIosArrowDropleftCircle /> 
              يمكن الطالب حضور الحصص التجريبية في المسار الذي اختاره لمدة أسبوع
              في كل مسار.
             </li>
            <li><IoIosArrowDropleftCircle /> 
              في حال لم تناسبه الدروس تكون الحصص هديةً له من أكاديمية اللغة
              العربية، دون أن يترتب عليه أي رسوم.
             </li>
            </ul>
          </div>
          <div className="Registertrack col-xl-6 col-lg-6">
            <h4 className="fw-bold mb-4">للتسجيل في مسار الدروس المسجلة</h4>
            <ul>
              <li><IoIosArrowDropleftCircle /> من خلال الموقع يستطيع الطالب أن يختار الدروة المناسبة له </li>
              <li><IoIosArrowDropleftCircle /> بعد أن يحضر الدرس المجاني يمكنه شراء الدورة وحضورها </li>
              <li><IoIosArrowDropleftCircle /> ستظل الدورة مفتوحة له مدة سنة كاملة. </li>
            </ul>
          </div>
        </div>
        </div>
    </>
  );
}
