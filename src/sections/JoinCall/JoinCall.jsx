
// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("https://academy-backend-pq91.onrender.com"); // تأكد من أن السيرفر يعمل عبر HTTPS

// const JoinCall = () => {
//   const [roomId, setRoomId] = useState("");
//   const [inRoom, setInRoom] = useState(false);
//   const [localStream, setLocalStream] = useState(null);
//   const [peers, setPeers] = useState({}); // لتخزين peer connections مع المعلم

//   useEffect(() => {
//     if (inRoom) {
//       const initMedia = async () => {
//         try {
//           const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//           setLocalStream(stream);
//           socket.emit("student-joined", { roomId, stream });

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
//   }, [inRoom, roomId]);

//   const checkRoom = async () => {
//     const response = await fetch(`https://academy-backend-pq91.onrender.com/check-room/${roomId}`);
//     const data = await response.json();
//     if (data.exists) {
//       socket.emit("join-room", { roomId, userType: "student" });
//       setInRoom(true);

//       socket.on("update-users", (users) => {
//         setUsers(users);
//       });

//       socket.on("new-peer", (peerId) => {
//         createPeerConnection(peerId);
//       });
//     } else {
//       alert("الغرفة غير موجودة.");
//     }
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

//   const leaveRoom = () => {
//     socket.emit("leave-room", roomId);
//     setInRoom(false);
//     setRoomId("");
//   };

//   return (
//     <div className="container mt-5">
//       <h1>صفحة الطالب</h1>
//       {!inRoom ? (
//         <div>
//           <input
//             type="text"
//             placeholder="أدخل معرف الغرفة"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//             className="form-control mb-3"
//           />
//           <button className="btn btn-primary" onClick={checkRoom}>
//             الانضمام إلى الغرفة
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p>أنت في الغرفة: {roomId}</p>
//           <button className="btn btn-danger" onClick={leaveRoom}>
//             مغادرة الغرفة
//           </button>
//           <div id="local-video"></div> {/* لعرض الفيديو المحلي للطالب */}
//           <div id="videos"></div> {/* لعرض فيديو المعلم */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JoinCall;


import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const JoinCall = () => {
  const [roomId, setRoomId] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    socket.on("room-created", ({ roomId }) => {
      setRoomId(roomId);
      setWaiting(false);
    });

    if (inRoom) {
      const initMedia = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          setLocalStream(stream);
          socket.emit("student-joined", { roomId, stream });

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
  }, [inRoom]);

  const joinRoom = () => {
    socket.emit("join-room", { roomId, userType: "student" });
    setInRoom(true);
  };



  const leaveRoom = () => {
    socket.emit("leave-room", roomId);
    setInRoom(false);
    setRoomId("");
  };

  
  return (
    <div className="container mt-5">
      <h1>صفحة الطالب</h1>
      {waiting ? (
        <p>جاري انتظار الأستاذ لبدء الغرفة...</p>
      ) : inRoom ? (
        <div>
          <p>أنت في الغرفة: {roomId}</p>
          <button className="btn btn-danger" onClick={leaveRoom}>
            مغادرة الغرفة
          </button>
          <div id="local-video"></div>
          <div id="videos"></div>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={joinRoom}>
          الانضمام إلى الغرفة
        </button>
      )}
    </div>
  );
};

export default JoinCall;
