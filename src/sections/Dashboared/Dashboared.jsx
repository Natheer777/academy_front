
import "./Dashboared.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments();
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://academy-backend-pq91.onrender.com/addcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, country, comment }),
    })
      .then((response) => {
        if (response.ok) {
          alert("تم إضافة التعليق بنجاح");
          setName("");
          setCountry("");
          setComment("");
          fetchComments();
        } else {
          alert("حدث خطأ أثناء محاولة إضافة التعليق");
        }
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  const fetchComments = () => {
    fetch("https://academy-backend-pq91.onrender.com/allcomments")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  };

  const deleteComment = (id) => {
    fetch("https://academy-backend-pq91.onrender.com/deletecomment", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.ok) {
          alert("تم حذف التعليق بنجاح");
          fetchComments();
        } else {
          alert("حدث خطأ أثناء محاولة حذف التعليق");
        }
      })
      .catch((error) => console.error("Error deleting comment:", error));
  };

  const handleSave = () => {
    const userId = 1; // افتراضًا أنك تعرف معرف المستخدم الحالي
    const token = localStorage.getItem('token'); // الحصول على التوكن

    if (newUsername && newPassword) {
      fetch("https://academy-backend-pq91.onrender.com/updatecredentials", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // إضافة التوكن إلى الهيدر
        },
        body: JSON.stringify({ newUsername, newPassword, userId }),
      })
        .then((response) => {
          if (response.ok) {
            alert("تم تغيير اسم المستخدم وكلمة المرور بنجاح");
          } else {
            alert("حدث خطأ أثناء محاولة تغيير اسم المستخدم وكلمة المرور");
          }
        })
        .catch((error) => console.error("Error updating credentials:", error));
    } else {
      alert("الرجاء إدخال اسم مستخدم وكلمة مرور جديدة");
    }
  };

  // Fetch users when the component mounts
  const fetchUsers = () => {
    fetch("https://academy-backend-pq91.onrender.com/allusers")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  // Delete user function
  const deleteUser = (id) => {
    fetch("https://academy-backend-pq91.onrender.com/deleteusers", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.ok) {
          // Update user state after deletion
          setUsers(users.filter((user) => user.id !== id));
        } else {
          console.error("Failed to delete user");
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/Login");
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>لوحة التحكم</h2>
        <a href="#change-credentials">تغيير اسم المستخدم وكلمة المرور</a>
        <a href="#add-comment">إضافة تعليق</a>
        <a href="#view-comments">عرض التعليقات</a>
        <a href="#view-users">عرض المستخدمين</a>
        <a className="logout" href="#" onClick={handleLogout}>
          تسجيل الخروج
        </a>
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
            <label htmlFor="name">الاسم</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />

            <label htmlFor="country">المدينة</label>
            <input
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <br />
            <br />

            <label htmlFor="comment">التعليق</label>
            <textarea
              name="comment"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <br />
            <br />

            <button className="button_add_comment" type="submit">
              أضف تعليق
            </button>
          </form>
        </div>

        <div id="view-comments" className="comments-section">
          <h3>جميع التعليقات</h3>
          {comments.map((comment) => (
            <div key={comment.id} className="comment-box">
              <p>
                <strong>الاسم:</strong> {comment.name}
              </p>
              <p>
                <strong>الدولة:</strong> {comment.country}
              </p>
              <p>
                <strong>التعليق:</strong> {comment.comment}
              </p>
              <button onClick={() => deleteComment(comment.id)}>حذف</button>
            </div>
          ))}
        </div>

        <div className="table-container" id="view-users">
          <h2>جدول المستخدمين</h2>
          <table className="responsive-table">
            <thead>
              <tr>
                <th>الاسم الأول</th>
                <th>الاسم الأخير</th>
                <th>البلد</th>
                <th>العمر</th>
                <th>الجنس</th>
                <th>مستوى التعليم</th>
                <th>مستوى اللغة اليابانية</th>
                <th>الهاتف</th>
                <th>الإيميل</th>
                <th>الحذف</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.country}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>{user.educationLevel}</td>
                  <td>{user.japaneseLevel}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
