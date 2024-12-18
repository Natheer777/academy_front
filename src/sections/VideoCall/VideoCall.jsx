import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import './VideoCall.css';

const APP_ID = "46c493c48baf40cead62de60ae7efda5";
const TOKEN =
  "007eJxTYAiZu2h1bvQKdY1z/UtDbZdaLrBblvhe5MlnzqkHuf0aVnkrMJiYJZtYGiebWCQlppkYJKcmppgZpaSaGSSmmqempSSa/tZKSm8IZGRQEl3FzMjAyMACxCA+E5hkBpMsUDI3MTOPgQEAlIoh8A==";
const CHANNEL = "main";



const VideoCall = () => {
  const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [localTracks, setLocalTracks] = useState([]);
  const [streams, setStreams] = useState([]);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraMuted, setIsCameraMuted] = useState(false);

  const joinAndDisplayLocalStream = async () => {
    client.on("user-published", handleUserJoined);

    const UID = await client.join(APP_ID, CHANNEL, TOKEN, null);

    const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    setLocalTracks(tracks);

    // أضف معلومات الفيديو إلى حالة البث
    setStreams((prevStreams) => [
      ...prevStreams,
      { id: UID, videoTrack: tracks[1] },
    ]);

    await client.publish(tracks);
  };

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setStreams((prevStreams) => [
        ...prevStreams,
        { id: user.uid, videoTrack: user.videoTrack },
      ]);
    }
  };

  useEffect(() => {
    // شغّل الفيديو لكل بث جديد
    streams.forEach((stream) => {
      const videoContainer = document.getElementById(`user-${stream.id}`);
      if (videoContainer && stream.videoTrack) {
        stream.videoTrack.play(videoContainer);
      }
    });
  }, [streams]);

  const leaveAndRemoveLocalStream = async () => {
    for (let track of localTracks) {
      track.stop();
      track.close();
    }
    await client.leave();
    setLocalTracks([]);
    setStreams([]);
  };

  const toggleMic = async () => {
    if (localTracks[0]) {
      const newState = !isMicMuted;
      await localTracks[0].setMuted(newState);
      setIsMicMuted(newState);
    }
  };

  const toggleCamera = async () => {
    if (localTracks[1]) {
      const newState = !isCameraMuted;
      await localTracks[1].setMuted(newState);
      setIsCameraMuted(newState);
    }
  };

  return (
    <div>
      <button onClick={joinAndDisplayLocalStream}>Join Stream</button>
      <div id="video-streams">
        {streams.map((stream) => (
          <div
            key={stream.id}
            id={`user-${stream.id}`}
            style={{ width: "300px", height: "200px", background: "black" }}
          ></div>
        ))}
      </div>
      <div>
        <button onClick={toggleMic} style={{ backgroundColor: isMicMuted ? "#EE4B2B" : "cadetblue" }}>
          {isMicMuted ? "Mic Off" : "Mic On"}
        </button>
        <button onClick={toggleCamera} style={{ backgroundColor: isCameraMuted ? "#EE4B2B" : "cadetblue" }}>
          {isCameraMuted ? "Camera Off" : "Camera On"}
        </button>
        <button onClick={leaveAndRemoveLocalStream}>Leave Stream</button>
      </div>
    </div>
  );
};

export default VideoCall;