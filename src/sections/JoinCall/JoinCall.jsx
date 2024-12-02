// // import  { useState, useEffect } from "react";
// // import io from "socket.io-client";

// // const socket = io("https://academy-backend-pq91.onrender.com");

// // const JoinCall = () => {
// //   const [roomId, setRoomId] = useState("");
// //   const [inRoom, setInRoom] = useState(false);
// //   const [localStream, setLocalStream] = useState(null);
// //   const [waiting, setWaiting] = useState(true);

// //   useEffect(() => {
// //     socket.on("room-created", ({ roomId }) => {
// //       setRoomId(roomId);
// //       setWaiting(false);
// //     });

// //     if (inRoom) {
// //       const initMedia = async () => {
// //         try {
// //           const stream = await navigator.mediaDevices.getUserMedia({
// //             video: true,
// //             audio: true,
// //           });
// //           console.log("Local Stream:", stream);
          
// //           setLocalStream(stream);
// //           socket.on("student-joined", ({ roomId, stream }) => {
// //             console.log("Student joined room:", roomId);
// //             console.log("Received stream:", stream);
// //           });
// //           const localVideo = document.createElement("video");
// //           localVideo.srcObject = stream;
// //           localVideo.autoplay = true;
// //           localVideo.controls = true;
// //           document.getElementById("local-video").appendChild(localVideo);
// //         } catch (error) {
// //           console.error("Error accessing media devices:", error);
// //         }
// //       };

// //       initMedia();
// //     }

// //     return () => {
// //       if (localStream) {
// //         localStream.getTracks().forEach((track) => track.stop());
// //       }
// //     };
// //   }, [inRoom]);

// //   const joinRoom = () => {
// //     socket.emit("join-room", { roomId, userType: "student", streamId: localStream });
// //         setInRoom(true);
// //   };



// //   const leaveRoom = () => {
// //     socket.emit("leave-room", roomId);
// //     setInRoom(false);
// //     setRoomId("");
// //   };

  
// //   return (
// //     <div className="container mt-5">
// //       <h1>صفحة الطالب</h1>
// //       {waiting ? (
// //         <p>جاري انتظار الأستاذ لبدء الغرفة...</p>
// //       ) : inRoom ? (
// //         <div>
// //           <p>أنت في الغرفة: {roomId}</p>
// //           <button className="btn btn-danger" onClick={leaveRoom}>
// //             مغادرة الغرفة
// //           </button>
// //           <div id="local-video"></div>
// //           <div id="videos"></div>
// //         </div>
// //       ) : (
// //         <button className="btn btn-primary" onClick={joinRoom}>
// //           الانضمام إلى الغرفة
// //         </button>
// //       )}
// //     </div>
// //   );
// // };

// // export default JoinCall;


// // import { useState, useEffect } from "react";
// // import io from "socket.io-client";

// // // إعداد Socket.IO
// // const socket = io("https://academy-backend-pq91.onrender.com");

// // // صفحة الطالب
// // const JoinCall = () => {
// //   const [roomId, setRoomId] = useState("");
// //   const [inRoom, setInRoom] = useState(false);
// //   const [localStream, setLocalStream] = useState(null);
// //   const [remoteStreams, setRemoteStreams] = useState([]);
// //   const [waiting, setWaiting] = useState(true);

// //   useEffect(() => {
// //     // استلام إشعار إنشاء الغرفة
// //     socket.on("room-created", ({ roomId }) => {
// //       setRoomId(roomId);
// //       setWaiting(false);
// //     });

// //     // عند الانضمام إلى الغرفة
// //     if (inRoom) {
// //       const initMedia = async () => {
// //         try {
// //           const stream = await navigator.mediaDevices.getUserMedia({
// //             video: true,
// //             audio: true,
// //           });
// //           setLocalStream(stream);

// //           // إرسال التدفق المحلي
// //           socket.emit("student-joined", { roomId });

// //           // عرض فيديو الطالب
// //           const localVideo = document.createElement("video");
// //           localVideo.srcObject = stream;
// //           localVideo.autoplay = true;
// //           localVideo.muted = true;
// //           document.getElementById("local-video").appendChild(localVideo);

// //           // استقبال تدفقات المعلم
// //           socket.on("teacher-stream", ({ streamId }) => {
// //             const teacherVideo = document.createElement("video");
// //             teacherVideo.srcObject = new MediaStream(streamId); // تحويل streamId إلى MediaStream
// //             teacherVideo.autoplay = true;
// //             document.getElementById("remote-videos").appendChild(teacherVideo);
// //           });

// //         } catch (error) {
// //           console.error("Error accessing media devices:", error);
// //         }
// //       };

// //       initMedia();
// //     }

// //     return () => {
// //       if (localStream) {
// //         localStream.getTracks().forEach((track) => track.stop());
// //       }
// //     };
// //   }, [inRoom]);

// //   const joinRoom = () => {
// //     socket.emit("join-room", { roomId, userType: "student" });
// //     setInRoom(true);
// //   };
// //   const leaveRoom = () => {
// //     socket.emit("leave-room", roomId);
// //     setInRoom(false);
// //     setRoomId("");
  
// //     // تنظيف الفيديوهات
// //     const localVideo = document.getElementById("local-video");
// //     while (localVideo.firstChild) {
// //       localVideo.removeChild(localVideo.firstChild);
// //     }
  
// //     const remoteVideos = document.getElementById("remote-videos");
// //     while (remoteVideos.firstChild) {
// //       remoteVideos.removeChild(remoteVideos.firstChild);
// //     }
// //   };
  

// //   return (
// //     <div className="container mt-5">
// //       <h1>صفحة الطالب</h1>
// //       {waiting ? (
// //         <p>جاري انتظار الأستاذ لبدء الغرفة...</p>
// //       ) : inRoom ? (
// //         <div>
// //           <p>أنت في الغرفة: {roomId}</p>
// //           <button className="btn btn-danger" onClick={leaveRoom}>
// //             مغادرة الغرفة
// //           </button>
// //           <div id="local-video"></div>
// //           <div id="remote-videos"></div>
// //         </div>
// //       ) : (
// //         <button className="btn btn-primary" onClick={joinRoom}>
// //           الانضمام إلى الغرفة
// //         </button>
// //       )}
// //     </div>
// //   );
// // };

// // export default JoinCall;



// import { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("https://academy-backend-pq91.onrender.com");

// const JoinCall = () => {
//   const [roomId, setRoomId] = useState("");
//   const [inRoom, setInRoom] = useState(false);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStreams, setRemoteStreams] = useState([]);

//   useEffect(() => {
//     socket.on("room-created", ({ roomId }) => {
//       setRoomId(roomId);
//     });

//     if (inRoom) {
//       const initMedia = async () => {
//         try {
//           const stream = await navigator.mediaDevices.getUserMedia({
//             video: true,
//             audio: true,
//           });
//           setLocalStream(stream);

//           const localVideo = document.createElement("video");
//           localVideo.srcObject = stream;
//           localVideo.autoplay = true;
//           localVideo.muted = true;
//           document.getElementById("local-video").appendChild(localVideo);

//           socket.emit("join-room", { roomId, userType: "student" });

//           socket.on("teacher-stream", ({ streamId }) => {
//             const teacherVideo = document.createElement("video");
//             teacherVideo.srcObject = streamId;
//             teacherVideo.autoplay = true;
//             document.getElementById("remote-videos").appendChild(teacherVideo);
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
//   }, [inRoom]);

//   const joinRoom = () => {
//     setInRoom(true);
//   };

//   const leaveRoom = () => {
//     socket.emit("leave-room", roomId);
//     setInRoom(false);
//     setRoomId("");
//   };

//   return (
//     <div>
//       <h1>صفحة الطالب</h1>
//       {inRoom ? (
//         <div>
//           <p>أنت في الغرفة: {roomId}</p>
//           <button onClick={leaveRoom}>مغادرة الغرفة</button>
//           <div id="local-video"></div>
//           <div id="remote-videos"></div>
//         </div>
//       ) : (
//         <button onClick={joinRoom}>الانضمام إلى الغرفة</button>
//       )}
//     </div>
//   );
// };

// export default JoinCall;




// import { io } from "socket.io-client";
// import { useRef, useEffect, useState } from "react";
// import { FiVideo, FiVideoOff, FiMic, FiMicOff } from "react-icons/fi";

// const configuration = {
//   iceServers: [
//     {
//       urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
//     },
//   ],
//   iceCandidatePoolSize: 10,
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
//   if (!localStream) {
//     console.log("not ready yet");
//     return;
//   }
//   switch (e.type) {
//     case "offer":
//       handleOffer(e);
//       break;
//     case "answer":
//       handleAnswer(e);
//       break;
//     case "candidate":
//       handleCandidate(e);
//       break;
//     case "ready":
//       // A second tab joined. This tab will initiate a call unless in a call already.
//       if (pc) {
//         console.log("already in call, ignoring");
//         return;
//       }
//       makeCall();
//       break;
//     case "bye":
//       if (pc) {
//         hangup();
//       }
//       break;
//     default:
//       console.log("unhandled", e);
//       break;
//   }
// });

// async function makeCall() {
//   try {
//     pc = new RTCPeerConnection(configuration);
//     pc.onicecandidate = (e) => {
//       const message = {
//         type: "candidate",
//         candidate: null,
//       };
//       if (e.candidate) {
//         message.candidate = e.candidate.candidate;
//         message.sdpMid = e.candidate.sdpMid;
//         message.sdpMLineIndex = e.candidate.sdpMLineIndex;
//       }
//       socket.emit("message", message);
//     };
//     pc.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
//     localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
//     const offer = await pc.createOffer();
//     socket.emit("message", { type: "offer", sdp: offer.sdp });
//     await pc.setLocalDescription(offer);
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function handleOffer(offer) {
//   if (pc) {
//     console.error("existing peerconnection");
//     return;
//   }
//   try {
//     pc = new RTCPeerConnection(configuration);
//     pc.onicecandidate = (e) => {
//       const message = {
//         type: "candidate",
//         candidate: null,
//       };
//       if (e.candidate) {
//         message.candidate = e.candidate.candidate;
//         message.sdpMid = e.candidate.sdpMid;
//         message.sdpMLineIndex = e.candidate.sdpMLineIndex;
//       }
//       socket.emit("message", message);
//     };
//     pc.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
//     localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
//     await pc.setRemoteDescription(offer);

//     const answer = await pc.createAnswer();
//     socket.emit("message", { type: "answer", sdp: answer.sdp });
//     await pc.setLocalDescription(answer);
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function handleAnswer(answer) {
//   if (!pc) {
//     console.error("no peerconnection");
//     return;
//   }
//   try {
//     await pc.setRemoteDescription(answer);
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function handleCandidate(candidate) {
//   try {
//     if (!pc) {
//       console.error("no peerconnection");
//       return;
//     }
//     if (!candidate) {
//       await pc.addIceCandidate(null);
//     } else {
//       await pc.addIceCandidate(candidate);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }
// async function hangup() {
//   if (pc) {
//     pc.close();
//     pc = null;
//   }
//   localStream.getTracks().forEach((track) => track.stop());
//   localStream = null;
//   startButton.current.disabled = false;
//   hangupButton.current.disabled = true;
//   muteAudButton.current.disabled = true;
// }

// function JoinCall() {
//   startButton = useRef(null);
//   hangupButton = useRef(null);
//   muteAudButton = useRef(null);
//   localVideo = useRef(null);
//   remoteVideo = useRef(null);
//   useEffect(() => {
//     hangupButton.current.disabled = true;
//     muteAudButton.current.disabled = true;
//   }, []);
//   const [audiostate, setAudio] = useState(false);

//   const startB = async () => {
//     try {
//       localStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: { echoCancellation: true },
//       });
//       localVideo.current.srcObject = localStream;
//     } catch (err) {
//       console.log(err);
//     }

//     startButton.current.disabled = true;
//     hangupButton.current.disabled = false;
//     muteAudButton.current.disabled = false;

//     socket.emit("message", { type: "ready" });
//   };

//   const hangB = async () => {
//     hangup();
//     socket.emit("message", { type: "bye" });
//   };

//   function muteAudio() {
//     if (audiostate) {
//       localVideo.current.muted = true;
//       setAudio(false);
//     } else {
//       localVideo.current.muted = false;
//       setAudio(true);
//     }
//   }

//   return (
//     <>
//       <main className="container  ">
//         <div className="video bg-main">
//           <video
//             ref={localVideo}
//             className="video-item"
//             autoPlay
//             playsInline
//             src=" "
//           ></video>
//           <video
//             ref={remoteVideo}
//             className="video-item"
//             autoPlay
//             playsInline
//             src=" "
//           ></video>
//         </div>

//         <div className="btn">
//           <button
//             className="btn-item btn-start"
//             ref={startButton}
//             onClick={startB}
//           >
//             <FiVideo />
//           </button>
//           <button
//             className="btn-item btn-end"
//             ref={hangupButton}
//             onClick={hangB}
//           >
//             <FiVideoOff />
//           </button>
//           <button
//             className="btn-item btn-start"
//             ref={muteAudButton}
//             onClick={muteAudio}
//           >
//             {audiostate ? <FiMic /> : <FiMicOff />}
//           </button>
//         </div>
//       </main>
//     </>
//   );
// }

// export default JoinCall




// import { io } from "socket.io-client";
// import { useRef, useEffect, useState } from "react";
// import { FiVideo, FiVideoOff, FiMic, FiMicOff } from "react-icons/fi";

// const configuration = {
//   iceServers: [
//     {
//       urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
//     },
//   ],
//   iceCandidatePoolSize: 10,
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
//   if (!localStream) {
//     console.log("not ready yet");
//     return;
//   }
//   switch (e.type) {
//     case "offer":
//       handleOffer(e);
//       break;
//     case "answer":
//       handleAnswer(e);
//       break;
//     case "candidate":
//       handleCandidate(e);
//       break;
//     case "ready":
//       // A second tab joined. This tab will initiate a call unless in a call already.
//       if (pc) {
//         console.log("already in call, ignoring");
//         return;
//       }
//       makeCall();
//       break;
//     case "bye":
//       if (pc) {
//         hangup();
//       }
//       break;
//     default:
//       console.log("unhandled", e);
//       break;
//   }
// });

// async function makeCall() {
//   try {
//     pc = new RTCPeerConnection(configuration);
//     pc.onicecandidate = (e) => {
//       const message = {
//         type: "candidate",
//         candidate: null,
//       };
//       if (e.candidate) {
//         message.candidate = e.candidate.candidate;
//         message.sdpMid = e.candidate.sdpMid;
//         message.sdpMLineIndex = e.candidate.sdpMLineIndex;
//       }
//       socket.emit("message", message);
//     };
//     pc.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
//     localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
//     const offer = await pc.createOffer();
//     socket.emit("message", { type: "offer", sdp: offer.sdp });
//     await pc.setLocalDescription(offer);
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function handleOffer(offer) {
//   if (pc) {
//     console.error("existing peerconnection");
//     return;
//   }
//   try {
//     pc = new RTCPeerConnection(configuration);
//     pc.onicecandidate = (e) => {
//       const message = {
//         type: "candidate",
//         candidate: null,
//       };
//       if (e.candidate) {
//         message.candidate = e.candidate.candidate;
//         message.sdpMid = e.candidate.sdpMid;
//         message.sdpMLineIndex = e.candidate.sdpMLineIndex;
//       }
//       socket.emit("message", message);
//     };
//     pc.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
//     localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
//     await pc.setRemoteDescription(offer);

//     const answer = await pc.createAnswer();
//     socket.emit("message", { type: "answer", sdp: answer.sdp });
//     await pc.setLocalDescription(answer);
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function handleAnswer(answer) {
//   if (!pc) {
//     console.error("no peerconnection");
//     return;
//   }
//   try {
//     await pc.setRemoteDescription(answer);
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function handleCandidate(candidate) {
//   try {
//     if (!pc) {
//       console.error("no peerconnection");
//       return;
//     }
//     if (!candidate) {
//       await pc.addIceCandidate(null);
//     } else {
//       await pc.addIceCandidate(candidate);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }
// async function hangup() {
//   if (pc) {
//     pc.close();
//     pc = null;
//   }
//   localStream.getTracks().forEach((track) => track.stop());
//   localStream = null;
//   startButton.current.disabled = false;
//   hangupButton.current.disabled = true;
//   muteAudButton.current.disabled = true;
// }

// function JoinCall() {
//   startButton = useRef(null);
//   hangupButton = useRef(null);
//   muteAudButton = useRef(null);
//   localVideo = useRef(null);
//   remoteVideo = useRef(null);
//   useEffect(() => {
//     hangupButton.current.disabled = true;
//     muteAudButton.current.disabled = true;
//   }, []);
//   const [audiostate, setAudio] = useState(false);

//   const startB = async () => {
//     try {
//       localStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: { echoCancellation: true },
//       });
//       localVideo.current.srcObject = localStream;
//     } catch (err) {
//       console.log(err);
//     }

//     startButton.current.disabled = true;
//     hangupButton.current.disabled = false;
//     muteAudButton.current.disabled = false;

//     socket.emit("message", { type: "ready" });
//   };

//   const hangB = async () => {
//     hangup();
//     socket.emit("message", { type: "bye" });
//   };

//   function muteAudio() {
//     if (audiostate) {
//       localVideo.current.muted = true;
//       setAudio(false);
//     } else {
//       localVideo.current.muted = false;
//       setAudio(true);
//     }
//   }

//   return (
//     <>
//       <main className="container  ">
//         <div className="video bg-main">
//           <video
//             ref={localVideo}
//             className="video-item"
//             autoPlay
//             playsInline
//             src=" "
//           ></video>
//           <video
//             ref={remoteVideo}
//             className="video-item"
//             autoPlay
//             playsInline
//             src=" "
//           ></video>
//         </div>

//         <div className="btn">
//           <button
//             className="btn-item btn-start"
//             ref={startButton}
//             onClick={startB}
//           >
//             <FiVideo />
//           </button>
//           <button
//             className="btn-item btn-end"
//             ref={hangupButton}
//             onClick={hangB}
//           >
//             <FiVideoOff />
//           </button>
//           <button
//             className="btn-item btn-start"
//             ref={muteAudButton}
//             onClick={muteAudio}
//           >
//             {audiostate ? <FiMic /> : <FiMicOff />}
//           </button>
//         </div>
//       </main>
//     </>
//   );
// }

// export default JoinCall


import { io } from "socket.io-client";
import { useRef, useEffect, useState } from "react";
import { FiVideo, FiVideoOff, FiMic, FiMicOff } from "react-icons/fi";

// إعدادات خادم WebRTC
const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

// إعداد WebSocket
const socket = io("https://academy-backend-pq91.onrender.com", { transports: ["websocket"] });

let peerConnections = {}; // إدارة جميع الاتصالات
let localStream;
let startButton;
let hangupButton;
let muteAudButton;
let remoteVideo;
let localVideo;

socket.on("message", (e) => {
  if (!localStream) {
    console.log("not ready yet");
    return;
  }

  const { from, to } = e; // تحديد المرسل والمستقبل
  switch (e.type) {
    case "offer":
      handleOffer(e, from); // تمرير هوية المرسل
      break;
    case "answer":
      handleAnswer(e, from); // تمرير هوية المرسل
      break;
    case "candidate":
      handleCandidate(e, from); // تمرير هوية المرسل
      break;
    case "ready":
      // عند انضمام مشارك جديد، أنشئ اتصالًا مع كل مستخدم موجود بالفعل
      if (Object.keys(peerConnections).length > 0) {
        Object.keys(peerConnections).forEach((peerId) => {
          makeCall(peerId);
        });
      }
      break;
    case "bye":
      if (peerConnections[from]) {
        hangup(from);
      }
      break;
    default:
      console.log("unhandled", e);
      break;
  }
});

async function makeCall(peerId) {
  try {
    const pc = new RTCPeerConnection(configuration);
    peerConnections[peerId] = pc; // إضافة الاتصال إلى قائمة الاتصالات

    pc.onicecandidate = (e) => {
      const message = {
        type: "candidate",
        candidate: null,
        to: peerId, // تحديد المستقبل
      };
      if (e.candidate) {
        message.candidate = e.candidate.candidate;
        message.sdpMid = e.candidate.sdpMid;
        message.sdpMLineIndex = e.candidate.sdpMLineIndex;
      }
      socket.emit("message", message);
    };

    pc.ontrack = (e) => {
      remoteVideo.current.srcObject = e.streams[0]; // عرض فيديو المستخدم البعيد
    };

    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

    const offer = await pc.createOffer();
    socket.emit("message", { type: "offer", sdp: offer.sdp, to: peerId }); // إرسال العرض للمستخدم المحدد
    await pc.setLocalDescription(offer);
  } catch (e) {
    console.log(e);
  }
}

async function handleOffer(offer, from) {
  if (peerConnections[from]) {
    console.error("existing peerconnection");
    return;
  }
  try {
    const pc = new RTCPeerConnection(configuration);
    peerConnections[from] = pc; // إضافة الاتصال إلى قائمة الاتصالات

    pc.onicecandidate = (e) => {
      const message = {
        type: "candidate",
        candidate: null,
        to: from, // الرد إلى المرسل الأصلي
      };
      if (e.candidate) {
        message.candidate = e.candidate.candidate;
        message.sdpMid = e.candidate.sdpMid;
        message.sdpMLineIndex = e.candidate.sdpMLineIndex;
      }
      socket.emit("message", message);
    };

    pc.ontrack = (e) => {
      remoteVideo.current.srcObject = e.streams[0]; // عرض فيديو المستخدم البعيد
    };

    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
    await pc.setRemoteDescription(offer);

    const answer = await pc.createAnswer();
    socket.emit("message", { type: "answer", sdp: answer.sdp, to: from }); // إرسال الإجابة إلى المستخدم المحدد
    await pc.setLocalDescription(answer);
  } catch (e) {
    console.log(e);
  }
}

async function handleAnswer(answer, from) {
  const pc = peerConnections[from];
  if (!pc) {
    console.error("no peerconnection");
    return;
  }
  try {
    await pc.setRemoteDescription(answer);
  } catch (e) {
    console.log(e);
  }
}

async function handleCandidate(candidate, from) {
  const pc = peerConnections[from];
  try {
    if (!pc) {
      console.error("no peerconnection");
      return;
    }
    if (!candidate) {
      await pc.addIceCandidate(null);
    } else {
      await pc.addIceCandidate(candidate);
    }
  } catch (e) {
    console.log(e);
  }
}

async function hangup(peerId) {
  const pc = peerConnections[peerId];
  if (pc) {
    pc.close();
    delete peerConnections[peerId]; // إزالة الاتصال
  }
  if (Object.keys(peerConnections).length === 0) {
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
    startButton.current.disabled = false;
    hangupButton.current.disabled = true;
    muteAudButton.current.disabled = true;
  }
}

function JoinCall() {
  startButton = useRef(null);
  hangupButton = useRef(null);
  muteAudButton = useRef(null);
  localVideo = useRef(null);
  remoteVideo = useRef(null);

  useEffect(() => {
    hangupButton.current.disabled = true;
    muteAudButton.current.disabled = true;
  }, []);

  const [audiostate, setAudio] = useState(false);

  const startB = async () => {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { echoCancellation: true },
      });
      localVideo.current.srcObject = localStream;
    } catch (err) {
      console.log(err);
    }

    startButton.current.disabled = true;
    hangupButton.current.disabled = false;
    muteAudButton.current.disabled = false;

    socket.emit("message", { type: "ready" });
  };

  const hangB = async () => {
    Object.keys(peerConnections).forEach((peerId) => hangup(peerId));
    socket.emit("message", { type: "bye" });
  };

  function muteAudio() {
    if (audiostate) {
      localVideo.current.muted = true;
      setAudio(false);
    } else {
      localVideo.current.muted = false;
      setAudio(true);
    }
  }

  return (
    <>
      <main className="container">
        <div className="video bg-main">
          <video
            ref={localVideo}
            className="video-item"
            autoPlay
            playsInline
            muted
          ></video>
          <video
            ref={remoteVideo}
            className="video-item"
            autoPlay
            playsInline
          ></video>
        </div>

        <div className="btn">
          <button
            className="btn-item btn-start"
            ref={startButton}
            onClick={startB}
          >
            <FiVideo />
          </button>
          <button
            className="btn-item btn-end"
            ref={hangupButton}
            onClick={hangB}
          >
            <FiVideoOff />
          </button>
          <button
            className="btn-item btn-start"
            ref={muteAudButton}
            onClick={muteAudio}
          >
            {audiostate ? <FiMic /> : <FiMicOff />}
          </button>
        </div>
      </main>
    </>
  );
}

export default JoinCall;