import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDirectMessages } from "../hooks/chat/useDirectMessages";
import { useSendMessage } from "../hooks/chat/useSendMessage";
import { useMarkRead } from "../hooks/chat/useMarkRead";
import { socket } from "../socket";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import "../Css/Chat.css";
import Layout from "../components/Layout/Layout";

function Avatar({ src, name, className }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`avatar-wrap ${className}`}>
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
        />
      ) : (
        <span>{(name || "U").charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}

function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const profileId = localStorage.getItem("profileid");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null);

  const messageEndRef = useRef(null);

  const { data, isLoading } = useDirectMessages(id);
  const sendMutation = useSendMessage();
  const markReadMutation = useMarkRead();

  useEffect(() => {
    if (!data) return;
    setChatUser(data.chatUser);
    setMessages(data.messages);
  }, [data]);

  useEffect(() => {
    if (!id) return;
    markReadMutation.mutate(id);
  }, [id]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("register", profileId);

    const receiveMessage = (newMessage) => {
      const senderId = String(newMessage.sender?._id || newMessage.sender);
      const receiverId = String(newMessage.receiver?._id || newMessage.receiver);

      const isCurrentChat =
        (senderId === String(id) && receiverId === String(profileId)) ||
        (senderId === String(profileId) && receiverId === String(id));

      if (isCurrentChat) {
        if (senderId === String(id)) {
          markReadMutation.mutate(id);
        }

        setMessages((prev) => {
          const exists = prev.some((msg) => msg._id === newMessage._id);
          if (exists) return prev;
          return [...prev, newMessage];
        });
      }
    };

    socket.on("receiveDirectMessage", receiveMessage);

    return () => {
      socket.off("receiveDirectMessage", receiveMessage);
    };
  }, [id, profileId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    sendMutation.mutate(
      {
        receiverid: id,
        text: message.trim(),
      },
      {
        onSuccess: (savedMessage) => {
          setMessages((prev) => {
            const exists = prev.some((msg) => msg._id === savedMessage._id);
            if (exists) return prev;
            return [...prev, savedMessage];
          });

          markReadMutation.mutate(id);
          setMessage("");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="chat-loading">
        <div className="loader"></div>
        <p>Loading Conversation...</p>
      </div>
    );
  }

  const otherPersonName = chatUser?.user?.username || "User";
  const otherPersonPic = chatUser?.profilepic;

  return (
    <Layout>
      <div className="chat-container">
        <div className="chat-header">
          <div className="header-left">
            <button
              className="icon-btn"
              onClick={() => navigate("/friends")}
            >
              <FaArrowLeft />
            </button>

            <Avatar
              src={otherPersonPic}
              name={otherPersonName}
              className="profile-image"
            />

            <div className="header-info">
              <h3>{otherPersonName}</h3>
            </div>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => {
            const isMine =
              String(msg.sender?._id || msg.sender) === String(profileId);

            const senderName = msg.sender?.user?.username || "User";
            const senderPic = msg.sender?.profilepic;

            return (
              <div
                key={msg._id || index}
                className={`message-row ${isMine ? "mine" : "other"}`}
              >
                {!isMine && (
                  <Avatar
                    src={senderPic}
                    name={senderName}
                    className="message-avatar"
                  />
                )}

                <div
                  className={`message-bubble ${
                    isMine ? "sent-message" : "received-message"
                  }`}
                >
                  <p>{msg.text}</p>

                  <span className="message-time">
                    {msg.createdAt &&
                      new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </span>
                </div>
              </div>
            );
          })}

          <div ref={messageEndRef}></div>
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={sendMutation.isPending || !message.trim()}
          >
            {sendMutation.isPending ? "..." : <FaPaperPlane />}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Chat;