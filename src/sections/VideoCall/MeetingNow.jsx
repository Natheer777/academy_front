import { useState, useEffect, useRef, useCallback } from "react";
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
import { MdFullscreen, MdScreenshotMonitor } from "react-icons/md";
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
  const [layout, setLayout] = useState('grid');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [videoKey, setVideoKey] = useState(Date.now())
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);


  const videoRefs = useRef({});

  const navigate = useNavigate();
  const fetchToken = async () => {
    setIsLoading(true);
    try {
      const level = localStorage.getItem("showVideoCall");
      const uid = localStorage.getItem("uid");
      const userRole = localStorage.getItem("userRole");

      console.log("Fetching token with:", { level, uid, userRole });

      if (!level || !uid || !userRole) {
        throw new Error("يجب إرسال معلمات level و uid و userRole في الطلب.");
      }

      let response = await fetch(
        `https://api.japaneseacademy.jp/get-token?level=${level}&uid=${uid}&userRole=${userRole}`
      );

      if (!response.ok && response.status === 400) {
        const errorData = await response.json();
        console.log("Error from server:", errorData);

        if (errorData.error.includes("لديك جلسة نشطة بالفعل")) {
          response = await fetch(
            `https://api.japaneseacademy.jp/regenerate-token?level=${level}&uid=${uid}`
          );
          if (!response.ok) throw new Error('Failed to regenerate token');
        } else {
          throw new Error(errorData.error);
        }
      } else if (!response.ok) {
        throw new Error('Failed to fetch token');
      }

      const data = await response.json();
      console.log("Token fetched successfully:", data);
      setToken(data.token);
    } catch (error) {
      console.error('Error fetching token:', error.message);
    }
  };


  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
  
      const response = await fetch(`https://api.japaneseacademy.jp/allusers`);
      if (!response.ok) throw new Error("فشل في جلب بيانات المستخدم");
  
      const allUsers = await response.json();
      const userData = allUsers.find(user => user.id === parseInt(userId));
      
      if (userData) {
        const firstName = userData.firstName?.trim() || "مستخدم";
        setUserInitial(firstName.charAt(0).toUpperCase());
        setUserRole(userData.role);
      } else {
        setUserInitial("U");
      }
    } catch (error) {
      console.error("❌ خطأ أثناء جلب بيانات المستخدم:", error);
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


  useEffect(() => {

    console.log("🔄 Streams updated:", streams);

    setTimeout(() => {
      streams.forEach((stream) => {
        const videoElement = videoRefs.current[stream.id];

        if (!videoElement) {
          console.warn(`⚠️ Video element STILL NOT found for stream ID: ${stream.id}, retrying...`);

          // نعيد المحاولة بعد 500ms حتى يتم تحديث `videoRefs`
          setTimeout(() => {
            const retryVideoElement = videoRefs.current[stream.id];
            if (retryVideoElement) {
              console.log(`✅ Retrying success: Video element found for stream ID: ${stream.id}`);
              stream.videoTrack.play(retryVideoElement).catch((err) => {
                console.error(`❌ Error playing video for stream ${stream.id}:`, err);
              });
            } else {
              console.error(`❌ FINAL ERROR: Video element not found for stream ID: ${stream.id}`);
            }
          }, 500);

          return;
        }

        console.log(`▶️ Playing video for stream ID: ${stream.id}`);
        stream.videoTrack.play(videoElement).catch((err) => {
          console.error(`❌ Error playing video for stream ${stream.id}:`, err);
        });
      });
    }, 500); // تأخير بسيط لضمان تحميل الفيديو في DOM


    streams.forEach((stream) => {
      if (stream.videoTrack) {
        setTimeout(() => {
          const videoElement = videoRefs.current[stream.id];
          if (videoElement) {
            console.log(`✅ تشغيل فيديو بعد التحديث للمستخدم ${stream.id}`);
            stream.videoTrack.play(videoElement).catch((err) =>
              console.error(`❌ خطأ أثناء تشغيل الفيديو بعد التحديث للمستخدم ${stream.id}:`, err)
            );
          }
        }, 500);
      }
    });

  }, [streams, localTracks]);




  // ✅ 2️⃣ الانضمام إلى القناة ونشر البث المحلي
  const joinAndDisplayLocalStream = async () => {
    if (!token || client.connectionState === 'CONNECTED' || client.connectionState === 'CONNECTING') {
      console.warn("Client is already connected or connecting. Skipping join.");
      return;
    }


    console.log("Joining channel:", CHANNEL, "with token:", token);

    client.on("user-published", (user, mediaType) => {
      console.log("📡 User published:", user.uid, "Media Type:", mediaType);
      handleUserJoined(user, mediaType);
    });

    client.on("user-unpublished", (user) => {
      console.log("📴 User unpublished:", user.uid);
      handleUserLeft(user);
    });

    try {
      const UID = await client.join(APP_ID, CHANNEL, token, null);
      console.log(`✅ Joined successfully with UID: ${UID}`);
  
      // الحصول على مسارات منفصلة للمايك والكاميرا
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
  
      setLocalTracks([audioTrack, videoTrack]);
      setStreams((prevStreams) => [
        ...prevStreams,
        { id: UID, videoTrack, initial: localStorage.getItem("firstName"), role: localStorage.getItem("userRole") },
      ]);
  
      await client.publish([audioTrack, videoTrack]);
      console.log("📡 Published local tracks successfully.");
  
    } catch (error) {
      console.error("❌ Error joining and publishing stream:", error);
    
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      if (localTracks[1]) {
        localTracks[1].setEnabled(true);
        console.log("✅ تم تفعيل الكاميرا عند الانضمام");
      }
    }, 500);

  };




  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    console.log(`📡 المستخدم ${user.uid} انضم - نوع الوسائط: ${mediaType}`);

    if (mediaType === "video" && user.videoTrack) {
      console.log(`🎥 تشغيل فيديو المستخدم ${user.uid}`);

      setStreams((prevStreams) => {
        if (!prevStreams.some((stream) => stream.id === user.uid)) {
          return [...prevStreams, { id: user.uid, videoTrack: user.videoTrack, initial: "U", role: "student" }];
        }
        return prevStreams;
      });


      setTimeout(() => {
        setStreams((prevStreams) => [...prevStreams]);
        console.log("🔄 تحديث حالة `streams` بعد انضمام المستخدم الجديد");
      }, 500);


      setTimeout(async () => {
        const videoElement = videoRefs.current[user.uid];
        if (user.videoTrack && videoElement) {
          await user.videoTrack.play(videoElement);

          await user.videoTrack.setEnabled(false);
          setTimeout(async () => {
            await user.videoTrack.setEnabled(true);
            console.log(`🔄 إعادة تشغيل فيديو المستخدم ${user.uid}`);
          }, 1000);
        }
      }, 500);





      // 🔥 إجبار إعادة تشغيل الكاميرا بعد 1 ثانية لضمان تفعيلها
      // setTimeout(async () => {
      //     if (user.videoTrack) {
      //         await user.videoTrack.setEnabled(false);
      //         await user.videoTrack.setEnabled(true);
      //         console.log(`🔄 إعادة تشغيل فيديو المستخدم ${user.uid}`);
      //     }
      // }, 1000);
    }

    if (mediaType === "audio" && user.audioTrack) {
      console.log(`🎤 تشغيل الصوت للمستخدم ${user.uid}`);
      user.audioTrack.play();
    }
  };


  // ✅ 3️⃣ عند مغادرة المستخدم، إزالة `stream`
  const handleUserLeft = (user) => {
    console.log(`👤 User left: ${user.uid}`);
    setStreams((prevStreams) => prevStreams.filter((stream) => stream.id !== user.uid));
  };


  // ✅ 5️⃣ تنفيذ `joinAndDisplayLocalStream` عند تحديث `token` أو `CHANNEL`
  useEffect(() => {
    if (token) {
      console.log("🚀 Calling joinAndDisplayLocalStream...");
      joinAndDisplayLocalStream();
    }
  }, [token]);


  // const stopAllVideos = () => {
  //   Object.values(videoRefs.current).forEach((video) => {
  //     if (video && video.srcObject) {
  //       const tracks = video.srcObject.getTracks();
  //       tracks.forEach((track) => track.stop());
  //     }
  //   });
  // };



  const toggleMic = async () => {
    if (!localTracks[0]) {
      console.warn("⚠️ الميكروفون غير موجود.");
      return;
    }
  
    try {
      const newState = !isMicMuted;
      
      // تعطيل أو تمكين المايك
      await localTracks[0].setEnabled(!newState);
      setIsMicMuted(newState);
      await client.unpublish(localTracks[1]); // إزالة الفيديو الحالي
      await client.publish(localTracks[1]); // إعادة نشر الفيديو
      
      // إعادة تفعيل الفيديو إذا كان غير مفعّل عن طريق الخطأ
      if (localTracks[1] && !isCameraMuted) {
        await localTracks[1].setEnabled(true);
        console.log("✅ التأكد من أن الكاميرا لا تزال مفعّلة بعد تبديل المايك.");
      }
    } catch (error) {
      console.error("❌ خطأ أثناء تبديل المايكروفون:", error);
    }
  };
  


  const toggleCamera = async () => {
    if (!localTracks[1]) {
      console.warn("⚠️ لم يتم العثور على `videoTrack`.");
      return;
    }
  
    try {
      const newState = !isCameraMuted;
      await localTracks[1].setEnabled(!newState);
      setIsCameraMuted(newState);
  
      // التأكد من إعادة تفعيل الكاميرا إذا كانت مغلقة
      if (!newState) {
        await client.publish(localTracks[1]);
        console.log("📡 إعادة نشر الكاميرا لضمان استمرار الفيديو.");
      }
    } catch (error) {
      console.error("❌ خطأ أثناء تبديل الكاميرا:", error);
    }
  };
  
  


  const handleLayoutChange = useCallback(async (newLayout) => {
    if (isLoading) return; // تجنب تنفيذ الوظيفة أثناء التحميل

    // setIsLoading(true);

    if (localTracks[1] && !isCameraMuted) {
      await localTracks[1].setEnabled(true);
      setIsCameraMuted(false);
    }


    setLayout(newLayout);

    if (userRole === "student" && localTracks[1] && !isCameraMuted) {
      console.log("🔄 تحديث التخطيط بدون إعادة تشغيل الكاميرا");
    }


    // setTimeout(async () => {
    //   await localTracks[1].setEnabled(true);
    // }, 300);


    setTimeout(async () => {
      if (localTracks[1] && isCameraMuted) {
        await localTracks[1].setEnabled(true);
        setIsCameraMuted(false);
      }
      // setIsLoading(false);
    }, 500); // تأخير 500 مللي ثانية
  }, [isLoading, isCameraMuted, localTracks]);


  const toggleScreenSharing = async () => {
    try {
      if (isSharingScreen) {
        console.log("⏹️ إيقاف مشاركة الشاشة...");
  
        // 1️⃣ إيقاف مشاركة الشاشة وإلغاء نشرها
        await client.unpublish(localTracks[1]);
  
        // 2️⃣ إعادة تشغيل الكاميرا
        const cameraTrack = await AgoraRTC.createCameraVideoTrack();
        setLocalTracks([localTracks[0], cameraTrack]);
        await client.publish(cameraTrack);
  
        // 3️⃣ تحديث الحالة لضمان عودة الزر لحالته الطبيعية
        setIsSharingScreen(false);
        setIsCameraMuted(false);
        console.log("✅ تمت إعادة تشغيل الكاميرا بعد إيقاف مشاركة الشاشة.");
      } else {
        console.log("📺 بدء مشاركة الشاشة...");
  
        // 4️⃣ إنشاء مسار مشاركة الشاشة
        const screenTrack = await AgoraRTC.createScreenVideoTrack();
        await client.unpublish(localTracks[1]);
        setLocalTracks([localTracks[0], screenTrack]);
        await client.publish(screenTrack);
  
        // 5️⃣ تحديث الحالة لضمان ظهور الزر باللون الأحمر أثناء المشاركة
        setIsSharingScreen(true);
      }
    } catch (error) {
      console.error("❌ خطأ أثناء تبديل مشاركة الشاشة:", error);
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
  const studentStreams = streams.filter((stream) => stream.role === "student");

  const totalParticipants = teacherStream ? studentStreams.length + 1 : studentStreams.length;

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };



  // useEffect(() => {
  //   // إيقاف الفيديوهات القديمة عند تغيير المود
  //   stopAllVideos();
  // }, [layout , localTracks]); // عندما يتغير المود، يتم إيقاف

  console.log("📡 Current Streams:", streams);

  useEffect(() => {
    console.log("📊 عدد المشاركين: ", totalParticipants);
  }, [streams]);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 750);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);




  const leaveAndRemoveLocalStream = async () => {
    try {
      // إيقاف وإغلاق جميع المسارات المحلية بشكل متزامن
      const stopTracksPromises = localTracks.map(async (track) => {
        if (track.stop) track.stop();
        if (track.close) track.close();
      });

      // انتظار توقف المسارات
      await Promise.all(stopTracksPromises);

      // مغادرة القناة
      await client.leave();

      // إعادة تعيين الحالة
      setLocalTracks([]);
      setStreams([]);
      setIsMicMuted(false);
      setIsCameraMuted(false);
      setIsSharingScreen(false);
      setToken(null);
      setIsChatOpen(false);
      setIsFilesOpen(false);
      setIsFullscreen(false);
      setIsMenuOpen(false);
      setIsLayoutOpenn(false);
      setSelectedStudent(null);

      // إرسال طلب لإنهاء الجلسة على الخادم
      const response = await fetch('https://api.japaneseacademy.jp/end-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: localStorage.getItem('uid') }),
      });

      if (!response.ok) throw new Error('Failed to end session');

    } catch (error) {
      console.error('Error during cleanup:', error);
    } finally {
      navigate('/');
      // window.location.reload()
    }

  };



  return (
    <>

      <div className="webRtc">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>جاري التحميل، الرجاء الانتظار...</p>
          </div>
        )}

        <div id="video-streams" className={`video-grid ${layout}`} data-participants={totalParticipants}>
          {/* وضع الثنائي والتركيز: شريط الطلاب العلوي */}
          {(layout === 'stack' || layout === 'focus') && (
            <div className="top-scroll">
              {studentStreams.map((stream) => (
                <div key={stream.id} className="video-container student" onClick={() => handleSelectStudent(stream)}>
                  {stream.videoTrack ? (
                    <video
                      key={videoKey} // استخدام المفتاح الجديد هنا
                      autoPlay
                      playsInline
                      muted={stream.id !== client.uid}
                      ref={(el) => {
                        if (el) {
                          console.log(`✅ تم تعيين عنصر الفيديو للمستخدم ${stream.id}`);
                          videoRefs.current[stream.id] = el;

                          // تأخير بسيط لضمان تحميل العنصر قبل تشغيل الفيديو
                          setTimeout(() => {
                            try {
                              if (stream.videoTrack && typeof stream.videoTrack.play === "function") {
                                console.log(`▶️ تشغيل الفيديو بعد تأكيد تعيين العنصر للمستخدم ${stream.id}`);
                                stream.videoTrack.play(el);
                              } else {
                                console.warn(`⚠️ لم يتم العثور على play() للمستخدم ${stream.id}`);
                              }
                            } catch (err) {
                              console.error(`❌ خطأ أثناء تشغيل الفيديو للمستخدم ${stream.id}:`, err);
                            }
                          }, 500);
                        }
                      }}


                    />
                  ) : (
                    <div className="initial">{stream.initial || "U"}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* المنطقة الرئيسية */}
          <div className={`main-area ${layout}`}>
            {/* عرض فيديو المعلم */}
            {teacherStream && (
              <div key={teacherStream.id} className={`video-container teacher ${layout}`}>
                {teacherStream.videoTrack ? (
                  <video
                    key={videoKey} // استخدام المفتاح الجديد هنا
                    autoPlay
                    playsInline
                    muted={teacherStream.id !== client.uid}
                    ref={(el) => {
                      if (el) {
                        console.log(`✅ تم تعيين عنصر الفيديو للمستخدم ${teacherStream.id}`);
                        videoRefs.current[teacherStream.id] = el;

                        // تأخير بسيط لضمان تحميل العنصر قبل تشغيل الفيديو
                        setTimeout(() => {
                          try {
                            if (teacherStream.videoTrack && typeof teacherStream.videoTrack.play === "function") {
                              console.log(`▶️ تشغيل الفيديو بعد تأكيد تعيين العنصر للمستخدم ${teacherStream.id}`);
                              teacherStream.videoTrack.play(el);
                            } else {
                              console.warn(`⚠️ لم يتم العثور على play() للمستخدم ${teacherStream.id}`);
                            }
                          } catch (err) {
                            console.error(`❌ خطأ أثناء تشغيل الفيديو للمستخدم ${teacherStream.id}:`, err);
                          }
                        }, 500);
                      }
                    }}


                  />
                ) : (
                  <div className="initial">{teacherStream.initial || "T"}</div>
                )}
              </div>
            )}

            {/* عرض فيديو الطالب المحدد (إذا تم تحديده) */}
            {selectedStudent && (layout === 'stack'

            ) && (
                <div key={selectedStudent.id} className={`video-container student ${layout}`}>
                  {selectedStudent.videoTrack ? (
                    <video
                      key={videoKey} // استخدام المفتاح الجديد هنا
                      autoPlay
                      playsInline
                      muted={selectedStudent.id !== client.uid}
                      ref={(el) => {
                        if (el) {
                          console.log(`✅ تم تعيين عنصر الفيديو للمستخدم ${selectedStudent.id}`);
                          videoRefs.current[selectedStudent.id] = el;

                          // تأخير بسيط لضمان تحميل العنصر قبل تشغيل الفيديو
                          setTimeout(() => {
                            try {
                              if (selectedStudent.videoTrack && typeof selectedStudent.videoTrack.play === "function") {
                                console.log(`▶️ تشغيل الفيديو بعد تأكيد تعيين العنصر للمستخدم ${selectedStudent.id}`);
                                selectedStudent.videoTrack.play(el);
                              } else {
                                console.warn(`⚠️ لم يتم العثور على play() للمستخدم ${selectedStudent.id}`);
                              }
                            } catch (err) {
                              console.error(`❌ خطأ أثناء تشغيل الفيديو للمستخدم ${selectedStudent.id}:`, err);
                            }
                          }, 500);
                        }
                      }}

                    />
                  ) : (
                    <div className="initial">{selectedStudent.initial || "U"}</div>
                  )}
                </div>
              )}

            {/* عرض فيديوهات الطلاب (في وضع الشبكة أو إذا كان المستخدم طالبًا) */}
            {layout === 'grid' && studentStreams.map((stream) => (
              <div key={stream.id} className={`video-container student ${layout}`}>
                {stream.videoTrack ? (
                  <video
                    key={videoKey} // استخدام المفتاح الجديد هنا
                    autoPlay
                    playsInline
                    muted={stream.id !== client.uid}
                    ref={(el) => {
                      if (el) {
                        console.log(`✅ تم تعيين عنصر الفيديو للمستخدم ${stream.id}`);
                        videoRefs.current[stream.id] = el;

                        // تأخير بسيط لضمان تحميل العنصر قبل تشغيل الفيديو
                        setTimeout(() => {
                          try {
                            if (stream.videoTrack && typeof stream.videoTrack.play === "function") {
                              console.log(`▶️ تشغيل الفيديو بعد تأكيد تعيين العنصر للمستخدم ${stream.id}`);
                              stream.videoTrack.play(el);
                            } else {
                              console.warn(`⚠️ لم يتم العثور على play() للمستخدم ${stream.id}`);
                            }
                          } catch (err) {
                            console.error(`❌ خطأ أثناء تشغيل الفيديو للمستخدم ${stream.id}:`, err);
                          }
                        }, 500);
                      }
                    }}


                  />
                ) : (
                  <div className="initial">{stream.initial || "U"}</div>
                )}
              </div>
            ))}
          </div>
        </div>


        {/* الأزرار */}
        <div className="AllButtonVideo">
          <div className="webRtcButtons">
            {/* زر مشاركة الملفات - يظهر فقط في الشاشات الكبيرة */}
            {!isMobile && (
              <button className="FileButton" onClick={() => setIsFilesOpen(!isFilesOpen)}>
                <FaFolder />
              </button>
            )}

            {/* زر مشاركة الرسائل - يظهر فقط في الشاشات الكبيرة */}


            {/* زر تغيير التخطيط (للمعلمين فقط) */}
            {userRole === "teacher" && (
              <div style={{ position: "relative" }}>
                <button onClick={() => setIsLayoutOpenn(!isLayoutOpenn)}>
                  <MdScreenshotMonitor />
                </button>

                {isLayoutOpenn && (
                  <div className="layout-menu">
                    <button onClick={() => handleLayoutChange("grid")}>شبكة</button>
                    <button onClick={() => handleLayoutChange("stack")}>ثنائي</button>
                    <button onClick={() => handleLayoutChange("focus")}>تركيز</button>
                  </div>
                )}
              </div>
            )}

            {/* زر تشغيل/إيقاف المايك */}
            <button
              className="webRtcCamera"
              onClick={toggleMic}
              style={{ backgroundColor: isMicMuted ? "#EE4B2B" : "cadetblue" }}
            >
              {isMicMuted ? <MdMicOff /> : <HiMicrophone />}
            </button>

            {/* زر تشغيل/إيقاف الكاميرا */}
            <button
              className="webRtcMic"
              onClick={toggleCamera}
              style={{ backgroundColor: isCameraMuted ? "#EE4B2B" : "cadetblue" }}
            >
              {isCameraMuted ? <BsFillCameraVideoOffFill /> : <BsFillCameraVideoFill />}
            </button>

            {/* زر مشاركة الشاشة */}
            <button
              className="webRtcScreenShare"
              onClick={toggleScreenSharing}
              style={{ backgroundColor: isSharingScreen ? "#EE4B2B" : "cadetblue" }}
            >
              <LuScreenShare />
            </button>

            {/* القائمة الإضافية */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <FiMoreVertical />
              </button>

              {isMenuOpen && (
                <div className="listIconVideo">
                  {/* إضافة زر مشاركة الملفات وزر مشاركة الرسائل في الشاشات الصغيرة */}
                  {isMobile && (
                    <>
                      <button onClick={() => setIsFilesOpen(!isFilesOpen)}>
                        <FaFolder />
                        <span>مشاركة الملفات</span>
                      </button>
                      <button onClick={() => setIsChatOpen(!isChatOpen)}>
                        <MdOutlineChat />
                        <span>مشاركة الرسائل</span>
                      </button>
                    </>
                  )}

                  {/* زر ملء الشاشة */}
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

            {/* زر إنهاء المكالمة */}
            <button className="endCall" onClick={leaveAndRemoveLocalStream}>
              <MdCallEnd />
            </button>
            {!isMobile && (
              <button className="chatButton" onClick={() => setIsChatOpen(!isChatOpen)}>
                <MdOutlineChat />
              </button>
            )}
          </div>
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
    </>
  );
};

export default MeetingNow;