import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import './Chat.css'
const socket = io("https://academy-backend-pq91.onrender.com"); // الاتصال بالخادم

const Chat = ({ userRole, firstName }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
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
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: firstName,
        role: userRole,
        text: message,
        timestamp: new Date().toLocaleTimeString(),
      };

      socket.emit("sendMessage", newMessage); // إرسال الرسالة للخادم
      setMessage(""); // تفريغ الحقل
    }
  };
const name = localStorage.getItem("firstName")
  return (
    <>
      <hr />
      <Container>
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <h3 className="text-center">
              {localStorage.getItem("userRole") === "teacher"
                ? "دردشة المعلم"
                : "دردشة الطالب"}
            </h3>
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
                      className={`message ${
                        msg.role === "teacher" ? "text-primary" : "text-success"
                      }`}
                    >
                      <strong>
                        {msg.sender} (
                        {localStorage.getItem("userRole") === "teacher"
                          ? " المعلم"
                          : `${name} الطالب`}
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
                    />
                  </Form.Group>
                  <Button
                    className="mt-2"
                    variant="primary"
                    onClick={handleSendMessage}
                  >
                    إرسال
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Chat;
