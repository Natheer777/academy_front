import "./Supports.css";
import img_Supports from "../../assets/imgheader/OIP (2).jpg";
export default function Supports() {
  return (
    <>
      <div className="container Supports">
        <div className="row  mt-5 mb-5">
          <div className="col-lg-6">
 
            <h3>الدعم الفني:</h3>
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
    
          <img className="w-75 m-auto d-flex" src={img_Supports} alt="" />
        </div>
        </div>
      </div>
    </>
  );
}
