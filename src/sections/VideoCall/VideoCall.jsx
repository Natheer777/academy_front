// import { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("https://academy-backend-pq91.onrender.com");

// const VideoCall = () => {
// const [roomId, setRoomId] = useState(null);
// const [users, setUsers] = useState([]);
// const [localStream, setLocalStream] = useState(null);
// const [peerStreams, setPeerStreams] = useState([]);

// useEffect(() => {
// if (roomId) {
// const initMedia = async () => {
// try {
// const stream = await navigator.mediaDevices.getUserMedia({
// video: true,
// audio: true,
// });
// setLocalStream(stream);
// socket.emit("teacher-joined", { roomId });

//       // عرض فيديو المعلم
//       const localVideo = document.createElement("video");
//       localVideo.srcObject = stream;
//       localVideo.autoplay = true;
//       localVideo.controls = true;
//       document.getElementById("local-video").appendChild(localVideo);

//       // استقبال فيديو الطلاب
//       socket.on("student-stream", ({ studentId }) => {
//         const studentVideo = document.createElement("video");
//         studentVideo.autoplay = true;
//         studentVideo.controls = true;

//         // طلب التدفق من الطالب
//         socket.emit("get-stream", { recipientId: studentId });
//         socket.on("receive-stream", ({ senderId, streamId }) => {
//           if (senderId === studentId) {
//             studentVideo.srcObject = streamId; // تحديث مصدر الفيديو
//             document.getElementById("students-video").appendChild(studentVideo);
//           }
//         });
//       });
//     } catch (error) {
//       console.error("Error accessing media devices:", error);
//     }
//   };

//   initMedia();
// }

// return () => {
//   if (localStream) {
//     localStream.getTracks().forEach((track) => track.stop());
//   }
// };
// }, [roomId]);

// const createRoom = async () => {
// const response = await fetch("https://academy-backend-pq91.onrender.com/create-room", {
// method: "POST",
// headers: {
// "Content-Type": "application/json",
// },
// });
// const data = await response.json();
// setRoomId(data.roomId);
// socket.emit("join-room", { roomId: data.roomId, userType: "teacher" });


// socket.on("update-users", (users) => {
//   setUsers(users);
// });
// };

// const endSession = () => {
// socket.emit("leave-room", roomId);
// setRoomId(null);
// setUsers([]);
// };

// return (
// <div className="container mt-5">
// <h1>صفحة المعلم</h1>
// {!roomId ? (
// <button className="btn btn-primary" onClick={createRoom}>
// إنشاء غرفة
// </button>
// ) : (
// <div>
// <p>معرف الغرفة: {roomId}</p>
// <button className="btn btn-danger" onClick={endSession}>
// إنهاء الجلسة
// </button>
// <div id="local-video"></div>
// <div id="students-video"></div>
// </div>
// )}
// </div>
// );
// };

// export default VideoCall;









// import { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("https://academy-backend-pq91.onrender.com");


// const VideoCall = () => {
//   const [roomId, setRoomId] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStreams, setRemoteStreams] = useState([]);

//   useEffect(() => {
//     if (roomId) {
//       const initMedia = async () => {
//         try {
//           const stream = await navigator.mediaDevices.getUserMedia({
//             video: true,
//             audio: true,
//           });
//           setLocalStream(stream);

//           // إشعار الطلاب بالانضمام
//           socket.emit("teacher-joined", { roomId });

//           // عرض فيديو المعلم
//           const localVideo = document.createElement("video");
//           localVideo.srcObject = stream;
//           localVideo.autoplay = true;
//           localVideo.muted = true;
//           document.getElementById("local-video").appendChild(localVideo);

//           // استقبال تدفقات الطلاب
//           socket.on("student-stream", ({ studentId, streamId }) => {
//             const studentVideo = document.createElement("video");
//             studentVideo.srcObject = streamId;
//             studentVideo.autoplay = true;
//             document.getElementById("remote-videos").appendChild(studentVideo);
//           });
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
//     });
//     const data = await response.json();
//     setRoomId(data.roomId);
//     socket.emit("join-room", { roomId: data.roomId, userType: "teacher" });
//   };

//   const endSession = () => {
//     socket.emit("leave-room", roomId);
//     setRoomId(null);
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
//           <div id="local-video"></div>
//           <div id="remote-videos"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoCall;


// import { useState } from "react";

// const VideoCall = () => {
//   const [roomId, setRoomId] = useState(null);

//   const createRoom = async () => {
//     const response = await fetch("http://localhost:3000/create-room", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await response.json();
//     setRoomId(data.roomId);
//   };

//   const endSession = () => {
//     setRoomId(null);
//   };

//   return (
//     <div>
//       <h1>صفحة المعلم</h1>
//       {roomId ? (
//         <div>
//           <p>معرف الغرفة: {roomId}</p>
//           <button onClick={endSession}>إنهاء الجلسة</button>
//         </div>
//       ) : (
//         <button onClick={createRoom}>إنشاء غرفة</button>
//       )}
//     </div>
//   );
// };

// export default VideoCall;




// import { io } from "socket.io-client";
// import { useRef, useEffect, useState } from "react";
// import { FiVideo, FiVideoOff, FiMic, FiMicOff } from "react-icons/fi";

// const configuration = {
// iceServers: [
// {
// urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
// },
// ],
// iceCandidatePoolSize: 10,
// };
// const socket = io("https://academy-backend-pq91.onrender.com", { transports: ["websocket"] });

// let pc;
// let localStream;
// let startButton;
// let hangupButton;
// let muteAudButton;
// let remoteVideo;
// let localVideo;
// socket.on("message", (e) => {
// if (!localStream) {
// console.log("not ready yet");
// return;
// }
// switch (e.type) {
// case "offer":
// handleOffer(e);
// break;
// case "answer":
// handleAnswer(e);
// break;
// case "candidate":
// handleCandidate(e);
// break;
// case "ready":
// // A second tab joined. This tab will initiate a call unless in a call already.
// if (pc) {
// console.log("already in call, ignoring");
// return;
// }
// makeCall();
// break;
// case "bye":
// if (pc) {
// hangup();
// }
// break;
// default:
// console.log("unhandled", e);
// break;
// }
// });

// async function makeCall() {
// try {
// pc = new RTCPeerConnection(configuration);
// pc.onicecandidate = (e) => {
// const message = {
// type: "candidate",
// candidate: null,
// };
// if (e.candidate) {
// message.candidate = e.candidate.candidate;
// message.sdpMid = e.candidate.sdpMid;
// message.sdpMLineIndex = e.candidate.sdpMLineIndex;
// }
// socket.emit("message", message);
// };
// pc.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
// localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
// const offer = await pc.createOffer();
// socket.emit("message", { type: "offer", sdp: offer.sdp });
// await pc.setLocalDescription(offer);
// } catch (e) {
// console.log(e);
// }
// }

// async function handleOffer(offer) {
// if (pc) {
// console.error("existing peerconnection");
// return;
// }
// try {
// pc = new RTCPeerConnection(configuration);
// pc.onicecandidate = (e) => {
// const message = {
// type: "candidate",
// candidate: null,
// };
// if (e.candidate) {
// message.candidate = e.candidate.candidate;
// message.sdpMid = e.candidate.sdpMid;
// message.sdpMLineIndex = e.candidate.sdpMLineIndex;
// }
// socket.emit("message", message);
// };
// pc.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
// localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
// await pc.setRemoteDescription(offer);

// const answer = await pc.createAnswer();
// socket.emit("message", { type: "answer", sdp: answer.sdp });
// await pc.setLocalDescription(answer);
// } catch (e) {
// console.log(e);
// }
// }

// async function handleAnswer(answer) {
// if (!pc) {
// console.error("no peerconnection");
// return;
// }
// try {
// await pc.setRemoteDescription(answer);
// } catch (e) {
// console.log(e);
// }
// }

// async function handleCandidate(candidate) {
// try {
// if (!pc) {
// console.error("no peerconnection");
// return;
// }
// if (!candidate) {
// await pc.addIceCandidate(null);
// } else {
// await pc.addIceCandidate(candidate);
// }
// } catch (e) {
// console.log(e);
// }
// }
// async function hangup() {
// if (pc) {
// pc.close();
// pc = null;
// }
// localStream.getTracks().forEach((track) => track.stop());
// localStream = null;
// startButton.current.disabled = false;
// hangupButton.current.disabled = true;
// muteAudButton.current.disabled = true;
// }

// function JoinCall() {
// startButton = useRef(null);
// hangupButton = useRef(null);
// muteAudButton = useRef(null);
// localVideo = useRef(null);
// remoteVideo = useRef(null);
// useEffect(() => {
// hangupButton.current.disabled = true;
// muteAudButton.current.disabled = true;
// }, []);
// const [audiostate, setAudio] = useState(false);

// const startB = async () => {
// try {
// localStream = await navigator.mediaDevices.getUserMedia({
// video: true,
// audio: { echoCancellation: true },
// });
// localVideo.current.srcObject = localStream;
// } catch (err) {
// console.log(err);
// }

// startButton.current.disabled = true;
// hangupButton.current.disabled = false;
// muteAudButton.current.disabled = false;

// socket.emit("message", { type: "ready" });
// };

// const hangB = async () => {
// hangup();
// socket.emit("message", { type: "bye" });
// };

// function muteAudio() {
// if (audiostate) {
// localVideo.current.muted = true;
// setAudio(false);
// } else {
// localVideo.current.muted = false;
// setAudio(true);
// }
// }

// return (
// <>

// <main className="container ">

// <div className="video bg-main">

// <video

// ref={localVideo}

// className="video-item"

// autoPlay

// playsInline

// src=" "

// ></video>

// <video

// ref={remoteVideo}

// className="video-item"

// autoPlay

// playsInline

// src=" "

// ></video>

// </div>

// <div className="btn">

// <button

// className="btn-item btn-start"

// ref={startButton}

// onClick={startB}

// >

// <FiVideo />

// </button>

// <button

// className="btn-item btn-end"

// ref={hangupButton}

// onClick={hangB}

// >

// <FiVideoOff />

// </button>

// <button

// className="btn-item btn-start"

// ref={muteAudButton}

// onClick={muteAudio}

// >

// {audiostate ? <FiMic /> : <FiMicOff />}

// </button>

// </div>

// </main>

// </>

// );

// }

// export default JoinCall


import { io } from "socket.io-client";
import { useRef, useState } from "react";
import { FiVideo, FiVideoOff } from "react-icons/fi";

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};
const socket = io("https://academy-backend-pq91.onrender.com", { transports: ["websocket"] });

function VideoCall() {
  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const localVideo = useRef(null);

  const initializePeerConnection = () => {
    const pc = new RTCPeerConnection(configuration);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("message", {
          type: "candidate",
          candidate: event.candidate,
        });
      }
    };
    socket.emit("room-ready");
    setPeerConnection(pc);
    return pc;
  };

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: { echoCancellation: true },
    });
    localVideo.current.srcObject = stream;
    setLocalStream(stream);

    const pc = initializePeerConnection();
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("message", { type: "offer", sdp: offer.sdp });
  };

  const endCall = () => {
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
    localStream?.getTracks().forEach((track) => track.stop());
  };
  socket.on("connect", () => {
    console.log("Connected to WebSocket server.");
  });
  socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server.");
  });
  
  return (
    <div className="video-call">
      <video ref={localVideo} autoPlay playsInline className="local-video" />
      <div className="controls">
        <button onClick={startCall}>
          <FiVideo />
        </button>
        <button onClick={endCall}>
          <FiVideoOff />
        </button>
      </div>
    </div>
  );
}

export default VideoCall;
