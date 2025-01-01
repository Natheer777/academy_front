
// import { Navbar, Dash_user, Footer, Chat, VideoCall } from "../../sections";
// import { useState, useEffect } from "react";

// export default function Dash_users() {
//   const [showVideoCall, setShowVideoCall] = useState(false); // حالة لعرض المكون

//   useEffect(() => {
//     const videoCallValue = localStorage.getItem("showVideoCall");
//     console.log("videoCallValue:", videoCallValue);  // تحقق من القيمة
//     if (videoCallValue === "1") {
//       setShowVideoCall(true); // إذا كانت القيمة 1، عرض الفيديو
//     }
//   }, []);


//   return (
//     <>
//       <Navbar />
//       {showVideoCall && <VideoCall />}
//       <Chat />
//       <Dash_user />
//       <Footer />
//     </>
//   ); 
// }



import { Navbar, Dash_user, Footer, VideoCall } from "../../sections";
import { useState, useEffect } from "react";


export default function Dash_users() {
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [userLevel, setUserLevel] = useState(null); // تخزين المستوى

  useEffect(() => {
    const videoCallValue = localStorage.getItem("showVideoCall");
    const level = localStorage.getItem("showVideoCall"); // جلب المستوى
    setUserLevel(level); // تخزين المستوى في الحالة

    const validLevels = [
      'Level_One',
      'Level_Two',
      'Level_Three',
      'Level_Four',
      'Level_Five',
      'Level_Six',
      'Level_Seven',
      'Level_Eight',
      'Level_Nine',
      'Level_Ten',
      'Level_Eleven',
      'Level_Twelve',
      'Level_Thirteen',
      'Level_Fourteen',
      'Level_Fifteen',
      'Level_Sixteen'
    ];

    if (validLevels.includes(videoCallValue)) {
      setShowVideoCall(true);
    }
  }, []);


  return (
    <>
      <Navbar />
      {showVideoCall && (
        <div>
          <h3>المستوى الحالي: {userLevel}</h3>
          <VideoCall />
        </div>
      )}
      <Dash_user />
      <Footer />
    </>
  );
}
