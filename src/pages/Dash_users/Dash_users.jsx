
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



import { Navbar, Dash_user, Footer, Chat, VideoCall } from "../../sections";
import { useState, useEffect } from "react";


export default function Dash_users() {
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [userLevel, setUserLevel] = useState(null); // تخزين المستوى

  useEffect(() => {
    const videoCallValue = localStorage.getItem("showVideoCall");
    const level = localStorage.getItem("showVideoCall"); // جلب المستوى
    setUserLevel(level); // تخزين المستوى في الحالة
  
    const validLevels = [
      'المستوى_الاول',
      'المستوى_الثاني',
      'المستوى_الثالث',
      'المستوى_الرابع',
      'المستوى_الخامس',
      'المستوى_السادس',
      'المستوى_السابع',
      'المستوى_الثامن',
      'المستوى_التاسع',
      'المستوى_العاشر',
      'المستوى_الحادي_عشر',
      'المستوى_الثاني_عشر',
      'المستوى_الثالث_عشر',
      'المستوى_الرابع_عشر',
      'المستوى_الخامس_عشر',
      'المستوى_السادس_عشر'
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
      <Chat />
      <Dash_user />
      <Footer />
    </>
  );
}
