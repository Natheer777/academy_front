import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // حالة التحميل
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(''); // إعادة تعيين رسالة الخطأ قبل بدء العملية
        setIsLoading(true); // تعيين حالة التحميل إلى true

        try {
            const response = await fetch('https://academy-backend-pq91.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {

                const data = await response.json();
                console.log('Login successful:', data); // تسجيل النتيجة
                localStorage.setItem('auth', data.token);
                navigate('/Dash');
            } else {
                setError('اسم المستخدم أو كلمة المرور غير صحيح');
            }
        } catch (error) {
            setError('حدث خطأ أثناء محاولة تسجيل الدخول. حاول مرة أخرى.');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false); // تعيين حالة التحميل إلى false بعد الانتهاء
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
            <button onClick={handleLogin} disabled={!isFormValid() || isLoading}>
                {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
            <Link to='/'>
                <button className='me-3'>الانتقال إلى الموقع</button>
            </Link>
        </div>
    );
}

export default LoginPage;
