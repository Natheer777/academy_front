import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';


const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

const VideoCall = ({ roomId, userId, isTeacher }) => {
  const [localStream, setLocalStream] = useState(null);
  const [peers, setPeers] = useState(new Map());
  const localVideoRef = useRef();
  const socketRef = useRef();
  const peerConnections = useRef(new Map());

  useEffect(() => {
    socketRef.current = io('https://academy-backend-pq91.onrender.com');
    
    // إعداد الوسائط المحلية
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        if (isTeacher) {
          socketRef.current.emit('create-room', userId);
        } else {
          socketRef.current.emit('join-room', { roomId, studentId: userId });
        }
      })
      .catch(error => console.error('Error accessing media devices:', error));

    // معالجة انضمام مستخدم جديد
    socketRef.current.on('student-joined', async ({ studentId }) => {
      if (isTeacher) {
        createPeerConnection(studentId);
      }
    });

    // معالجة إشارات WebRTC
    socketRef.current.on('signal', async ({ from, signalData }) => {
      let pc = peerConnections.current.get(from);
      
      if (!pc) {
        pc = createPeerConnection(from);
      }

      try {
        if (signalData.type === 'offer') {
          await pc.setRemoteDescription(new RTCSessionDescription(signalData));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socketRef.current.emit('signal', {
            roomId,
            to: from,
            signalData: answer
          });
        } else if (signalData.type === 'answer') {
          await pc.setRemoteDescription(new RTCSessionDescription(signalData));
        } else if (signalData.candidate) {
          await pc.addIceCandidate(new RTCIceCandidate(signalData));
        }
      } catch (error) {
        console.error('Error handling signal:', error);
      }
    });

    // تنظيف عند إزالة المكون
    return () => {
      localStream?.getTracks().forEach(track => track.stop());
      peerConnections.current.forEach(pc => pc.close());
      socketRef.current.disconnect();
    };
  }, [roomId, userId, isTeacher]);

  const createPeerConnection = (peerId) => {
    const pc = new RTCPeerConnection(configuration);
    peerConnections.current.set(peerId, pc);

    // إضافة المسارات المحلية
    if (localStream) {
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
    }

    // معالجة المسارات البعيدة
    pc.ontrack = (event) => {
      setPeers(prev => new Map(prev).set(peerId, event.streams[0]));
    };

    // إرسال مرشحي ICE
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit('signal', {
          roomId,
          to: peerId,
          signalData: event.candidate
        });
      }
    };

    // إنشاء عرض للاتصال إذا كان المعلم
    if (isTeacher) {
      pc.createOffer()
        .then(offer => pc.setLocalDescription(offer))
        .then(() => {
          socketRef.current.emit('signal', {
            roomId,
            to: peerId,
            signalData: pc.localDescription
          });
        });
    }

    return pc;
  };

  return (
    <div className="video-grid">
      <div className="local-video">
        <h3>أنت</h3>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          style={{ width: '300px' }}
        />
      </div>
      {Array.from(peers.entries()).map(([peerId, stream]) => (
        <div key={peerId} className="remote-video">
          <h3>المستخدم الآخر</h3>
          <video
            autoPlay
            playsInline
            style={{ width: '300px' }}
            ref={video => {
              if (video) video.srcObject = stream;
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoCall;