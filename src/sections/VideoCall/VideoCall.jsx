// import React, { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
// import './VideoCall.css'
// const socket = io("https://academy-backend-pq91.onrender.com");

// const VideoCall = () => {
//   const [roomId, setRoomId] = useState("");
//   const [stream, setStream] = useState(null);
//   const videoRef = useRef();

//   useEffect(() => {
//     // طلب الوصول إلى الكاميرا والميكروفون
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setStream(stream);
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       })
//       .catch((err) => console.error("Error accessing media devices:", err));
//   }, []);

//   const createRoom = () => {
//     socket.emit("create-room");
//     socket.on("room-created", ({ roomId }) => {
//       setRoomId(roomId);
//       console.log("Room ID:", roomId);
//     });
//   };

//   const joinRoom = () => {
//     socket.emit("join-room", { roomId });
//   };

//   const peerConnection = useRef(null);

// useEffect(() => {
//   peerConnection.current = new RTCPeerConnection();

//   // إضافة التدفق المحلي
//   if (stream) {
//     stream.getTracks().forEach((track) => {
//       peerConnection.current.addTrack(track, stream);
//     });
//   }

//   // التعامل مع التدفق المستلم
//   peerConnection.current.ontrack = (event) => {
//     const [remoteStream] = event.streams;
//     videoRef.current.srcObject = remoteStream;
//   };

//   socket.on("offer", async ({ sdp }) => {
//     await peerConnection.current.setRemoteDescription(new RTCSessionDescription(sdp));
//     const answer = await peerConnection.current.createAnswer();
//     await peerConnection.current.setLocalDescription(answer);

//     socket.emit("answer", { sdp: answer });
//   });

//   socket.on("answer", async ({ sdp }) => {
//     await peerConnection.current.setRemoteDescription(new RTCSessionDescription(sdp));
//   });

//   socket.on("candidate", ({ candidate }) => {
//     peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
//   });
// }, [stream]);


//   return (
//     <div>
//       <video ref={videoRef} autoPlay muted style={{ width: "500px", height: "300px", border: "1px solid black" }} />
//       <div>
//         <button onClick={createRoom}>Create Room</button>
//         <input type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
//         <button onClick={joinRoom}>Join Room</button>
//       </div>
//     </div>
//   );
// };

// export default VideoCall;


import React, { useState } from 'react';
import VideoCalls from '../../components/VideoCalls';
import './VideoCall.css'
const VideoCall = () => {
  const [roomStarted, setRoomStarted] = useState(false);
  const teacherId = "teacher-" + Math.random().toString(36).substring(2, 9);

  const startRoom = () => {
    setRoomStarted(true);
  };

  return (
    <div className="container">
      <h1>غرفة المعلم</h1>
      {!roomStarted ? (
        <button 
          onClick={startRoom}
          className="start-button"
        >
          بدء غرفة جديدة
        </button>
      ) : (
        <VideoCalls 
          userId={teacherId}
          isTeacher={true}
        />
      )}
    </div>
  );
};

export default VideoCall;