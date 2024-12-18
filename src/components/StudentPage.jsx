import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FiVideo, FiVideoOff, FiMic, FiMicOff } from "react-icons/fi";

const socket = io("https://api.japaneseacademy.online", { transports: ["websocket"] });

const configuration = {
  iceServers: [
    { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] },
  ],
};

const StudentPage = () => {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const [isWaiting, setIsWaiting] = useState(true);
  const [hasJoined, setHasJoined] = useState(false);
  const [pc, setPc] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  useEffect(() => {
    socket.on("message", handleMessage);
    return () => {
      socket.off("message");
      stopStream();
    };
  }, []);

  const handleMessage = async (message) => {
    console.log("Received message:", message.type);
    switch (message.type) {
      case "ready":
        setIsWaiting(false);
        break;
      case "offer":
        await handleOffer(message);
        break;
      case "answer":
        await handleAnswer(message);
        break;
      case "candidate":
        await handleCandidate(message);
        break;
      case "leave":
        handleTeacherLeft();
        break;
      default:
        break;
    }
  };

  const joinCall = async () => {
    if (hasJoined) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      if (localVideo.current) {
        localVideo.current.srcObject = stream;
      }

      const newPc = new RTCPeerConnection(configuration);
      setPc(newPc);

      stream.getTracks().forEach(track => newPc.addTrack(track, stream));

      newPc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("message", {
            type: "candidate",
            candidate: event.candidate,
            to: "Teacher"
          });
        }
      };

      newPc.ontrack = (event) => {
        if (remoteVideo.current) {
          remoteVideo.current.srcObject = event.streams[0];
        }
      };

      const offer = await newPc.createOffer();
      await newPc.setLocalDescription(offer);

      socket.emit("message", {
        type: "offer",
        sdp: offer,
        to: "Teacher"
      });

      socket.emit("message", { type: "join", user: "Student" });
      setHasJoined(true);
    } catch (error) {
      console.error("Error joining call:", error);
    }
  };

  const handleOffer = async (offer) => {
    try {
      const newPc = new RTCPeerConnection(configuration);
      setPc(newPc);

      if (localStream) {
        localStream.getTracks().forEach(track => newPc.addTrack(track, localStream));
      }

      newPc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("message", {
            type: "candidate",
            candidate: event.candidate,
            to: offer.from
          });
        }
      };

      newPc.ontrack = (event) => {
        if (remoteVideo.current) {
          remoteVideo.current.srcObject = event.streams[0];
        }
      };

      await newPc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await newPc.createAnswer();
      await newPc.setLocalDescription(answer);

      socket.emit("message", {
        type: "answer",
        sdp: answer,
        to: offer.from
      });
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  };

  const handleAnswer = async (answer) => {
    try {
      if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    } catch (error) {
      console.error("Error handling answer:", error);
    }
  };

  const handleCandidate = async (message) => {
    try {
      if (pc) {
        await pc.addIceCandidate(new RTCIceCandidate(message.candidate));
      }
    } catch (error) {
      console.error("Error handling candidate:", error);
    }
  };

  const handleTeacherLeft = () => {
    setIsWaiting(true);
    setHasJoined(false);
    stopStream();
  };

  const stopStream = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    if (pc) {
      pc.close();
      setPc(null);
    }
    if (localVideo.current) {
      localVideo.current.srcObject = null;
    }
    if (remoteVideo.current) {
      remoteVideo.current.srcObject = null;
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  return (
    <div className="video-call-container">
      <h1>صفحة الطالب</h1>
      {isWaiting ? (
        <div className="waiting-message">
          انتظر حتى يبدأ المعلم
        </div>
      ) : (
        <div className="video-grid">
          <div className="local-video-container">
            <video
              ref={localVideo}
              autoPlay
              playsInline
              muted
              className="local-video"
            />
            {localStream && (
              <div className="video-controls">
                <button onClick={toggleVideo} className="control-button">
                  {isVideoEnabled ? <FiVideo /> : <FiVideoOff />}
                </button>
                <button onClick={toggleAudio} className="control-button">
                  {isAudioEnabled ? <FiMic /> : <FiMicOff />}
                </button>
                <button onClick={stopStream} className="control-button">
                  <FiVideoOff /> مغادرة المكالمة
                </button>
              </div>
            )}
          </div>
          <div className="remote-video-container">
            <video
              ref={remoteVideo}
              autoPlay
              playsInline
              className="remote-video"
            />
          </div>
        </div>
      )}
      {!hasJoined && !isWaiting && (
        <button onClick={joinCall} className="join-call-button">
          <FiVideo /> انضم إلى المكالمة
        </button>
      )}
    </div>
  );
};

export default StudentPage;
