

import { useNavigate } from "react-router";

const VideoCall = () => {
  const navigate = useNavigate();

  const handleJoinStream = () => {
    const level = localStorage.getItem("showVideoCall");
    if (level) {
      navigate(`/MeetingNow?level=${encodeURIComponent(level)}`); // استخدم علامات الاقتباس المناسبة
    } else {
      alert("لم يتم تعيين مستوى بعد!");
    }
  };
  
  return (
    
    <div className="d-flex justify-content-center">
      <button id="join-btn" onClick={handleJoinStream}>
        الانضمام إلى الدرس
      </button>
    </div>
  );
};

export default VideoCall;
