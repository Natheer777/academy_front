import "./Date_lisson_Header.css";
import img_lisson from "../../assets/Ai_img/_9bf252b1-f72c-4ab3-b8d4-f9dbd6ba947f.jpg";
import { useNavigate } from "react-router";
export default function Date_lisson_Header() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Dash_users/:userId");
    } else {
      navigate("/Login_users");
    }
  };
  return (
    <>
      <div className="container Date_lisson_Header mt-5" id="Level_division">
        <div className="row academy">
          <div className="col-lg-7">
            <h2
              className="title_Date_lisson_Header fw-bold"
            >
              تقسيم المستويات:
            </h2>

            <div className="details  mt-3">
              نحن نقدم مسارًا متدرجًا يتيح لك الانتقال بسلاسة من المبتدئ إلى
              الاحتراف، مع مراعاة احتياجات كل طالب وتوفير برامج مصممة خصيصًا
              لتلبي تطلعاتك اللغوية.
            </div>
          </div>
          <div className="col-lg-5">
            <img className="w-100" src={img_lisson} alt="" />
          </div>
        </div>
        <div className="levels mt-5">
          <ul className="right">
            <h2 className="fw-bold mt-4">المستوى المبتدئ (N5):</h2>
            <p>
              في هذا المستوى، ستركز على أساسيات اللغة اليابانية، بما في ذلك تعلم
              حروف الهيراغانا والكاتاكانا، وبعض الكانجي الأساسية. سيتم تقديمك
              أيضًا لمفردات الحياة اليومية، مثل الأرقام، التحيات، والألوان، مما
              يساعدك على بناء أساس قوي. المحتوى يشمل:
              <br />
              المحتوى يشمل:
            </p>
            <li> 100 مفردة يابانية أساسية.</li>
            <li>تدريبات على النطق السليم.</li>
            <li>قواعد الجملة الأساسية (فعل، فاعل، مفعول).</li>
            <li>جلسات حوار بسيطة (مع تطبيقات عملية).</li>
            <button onClick={handleRedirect}>اشترك الآن</button>
          </ul>
          <ul className="top">
            <h2 className="fw-bold mt-4">المستوى المتوسط (N4):</h2>
            <p>
              هنا تتوسع في قواعد اللغة وتتعمق في تعلم حروف الكانجي الأكثر
              تعقيدًا. ستتعلم تكوين جمل أكثر تعقيدًا وستبدأ في استخدام اللغة في
              مواقف حقيقية مثل التحدث عن العائلة، العمل، والهوايات.
              <br />
              المحتوى يشمل:
            </p>
            <li> 300 مفردة يابانية إضافية.</li>
            <li> كتابة وقراءة نصوص قصيرة.</li>
            <li>تدريبات على فهم النصوص (استماع وقراءة).</li>
            <li>تدريبات تفاعلية على الحوار اليومي.</li>
            <button onClick={handleRedirect}>اشترك الآن</button>
          </ul>
          <ul className="left">
            <h2 className="fw-bold mt-4">المستوى المتقدم (N3):</h2>
            <p>
              في هذا المستوى، يتم التركيز على تطوير مهارات الاستماع والقراءة
              بشكل أكبر، مما يساعدك على التعامل مع نصوص ومحادثات أكثر تعقيدًا.
              ستتمكن من التواصل في مواضيع أكثر تنوعًا مثل السياسة، الأعمال،
              والثقافة اليابانية.
              <br />
              المحتوى يشمل:
            </p>
            <li>600 مفردة جديدة.</li>
            <li> كتابة مقالات قصيرة باللغة اليابانية.</li>
            <li>قراءة نصوص إخبارية وقصص يابانية.</li>
            <li>جلسات نقاش مفتوحة.</li>
            <button onClick={handleRedirect}>اشترك الآن</button>
          </ul>
          <ul className="hidden">
            <h2 className="fw-bold mt-4"> المستوى المتقدم جدًا (N2):</h2>
            <p>
              يُعد هذا المستوى نقلة نوعية حيث ستركز على المفردات المتخصصة وتطوير
              قدرتك على التفاعل في بيئات عمل يابانية. ستتعلم كيف تكتب رسائل
              البريد الإلكتروني، التقارير، وتقديم عروض تقديمية باللغة اليابانية.
              <br />
              المحتوى يشمل:
            </p>
            <li> 1000 مفردة متقدمة.</li>
            <li> تحليل نصوص ثقافية وأدبية يابانية.</li>
            <li> محادثات يومية ومهنية مع اليابانيين.</li>
            <button onClick={handleRedirect}>اشترك الآن</button>
          </ul>
          <ul className="hidden">
            <h2 className="fw-bold mt-4">المستوى الاحترافي (N1):</h2>
            <p>
              هذا هو مستوى الإتقان، حيث ستتمكن من فهم اللغة اليابانية بشكل شامل
              واستخدامها بطلاقة في البيئات الأكاديمية والمهنية المعقدة. ستكون
              قادرًا على قراءة الكتب العلمية والأدبية، كتابة مقالات طويلة،
              والتحدث في المؤتمرات والندوات.
              <br />
              المحتوى يشمل:
            </p>
            <li> 2000 مفردة متقدمة جدًا.</li>
            <li> تدريبات على النقاشات الأكاديمية والمهنية.</li>
            <li> كتابة أبحاث وتقارير احترافية.</li>
            <li> تحليل نصوص أدبية يابانية قديمة وحديثة.</li>
            <button onClick={handleRedirect}>اشترك الآن</button>
          </ul>
        </div>
      </div>
    </>
  );
}
