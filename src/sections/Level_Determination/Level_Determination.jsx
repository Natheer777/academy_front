import "./Level_Determination.css";
import { Link } from "react-router-dom";
import imgLevel_Determination from "../../assets/Ai_img/_40036a51-cf4f-4002-b307-abda9b1fabb9.jpg";
export default function Level_Determination() {
  return (
    <>
      <div className="container Level_Determination">
        <div className="row academy">
          <div className="col-6 col-md-6 col-sm-12 col-12 mb-5">
            <div>
            <h2>اختبار تحديد المستوى:</h2>
            <p>خذ اختبار تحديد المستوى المجاني عبر الإنترنت لتحديد مستوى دراستك المناسب.</p>
            <Link to='/Level-test'>
            <button>اضغط هنا لتحديد المستوى</button>
            </Link>
            </div>
          </div>

          <div className="col-6 col-md-6 col-sm-12 col-12">
            <img src={imgLevel_Determination} className="w-100" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
