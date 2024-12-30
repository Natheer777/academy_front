// import { useNavigate } from "react-router-dom"; // استيراد التنقل
// const VideoCall = () => {
//   const navigate = useNavigate(); // هوك التنقل

//   const handleJoinStream = () => {
//     navigate("/MeetingNow"); // إعادة التوجيه إلى صفحة الاجتماع
//   };

//   return (
//     <div className="d-flex justify-content-center">
//       <button id="join-btn" onClick={handleJoinStream}>
//         الدخول الى البث
//       </button>
//     </div>
//   );
// };

// export default VideoCall;


import { useNavigate } from "react-router";

const VideoCall = () => {
  const navigate = useNavigate();

  const handleJoinStream = () => {
    const level = localStorage.getItem("showVideoCall");
    if (level) {
      navigate(`/MeetingNow?level=${encodeURIComponent(level)}`); // تمرير المستوى في الرابط
    } else {
      alert("لم يتم تعيين مستوى بعد!");
    }
  };

  return (
    
    <div className="d-flex justify-content-center">
      <button id="join-btn" onClick={handleJoinStream}>
        الدخول إلى البث
      </button>
    </div>
  );
};

export default VideoCall;
