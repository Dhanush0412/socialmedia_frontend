import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDirectMessages } from "../../hooks/chat/useDirectMessages";
import { useSendMessage } from "../../hooks/chat/useSendMessage";
import { useMarkRead } from "../../hooks/chat/useMarkRead";

import { socket } from "../../socket";

import {
  FaArrowLeft,
  FaPaperPlane,
} from "react-icons/fa";

import styles from "./Chat.module.css";
import Layout from "../../components/Layout/Layout";


function Avatar({ src, name, className }) {

  const [imgError, setImgError] = useState(false);


  return (
    <div
      className={`${styles["avatar-wrap"]} ${
        className || ""
      }`}
    >

      {
        src && !imgError ? (
          <img
            src={src}
            alt={name}
            onError={() =>
              setImgError(true)
            }
          />
        )
        :
        (
          <span>
            {(name || "U")
              .charAt(0)
              .toUpperCase()}
          </span>
        )
      }

    </div>
  );
}



function Chat() {


  const {
    id
  } = useParams();


  const navigate = useNavigate();


  const profileId =
    localStorage.getItem(
      "profileid"
    );



  const [
    message,
    setMessage
  ] = useState("");



  const [
    messages,
    setMessages
  ] = useState([]);



  const [
    chatUser,
    setChatUser
  ] = useState(null);



  const messageEndRef =
    useRef(null);



  const {
    data,
    isLoading
  } =
    useDirectMessages(id);



  const sendMutation =
    useSendMessage();



  const markReadMutation =
    useMarkRead();



  // Load chat messages

  useEffect(() => {

    if (!data)
      return;


    setChatUser(
      data.chatUser
    );


    setMessages(
      data.messages || []
    );


  }, [data]);



  // Mark messages as read when chat opens

  useEffect(() => {


    if (!id)
      return;



    markReadMutation.mutate(
      id,
      {
        onSuccess: () => {


          socket.emit(
            "messagesRead",
            {
              senderId: id,
              receiverId: profileId,
            }
          );


        }
      }
    );


  }, [id]);
  // Socket connection
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("register", profileId);

    const receiveMessage = (newMessage) => {
      const senderId = String(
        newMessage.sender?._id || newMessage.sender
      );

      const receiverId = String(
        newMessage.receiver?._id ||
          newMessage.receiver
      );

      const isCurrentChat =
        (senderId === String(id) &&
          receiverId === String(profileId)) ||
        (senderId === String(profileId) &&
          receiverId === String(id));

      if (!isCurrentChat) return;

      // Automatically mark received messages as read
      if (senderId === String(id)) {
        markReadMutation.mutate(id, {
          onSuccess: () => {
            socket.emit("messagesRead", {
              senderId: id,
              receiverId: profileId,
            });
          },
        });
      }

      setMessages((prev) => {
        const exists = prev.some(
          (msg) => msg._id === newMessage._id
        );

        if (exists) return prev;

        return [...prev, newMessage];
      });
    };

    socket.on(
      "receiveDirectMessage",
      receiveMessage
    );

    return () => {
      socket.off(
        "receiveDirectMessage",
        receiveMessage
      );
    };
  }, [id, profileId]);

  // Auto scroll
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Send Message
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
            const exists = prev.some(
              (msg) =>
                msg._id === savedMessage._id
            );

            if (exists) return prev;

            return [
              ...prev,
              savedMessage,
            ];
          });

          setMessage("");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div
        className={
          styles["chat-loading"]
        }
      >
        <div
          className={
            styles["loader"]
          }
        ></div>

        <p>
          Loading Conversation...
        </p>
      </div>
    );
  }

  const otherPersonName =
    chatUser?.user?.username || "User";

  const otherPersonPic =
    chatUser?.profilepic;
      return (
    <Layout>
      <div className={styles["chat-container"]}>
        <div className={styles["chat-header"]}>
          <div className={styles["header-left"]}>
            <button
              className={styles["icon-btn"]}
              onClick={() => navigate("/friends")}
            >
              <FaArrowLeft />
            </button>

            <Avatar
              src={otherPersonPic}
              name={otherPersonName}
              className={styles["profile-image"]}
            />

            <div className={styles["header-info"]}>
              <h3>{otherPersonName}</h3>
            </div>
          </div>
        </div>

        <div className={styles["chat-messages"]}>
          {messages.map((msg, index) => {
            const isMine =
              String(
                msg.sender?._id || msg.sender
              ) === String(profileId);

            const senderName =
              msg.sender?.user?.username ||
              "User";

            const senderPic =
              msg.sender?.profilepic;

            return (
              <div
                key={msg._id || index}
                className={`${styles["message-row"]} ${
                  isMine
                    ? styles["mine"]
                    : styles["other"]
                }`}
              >
                {!isMine && (
                  <Avatar
                    src={senderPic}
                    name={senderName}
                    className={
                      styles["message-avatar"]
                    }
                  />
                )}

                <div
                  className={`${styles["message-bubble"]} ${
                    isMine
                      ? styles["sent-message"]
                      : styles["received-message"]
                  }`}
                >
                  <p>{msg.text}</p>

                  <span
                    className={
                      styles["message-time"]
                    }
                  >
                    {msg.createdAt &&
                      new Date(
                        msg.createdAt
                      ).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                  </span>
                </div>
              </div>
            );
          })}

          <div ref={messageEndRef}></div>
        </div>

        <div className={styles["chat-input-area"]}>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            className={styles["send-btn"]}
            onClick={sendMessage}
            disabled={
              sendMutation.isPending ||
              !message.trim()
            }
          >
            {sendMutation.isPending ? (
              "..."
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}
export default Chat;