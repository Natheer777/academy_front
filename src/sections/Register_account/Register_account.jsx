

import { useState } from 'react';
import './Register_account.css';
import { useNavigate } from 'react-router-dom';

export default function Register_account() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    age: '',
    gender: '',
    educationLevel: '',
    japaneseLevel: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // تحقق من معايير كلمة المرور عند الكتابة
    if (e.target.name === 'password') {
      const password = e.target.value;
      setPasswordCriteria({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[@$!%*?&]/.test(password)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('كلمات السر غير متطابقة');
      return;
    }

    // تحقق من قوة كلمة المرور
    if (!passwordCriteria.length || !passwordCriteria.uppercase || !passwordCriteria.lowercase || !passwordCriteria.number || !passwordCriteria.specialChar) {
      setPasswordError('يجب أن تحتوي كلمة السر على ٨ أحرف على الأقل، حرف كبير واحد، حرف صغير واحد، رقم واحد، ورمز واحد.');
      return;
    } else {
      setPasswordError('');
    }

    fetch('https://academy-backend-pq91.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert('حدث خطأ: ' + data.error);
      } else {
        alert('تم التسجيل بنجاح، تحقق من بريدك الإلكتروني لتفعيل الحساب');
        setShowVerificationField(true); // إظهار حقل التحقق
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleVerification = (e) => {
    e.preventDefault();
    
    fetch('https://academy-backend-pq91.onrender.com/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: formData.email, verificationCode })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert('رمز التحقق غير صحيح');
      } else {
        alert('تم التحقق من البريد الإلكتروني بنجاح');
        navigate('/academy/Login_users/'); // تحويل إلى الصفحة الرئيسية بعد التحقق
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <>
    <form className="form-container academy p-5 mt-5 mb-5 m-auto" onSubmit={handleSubmit}>
      <h1 className='fw-bold m-auto mb-4 mt-4'>إنشاء حساب</h1>
      <div>
        <label>الاسم الشخصي:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <label>اسم العائلة:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div>
        <label>دولة الإقامة:</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} required />
      </div>
      <div>
        <label>العمر:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
      </div>
      <div>
        <label>الجنس:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">اختر</option>
          <option value="male">ذكر</option>
          <option value="female">أنثى</option>
        </select>
      </div>
      <div>
        <label>المستوى التعليمي:</label>
        <input type="text" name="educationLevel" value={formData.educationLevel} onChange={handleChange} required />
      </div>
      <div>
        <label>مستوى اللغة اليابانية:</label>
        <input type="text" name="japaneseLevel" value={formData.japaneseLevel} onChange={handleChange} required />
      </div>
      <div>
        <label>رقم الهاتف:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div>
        <label>البريد الإلكتروني:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>كلمة السر:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>} {/* عرض رسالة الخطأ */}
        <ul className='password'>
          <li style={{ color: passwordCriteria.length ? 'green' : 'red' }}>
            {passwordCriteria.length ? '✔️  تحتوي على 8 أحرف على الأقل' : '❌ يجب أن تحتوي على 8 أحرف على الأقل'}
          </li>
          <li style={{ color: passwordCriteria.uppercase ? 'green' : 'red' }}>
            {passwordCriteria.uppercase ? '✔️  تحتوي على حرف كبير واحد على الأقل' : '❌ يجب أن تحتوي على حرف كبير واحد على الأقل'}
          </li>
          <li style={{ color: passwordCriteria.lowercase ? 'green' : 'red' }}>
            {passwordCriteria.lowercase ? '✔️  تحتوي على حرف صغير واحد على الأقل' : '❌ يجب أن تحتوي على حرف صغير واحد على الأقل'}
          </li>
          <li style={{ color: passwordCriteria.number ? 'green' : 'red' }}>
            {passwordCriteria.number ? '✔️  تحتوي على رقم واحد على الأقل' : '❌ يجب أن تحتوي على رقم واحد على الأقل'}
          </li>
          <li style={{ color: passwordCriteria.specialChar ? 'green' : 'red' }}>
            {passwordCriteria.specialChar ? '✔️  تحتوي على رمز واحد على الأقل' : '❌ يجب أن تحتوي على رمز واحد على الأقل'}
          </li>
        </ul>
      </div>
      <div>
        <label>تأكيد كلمة السر:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
      </div>
      <button className='mt-4' type="submit">سجل الآن</button>
    </form>
    
    {showVerificationField && (
      <form className='form-container academy' onSubmit={handleVerification}>
        <label className='fs-5'>أدخل كود التحقق:</label>
        <input
          type="text"
          placeholder="أدخل كود التحقق"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button className='mt-4 mb-5' type="submit">تحقق</button>
      </form>
    )}
    </>
  );
}
