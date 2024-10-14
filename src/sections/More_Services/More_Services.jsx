import "./More_Services.css";
import img_services from "../../assets/imgheader/OIP.jpg";
export default function More_Services() {
  return (
    <>
      <div className="container More_Services">
        <div className="row mt-5 mb-5">
          <div className="col-lg-6 mt-5">
            <ul>
              <h3>خدمات إضافية:</h3>
              <li>
                <h5>ورش عمل حول الثقافة اليابانية:</h5>
                <p>
                  نقدم ورش عمل شهرية تغطي مواضيع متنوعة مثل الثقافة الشعبية،
                  التقاليد اليابانية، وتاريخ اليابان.
                </p>
              </li>
              <li>
                <h5>دورات اللغة اليابانية للأعمال:</h5>
                <p>
                  موجهة لمن يرغبون في تحسين مهاراتهم اللغوية في بيئات العمل
                  اليابانية.
                </p>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 ">
            <img className="w-100" src={img_services} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
