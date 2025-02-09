import './Register_header.css'
export default function Register_header() {
  return (
    <>
    <div className="container Register">
        <div className='RegisterContent'>
        <h2 className='fw-bold' id='Register'>طريقة التسجيل:</h2>
        <p>عملية التسجيل في أكاديميتنا بسيطة ومرنة، تشمل الخطوات التالية:</p>
        </div>
        <ul className='mt-5'>
            <li className='step1 left item1 academy'>
                <h2>إنشاء حساب مجاني:</h2>
                <p>قم بتعبئة نموذج التسجيل لإنشاء حساب في أكاديمية اللغة اليابانية، وستتلقى رسالة تأكيد على بريدك الإلكتروني لتفعيل الحساب.</p>
            </li>
            <li className='step2 top item2 academy'>
                <h2> اختبار تحديد المستوى:</h2>
                <p>خذ اختبار تحديد المستوى المجاني عبر الإنترنت لتحديد مستوى دراستك المناسب.</p>
            </li>
            <li className='step3 right item3 academy'>
                <h2> اختيار الدورة المناسبة:</h2>
                <p>بناءً على نتائج اختبار تحديد المستوى، يمكنك اختيار الدورة التعليمية الأنسب وبدء التسجيل.</p>
            </li>
            <li className='step4 left item4 academy'>
                <h2> إتمام عملية الدفع:</h2>
                <p>أتمم عملية الدفع من خلال وسائل الدفع الإلكترونية المتاحة (بطاقات ائتمان، PayPal، تحويل بنكي).</p>
            </li>
            <li className='step5 right item5 academy'>
                <h2> الوصول إلى الدروس:</h2>
                <p>بعد الدفع، ستحصل على وصول فوري إلى منصة الدروس حيث يمكنك البدء في التعلم على الفور.</p>
            </li>

        </ul>
    </div>
    </>
  )
}
