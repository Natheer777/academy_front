import "./About_levels.css";
import { BsFillClipboardDataFill } from "react-icons/bs";

export default function About_levels() {
  return (
    <>
      <div className=" AboutLevel pb-5 pt-3">
        <h1 className="fw-bold">البرامج والمستويات</h1>
        <div className="container cards text-center">
          <div className="card1">
            <BsFillClipboardDataFill />
            <h4>برنامج تعليم اللغة العربية للعرب</h4>
            <p>(12 مستوى)</p>
          </div>
          <div className="card2">
            <BsFillClipboardDataFill />
            <h4>برنامج تعليم اللغة العربية للناطقين بغير العربية</h4>
            <p>مستوى 6</p>
          </div>
          <div className="card3">
            <BsFillClipboardDataFill />
            <h4>
              برنامج متابعة مناهج اللغة العربية الدراسية في المدارس العالمية
              والعربية{" "}
            </h4>
          </div>

          <div className="card4">
            <BsFillClipboardDataFill />
            <h4>برنامج تعليم القرآن الكريم والعلوم الشرعية </h4>
            <p> (حفظ، تدبر، حديث، سيرة)</p>
          </div>
          <div className="card5">
            <BsFillClipboardDataFill />
            <h4>برنامج تعليم اللغة العربية للمتخصصين </h4>
            <p> (نحو، صرف، بلاغة)</p>
          </div>
          <div className="card6">
            <BsFillClipboardDataFill />
            <h4>برنامج رعاية المواهب العربية</h4>
            <p>-</p>
          </div>
          <div className="card7">
            <BsFillClipboardDataFill />
            <h4>برنامج تدريب المعلمين والآباء والأمهات </h4>
          </div>
        </div>
        <button>التفاصيل في قسم الدورات</button>
      </div>
    </>
  );
}
