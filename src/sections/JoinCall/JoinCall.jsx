import React, { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { FiMic, FiMicOff } from "react-icons/fi";
import './JoinCall.css';

// Update socket connection URL
const socket = io("https://api.japaneseacademy.online", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});

const configuration = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302"
      ]
    },
    {
      urls: [
        'turn:openrelay.metered.ca:80',
        'turn:openrelay.metered.ca:443',
        'turn:openrelay.metered.ca:443?transport=tcp'
      ],
      username: "openrelayproject",
      credential: "openrelayproject"
    },
    {
      urls: [
        'turn:relay.metered.ca:80',
        'turn:relay.metered.ca:443'
      ],
      username: "76f00b628e5ed246bc9e7dd2",
      credential: "3+xKjzZcNNKJJtE0"
    },
    {
      urls: [
        'turn:global.turn.twilio.com:3478?transport=udp',
        'turn:global.turn.twilio.com:3478?transport=tcp',
        'turn:global.turn.twilio.com:443?transport=tcp'
      ],
      username: "f4b4035eaa76c9a01b5241d8d2d0e2fcb569b57978b1a066995b29a4476e3416",
      credential: "n0nAPwgttiBHZJ4+JxO9k/eoRwuCP9WXXs0lRmJbtXI="
    }
  ],
  iceCandidatePoolSize: 10,
  iceTransportPolicy: 'all',
  bundlePolicy: 'max-bundle',
  rtcpMuxPolicy: 'require'
};

const JoinCall = () => {
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('FirstName') || "";
  });
  const [error, setError] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const [roomAvailable, setRoomAvailable] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [pcs, setPcs] = useState({});
  const [remoteVideos, setRemoteVideos] = useState({});
  const [participants, setParticipants] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  
  const localVideo = useRef();

  const createPeerConnection = useCallback(async (peerId, isInitiator) => {
    try {
      console.log(`Creating peer connection with ${peerId}, isInitiator: ${isInitiator}`);
      const pc = new RTCPeerConnection(configuration);
      
      // تحسين إدارة ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Sending ICE candidate to peer:", peerId);
          socket.emit("message", {
            type: "candidate",
            candidate: event.candidate,
            to: peerId,
            roomId: "default-room"
          });
        }
      };

      // تحسين مراقبة حالة الاتصال
      pc.onconnectionstatechange = () => {
        console.log(`Connection state with ${peerId}:`, pc.connectionState);
        if (pc.connectionState === 'failed') {
          console.log("Connection failed, attempting to reconnect...");
          handleConnectionFailure(pc, peerId);
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log(`ICE connection state with ${peerId}:`, pc.iceConnectionState);
        if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed') {
          console.log("Attempting to restart ICE");
          handleIceFailure(pc, peerId);
        }
      };

      // تحسين معالجة الفيديو والصوت
      pc.ontrack = (event) => {
        console.log(`Received ${event.track.kind} track from peer:`, peerId);
        if (event.streams && event.streams[0]) {
          const [remoteStream] = event.streams;
          console.log("Setting remote stream for peer:", peerId);
          
          // التأكد من جودة الفيديو
          if (event.track.kind === 'video') {
            const videoTrack = event.track;
            videoTrack.onmute = () => console.log('Video track muted');
            videoTrack.onunmute = () => console.log('Video track unmuted');
            
            // مراقبة حالة الفيديو
            const statsInterval = setInterval(async () => {
              try {
                const stats = await pc.getStats(videoTrack);
                stats.forEach(report => {
                  if (report.type === 'inbound-rtp' && report.kind === 'video') {
                    console.log(`Video stats for ${peerId}:`, {
                      framesDecoded: report.framesDecoded,
                      frameHeight: report.frameHeight,
                      frameWidth: report.frameWidth,
                      framesDropped: report.framesDropped
                    });
                  }
                });
              } catch (error) {
                console.warn('Error getting video stats:', error);
              }
            }, 5000);

            // تنظيف عند إزالة المسار
            videoTrack.onended = () => clearInterval(statsInterval);
          }

          setRemoteVideos(prev => {
            const newVideos = { ...prev };
            newVideos[peerId] = remoteStream;
            return newVideos;
          });
        }
      };

      // تحسين إضافة المسارات المحلية
      if (localStream) {
        console.log("Adding local tracks to peer connection");
        const transceiverInit = { direction: 'sendrecv' };
        
        localStream.getTracks().forEach(track => {
          try {
            console.log(`Adding ${track.kind} track to peer connection:`, peerId);
            pc.addTransceiver(track, transceiverInit);
          } catch (error) {
            console.error(`Error adding ${track.kind} track:`, error);
            // محاولة استخدام الطريقة التقليدية كخطة بديلة
            try {
              pc.addTrack(track, localStream);
            } catch (fallbackError) {
              console.error('Fallback track addition failed:', fallbackError);
            }
          }
        });
      } else {
        console.warn("No local stream available when creating peer connection");
      }

      if (isInitiator) {
        console.log("Creating offer as initiator");
        try {
          const offer = await pc.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
            iceRestart: true,
            voiceActivityDetection: true
          });
          
          // تحسين SDP للأداء الأفضل
          offer.sdp = enhanceSDPForPerformance(offer.sdp);
          
          await pc.setLocalDescription(offer);
          console.log("Local description set successfully");
          
          socket.emit("message", {
            type: "offer",
            sdp: offer,
            to: peerId,
            roomId: "default-room"
          });
        } catch (error) {
          console.error("Error creating/sending offer:", error);
          handleOfferFailure(pc, peerId);
        }
      }

      setPcs(prev => ({
        ...prev,
        [peerId]: pc
      }));

      return pc;
    } catch (error) {
      console.error("Error creating peer connection:", error);
      throw error;
    }
  }, [localStream]);

  // وظائف المساعدة لتحسين الأداء
  const enhanceSDPForPerformance = (sdp) => {
    let modifiedSDP = sdp;
    
    // تحسين ترميز الفيديو
    if (modifiedSDP.includes('VP8')) {
      modifiedSDP = modifiedSDP.replace(
        /(a=fmtp:(\d+))(?=\r\n)/g,
        '$1;x-google-min-bitrate=1000;x-google-max-bitrate=2500;x-google-start-bitrate=1500'
      );
    }
    
    return modifiedSDP;
  };

  const handleConnectionFailure = async (pc, peerId) => {
    try {
      if (pc.connectionState === 'failed') {
        console.log("Attempting to recover failed connection");
        await pc.restartIce();
        
        if (pc.signalingState !== 'closed') {
          const offer = await pc.createOffer({ iceRestart: true });
          await pc.setLocalDescription(offer);
          
          socket.emit("message", {
            type: "offer",
            sdp: offer,
            to: peerId,
            roomId: "default-room"
          });
        }
      }
    } catch (error) {
      console.error("Error recovering connection:", error);
    }
  };

  const handleIceFailure = async (pc, peerId) => {
    try {
      await pc.restartIce();
      console.log("ICE connection restarted for peer:", peerId);
    } catch (error) {
      console.error("Error restarting ICE:", error);
    }
  };

  const handleOfferFailure = async (pc, peerId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (pc.signalingState !== 'closed') {
        const offer = await pc.createOffer({ iceRestart: true });
        await pc.setLocalDescription(offer);
        
        socket.emit("message", {
          type: "offer",
          sdp: offer,
          to: peerId,
          roomId: "default-room"
        });
      }
    } catch (error) {
      console.error("Error handling offer failure:", error);
    }
  };

  useEffect(() => {
    socket.on("message", async (message) => {
      console.log("Received message:", message.type, message);
      
      switch (message.type) {
        case "roomStarted":
          console.log("Room started event received");
          setRoomAvailable(true);
          setIsWaiting(false);
          break;

        case "participantJoined":
          console.log("Participant joined:", message);
          setParticipants(prev => {
            const newParticipants = prev.filter(p => p.id !== message.participant.id);
            return [...newParticipants, message.participant];
          });
          
          if (message.participant.id !== socket.id && hasJoined && localStream) {
            try {
              console.log("Creating peer connection for new participant:", message.participant.id);
              await createPeerConnection(message.participant.id, true);
            } catch (err) {
              console.error("Error creating peer connection for new participant:", err);
            }
          }
          break;

        case "participantLeft":
          console.log("Participant left:", message.participantId);
          if (pcs[message.participantId]) {
            console.log("Closing peer connection for:", message.participantId);
            pcs[message.participantId].close();
            setPcs(prev => {
              const newPcs = { ...prev };
              delete newPcs[message.participantId];
              return newPcs;
            });
            setRemoteVideos(prev => {
              const newVideos = { ...prev };
              delete newVideos[message.participantId];
              return newVideos;
            });
          }
          setParticipants(prev => prev.filter(p => p.id !== message.participantId));
          break;

        case "offer":
          console.log("Received offer from:", message.from);
          try {
            let pc = pcs[message.from];
            if (!pc) {
              console.log("Creating new peer connection for offer");
              pc = await createPeerConnection(message.from, false);
            }
            
            await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));
            console.log("Remote description set successfully");
            
            const answer = await pc.createAnswer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true
            });
            await pc.setLocalDescription(answer);
            
            socket.emit("message", {
              type: "answer",
              sdp: answer,
              to: message.from,
              roomId: "default-room"
            });
          } catch (error) {
            console.error("Error handling offer:", error);
          }
          break;

        case "answer":
          console.log("Received answer from:", message.from);
          try {
            const pc = pcs[message.from];
            if (pc) {
              await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));
              console.log("Remote description set successfully for answer");
            }
          } catch (error) {
            console.error("Error handling answer:", error);
          }
          break;

        case "candidate":
          console.log("Received ICE candidate from:", message.from);
          try {
            const pc = pcs[message.from];
            if (pc) {
              await pc.addIceCandidate(new RTCIceCandidate(message.candidate));
              console.log("ICE candidate added successfully");
            }
          } catch (error) {
            console.error("Error handling ICE candidate:", error);
          }
          break;

        case "roomEnded":
          console.log("Room ended");
          hangup();
          setError("تم إنهاء الغرفة من قبل المعلم");
          setRoomAvailable(false);
          break;

        case "roomState":
          console.log("Room state received:", message);
          setRoomAvailable(message.isStarted);
          setIsWaiting(!message.isStarted);
          setParticipants(message.participants || []);
          
          if (message.isStarted && hasJoined && localStream) {
            for (const participant of message.participants) {
              if (participant.id !== socket.id && !pcs[participant.id]) {
                try {
                  console.log("Creating peer connection for existing participant:", participant.id);
                  await createPeerConnection(participant.id, true);
                } catch (err) {
                  console.error("Error creating peer connection for existing participant:", err);
                }
              }
            }
          }
          break;
      }
    });

    return () => {
      socket.off("message");
      hangup();
    };
  }, [hasJoined, localStream, createPeerConnection, pcs]);

  const joinCall = async () => {
    const trimmedName = studentName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setError("يرجى إدخال اسم صحيح (حرفين على الأقل)");
      return;
    }
    setError("");

    try {
      console.log("Attempting to join call as:", trimmedName);
      
      // Define multiple video constraints to try in order of preference
      const videoConstraints = [
        {
          // HD quality
          width: { min: 1280, ideal: 1920 },
          height: { min: 720, ideal: 1080 },
          frameRate: { min: 24, ideal: 30 },
          facingMode: 'user'
        },
        {
          // Standard quality
          width: { min: 640, ideal: 1280 },
          height: { min: 480, ideal: 720 },
          frameRate: { min: 20, ideal: 30 },
          facingMode: 'user'
        },
        {
          // Minimum quality
          width: { min: 320, ideal: 640 },
          height: { min: 240, ideal: 480 },
          frameRate: { min: 15, ideal: 24 },
          facingMode: 'user'
        },
        // Fallback to any available video
        true
      ];

      let stream = null;
      let errorMessage = '';

      // Try each video constraint until one works
      for (const videoConstraint of videoConstraints) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: videoConstraint,
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
          });
          
          // If we get here, we successfully got a stream
          console.log("Successfully obtained media stream with constraints:", videoConstraint);
          break;
        } catch (err) {
          console.warn("Failed to get media with constraints:", videoConstraint, err);
          errorMessage = err.message;
          continue;
        }
      }

      // If we couldn't get any video, try audio only
      if (!stream) {
        try {
          console.log("Attempting audio-only as final fallback");
          stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            },
            video: false
          });
          setError("تم الاتصال بالصوت فقط - الكاميرا غير متوفرة");
        } catch (err) {
          console.error("Failed to get even audio-only stream:", err);
          throw new Error("فشل في الوصول إلى الميكروفون والكاميرا. " + errorMessage);
        }
      }

      // Set up the stream
      if (localVideo.current) {
        localVideo.current.srcObject = stream;
        try {
          await localVideo.current.play();
          console.log("Local video/audio playback started");
        } catch (playError) {
          console.warn("Error playing local media:", playError);
          // Try to autoplay without user interaction
          localVideo.current.muted = true;
          await localVideo.current.play().catch(console.error);
        }
      }
      
      setLocalStream(stream);

      // Monitor track states
      stream.getTracks().forEach(track => {
        track.onended = () => {
          console.log(`${track.kind} track ended`);
          setError(`تم فقد اتصال ${track.kind === 'video' ? 'الكاميرا' : 'الميكروفون'}. يرجى تحديث الصفحة.`);
        };
        
        track.onmute = () => {
          console.log(`${track.kind} track muted`);
        };
        
        track.onunmute = () => {
          console.log(`${track.kind} track unmuted`);
        };
      });
      
      const userData = {
        name: trimmedName,
        role: 'student'
      };
      
      console.log("Emitting join message with userData:", userData);
      socket.emit("message", { 
        type: "join", 
        roomId: "default-room",
        userData: userData
      });

      setHasJoined(true);
      console.log("Join call completed successfully");
      
    } catch (error) {
      console.error("Final error in joinCall:", error);
      setError(error.message || "حدث خطأ أثناء الاتصال. يرجى المحاولة مرة أخرى.");
      
      // Clean up any partial streams
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        setLocalStream(null);
      }
    }
  };

  const hangup = () => {
    console.log("Hanging up call");
    setHasJoined(false);
    setError("");
    
    // Stop all tracks
    if (localStream) {
      localStream.getTracks().forEach(track => {
        console.log("Stopped track:", track.kind);
        track.stop();
      });
      setLocalStream(null);
    }
    
    // Close all peer connections
    Object.values(pcs).forEach(pc => {
      if (pc) {
        pc.close();
      }
    });
    setPcs({});
    
    // Clear video elements
    if (localVideo.current) {
      localVideo.current.srcObject = null;
    }
    setRemoteVideos({});
    
    // Leave room
    socket.emit("message", {
      type: "leave",
      roomId: "default-room"
    });
    
    console.log("Hangup completed");
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  return (
    <div className="video-call-container">
      {isWaiting ? (
        <div className="waiting-message">انتظر حتى يبدأ المعلم الغرفة</div>
      ) : (
        <div className="controls">
          {!hasJoined && roomAvailable ? (
            <div className="join-controls">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="أدخل اسمك"
                className="name-input"
              />
              <button onClick={joinCall} className="join-button">
                انضم إلى الغرفة
              </button>
              {error && <div className="error-message">{error}</div>}
            </div>
          ) : hasJoined && (
            <>
              <button onClick={toggleAudio} className="mute-button">
                {isMuted ? <FiMicOff /> : <FiMic />} {isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
              </button>
              <button onClick={hangup} className="leave-button">
                مغادرة الغرفة
              </button>
            </>
          )}
        </div>
      )}
      
      <div className="video-grid">
        <div className="video-container local">
          <video ref={localVideo} autoPlay playsInline muted className="video-element" />
          <div className="video-label">أنت - {studentName}</div>
        </div>
        {Object.entries(remoteVideos).map(([peerId, stream]) => {
          const participant = participants.find(p => p.id === peerId);
          return (
            <div key={peerId} className="video-container remote">
              <video
                autoPlay
                playsInline
                className="video-element"
                ref={el => {
                  if (el) {
                    el.srcObject = stream;
                    el.onloadedmetadata = () => el.play().catch(e => console.error("Error playing video:", e));
                  }
                }}
              />
              <div className="video-label">
                {participant?.role === 'teacher' ? 'المعلم' : participant?.name || 'مشارك في الغرفة'}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="participants-list">
        <h3>المشاركون في الغرفة:</h3>
        <ul>
          {participants.map((participant) => (
            <li key={participant.id}>
              {participant.role === 'teacher' ? 'المعلم' : participant.name}
              {remoteVideos[participant.id] ? ' (متصل بالفيديو)' : ' (متصل)'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JoinCall;