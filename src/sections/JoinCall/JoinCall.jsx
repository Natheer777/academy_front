import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = "46c493c48baf40cead62de60ae7efda5";
const TOKEN =
  "007eJxTYAiZu2h1bvQKdY1z/UtDbZdaLrBblvhe5MlnzqkHuf0aVnkrMJiYJZtYGiebWCQlppkYJKcmppgZpaSaGSSmmqempSSa/tZKSm8IZGRQEl3FzMjAyMACxCA+E5hkBpMsUDI3MTOPgQEAlIoh8A==";
const CHANNEL = "main";

const JoinCall = () => {
  const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [localTracks, setLocalTracks] = useState([]);
  const [remoteUsers, setRemoteUsers] = useState({});
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // عند انضمام مستخدم جديد
    client.on("user-published", handleUserPublished);

    // عند مغادرة مستخدم
    client.on("user-unpublished", handleUserUnpublished);

    return () => {
      client.removeAllListeners();
    };
  }, [client]);

  const joinRoom = async () => {
    const UID = await client.join(APP_ID, CHANNEL, TOKEN, null);
    const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    setLocalTracks(tracks);

    // تشغيل الفيديو المحلي
    tracks[1].play("local-video");

    // نشر الفيديو والصوت
    await client.publish(tracks);
    setIsJoined(true);
    console.log("Joined the room successfully!");
  };

  const handleUserPublished = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setRemoteUsers((prevUsers) => ({
        ...prevUsers,
        [user.uid]: user.videoTrack,
      }));
      user.videoTrack.play(`remote-user-${user.uid}`);
    }
  };

  const handleUserUnpublished = (user) => {
    setRemoteUsers((prevUsers) => {
      const updatedUsers = { ...prevUsers };
      delete updatedUsers[user.uid];
      return updatedUsers;
    });
  };

  const leaveRoom = async () => {
    for (let track of localTracks) {
      track.stop();
      track.close();
    }
    await client.leave();
    setLocalTracks([]);
    setRemoteUsers({});
    setIsJoined(false);
    console.log("Left the room.");
  };

  return (
    <div>
      <h1>Join Video Call - Student</h1>
      {!isJoined ? (
        <button onClick={joinRoom} style={{ backgroundColor: "blue", color: "white" }}>
          Join Room
        </button>
      ) : (
        <button onClick={leaveRoom} style={{ backgroundColor: "red", color: "white" }}>
          Leave Room
        </button>
      )}

      {/* الفيديو المحلي */}
      <div
        id="local-video"
        style={{ width: "400px", height: "300px", background: "black", marginTop: "20px" }}
      ></div>

      {/* فيديو المستخدمين الآخرين */}
      <div id="remote-videos">
        {Object.keys(remoteUsers).map((uid) => (
          <div
            key={uid}
            id={`remote-user-${uid}`}
            style={{ width: "400px", height: "300px", background: "gray", marginTop: "20px" }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default JoinCall;