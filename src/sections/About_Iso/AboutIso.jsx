import "./AboutIso.css";
import { HiClipboardCheck } from "react-icons/hi";

export default function AboutIso() {
  return (
    <>
      <div className="Allcontent pb-5 pt-5">
        <div className="container Aboutiso text-center">
          <div className="row">
            <div className="Howregister col-xl-6 col-lg-6">
              <h4 className="mb-4 fw-bold">ضمان الجودة</h4>
              <p>
                تضمن أكاديمية اللغة العربية لطلابها المواظبين على حضور الدروس
                وتنفيذ متطلبات النجاح (ملف الإنجاز):
              </p>
              <ul>
                <li> <HiClipboardCheck />
                  الحصول على المخرجات التعليمية الموضحة في كل مستوى. (في صفحة
                  الدورات)
                </li>
                <li> <HiClipboardCheck />
                  في حال لم يحصل على المخرجات التعليمية الموعود بها فإن أكاديمية
                  اللغة العربية ملزمة بإعادة رسوم الدورة أو منحه مقعداً مجاناً
                  في الدورة.
                </li>
              </ul>
            </div>
            <div className="Registertrack col-xl-6 col-lg-6">
              <h4 className="fw-bold mb-4">المناهج التعليمية</h4>
              <p>
                اختارت أكاديمية اللغة العربية لطلابها أفضل المناهج المعتمدة
                عالمياً
              </p>
              <ul>
                <li> <HiClipboardCheck />مبنية على أسس تربوية وعلمية</li>
                <li> <HiClipboardCheck />مختارة من قبل متخصصين</li>
                <li> <HiClipboardCheck />
                  ثرية بالأنشطة التفاعلية وأوراق العمل وعروض بوربوينت والوسائل
                  السمعية والبصرية.
                </li>
                <li> <HiClipboardCheck />كما نعتمد سلاسل خاصة في تعليم غير الناطقين بالعربية.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
