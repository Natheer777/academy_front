

// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("https://academy-backend-pq91.onrender.com"); // تأكد من أن السيرفر يعمل عبر HTTPS

// const VideoCall = () => {
//   const [roomId, setRoomId] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [localStream, setLocalStream] = useState(null);
//   const [peers, setPeers] = useState({}); // لتخزين peer connections مع كل الطلاب

//   useEffect(() => {
//     if (roomId) {
//       const initMedia = async () => {
//         try {
//           const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//           setLocalStream(stream);
//           socket.emit("teacher-joined", { roomId, stream });

//           // إضافة الفيديو المحلي إلى الصفحة
//           const localVideo = document.createElement("video");
//           localVideo.srcObject = stream;
//           localVideo.autoplay = true;
//           localVideo.controls = true;
//           document.getElementById("local-video").appendChild(localVideo);
//         } catch (error) {
//           console.error("Error accessing media devices:", error);
//         }
//       };

//       initMedia();
//     }

//     return () => {
//       if (localStream) {
//         localStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [roomId]);

//   const createRoom = async () => {
//     const response = await fetch("https://academy-backend-pq91.onrender.com/create-room", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userType: "teacher" }),
//     });
//     const data = await response.json();
//     setRoomId(data.roomId);
//     socket.emit("join-room", { roomId: data.roomId, userType: "teacher" });

//     socket.on("update-users", (users) => {
//       setUsers(users);
//     });

//     socket.on("new-peer", (peerId) => {
//       createPeerConnection(peerId);
//     });
//   };

//   const createPeerConnection = (peerId) => {
//     const peerConnection = new RTCPeerConnection();

//     // إضافة الفيديو المحلي للاتصال
//     localStream.getTracks().forEach((track) => {
//       peerConnection.addTrack(track, localStream);
//     });

//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("send-ice-candidate", { candidate: event.candidate, to: peerId });
//       }
//     };

//     peerConnection.ontrack = (event) => {
//       const remoteStream = event.streams[0];
//       const remoteVideo = document.createElement("video");
//       remoteVideo.srcObject = remoteStream;
//       remoteVideo.autoplay = true;
//       remoteVideo.controls = true;
//       document.getElementById("videos").appendChild(remoteVideo);
//     };

//     setPeers((prevPeers) => ({
//       ...prevPeers,
//       [peerId]: peerConnection,
//     }));
//   };

//   const endSession = () => {
//     socket.emit("leave-room", roomId);
//     setRoomId(null);
//     setUsers([]);
//   };

//   return (
//     <div className="container mt-5">
//       <h1>صفحة المعلم</h1>
//       {!roomId ? (
//         <button className="btn btn-primary" onClick={createRoom}>
//           إنشاء غرفة
//         </button>
//       ) : (
//         <div>
//           <p>معرف الغرفة: {roomId}</p>
//           <button className="btn btn-danger" onClick={endSession}>
//             إنهاء الجلسة
//           </button>
//           <div id="local-video"></div> {/* لعرض الفيديو المحلي للمعلم */}
//           <div id="videos"></div> {/* لعرض فيديو الطلاب */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoCall;




import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const VideoCall = () => {
  const [roomId, setRoomId] = useState(null);
  const [users, setUsers] = useState([]);
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    if (roomId) {
      const initMedia = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          setLocalStream(stream);
          socket.emit("teacher-joined", { roomId, stream });

          const localVideo = document.createElement("video");
          localVideo.srcObject = stream;
          localVideo.autoplay = true;
          localVideo.controls = true;
          document.getElementById("local-video").appendChild(localVideo);
        } catch (error) {
          console.error("Error accessing media devices:", error);
        }
      };

      initMedia();
    }

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [roomId]);

  const createRoom = async () => {
    const response = await fetch("http://localhost:3000/create-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setRoomId(data.roomId);
    socket.emit("join-room", { roomId: data.roomId, userType: "teacher" });

    socket.on("update-users", (users) => {
      setUsers(users);
    });
  };

  const endSession = () => {
    socket.emit("leave-room", roomId);
    setRoomId(null);
    setUsers([]);
  };

  return (
    <div className="container mt-5">
      <h1>صفحة المعلم</h1>
      {!roomId ? (
        <button className="btn btn-primary" onClick={createRoom}>
          إنشاء غرفة
        </button>
      ) : (
        <div>
          <p>معرف الغرفة: {roomId}</p>
          <button className="btn btn-danger" onClick={endSession}>
            إنهاء الجلسة
          </button>
          <div id="local-video"></div>
          <div id="videos"></div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
