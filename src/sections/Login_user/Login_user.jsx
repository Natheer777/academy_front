import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login_user.css';

export default function Login_user() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true); // بدء التحميل
    
      fetch('https://academy-backend-pq91.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
        setIsLoading(false); // إيقاف التحميل
        if (data.error) {
          alert(data.error);
        } else {
          alert('تم تسجيل الدخول بنجاح');
          // تخزين التوكن في localStorage
          localStorage.setItem('token', data.token);
          console.log('تم تخزين التوكن:', data.token); // طباعة التوكن في الكونسول
          navigate('/');
        }
      })
      .catch(error => {
        setIsLoading(false); // إيقاف التحميل في حالة الخطأ أيضًا
        console.error('Error:', error);
      });
    };
  
    

    return (
        <>
            <form className="login-form container academy mt-5" onSubmit={handleSubmit}>
                <h1 className='fw-bold m-auto'>تسجيل الدخول</h1>
                <div className='w-100'>
                    <label>البريد الإلكتروني:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='w-100 mb-5'>
                    <label>كلمة المرور:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </>
    );
}
