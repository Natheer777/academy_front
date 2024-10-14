// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LoginPage.css'
// function LoginPage() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = () => {
//         const storedUsername = localStorage.getItem('username') || 'sawa';
//         const storedPassword = localStorage.getItem('password') || 'sawa';

//         if (username === storedUsername && password === storedPassword) {
//             localStorage.setItem('auth', 'true');
//             navigate('/academy/Dash');  // تحويل إلى صفحة لوحة التحكم بعد نجاح تسجيل الدخول
//         } else {
//             alert('اسم المستخدم أو كلمة المرور غير صحيح');
//         }
//     };

//     return (
//         <div className="login-container">
//             <h2>تسجيل الدخول</h2>
//             <input
//                 type="text"
//                 placeholder="اسم المستخدم"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="كلمة المرور"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleLogin}>تسجيل الدخول</button>
//         </div>
//     );
// }

// export default LoginPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const storedUsername = localStorage.getItem('username') || 'Sawa';
        const storedPassword = localStorage.getItem('password') || 'sawa';

        if (username === storedUsername && password === storedPassword) {
            localStorage.setItem('auth', 'true');
            navigate('/academy/Dash');
        } else {
            setError('اسم المستخدم أو كلمة المرور غير صحيح');
        }
    };

    const isFormValid = () => {
        return username.trim() !== '' && password.trim() !== '';
    };

    return (
        <div className="login-container">
            <h2>تسجيل الدخول</h2>
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                placeholder="اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} disabled={!isFormValid()}>
                تسجيل الدخول
            </button>
        </div>
    );
}

export default LoginPage;