import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import './Chat.css'

const socket = io("https://api.japaneseacademy.jp"); // الاتصال بالخادم

const Chat = ({ userRole, firstName }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const room = localStorage.getItem("showVideoCall"); // تحديد الغرفة بناءً على المستوى

  useEffect(() => {
    // الانضمام إلى الغرفة
    socket.emit("joinRoom", room);

    // استقبال الرسائل المحفوظة عند الاتصال بالخادم
    socket.on("chatHistory", (msgHistory) => {
      setMessages(msgHistory);
    });

    // استقبال الرسائل الجديدة
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage");
    };
  }, [room]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: firstName,
        role: userRole,
        text: message,
        timestamp: new Date().toLocaleTimeString(),
      };

      socket.emit("sendMessage", { room, message: newMessage }); // إرسال الرسالة مع تحديد الغرفة
      setMessage(""); // تفريغ الحقل
    }
  };

  const name = localStorage.getItem("firstName");
  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={11}>
          <Card className="w-100">
            <Card.Body>
              <div
                className="chat-box"
                style={{
                  height: "300px",
                  overflowY: "scroll",
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.role === "teacher" ? "text-primary" : "text-success"
                      }`}
                  >
                    <strong>
                      {msg.sender} (
                      {localStorage.getItem("userRole")
                        ? ` ${name}`
                        : `${name}`}
                      ):
                    </strong>{" "}
                    {msg.text}
                    <div style={{ fontSize: "0.8rem", color: "#888" }}>
                      {msg.timestamp}
                    </div>
                  </div>
                ))}
              </div>
              <Form className="mt-3">
                <Form.Group controlId="messageInput">
                  <Form.Control
                    type="text"
                    placeholder="اكتب رسالتك هنا..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // منع إعادة تحميل الصفحة أو إغلاق المكالمة
                        handleSendMessage(); // إرسال الرسالة
                      }
                    }}
                  />

                </Form.Group>

                <Button
                  className="webRtcSend mt-2"
                  variant="primary"
                  onClick={handleSendMessage}
                >
                  إرسال
                </Button>
                {localStorage.getItem("userRole") === "teacher" && (
                  <Button
                    className="webRtcSend mt-2"
                    variant="danger"
                    onClick={() => socket.emit("clearChat", room)}
                  >
                    حذف الدردشة
                  </Button>
                )}

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
