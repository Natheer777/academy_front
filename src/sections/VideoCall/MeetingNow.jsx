
// // import { useState, useEffect } from "react";
// // import AgoraRTC from "agora-rtc-sdk-ng";
// // import { useNavigate } from "react-router-dom"; // لاستخدام التنقل
// // import { AiOutlineClose } from "react-icons/ai"; // أيقونة الإغلاق
// // import { MdCallEnd } from "react-icons/md";
// // import { HiMicrophone } from "react-icons/hi2";
// // import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";
// // import { LuScreenShare } from "react-icons/lu";
// // import { MdOutlineChat } from "react-icons/md";
// // import { FaFolder } from "react-icons/fa6";
// // import { MdMicOff } from "react-icons/md";
// // import { MdFullscreenExit } from "react-icons/md";
// // import { MdFullscreen } from "react-icons/md";
// // import { FiMoreVertical } from "react-icons/fi";


// // import Chat from "../chat/Chat";
// // import FileSharing from "./FileSharing ";
// // import "./VideoCall.css";

// // const APP_ID = "46c493c48baf40cead62de60ae7efda5"; // معرف التطبيق
// // const MeetingNow = () => {
// //   const level = localStorage.getItem("showVideoCall"); // الحصول على المستوى من localStorage
// //   const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
// //   const [localTracks, setLocalTracks] = useState([]);
// //   const [streams, setStreams] = useState([]);
// //   const [isMicMuted, setIsMicMuted] = useState(false);
// //   const [isCameraMuted, setIsCameraMuted] = useState(false);
// //   const [isSharingScreen, setIsSharingScreen] = useState(false);
// //   const [token, setToken] = useState(null);
// //   const [isChatOpen, setIsChatOpen] = useState(false); // حالة فتح الشات
// //   const [isFilesOpen, setIsFilesOpen] = useState(false);
// //   const [CHANNEL, setChannel] = useState(""); // حالة القناة
// //   const [isFullscreen, setIsFullscreen] = useState(false);
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);


// //   const navigate = useNavigate(); // التنقل بين الصفحات

// //   useEffect(() => {
// //     if (level) {
// //       setChannel(`main${level}`);
// //       const fetchToken = async () => {
// //         try {
// //           const response = await fetch(
// //             `https://api.japaneseacademy.jp/get-token?level=${level}&uid=0`
// //           );
// //           if (!response.ok) throw new Error("Failed to fetch token");
// //           const data = await response.json();
// //           setToken(data.token);
// //         } catch (error) {
// //           console.error("Error fetching token:", error);
// //         }
// //       };

// //       fetchToken();
// //     }
// //   }, [level]); // تحديث الـ useEffect بناءً على المستوى

// //   const joinAndDisplayLocalStream = async () => {
// //     if (!token) return;

// //     client.on("user-published", handleUserJoined);
// //     client.on("user-unpublished", handleUserLeft);

// //     const UID = await client.join(APP_ID, CHANNEL, token, null);

// //     if (localTracks.length === 0) {
// //       const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
// //       setLocalTracks(tracks);

// //       setStreams((prevStreams) => [
// //         ...prevStreams,
// //         { id: UID, videoTrack: tracks[1] },
// //       ]);

// //       await client.publish(tracks);
// //     }
// //   };

// //   const handleUserLeft = (user) => {
// //     setStreams((prevStreams) =>
// //       prevStreams.filter((stream) => stream.id !== user.uid)
// //     );
// //   };

// //   const handleUserJoined = async (user, mediaType) => {
// //     await client.subscribe(user, mediaType);

// //     if (mediaType === "video" && user.videoTrack) {
// //       setStreams((prevStreams) => {
// //         if (!prevStreams.some((stream) => stream.id === user.uid)) {
// //           return [
// //             ...prevStreams,
// //             { id: user.uid, videoTrack: user.videoTrack },
// //           ];
// //         }
// //         return prevStreams;
// //       });
// //     }

// //     if (mediaType === "audio") {
// //       user.audioTrack?.play();
// //     }
// //   };

// //   useEffect(() => {
// //     joinAndDisplayLocalStream();
// //   }, [token]);

// //   useEffect(() => {
// //     streams.forEach((stream) => {
// //       const videoContainer = document.getElementById(`user-${stream.id}`);
// //       if (videoContainer && stream.videoTrack) {
// //         stream.videoTrack.play(videoContainer);
// //       }
// //     });

// //     return () => {
// //       streams.forEach((stream) => {
// //         stream.videoTrack?.stop();
// //       });
// //     };
// //   }, [streams]);

// //   const leaveAndRemoveLocalStream = async () => {
// //     for (let track of localTracks) {
// //       track.stop();
// //       track.close();
// //     }
// //     fetch('https://api.japaneseacademy.jp/end-session', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ uid: 0 }), // استخدم UID المستخدم
// //     }).catch((error) => console.error('Error ending session:', error));

// //     navigate('/'); // إعادة التوجيه إلى الصفحة الرئيسية
// //   };

// //   const toggleMic = async () => {
// //     if (localTracks[0]) {
// //       const newState = !isMicMuted;
// //       localTracks[0].setEnabled(!newState);
// //       setIsMicMuted(newState);
// //     }
// //   };

// //   const toggleCamera = async () => {
// //     if (localTracks[1]) {
// //       const newState = !isCameraMuted;
// //       localTracks[1].setEnabled(!newState);
// //       setIsCameraMuted(newState);
// //     }
// //   };

// //   const toggleScreenSharing = async () => {
// //     if (isSharingScreen) {
// //       await client.unpublish(localTracks[1]);
// //       const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
// //       setLocalTracks(tracks);
// //       await client.publish(tracks);
// //       setIsSharingScreen(false);
// //     } else {
// //       const screenTrack = await AgoraRTC.createScreenVideoTrack();
// //       await client.unpublish(localTracks[1]);
// //       setLocalTracks([localTracks[0], screenTrack]);
// //       await client.publish(screenTrack);
// //       setIsSharingScreen(true);
// //     }
// //   };


// //   const enterFullscreen = () => {
// //     const element = document.documentElement;
// //     if (element.requestFullscreen) {
// //       element.requestFullscreen();
// //     } else if (element.mozRequestFullScreen) {
// //       element.mozRequestFullScreen();
// //     } else if (element.webkitRequestFullscreen) {
// //       element.webkitRequestFullscreen();
// //     } else if (element.msRequestFullscreen) {
// //       element.msRequestFullscreen();
// //     }
// //     setIsFullscreen(true);
// //   };

// //   // وظيفة للخروج من وضع الشاشة الكاملة
// //   const exitFullscreen = () => {
// //     if (document.exitFullscreen) {
// //       document.exitFullscreen();
// //     } else if (document.mozCancelFullScreen) {
// //       document.mozCancelFullScreen();
// //     } else if (document.webkitExitFullscreen) {
// //       document.webkitExitFullscreen();
// //     } else if (document.msExitFullscreen) {
// //       document.msExitFullscreen();
// //     }
// //     setIsFullscreen(false);
// //   };

// //   // تعقب التغيرات في وضع الشاشة الكاملة
// //   useEffect(() => {
// //     const handleFullscreenChange = () => {
// //       if (
// //         !document.fullscreenElement &&
// //         !document.mozFullScreenElement &&
// //         !document.webkitFullscreenElement &&
// //         !document.msFullscreenElement
// //       ) {
// //         setIsFullscreen(false);
// //       }
// //     };

// //     document.addEventListener("fullscreenchange", handleFullscreenChange);
// //     document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
// //     document.addEventListener("mozfullscreenchange", handleFullscreenChange);
// //     document.addEventListener("MSFullscreenChange", handleFullscreenChange);

// //     return () => {
// //       document.removeEventListener("fullscreenchange", handleFullscreenChange);
// //       document.removeEventListener(
// //         "webkitfullscreenchange",
// //         handleFullscreenChange
// //       );
// //       document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
// //       document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
// //     };
// //   }, []);

// //   // إعادة الشاشة للوضع الطبيعي عند الخروج من الصفحة
// //   useEffect(() => {
// //     return () => {
// //       if (isFullscreen) {
// //         exitFullscreen();
// //       }
// //     };
// //   }, [isFullscreen]);

// // ////////////

// // useEffect(() => {
// //   // تعيين قيمة في localStorage لإخفاء عنصر social
// //   localStorage.setItem('hideSocial', 'true');

// //   return () => {
// //     // إعادة قيمة default عندما يغادر المستخدم الصفحة
// //     localStorage.removeItem('hideSocial');
// //   };
// // }, []);



// // // const leaveAndRemoveLocalStream = async () => {
// // //   for (let track of localTracks) {
// // //     track.stop();
// // //     track.close();
// // //   }

// // //   await client.leave();
// // //   setLocalTracks([]);
// // //   setStreams([]);

// // //   // إرسال طلب لإنهاء الجلسة
// // //   fetch('https://api.japaneseacademy.jp/end-session', {
// // //     method: 'POST',
// // //     headers: {
// // //       'Content-Type': 'application/json',
// // //     },
// // //     body: JSON.stringify({ uid: 0 }), // استخدم UID المستخدم
// // //   }).catch((error) => console.error('Error ending session:', error));

// // //   navigate('/'); // إعادة التوجيه إلى الصفحة الرئيسية
// // // };




// // useEffect(() => {
// //   const existingSession = localStorage.getItem('activeSession');
// //   if (existingSession) {
// //     alert('لديك جلسة نشطة بالفعل. لا يمكنك فتح الجلسة في أكثر من علامة تبويب.');
// //     navigate('/'); // إعادة التوجيه إلى الصفحة الرئيسية
// //   } else {
// //     localStorage.setItem('activeSession', 'true');
// //   }

// //   return () => {
// //     localStorage.removeItem('activeSession');
// //   };
// // }, []);


// //   return (
// //     <div className="webRtc">

// //       {/* <h5 className="text-light textLevel">غرفة البث المباشر - المستوى: {level}</h5> */}

// //       <div id="video-streams">
// //         {streams.map((stream) => (
// //           <div
// //             key={stream.id}
// //             id={`user-${stream.id}`}
// //             style={{
// //               background: stream.videoTrack ? "black" : "transparent",
// //             }}
// //           >
// //           </div>
// //         ))}
// //       </div>

// //         <div className="AllButtonVideo">


// //       <div className="webRtcButtons">
// //         <button
// //           className="webRtcCamera"
// //           onClick={toggleMic}
// //           style={{ backgroundColor: isMicMuted ? "#EE4B2B" : "cadetblue" }}
// //           >
// //           {isMicMuted ? <MdMicOff /> : <HiMicrophone />}
// //         </button>
// //         <button
// //           className="webRtcMic"
// //           onClick={toggleCamera}
// //           style={{ backgroundColor: isCameraMuted ? "#EE4B2B" : "cadetblue" }}
// //           >
// //           {isCameraMuted ? <BsFillCameraVideoOffFill /> : <BsFillCameraVideoFill />}
// //         </button>

// //         <button
// //           className="webRtcScreenShare"
// //           onClick={toggleScreenSharing}
// //           style={{ backgroundColor: isSharingScreen ? "#EE4B2B" : "cadetblue" }}
// //           >
// //           <LuScreenShare />
// //         </button>






// //         <div style={{ position: "relative" }}>

// //           <button
// //             onClick={() => setIsMenuOpen(!isMenuOpen)}

// //             >
// //             <FiMoreVertical />
// //           </button>

// //           {/* القائمة المنبثقة */}
// //           {isMenuOpen && (
// //             <div className="listIconVideo"

// //             >
// //               <button
// //                 onClick={isFullscreen ? exitFullscreen : enterFullscreen}

// //                 >
// //                 {isFullscreen ? (
// //                   <>
// //                     <MdFullscreenExit />
// //                     <span>إغلاق ملء الشاشة</span>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <MdFullscreen />
// //                     <span>ملء الشاشة</span>
// //                   </>
// //                 )}              </button>
// //             </div>
// //           )}
// //         </div>





// //         <button className="endCall" onClick={leaveAndRemoveLocalStream}>
// //           <MdCallEnd />
// //         </button>
// //       </div>

// //       <button className="chatButton" onClick={() => setIsChatOpen(!isChatOpen)}>
// //         <MdOutlineChat />
// //       </button>
// //       {isChatOpen && (
// //         <div className="chatContainer">
// //           <button
// //             className="closeChat"
// //             onClick={() => setIsChatOpen(false)}
// //             style={{ position: "absolute", top: 0, right: 0 }}
// //             >
// //             <AiOutlineClose />
// //           </button>
// //           <Chat />
// //         </div>
// //       )}

// //       <button className="FileButton" onClick={() => setIsFilesOpen(!isFilesOpen)}>
// //         <FaFolder />
// //       </button>
// //       {isFilesOpen && (
// //         <div className="FileContainer">
// //           <button
// //             className="closeFiles"
// //             onClick={() => setIsFilesOpen(false)}
// //             style={{ position: "absolute", top: 0, right: 0 }}
// //             >
// //             <AiOutlineClose />
// //           </button>
// //           <FileSharing />
// //         </div>
// //       )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MeetingNow;










// import { useState, useEffect, useRef } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineClose } from "react-icons/ai";
// import { MdCallEnd } from "react-icons/md";
// import { HiMicrophone } from "react-icons/hi2";
// import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";
// import { LuScreenShare } from "react-icons/lu";
// import { MdOutlineChat } from "react-icons/md";
// import { FaFolder } from "react-icons/fa6";
// import { MdMicOff } from "react-icons/md";
// import { MdFullscreenExit } from "react-icons/md";
// import { MdFullscreen } from "react-icons/md";
// import { FiMoreVertical } from "react-icons/fi";
// import Chat from "../chat/Chat";
// import FileSharing from "../VideoCall/FileSharing ";
// import "./VideoCall.css";

// const APP_ID = "46c493c48baf40cead62de60ae7efda5";

// const MeetingNow = () => {
//   const level = localStorage.getItem("showVideoCall");
//   const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
//   const [localTracks, setLocalTracks] = useState([]);
//   const [streams, setStreams] = useState([]);
//   const [isMicMuted, setIsMicMuted] = useState(false);
//   const [isCameraMuted, setIsCameraMuted] = useState(false);
//   const [isSharingScreen, setIsSharingScreen] = useState(false);
//   const [token, setToken] = useState(null);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [isFilesOpen, setIsFilesOpen] = useState(false);
//   const [CHANNEL, setChannel] = useState("");
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userInitial, setUserInitial] = useState("");
//   const [userRole, setUserRole] = useState("");
//   const videoRefs = useRef({});

//   const navigate = useNavigate();

//   const fetchToken = async () => {
//     setIsLoading(true);
//     try {
//       let response = await fetch(
//         `https://api.japaneseacademy.jp/get-token?level=${level}&uid=0`
//       );

//       if (!response.ok && response.status === 400) {
//         const errorData = await response.json();
//         if (errorData.error.includes("لديك جلسة نشطة بالفعل")) {
//           response = await fetch(
//             `https://api.japaneseacademy.jp/regenerate-token?level=${level}&uid=0`
//           );
//           if (!response.ok) throw new Error('Failed to fetch token');
//         } else {
//           throw new Error(errorData.error);
//         }
//       } else if (!response.ok) {
//         throw new Error('Failed to fetch token');
//       }

//       const data = await response.json();
//       setToken(data.token);
//     } catch (error) {
//       console.error('Error fetching token:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchUserData = async () => {
//     try {
//       const userId = localStorage.getItem('userId');
//       if (!userId) {
//         console.error('User ID not found in localStorage');
//         return;
//       }

//       const response = await fetch(`https://api.japaneseacademy.jp/allusers`);
//       if (!response.ok) throw new Error('Failed to fetch user data');

//       const allUsers = await response.json();
//       const userData = allUsers.find(user => user.id === parseInt(userId));
//       if (!userData) {
//         console.error('User not found in the API response');
//         return;
//       }

//       const firstName = userData.firstName || "User";
//       const initial = firstName.charAt(0).toUpperCase();
//       setUserInitial(initial);
//       setUserRole(userData.role); // تعيين دور المستخدم (معلم أو طالب)
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setUserInitial("U");
//     }
//   };

//   useEffect(() => {
//     if (level) {
//       setChannel(`main${level}`);
//       fetchToken();
//       fetchUserData();
//     }
//   }, [level]);

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
//         { id: UID, videoTrack: tracks[1], initial: userInitial, role: userRole },
//       ]);

//       await client.publish(tracks);
//     }
//   };

//   const handleUserLeft = (user) => {
//     setStreams((prevStreams) => prevStreams.filter((stream) => stream.id !== user.uid));
//   };

//   const handleUserJoined = async (user, mediaType) => {
//     await client.subscribe(user, mediaType);

//     if (mediaType === "video" && user.videoTrack) {
//       setStreams((prevStreams) => {
//         if (!prevStreams.some((stream) => stream.id === user.uid)) {
//           const role = user.uid === client.uid ? userRole : "student";
//           return [...prevStreams, { id: user.uid, videoTrack: user.videoTrack, initial: "U", role }];
//         }
//         return prevStreams;
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
//       const videoElement = videoRefs.current[stream.id];
//       if (videoElement && stream.videoTrack) {
//         stream.videoTrack.play(videoElement);
//       }
//     });

//     return () => {
//       streams.forEach((stream) => {
//         stream.videoTrack?.stop();
//       });
//     };
//   }, [streams]);

//   const leaveAndRemoveLocalStream = async () => {
//     try {
//       for (let track of localTracks) {
//         track.stop();
//         track.close();
//       }

//       await client.leave();
//       setLocalTracks([]);
//       setStreams([]);

//       const response = await fetch('https://api.japaneseacademy.jp/end-session', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ uid: 0 }),
//       });

//       if (!response.ok) throw new Error('Failed to end session');
//     } catch (error) {
//       console.error('Error during cleanup:', error);
//     } finally {
//       navigate('/');
//     }
//   };

//   const toggleMic = async () => {
//     if (localTracks[0]) {
//       const newState = !isMicMuted;
//       await localTracks[0].setEnabled(!newState);
//       setIsMicMuted(newState);
//     }
//   };

//   const toggleCamera = async () => {
//     if (localTracks[1]) {
//       const newState = !isCameraMuted;
//       await localTracks[1].setEnabled(!newState);
//       setIsCameraMuted(newState);

//       setStreams((prevStreams) =>
//         prevStreams.map((stream) => {
//           if (stream.id === client.uid) {
//             return {
//               ...stream,
//               videoTrack: stream.videoTrack, // Keep the original video track
//             };
//           }
//           return stream;
//         })
//       );
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

//   const enterFullscreen = () => {
//     const element = document.documentElement;
//     if (element.requestFullscreen) {
//       element.requestFullscreen();
//     } else if (element.mozRequestFullScreen) {
//       element.mozRequestFullScreen();
//     } else if (element.webkitRequestFullscreen) {
//       element.webkitRequestfullscreen();
//     } else if (element.msRequestFullscreen) {
//       element.msRequestFullscreen();
//     }
//     setIsFullscreen(true);
//   };

//   const exitFullscreen = () => {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.mozCancelFullScreen) {
//       document.mozCancelFullScreen();
//     } else if (document.webkitExitFullscreen) {
//       document.webkitExitFullscreen();
//     } else if (document.msExitFullscreen) {
//       document.msExitFullscreen();
//     }
//     setIsFullscreen(false);
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       if (
//         !document.fullscreenElement &&
//         !document.mozFullScreenElement &&
//         !document.webkitFullscreenElement &&
//         !document.msFullscreenElement
//       ) {
//         setIsFullscreen(false);
//       }
//     };

//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
//     document.addEventListener("mozfullscreenchange", handleFullscreenChange);
//     document.addEventListener("MSFullscreenChange", handleFullscreenChange);

//     return () => {
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//       document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
//       document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
//       document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
//     };
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (isFullscreen) {
//         exitFullscreen();
//       }
//     };
//   }, [isFullscreen]);

//   useEffect(() => {
//     localStorage.setItem('hideSocial', 'true');

//     return () => {
//       localStorage.removeItem('hideSocial');
//     };
//   }, []);

//   useEffect(() => {
//     const existingSession = localStorage.getItem('activeSession');
//     if (existingSession) {
//       alert('لديك جلسة نشطة بالفعل. لا يمكنك فتح الجلسة في أكثر من علامة تبويب.');
//       navigate('/');
//     } else {
//       localStorage.setItem('activeSession', 'true');
//     }

//     return () => {
//       localStorage.removeItem('activeSession');
//     };
//   }, []);



//   const teacherStream = streams.find((stream) => stream.role === "teacher");
//   const studentStreams = streams.filter((stream) => stream.role !== "teacher");
//   const totalParticipants = teacherStream ? studentStreams.length + 1 : studentStreams.length;

//   return (
//     <div className="webRtc">
//       {isLoading && (
//         <div className="loading-overlay">
//           <div className="loading-spinner"></div>
//           <p>جاري التحميل، الرجاء الانتظار...</p>
//         </div>
//       )}
//       <div
//         id="video-streams"
//         className="video-grid"
//         data-participants={totalParticipants}
//       >
//         {teacherStream && (
//           <div
//             key={teacherStream.id}
//             id={`user-${teacherStream.id}`}
//             className="video-container teacher"
//           >
//             {teacherStream.videoTrack ? (
//               <video
//                 autoPlay
//                 playsInline
//                 muted={teacherStream.id !== client.uid}
//                 ref={(el) => { videoRefs.current[teacherStream.id] = el; }}
//               />
//             ) : (
//               <div className="initial">{teacherStream.initial || "T"}</div>
//             )}
//           </div>
//         )}

//         {studentStreams.map((stream, index) => (
//           <div
//             key={stream.id}
//             id={`user-${stream.id}`}
//             className="video-container student"
//             style={{ order: index + 1 }}
//           >
//             {stream.videoTrack ? (
//               <video
//                 autoPlay
//                 playsInline
//                 muted={stream.id !== client.uid}
//                 ref={(el) => { videoRefs.current[stream.id] = el; }}
//               />
//             ) : (
//               <div className="initial">{stream.initial || "U"}</div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="AllButtonVideo">
//         <div className="webRtcButtons">
//           <button className="FileButton" onClick={() => setIsFilesOpen(!isFilesOpen)}>
//             <FaFolder />
//           </button>

//           <button
//             className="webRtcCamera"
//             onClick={toggleMic}
//             style={{ backgroundColor: isMicMuted ? "#EE4B2B" : "cadetblue" }}
//           >
//             {isMicMuted ? <MdMicOff /> : <HiMicrophone />}
//           </button>
//           <button
//             className="webRtcMic"
//             onClick={toggleCamera}
//             style={{ backgroundColor: isCameraMuted ? "#EE4B2B" : "cadetblue" }}
//           >
//             {isCameraMuted ? <BsFillCameraVideoOffFill /> : <BsFillCameraVideoFill />}
//           </button>

//           <button
//             className="webRtcScreenShare"
//             onClick={toggleScreenSharing}
//             style={{ backgroundColor: isSharingScreen ? "#EE4B2B" : "cadetblue" }}
//           >
//             <LuScreenShare />
//           </button>

//           <div style={{ position: "relative" }}>
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               <FiMoreVertical />
//             </button>

//             {isMenuOpen && (
//               <div className="listIconVideo">
//                 <button onClick={isFullscreen ? exitFullscreen : enterFullscreen}>
//                   {isFullscreen ? (
//                     <>
//                       <MdFullscreenExit />
//                       <span>إغلاق ملء الشاشة</span>
//                     </>
//                   ) : (
//                     <>
//                       <MdFullscreen />
//                       <span>ملء الشاشة</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             )}
//           </div>

//           <button className="endCall" onClick={leaveAndRemoveLocalStream}>
//             <MdCallEnd />
//           </button>
//           <button className="chatButton" onClick={() => setIsChatOpen(!isChatOpen)}>
//             <MdOutlineChat />
//           </button>



//         </div>


//         {isChatOpen && (
//           <div className="chatContainer">
//             <button
//               className="closeChat"
//               onClick={() => setIsChatOpen(false)}
//               style={{ position: "absolute", top: 0, right: 0 }}
//             >
//               <AiOutlineClose />
//             </button>
//             <Chat />
//           </div>
//         )}



//         {isFilesOpen && (
//           <div className="FileContainer">
//             <button
//               className="closeFiles"
//               onClick={() => setIsFilesOpen(false)}
//               style={{ position: "absolute", top: 0, right: 0 }}
//             >
//               <AiOutlineClose />
//             </button>
//             <FileSharing />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MeetingNow;

















import { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { MdCallEnd } from "react-icons/md";
import { HiMicrophone } from "react-icons/hi2";
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";
import { LuScreenShare } from "react-icons/lu";
import { MdOutlineChat } from "react-icons/md";
import { FaFolder } from "react-icons/fa6";
import { MdMicOff } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import { MdFullscreen , MdScreenshotMonitor  } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import Chat from "../chat/Chat";
import FileSharing from "../VideoCall/FileSharing ";
import "./VideoCall.css";

const APP_ID = "46c493c48baf40cead62de60ae7efda5";

const MeetingNow = () => {
  const level = localStorage.getItem("showVideoCall");
  const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [localTracks, setLocalTracks] = useState([]);
  const [streams, setStreams] = useState([]);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraMuted, setIsCameraMuted] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [token, setToken] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const [CHANNEL, setChannel] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLayoutOpenn, setIsLayoutOpenn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInitial, setUserInitial] = useState("");
  const [userRole, setUserRole] = useState("");
  const [layout, setLayout] = useState('grid'); // الحالة الافتراضية هي "grid"
  const videoRefs = useRef({});

  const navigate = useNavigate();

  const fetchToken = async () => {
    setIsLoading(true);
    try {
      let response = await fetch(
        `https://api.japaneseacademy.jp/get-token?level=${level}&uid=0`
      );

      if (!response.ok && response.status === 400) {
        const errorData = await response.json();
        if (errorData.error.includes("لديك جلسة نشطة بالفعل")) {
          response = await fetch(
            `https://api.japaneseacademy.jp/regenerate-token?level=${level}&uid=0`
          );
          if (!response.ok) throw new Error('Failed to fetch token');
        } else {
          throw new Error(errorData.error);
        }
      } else if (!response.ok) {
        throw new Error('Failed to fetch token');
      }

      const data = await response.json();
      setToken(data.token);
    } catch (error) {
      console.error('Error fetching token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      const response = await fetch(`https://api.japaneseacademy.jp/allusers`);
      if (!response.ok) throw new Error('Failed to fetch user data');

      const allUsers = await response.json();
      const userData = allUsers.find(user => user.id === parseInt(userId));
      if (!userData) {
        console.error('User not found in the API response');
        return;
      }

      const firstName = userData.firstName || "User";
      const initial = firstName.charAt(0).toUpperCase();
      setUserInitial(initial);
      setUserRole(userData.role); // تعيين دور المستخدم (معلم أو طالب)
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserInitial("U");
    }
  };

  useEffect(() => {
    if (level) {
      setChannel(`main${level}`);
      fetchToken();
      fetchUserData();
    }
  }, [level]);

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
        { id: UID, videoTrack: tracks[1], initial: userInitial, role: userRole },
      ]);

      await client.publish(tracks);
    }
  };

  const handleUserLeft = (user) => {
    setStreams((prevStreams) => prevStreams.filter((stream) => stream.id !== user.uid));
  };

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video" && user.videoTrack) {
      setStreams((prevStreams) => {
        if (!prevStreams.some((stream) => stream.id === user.uid)) {
          const role = user.uid === client.uid ? userRole : "student";
          return [...prevStreams, { id: user.uid, videoTrack: user.videoTrack, initial: "U", role }];
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
      const videoElement = videoRefs.current[stream.id];
      if (videoElement && stream.videoTrack) {
        stream.videoTrack.play(videoElement);
      }
    });

    return () => {
      streams.forEach((stream) => {
        stream.videoTrack?.stop();
      });
    };
  }, [streams]);

  const leaveAndRemoveLocalStream = async () => {
    try {
      for (let track of localTracks) {
        track.stop();
        track.close();
      }

      await client.leave();
      setLocalTracks([]);
      setStreams([]);

      const response = await fetch('https://api.japaneseacademy.jp/end-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: 0 }),
      });

      if (!response.ok) throw new Error('Failed to end session');
    } catch (error) {
      console.error('Error during cleanup:', error);
    } finally {
      navigate('/');
    }
  };

  const toggleMic = async () => {
    if (localTracks[0]) {
      const newState = !isMicMuted;
      await localTracks[0].setEnabled(!newState);
      setIsMicMuted(newState);
    }
  };

  const toggleCamera = async () => {
    if (localTracks[1]) {
      const newState = !isCameraMuted;
      await localTracks[1].setEnabled(!newState);
      setIsCameraMuted(newState);

      setStreams((prevStreams) =>
        prevStreams.map((stream) => {
          if (stream.id === client.uid) {
            return {
              ...stream,
              videoTrack: stream.videoTrack, // Keep the original video track
            };
          }
          return stream;
        })
      );
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

  const enterFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestfullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullscreen(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (isFullscreen) {
        exitFullscreen();
      }
    };
  }, [isFullscreen]);

  useEffect(() => {
    localStorage.setItem('hideSocial', 'true');

    return () => {
      localStorage.removeItem('hideSocial');
    };
  }, []);

  useEffect(() => {
    const existingSession = localStorage.getItem('activeSession');
    if (existingSession) {
      alert('لديك جلسة نشطة بالفعل. لا يمكنك فتح الجلسة في أكثر من علامة تبويب.');
      navigate('/');
    } else {
      localStorage.setItem('activeSession', 'true');
    }

    return () => {
      localStorage.removeItem('activeSession');
    };
  }, []);

  const teacherStream = streams.find((stream) => stream.role === "teacher");
  const studentStreams = streams.filter((stream) => stream.role !== "teacher");
  const totalParticipants = teacherStream ? studentStreams.length + 1 : studentStreams.length;

  return (
    <div className="webRtc">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>جاري التحميل، الرجاء الانتظار...</p>
        </div>
      )}

      <div
        id="video-streams"
        className={`video-grid ${layout}`} // إضافة الكلاس بناءً على الشكل المحدد
        data-participants={totalParticipants}
      >
        {teacherStream && (
          <div
            key={teacherStream.id}
            id={`user-${teacherStream.id}`}
            className={`video-container teacher ${layout}`}
          >
            {teacherStream.videoTrack ? (
              <video
                autoPlay
                playsInline
                muted={teacherStream.id !== client.uid}
                ref={(el) => { videoRefs.current[teacherStream.id] = el; }}
              />
            ) : (
              <div className="initial">{teacherStream.initial || "T"}</div>
            )}
          </div>
        )}

        {studentStreams.map((stream, index) => (
          <div
            key={stream.id}
            id={`user-${stream.id}`}
            className={`video-container student ${layout}`}
            style={{ order: index + 1 }}
          >
            {stream.videoTrack ? (
              <video
                autoPlay
                playsInline
                muted={stream.id !== client.uid}
                ref={(el) => { videoRefs.current[stream.id] = el; }}
              />
            ) : (
              <div className="initial">{stream.initial || "U"}</div>
            )}
          </div>
        ))}
      </div>

      <div className="AllButtonVideo">
        <div className="webRtcButtons">
          <button className="FileButton" onClick={() => setIsFilesOpen(!isFilesOpen)}>
            <FaFolder />
          </button>

          {userRole === "teacher" && (
            <div style={{ position: "relative" }}>
              <button onClick={() => setIsLayoutOpenn(!isLayoutOpenn)}>
                <MdScreenshotMonitor />
              </button>

              {isLayoutOpenn && (
                <div className="layout-menu">
                  <button onClick={() => { setLayout('grid'); setIsLayoutOpenn(false); }}>شبكة</button>
                  <button onClick={() => { setLayout('stack'); setIsLayoutOpenn(false); }}>ثنائي</button>
                  <button onClick={() => { setLayout('focus'); setIsLayoutOpenn(false); }}>تركيز</button>
                </div>
              )}
            </div>
          )}

          <button
            className="webRtcCamera"
            onClick={toggleMic}
            style={{ backgroundColor: isMicMuted ? "#EE4B2B" : "cadetblue" }}
          >
            {isMicMuted ? <MdMicOff /> : <HiMicrophone />}
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

          <div style={{ position: "relative" }}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <FiMoreVertical />
            </button>

            {isMenuOpen && (
              <div className="listIconVideo">
                <button onClick={isFullscreen ? exitFullscreen : enterFullscreen}>
                  {isFullscreen ? (
                    <>
                      <MdFullscreenExit />
                      <span>إغلاق ملء الشاشة</span>
                    </>
                  ) : (
                    <>
                      <MdFullscreen />
                      <span>ملء الشاشة</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <button className="endCall" onClick={leaveAndRemoveLocalStream}>
            <MdCallEnd />
          </button>

         

          <button className="chatButton" onClick={() => setIsChatOpen(!isChatOpen)}>
            <MdOutlineChat />
          </button>
        </div>

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
    </div>
  );
};

export default MeetingNow;