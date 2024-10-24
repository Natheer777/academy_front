import './Our_Study_materials.css'
import img_material from '../../assets/Ai_img/_6f2f27d9-4995-4117-aa80-149abadfed41.jpg'
export default function Our_Study_materials() {
  return (
    <>
    <div className="container Our_Study_materials mt-5 mb-5" id='Study_materials'>
        <h2 className='fw-bold'>تشمل موادنا الدراسية:</h2>
        <div className="academy">
      <div className="row">
        <div className="col-lg-6">
          <img className='w-100' src={img_material} alt="" />
        </div>
<div className="col-lg-6">
        <ul>
            <li>- كتب إلكترونية تفاعلية: تحتوي على تدريبات واختبارات لكل مستوى، مع محتوى قابل للتنزيل والقراءة في أي وقت.</li>
            <li>- فيديوهات تعليمية مسجلة: تُتيح لك متابعة الدروس وفق جدولك الخاص.</li>
            <li>- جلسات مباشرة عبر الإنترنت: مع أساتذة متخصصين لطرح الأسئلة والحصول على توضيحات.
            </li>
        </ul>
</div>
      </div>
        </div>
    </div>
    </>
  )
}
