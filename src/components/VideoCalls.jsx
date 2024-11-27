// import React, { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';
// import { WebRTCPeer } from '../utils/webrtc';

// const VideoCall = ({ roomId, userId, isTeacher, onRoomClosed }) => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [isConnecting, setIsConnecting] = useState(true);
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const socketRef = useRef();
//   const peerRef = useRef();

//   useEffect(() => {
//     socketRef.current = io('https://6b9f-93-118-58-19.ngrok-free.app', {
//       reconnection: true,
//       reconnectionAttempts: Infinity,
//       reconnectionDelay: 1000,
//       reconnectionDelayMax: 5000,
//       timeout: 20000,
//       transports: [ 'websocket']
//     });

//     const initializeMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true
//         });

//         setLocalStream(stream);
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }

//         if (isTeacher) {
//           socketRef.current.emit('create-room', userId);
//         } else if (roomId) {
//           socketRef.current.emit('join-room', { roomId, studentId: userId });
//         }

//         setupSocketListeners(stream);
//       } catch (err) {
//         console.error('Error accessing media devices:', err);
//         setIsConnecting(false);
//       }
//     };

//     initializeMedia();

//     return cleanup;
//   }, [roomId, userId, isTeacher]);

//   const setupSocketListeners = (stream) => {
//     socketRef.current.on('student-joined', ({ studentId }) => {
//       console.log('Student joined, initiating call');
//       if (isTeacher) {
//         initializePeer(stream, true);
//       }
//     });

//     socketRef.current.on('room-closed', () => {
//       if (!isTeacher && onRoomClosed) {
//         cleanup();
//         onRoomClosed();
//       }
//     });

//     socketRef.current.on('signal', async ({ from, signalData }) => {
//       console.log('Signal received:', signalData.type || 'candidate');

//       if (!peerRef.current) {
//         initializePeer(stream, false);
//       }

//       const answer = await peerRef.current.handleSignal(signalData);
//       if (answer) {
//         socketRef.current.emit('signal', {
//           roomId,
//           signalData: answer
//         });
//       }
//     });
//   };

//   const initializePeer = (stream, isInitiator) => {
//     const peer = new WebRTCPeer(
//       stream,
//       (remoteStream) => {
//         console.log('Received remote stream');
//         setRemoteStream(remoteStream);
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = remoteStream;
//         }
//         setIsConnecting(false);
//       },
//       () => {
//         console.log('Peer connected');
//         setIsConnecting(false);
//       },
//       () => {
//         console.log('Peer connection closed');
//         setRemoteStream(null);
//         setIsConnecting(true);
//       }
//     );

//     peer.setOnIceCandidate((candidate) => {
//       socketRef.current.emit('signal', {
//         roomId,
//         signalData: candidate
//       });
//     });

//     if (isInitiator) {
//       peer.createOffer().then(offer => {
//         socketRef.current.emit('signal', {
//           roomId,
//           signalData: offer
//         });
//       });
//     }

//     peerRef.current = peer;
//   };

//   const cleanup = () => {
//     console.log('Cleaning up connections');
//     if (peerRef.current) {
//       peerRef.current.close();
//       peerRef.current = null;
//     }
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//     }
//     if (socketRef.current) {
//       socketRef.current.disconnect();
//     }
//     setRemoteStream(null);
//     setLocalStream(null);
//     setIsConnecting(true);
//   };

//   return (
//     <div className="video-container">
//       <div className="video-grid">
//         <div className="video-item">
//           <h3>أنت</h3>
//           <video
//             ref={localVideoRef}
//             autoPlay
//             playsInline
//             muted
//             style={{ transform: 'scaleX(-1)' }}
//           />
//         </div>
//         <div className="video-item">
//           <h3>{isTeacher ? 'الطالب' : 'المعلم'}</h3>
//           {remoteStream ? (
//             <video
//               ref={remoteVideoRef}
//               autoPlay
//               playsInline
//               style={{ transform: 'scaleX(-1)' }}
//             />
//           ) : (
//             <div className="no-video">
//               {isConnecting ? 'جاري الاتصال...' : 'لا يوجد فيديو'}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';
// import { Video, X } from 'lucide-react';

// const VideCall = () => {
//   const [roomId, setRoomId] = useState(null);
//   const [peers, setPeers] = useState({});
//   const [streams, setStreams] = useState({});
//   const socketRef = useRef(null);
//   const userVideoRef = useRef(null);
//   const [userStream, setUserStream] = useState(null);

//   useEffect(() => {
//     socketRef.current = io('http://localhost:3000');

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         setUserStream(stream);
//         if (userVideoRef.current) {
//           userVideoRef.current.srcObject = stream;
//         }
//       });

//     return () => {
//       socketRef.current.disconnect();
//       if (userStream) {
//         userStream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   const createRoom = () => {
//     socketRef.current.emit('create-room', socketRef.current.id);
//     socketRef.current.on('room-created', (newRoomId) => {
//       setRoomId(newRoomId);
//     });

//     socketRef.current.on('user-joined', ({ userId, isStudent }) => {
//       if (isStudent && userStream) {
//         const peer = createPeer(userId, socketRef.current.id, userStream);
//         setPeers(peers => ({ ...peers, [userId]: peer }));
//       }
//     });

//     socketRef.current.on('signal', ({ userId, signal }) => {
//       if (peers[userId]) {
//         peers[userId].signal(signal);
//       }
//     });

//     socketRef.current.on('user-left', (userId) => {
//       if (peers[userId]) {
//         peers[userId].destroy();
//         setPeers(peers => {
//           const newPeers = { ...peers };
//           delete newPeers[userId];
//           return newPeers;
//         });
//         setStreams(streams => {
//           const newStreams = { ...streams };
//           delete newStreams[userId];
//           return newStreams;
//         });
//       }
//     });
//   };

//   const createPeer = (userId, initiatorId, stream) => {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream,
//     });

//     peer.on('signal', signal => {
//       socketRef.current.emit('signal', { userId, signal });
//     });

//     peer.on('stream', stream => {
//       setStreams(streams => ({ ...streams, [userId]: stream }));
//     });

//     return peer;
//   };

//   const endSession = () => {
//     if (roomId) {
//       socketRef.current.emit('leave-room', roomId);
//       Object.values(peers).forEach(peer => peer.destroy());
//       setPeers({});
//       setStreams({});
//       setRoomId(null);
//     }
//   };

//   return (
//     <div className="min-vh-100 bg-light py-4">
//       <div className="container">
//         <div className="card shadow-sm mb-4">
//           <div className="card-body">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//               <h1 className="h3 mb-0">Teacher's Room</h1>
//               <div>
//                 {!roomId ? (
//                   <button
//                     onClick={createRoom}
//                     className="btn btn-primary d-flex align-items-center gap-2"
//                   >
//                     <Video size={20} />
//                     Create Room
//                   </button>
//                 ) : (
//                   <button
//                     onClick={endSession}
//                     className="btn btn-danger d-flex align-items-center gap-2"
//                   >
//                     <X size={20} />
//                     End Session
//                   </button>
//                 )}
//               </div>
//             </div>

//             {roomId && (
//               <div className="alert alert-info mb-4">
//                 <p className="mb-0">Room ID: <code className="ms-2">{roomId}</code></p>
//               </div>
//             )}

//             <div className="row g-4">
//               <div className="col-md-6 col-lg-4">
//                 <div className="position-relative bg-dark rounded overflow-hidden" style={{ aspectRatio: '16/9' }}>
//                   <video
//                     ref={userVideoRef}
//                     autoPlay
//                     muted
//                     playsInline
//                     className="w-100 h-100 object-fit-cover"
//                   />
//                   <div className="position-absolute bottom-0 start-0 m-2 px-2 py-1 bg-dark bg-opacity-75 rounded text-white">
//                     You (Teacher)
//                   </div>
//                 </div>
//               </div>

//               {Object.entries(streams).map(([userId, stream]) => (
//                 <div key={userId} className="col-md-6 col-lg-4">
//                   <div className="position-relative bg-dark rounded overflow-hidden" style={{ aspectRatio: '16/9' }}>
//                     <video
//                       autoPlay
//                       playsInline
//                       className="w-100 h-100 object-fit-cover"
//                       ref={video => {
//                         if (video) video.srcObject = stream;
//                       }}
//                     />
//                     <div className="position-absolute bottom-0 start-0 m-2 px-2 py-1 bg-dark bg-opacity-75 rounded text-white">
//                       Student {userId.slice(0, 4)}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideCall;
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://academy-backend-pq91.onrender.com");

const VideoCall = () => {
  const [roomId, setRoomId] = useState(null);
  const [users, setUsers] = useState([]);
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    if (roomId) {
      const initMedia = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        socket.emit("teacher-joined", { roomId, stream });
      };

      initMedia();
    }

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop()); // إيقاف جميع الـ tracks عند مغادرة الغرفة
      }
    };
  }, [roomId]);

  const createRoom = async () => {
    const response = await fetch("https://academy-backend-pq91.onrender.com/create-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userType: "teacher" }),
    });
    const data = await response.json();
    setRoomId(data.roomId);
    socket.emit("join-room", { roomId: data.roomId, userType: "teacher" });

    socket.on("update-users", (users) => {
      setUsers(users);
    });

    socket.on("new-peer", (peerId) => {
      createPeerConnection(peerId);
    });
  };

  const createPeerConnection = (peerId) => {
    const peerConnection = new RTCPeerConnection();
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("send-ice-candidate", { candidate: event.candidate, to: peerId });
      }
    };

    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];
      const remoteVideo = document.createElement("video");
      remoteVideo.srcObject = remoteStream;
      remoteVideo.autoplay = true;
      document.getElementById("videos").append(remoteVideo);
    };
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
          <div id="videos"></div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
