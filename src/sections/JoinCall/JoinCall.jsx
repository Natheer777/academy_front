// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import io from 'socket.io-client';

// // الاتصال بالخادم
// const socket = io('https://academy-backend-pq91.onrender.com');

// const JoinCall = () => {
//   const [roomId, setRoomId] = useState('');
//   const navigate = useNavigate();

//   // عند النقر على الانضمام
//   const handleJoin = () => {
//     if (roomId) {
//       // إرسال طلب الانضمام إلى الغرفة عبر socket
//       socket.emit('join-room', { roomId, studentId: 2 });

//       // الاستماع إلى حدث الطالب الذي انضم
//       socket.on('student-joined', () => {
//         // إذا تم الانضمام بنجاح، انتقل إلى صفحة المكالمة
//         navigate(`/call/${roomId}`);
//       });

//       // إذا فشل التحقق أو انقضى وقت انتظار الاتصال
//       socket.on('error', (message) => {
//         alert(message);
//       });
//     } else {
//       alert('Please enter a valid Room ID');
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Join a Video Call</h1>
//       <input
//         type="text"
//         placeholder="Enter Room ID"
//         value={roomId}
//         onChange={(e) => setRoomId(e.target.value)}
//         style={{ padding: '10px', width: '300px' }}
//       />
//       <br />
//       <button
//         onClick={handleJoin}
//         style={{
//           marginTop: '20px',
//           padding: '10px 20px',
//           backgroundColor: '#007bff',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '5px',
//         }}
//       >
//         Join Call
//       </button>
//     </div>
//   );
// };

// export default JoinCall;

import React, { useState, useEffect } from 'react';
import VideoCalls from '../../components/VideoCalls';
import io from 'socket.io-client';

const JoinCall = () => {
  const [availableRoom, setAvailableRoom] = useState(null);
  const [joined, setJoined] = useState(false);
  const studentId = "student-" + Math.random().toString(36).substring(2, 9);
  
  useEffect(() => {
    const socket = io('https://academy-backend-pq91.onrender.com');
    
    socket.on('room-opened', ({ roomId }) => {
      setAvailableRoom(roomId);
    });

    return () => socket.disconnect();
  }, []);

  const joinRoom = () => {
    if (availableRoom) {
      setJoined(true);
    }
  };

  return (
    <div className="container">
      <h1>غرفة الطالب</h1>
      {!joined ? (
        <div>
          {availableRoom ? (
            <button 
              onClick={joinRoom}
              className="join-button"
            >
              الانضمام للغرفة
            </button>
          ) : (
            <p>في انتظار فتح غرفة من قبل المعلم...</p>
          )}
        </div>
      ) : (
        <VideoCalls 
          roomId={availableRoom}
          userId={studentId}
          isTeacher={false}
        />
      )}
    </div>
  );
};

export default JoinCall;