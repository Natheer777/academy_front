import  { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
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
            navigate('/Dash');
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
            <Link to='/'>
            <button className='me-3'>الإنتقال الى الموقع</button>
            </Link>
        </div>
    );
}

export default LoginPage;