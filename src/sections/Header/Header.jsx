import "./Header.css";
import Logo from "../../assets/Logo/الشعار-2-png.png";

// import learn_img from '../../assets/imgheader/R (1).jpg'
export default function Header() {
  return (
    <>
      <div className="container Header">
        <div className="academy pb-4 pt-4 mt-4 left">
        <div className="acadeny_logo mb-4 ">
        <h2 className=" left">أكاديمية اللغة اليابانية</h2>

          {/* <img src={Logo} alt="" /> */}
        </div>
        <div className="title_academy mb-3">التعريف بالأكاديمية:</div>
        <div className="details">
          مرحبًا بكم في أكاديمية اللغة اليابانية، الوجهة المثالية لتعلم اللغة
          اليابانية للعرب عبر الإنترنت! نقدم تجربة تعليمية تفاعلية وفريدة تمكنك
          من اكتساب اللغة اليابانية بسهولة من خلال مجموعة متنوعة من الدروس
          والأنشطة، مدعومة بأحدث التقنيات التعليمية وطرق التدريس المتقدمة. ما
          يميزنا في أكاديميتنا هو فريق التدريس المتعدد الثقافات الذي يضم ناطقين
          أصليين باللغتين اليابانية والعربية، مما يوفر لك تعلمًا ممتعًا وسلسًا
          يجمع بين الدقة اللغوية والتواصل الثقافي.
        </div>
        </div>
        <div className="academy mt-5 mb-5 right">

        <div className="title_academy mb-3">رسالة الأكاديمية ورؤيتها:</div>
        <div className="details">
          نسعى إلى تمكين الطلاب العرب من التواصل بثقة واحترافية باللغة اليابانية
          في مختلف مجالات الحياة، سواء كانت أكاديمية، مهنية، أو حتى ترفيهية.
          رؤيتنا هي بناء جسر ثقافي بين العالم العربي واليابان من خلال تعليم
          اللغة اليابانية بطريقة مبتكرة، متدرجة، وشاملة. نحن في أكاديمية اللغة
          اليابانية نؤمن بأن اللغة ليست فقط أداة تواصل، بل هي مفتاح لفهم ثقافات
          جديدة وتوسيع آفاق الفكر.
        </div>
        </div>
      </div>
    </>
  );
}
