import "./Supports.css";
import img_Supports from "../../assets/Ai_img/_f43c3626-6c13-4a8d-82d5-697203e33105.jpg";
export default function Supports() {
  return (
    <>
      <div className="container Supports" id="Support">
        <div className="row academy  mt-5 mb-5">
          <div className="col-lg-6">
 
            <h2>الدعم الفني:</h2>
            <p>
              يتوفر لدينا فريق دعم فني متواجد على مدار الساعة لمساعدتك في حال
              واجهت أي مشاكل فنية أثناء الدراسة أو التسجيل.
            </p>
            <p>
              تم تحسين التفاصيل لتشمل مزيدًا من المعلومات حول البرامج الدراسية
              والخدمات التي تقدمها الأكاديمية.
            </p>
          </div>
        <div className="col-lg-6">
    
          <img className="w-100 m-auto d-flex" src={img_Supports} alt="" />
        </div>
        </div>
      </div>
    </>
  );
}
