// import './Dashboared.css'
// import { useState , useEffect } from 'react';
// import { useNavigate } from 'react-router';
// export default function Dashboared() {
//     const [name, setName] = useState('');
//     const [country, setCountry] = useState('');
//     const [comment, setComment] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetch('https://academy-backend-pq91.onrender.com/addcomment', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ name, country, comment }),
//         })
//         .then(response => {
//             if (response.ok) {
//                 alert('تم إضافة التعليق بنجاح');
//                 setName('');
//                 setCountry('');
//                 setComment('');
//             } else {
//                 alert('حدث خطأ أثناء محاولة إضافة التعليق');
//             }
//         })
//         .catch(error => console.error('Error adding comment:', error));
//     };
//     ///////////////////////////////////
//     const [comments, setComments] = useState([]);

//     useEffect(() => {
//         fetchComments();
//     }, []);

//     const fetchComments = () => {
//         fetch('https://academy-backend-pq91.onrender.com/allcomments')
//             .then(response => response.json())
//             .then(data => setComments(data))
//             .catch(error => console.error('Error fetching comments:', error));
//     };

//     const deleteComment = (id) => {
//         fetch('https://academy-backend-pq91.onrender.com/deletecomment', {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ id }),
//         })
//         .then(response => {
//             if (response.ok) {
//                 alert('تم حذف التعليق بنجاح');
//                 fetchComments();
//             } else {
//                 alert('حدث خطأ أثناء محاولة حذف التعليق');
//             }
//         })
//         .catch(error => console.error('Error deleting comment:', error));
//     };

// /////////////////////


// const [newUsername, setNewUsername] = useState('');
// const [newPassword, setNewPassword] = useState('');

// const handleSave = () => {
//     if (newUsername && newPassword) {
//         localStorage.setItem('username', newUsername);
//         localStorage.setItem('password', newPassword);
//         alert('تم تغيير اسم المستخدم وكلمة المرور بنجاح');
//     } else {
//         alert('الرجاء إدخال اسم مستخدم وكلمة مرور جديدة');
//     }
// };
// //////////////

// const navigate = useNavigate();
// const handleLogout = () => {
//     localStorage.removeItem('auth');
//     navigate('/academy/Login');
// };

    
//   return (
//     <>
//     <div className="container Dash">
//     <div className="dashboard-container">
//             <h2>لوحة التحكم</h2>
//             <div className="change-credentials">
//                 <h3>تغيير اسم المستخدم وكلمة المرور</h3>
//                 <input
//                     type="text"
//                     placeholder="اسم المستخدم الجديد"
//                     value={newUsername}
//                     onChange={(e) => setNewUsername(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="كلمة المرور الجديدة"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                 />
//                 <button onClick={handleSave}>حفظ التغييرات</button>
//             </div>
//         </div>
//     <form onSubmit={handleSubmit}>
//             <label htmlFor="name">Name</label>
//             <input 
//                 type="text" 
//                 id="name" 
//                 name="name" 
//                 value={name} 
//                 onChange={(e) => setName(e.target.value)}
//             /><br/><br/>
            
//             <label htmlFor="country">Country</label>
//             <input 
//                 type="text" 
//                 id="country" 
//                 name="country" 
//                 value={country} 
//                 onChange={(e) => setCountry(e.target.value)}
//             /><br/><br/>

//             <label htmlFor="comment">Comment</label>
//             <textarea 
//                 name="comment" 
//                 id="comment" 
//                 value={comment} 
//                 onChange={(e) => setComment(e.target.value)}
//             ></textarea><br/><br/>

//             <button type="submit">أضف تعليق</button>
//         </form>
//         <hr />
//         <div id="comments">
//             <h1 className='fw-bold text-center'>جميع التعليقات</h1>
//             {comments.map((comment) => (
//                 <div key={comment.id} className="comment-box">
//                     <p><strong>الاسم:</strong> {comment.name}</p>
//                     <p><strong>الدولة:</strong> {comment.country}</p>
//                     <p><strong>التعليق:</strong> {comment.comment}</p>
//                     <button onClick={() => deleteComment(comment.id)}>حذف</button>
//                 </div>
//             ))}
//         </div>
//         <hr />
//         <button onClick={handleLogout}>تسجيل الخروج</button>

//     </div>
//     </>
//   )
// }


import './Dashboared.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchComments();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://academy-backend-pq91.onrender.com/addcomment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, country, comment }),
        })
        .then(response => {
            if (response.ok) {
                alert('تم إضافة التعليق بنجاح');
                setName('');
                setCountry('');
                setComment('');
                fetchComments();
            } else {
                alert('حدث خطأ أثناء محاولة إضافة التعليق');
            }
        })
        .catch(error => console.error('Error adding comment:', error));
    };

    const fetchComments = () => {
        fetch('https://academy-backend-pq91.onrender.com/allcomments')
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    };

    const deleteComment = (id) => {
        fetch('https://academy-backend-pq91.onrender.com/deletecomment', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
        .then(response => {
            if (response.ok) {
                alert('تم حذف التعليق بنجاح');
                fetchComments();
            } else {
                alert('حدث خطأ أثناء محاولة حذف التعليق');
            }
        })
        .catch(error => console.error('Error deleting comment:', error));
    };

    const handleSave = () => {
        if (newUsername && newPassword) {
            localStorage.setItem('username', newUsername);
            localStorage.setItem('password', newPassword);
            alert('تم تغيير اسم المستخدم وكلمة المرور بنجاح');
        } else {
            alert('الرجاء إدخال اسم مستخدم وكلمة مرور جديدة');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('auth');
        navigate('/academy/Login');
    };

    return (
        <div className="container">
            <div className="sidebar">
                <h2>لوحة التحكم</h2>
                <a href="#change-credentials">تغيير اسم المستخدم وكلمة المرور</a>
                <a href="#add-comment">إضافة تعليق</a>
                <a href="#view-comments">عرض التعليقات</a>
                <a className='logout' href="#" onClick={handleLogout}>تسجيل الخروج</a>
            </div>
            <div className="content">
                <div id="change-credentials" className="change-credentials">
                    <h3>تغيير اسم المستخدم وكلمة المرور</h3>
                    <input
                        type="text"
                        placeholder="اسم المستخدم الجديد"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="كلمة المرور الجديدة"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={handleSave}>حفظ التغييرات</button>
                </div>

                <div id="add-comment" className="form-section">
                    <h3>إضافة تعليق</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        /><br/><br/>

                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        /><br/><br/>

                        <label htmlFor="comment">Comment</label>
                        <textarea
                            name="comment"
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea><br/><br/>

                        <button className='button_add_comment' type="submit">أضف تعليق</button>
                    </form>
                </div>

                <div id="view-comments" className="comments-section">
                    <h3>جميع التعليقات</h3>
                    {comments.map((comment) => (
                        <div key={comment.id} className="comment-box">
                            <p><strong>الاسم:</strong> {comment.name}</p>
                            <p><strong>الدولة:</strong> {comment.country}</p>
                            <p><strong>التعليق:</strong> {comment.comment}</p>
                            <button onClick={() => deleteComment(comment.id)}>حذف</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
