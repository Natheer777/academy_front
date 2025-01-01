// import { useState, useEffect } from "react";
// import { MdCallEnd } from "react-icons/md";
// import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";
// import { HiMicrophone } from "react-icons/hi2";
// import { PiMicrophoneSlashFill } from "react-icons/pi";
// import { MdOutlineChat } from "react-icons/md";
// import { LuScreenShare } from "react-icons/lu";
// import { FaFolder } from "react-icons/fa6";
// import { AiOutlineClose } from "react-icons/ai"; // أيقونة الإغلاق
// import AgoraRTC from "agora-rtc-sdk-ng";
// import { useNavigate } from "react-router-dom"; // لاستخدام التنقل
// import Chat from "../chat/Chat";
// import "./VideoCall.css";
// import FileSharing from "./FileSharing ";

// const APP_ID = "46c493c48baf40cead62de60ae7efda5";
// const CHANNEL = "main";

// const MeetingNow = () => {
//   const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
//   const [localTracks, setLocalTracks] = useState([]);
//   const [streams, setStreams] = useState([]);
//   const [isMicMuted, setIsMicMuted] = useState(false);
//   const [isCameraMuted, setIsCameraMuted] = useState(false);
//   const [isSharingScreen, setIsSharingScreen] = useState(false);
//   const [token, setToken] = useState(null);
//   const [isChatOpen, setIsChatOpen] = useState(false); // حالة فتح الشات
//   const [isFilesOpen, setIsFilesOpen] = useState(false); // حالة فتح الشات

//   const navigate = useNavigate(); // التنقل بين الصفحات

//   useEffect(() => {
//     const fetchToken = async () => {
//       const response = await fetch(`https://api.japaneseacademy.online/get-token?channelName=${CHANNEL}&uid=0`);
//       const data = await response.json();
//       setToken(data.token);
//     };
//     fetchToken();
//   }, []);

//   const joinAndDisplayLocalStream = async () => {
//     if (!token) return;

//     client.on("user-published", handleUserJoined);
//     client.on("user-unpublished", handleUserLeft);

//     const UID = await client.join(APP_ID, CHANNEL, token, null);

//     if (localTracks.length === 0) {
//       const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
//       setLocalTracks(tracks);

//       setStreams((prevStreams) => [
//         ...prevStreams,
//         { id: UID, videoTrack: tracks[1] },
//       ]);

//       await client.publish(tracks);
//     }
//   };


//   const handleUserLeft = (user) => {
//     setStreams((prevStreams) =>
//       prevStreams.filter((stream) => stream.id !== user.uid)
//     );
//   };

//   const handleUserJoined = async (user, mediaType) => {
//     await client.subscribe(user, mediaType);

//     if (mediaType === "video" && user.videoTrack) {
//       // تحقق من أنه لا يوجد مستخدم بنفس الـ UID في قائمة الـ streams
//       setStreams((prevStreams) => {
//         if (!prevStreams.some((stream) => stream.id === user.uid)) {
//           return [
//             ...prevStreams,
//             { id: user.uid, videoTrack: user.videoTrack },
//           ];
//         }
//         return prevStreams; // لا تضف المستخدم إذا كان موجودًا بالفعل
//       });
//     }

//     if (mediaType === "audio") {
//       user.audioTrack?.play();
//     }
//   };


//   useEffect(() => {
//     joinAndDisplayLocalStream();
//   }, [token]);

//   useEffect(() => {
//     streams.forEach((stream) => {
//       const videoContainer = document.getElementById(`user-${stream.id}`);
//       if (videoContainer && stream.videoTrack) {
//         stream.videoTrack.play(videoContainer);
//       }
//     });
//   }, [streams]);

//   const leaveAndRemoveLocalStream = async () => {
//     for (let track of localTracks) {
//       track.stop();
//       track.close();
//     }
//     await client.leave();
//     setLocalTracks([]);
//     setStreams([]);
//     navigate("/"); // إعادة التوجيه إلى الصفحة الرئيسية
//   };

//   const toggleMic = async () => {
//     if (localTracks[0]) {
//       const newState = !isMicMuted;
//       localTracks[0].setEnabled(!newState);
//       setIsMicMuted(newState);
//     }
//   };

//   const toggleCamera = async () => {
//     if (localTracks[1]) {
//       const newState = !isCameraMuted;
//       localTracks[1].setEnabled(!newState);
//       setIsCameraMuted(newState);
//     }
//   };

//   const toggleScreenSharing = async () => {
//     if (isSharingScreen) {
//       await client.unpublish(localTracks[1]);
//       const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
//       setLocalTracks(tracks);
//       await client.publish(tracks);
//       setIsSharingScreen(false);
//     } else {
//       const screenTrack = await AgoraRTC.createScreenVideoTrack();
//       await client.unpublish(localTracks[1]);
//       setLocalTracks([localTracks[0], screenTrack]);
//       await client.publish(screenTrack);
//       setIsSharingScreen(true);
//     }
//   };

//   return (
//     <div className="webRtc">
//  <div id="video-streams">
//   {streams.map((stream) => (
//     <div
//       key={stream.id}
//       id={`user-${stream.id}`}
//       style={{
//         // width: stream.videoTrack ? "100%" : "0px",  // عرض الفيديو حسب وجود الفيديو
//         // height: stream.videoTrack ? "200px" : "0px",  // تحديد ارتفاع الفيديو
//         background: stream.videoTrack ? "black" : "transparent", // تعيين خلفية للفيديو
//       }}
//     >
//       {/* محتوى الفيديو سيذهب هنا */}
//     </div>
//   ))}
// </div>


//       <div className="webRtcButtons">
//         <button
//           className="webRtcCamera"
//           onClick={toggleMic}
//           style={{ backgroundColor: isMicMuted ? "#EE4B2B" : "cadetblue" }}
//         >
//           {isMicMuted ? <PiMicrophoneSlashFill /> : <HiMicrophone />}
//         </button>
//         <button
//           className="webRtcMic"
//           onClick={toggleCamera}
//           style={{ backgroundColor: isCameraMuted ? "#EE4B2B" : "cadetblue" }}
//         >
//           {isCameraMuted ? <BsFillCameraVideoOffFill /> : <BsFillCameraVideoFill />}
//         </button>

//         <button
//           className="webRtcScreenShare"
//           onClick={toggleScreenSharing}
//           style={{ backgroundColor: isSharingScreen ? "#EE4B2B" : "cadetblue" }}
//         >
//           <LuScreenShare />
//         </button>
//         <button className="endCall" onClick={leaveAndRemoveLocalStream}>
//           <MdCallEnd />
//         </button>
//       </div>
//       <button className="chatButton" onClick={() => setIsChatOpen(!isChatOpen)}>
//         <MdOutlineChat />
//       </button>
//       {isChatOpen && (
//         <div className="chatContainer">
//           <button
//             className="closeChat"
//             onClick={() => setIsChatOpen(false)}
//             style={{ position: "absolute", top: 0, right: 0 }}
//           >
//             <AiOutlineClose />
//           </button>
//           <Chat />
//         </div>
//       )}


//       <button className="FileButton " onClick={() => setIsFilesOpen(!isFilesOpen)}>
//         <FaFolder />
//       </button>
//       {isFilesOpen && (
//         <div className="FileContainer ">
//           <button
//             className="closeFiles"
//             onClick={() => setIsFilesOpen(false)}
//             style={{ position: "absolute", top: 0, right: 0 }}
//           >
//             <AiOutlineClose />
//           </button>
//           <FileSharing />
//         </div>
//       )}




//     </div>
//   );
// };

// export default MeetingNow;








import { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useNavigate } from "react-router-dom"; // لاستخدام التنقل
import { AiOutlineClose } from "react-icons/ai"; // أيقونة الإغلاق
import { MdCallEnd } from "react-icons/md";
import { HiMicrophone } from "react-icons/hi2";
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";
import { LuScreenShare } from "react-icons/lu";
import { MdOutlineChat } from "react-icons/md";
import { FaFolder } from "react-icons/fa6";
import Chat from "../chat/Chat";
import FileSharing from "./FileSharing ";
import "./VideoCall.css";

const APP_ID = "46c493c48baf40cead62de60ae7efda5"; // معرف التطبيق
const MeetingNow = () => {
  const level = localStorage.getItem("showVideoCall"); // الحصول على المستوى من localStorage
  const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [localTracks, setLocalTracks] = useState([]);
  const [streams, setStreams] = useState([]);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraMuted, setIsCameraMuted] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [token, setToken] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false); // حالة فتح الشات
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const [CHANNEL, setChannel] = useState(""); // حالة القناة
  const navigate = useNavigate(); // التنقل بين الصفحات

  useEffect(() => {
    if (level) {
      setChannel(`main${level}`);
      const fetchToken = async () => {
        try {
          const response = await fetch(
            `https://api.japaneseacademy.online/get-token?level=${level}&uid=0`
          );
          if (!response.ok) throw new Error("Failed to fetch token");
          const data = await response.json();
          setToken(data.token);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      };

      fetchToken();
    }
  }, [level]); // تحديث الـ useEffect بناءً على المستوى

  const joinAndDisplayLocalStream = async () => {
    if (!token) return;

    client.on("user-published", handleUserJoined);
    client.on("user-unpublished", handleUserLeft);

    const UID = await client.join(APP_ID, CHANNEL, token, null);

    if (localTracks.length === 0) {
      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalTracks(tracks);

      setStreams((prevStreams) => [
        ...prevStreams,
        { id: UID, videoTrack: tracks[1] },
      ]);

      await client.publish(tracks);
    }
  };

  const handleUserLeft = (user) => {
    setStreams((prevStreams) =>
      prevStreams.filter((stream) => stream.id !== user.uid)
    );
  };

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video" && user.videoTrack) {
      setStreams((prevStreams) => {
        if (!prevStreams.some((stream) => stream.id === user.uid)) {
          return [
            ...prevStreams,
            { id: user.uid, videoTrack: user.videoTrack },
          ];
        }
        return prevStreams;
      });
    }

    if (mediaType === "audio") {
      user.audioTrack?.play();
    }
  };

  useEffect(() => {
    joinAndDisplayLocalStream();
  }, [token]);

  useEffect(() => {
    streams.forEach((stream) => {
      const videoContainer = document.getElementById(`user-${stream.id}`);
      if (videoContainer && stream.videoTrack) {
        stream.videoTrack.play(videoContainer);
      }
    });

    return () => {
      streams.forEach((stream) => {
        stream.videoTrack?.stop();
      });
    };
  }, [streams]);

  const leaveAndRemoveLocalStream = async () => {
    for (let track of localTracks) {
      track.stop();
      track.close();
    }
    await client.leave();
    setLocalTracks([]);
    setStreams([]);
    navigate("/"); // إعادة التوجيه إلى الصفحة الرئيسية
  };

  const toggleMic = async () => {
    if (localTracks[0]) {
      const newState = !isMicMuted;
      localTracks[0].setEnabled(!newState);
      setIsMicMuted(newState);
    }
  };

  const toggleCamera = async () => {
    if (localTracks[1]) {
      const newState = !isCameraMuted;
      localTracks[1].setEnabled(!newState);
      setIsCameraMuted(newState);
    }
  };

  const toggleScreenSharing = async () => {
    if (isSharingScreen) {
      await client.unpublish(localTracks[1]);
      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalTracks(tracks);
      await client.publish(tracks);
      setIsSharingScreen(false);
    } else {
      const screenTrack = await AgoraRTC.createScreenVideoTrack();
      await client.unpublish(localTracks[1]);
      setLocalTracks([localTracks[0], screenTrack]);
      await client.publish(screenTrack);
      setIsSharingScreen(true);
    }
  };

  return (
    <div className="webRtc">
      <h3 className="text-light">غرفة البث المباشر - المستوى: {level}</h3>

      <div id="video-streams">
        {streams.map((stream) => (
          <div
            key={stream.id}
            id={`user-${stream.id}`}
            style={{
              background: stream.videoTrack ? "black" : "transparent",
            }}
          >
            {/* محتوى الفيديو سيذهب هنا */}
          </div>
        ))}
      </div>

      <div className="webRtcButtons">
        <button
          className="webRtcCamera"
          onClick={toggleMic}
          style={{ backgroundColor: isMicMuted ? "#EE4B2B" : "cadetblue" }}
        >
          {isMicMuted ? <PiMicrophoneSlashFill /> : <HiMicrophone />}
        </button>
        <button
          className="webRtcMic"
          onClick={toggleCamera}
          style={{ backgroundColor: isCameraMuted ? "#EE4B2B" : "cadetblue" }}
        >
          {isCameraMuted ? <BsFillCameraVideoOffFill /> : <BsFillCameraVideoFill />}
        </button>

        <button
          className="webRtcScreenShare"
          onClick={toggleScreenSharing}
          style={{ backgroundColor: isSharingScreen ? "#EE4B2B" : "cadetblue" }}
        >
          <LuScreenShare />
        </button>
        <button className="endCall" onClick={leaveAndRemoveLocalStream}>
          <MdCallEnd />
        </button>
      </div>

      <button className="chatButton" onClick={() => setIsChatOpen(!isChatOpen)}>
        <MdOutlineChat />
      </button>
      {isChatOpen && (
        <div className="chatContainer">
          <button
            className="closeChat"
            onClick={() => setIsChatOpen(false)}
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <AiOutlineClose />
          </button>
          <Chat />
        </div>
      )}

      <button className="FileButton" onClick={() => setIsFilesOpen(!isFilesOpen)}>
        <FaFolder />
      </button>
      {isFilesOpen && (
        <div className="FileContainer">
          <button
            className="closeFiles"
            onClick={() => setIsFilesOpen(false)}
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <AiOutlineClose />
          </button>
          <FileSharing />
        </div>
      )}
    </div>
  );
};

export default MeetingNow;
