import { useNavigate } from "react-router-dom"; // استيراد التنقل

const VideoCall = () => {
  const navigate = useNavigate(); // هوك التنقل

  const handleJoinStream = () => {
    navigate("./MeetingNow"); // إعادة التوجيه إلى صفحة الاجتماع
  };

  return (
    <div>
      <button id="join-btn" onClick={handleJoinStream}>
        الدخول الى البث
      </button>
    </div>
  );
};

export default VideoCall;
