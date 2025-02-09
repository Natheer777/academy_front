


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
      'level_one',
      'level_two',
      'level_three',
      'level_four',
      'level_five',
      'level_six',
      'level_seven',
      'level_eight',
      'level_nine',
      'level_ten',
      'level_eleven',
      'level_twelve',
      'level_thirteen',
      'level_fourteen',
      'level_fifteen',
      'level_sixteen'
    ]
    
    if (validLevels.includes(videoCallValue)) {
      setShowVideoCall(true);
    }
  }, []);


  return (
    <>
      <Navbar />
      {showVideoCall && (
        <div>
          <h3 className="level_now academy m-4 text-center">المستوى الحالي: {userLevel}</h3>
          <VideoCall />
        </div>
      )}
      <Dash_user />
      <Footer />
    </>
  );
}
