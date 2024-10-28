import './Fees_material.css'
import   {useNavigate}  from 'react-router'
import img_fees from '../../assets/Ai_img/_73a4c5e5-2e9c-40f3-8260-f94d1fb42248.jpg'
export default function Fees_material() {
  // const navigate = useNavigate();

  // const handleRedirect = () => {
  //   const token = localStorage.getItem("token");
    
  //   if (token) {
  //     // إذا كان المستخدم مسجل الدخول
  //     navigate("/dashboard");
  //   } else {
  //     // إذا لم يكن مسجل الدخول
  //     navigate("/login");
  //   }
  // };
const navigate = useNavigate()

const handleRedirect = () =>{
  const token = localStorage.getItem("token")
  if(token){
    navigate('/Dash_users/:userId')
  }else{
    navigate('/Login_users')
  }
}
  return (
    <>
    <div className="container">
    <div className="money_lisson mt-5" id='Fees'>
      <div className="row academy">
<div className="col-lg-7">
<h2 className="fw-bold mt-4">الرسوم:</h2>
          <p>
            نعمل على توفير برامج تعليمية متنوعة تلبي احتياجات مختلف المستويات،
            مع مراعاة توفير حزم مرنة للطلاب. يمكنك اختيار الدفع لكل دورة أو
            الاشتراك في حزم شاملة بأسعار مخفضة.
          </p>
</div>
<div className="col-lg-5">
<img className='w-100' src={img_fees} alt="" />
</div>
          <div className="How_to_pay">
          <h2 className='fw-bold'>وسائل الدفع:</h2>
          <div className="means">
            <div className="mean_1" onClick={handleRedirect}></div>
            <div className="mean_2" onClick={handleRedirect}></div>
            <div className="mean_3" onClick={handleRedirect}></div>
            <div className="mean_4" onClick={handleRedirect}></div>
            <div className="mean_5" onClick={handleRedirect}></div>
          </div>
        </div>
        
      </div>
          <ul className='mt-5'>
            <li className="right academy item1">رسوم المستوى المبتدئ (N5):</li>
            <li className="right academy item2">الدورة الفردية: 150 دولارًا (8 أسابيع).</li>
            <li className="right academy item3">
              {" "}
              الحزمة الشاملة لجميع مستويات المبتدئين: 400 دولار (3 دورات، N5 +
              N4).
            </li>
            <li className="right academy item4">رسوم المستوى المتوسط (N4):</li>
            <li className="right academy item5">الدورة الفردية: 200 دولارًا (8 أسابيع).</li>
            <li className="right academy item6">
              الحزمة الشاملة لمستويات المتوسط والمتقدم: 600 دولار (4 دورات، N4 +
              N3).
            </li>
            <li className="right academy item7"> رسوم المستويات المتقدمة (N3-N1):</li>
            <li className="right academy item8">المستوى المتقدم (N3): 250 دولارًا لكل دورة (10 أسابيع).</li>
            <li className="right academy item9">
              المستويات المتقدمة جدًا والاحترافية (N2-N1): 300 دولار لكل دورة
              (12 أسبوعًا).
            </li>
          </ul>
          <p>
            <span>ملاحظة: </span> تتضمن جميع الرسوم الوصول إلى المواد الدراسية الرقمية،
            التمارين التفاعلية، والدعم المباشر مع الأساتذة.
          </p>
        </div>

    </div>
    
    </>
  )
}
