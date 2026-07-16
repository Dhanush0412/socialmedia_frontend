import { useEffect,useRef,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft,FaPaperPlane } from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import { useGroupDetails } from "../../hooks/group/useGroupDetails";
import { useGroupMessages } from "../../hooks/group/useGroupMessages";
import { useSendGroupMessage } from "../../hooks/groupchat/useSendGroupMessage";
import { socket } from "../../socket";
import styles from "./GroupChat.module.css";

function Avatar({ src,name,className }) {
  const [imgError,setImgError] = useState(false);

  return (
    <div className={`${styles["avatar-wrap"]} ${className}`}>
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
        />
      ) : (
        <span>
          {(name || "G").charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export default function GroupChat() {

  const { groupid } = useParams();
  const navigate = useNavigate();
  const profileid = localStorage.getItem("profileid");

  const [text,setText] = useState("");
  const [messages,setMessages] = useState([]);

  const messageEndRef = useRef(null);

  const {
    data: group = {},
    isLoading: isGroupLoading
  } = useGroupDetails(groupid);

  const {
    data: groupMessages = [],
    isLoading: isMessagesLoading
  } = useGroupMessages(groupid);

  const sendMutation = useSendGroupMessage();

  useEffect(() => {
    if (Array.isArray(groupMessages)) {
      setMessages(groupMessages);
    }
  }, [groupMessages]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("joingroup",groupid);

    const receiveMessage = (newMessage) => {
      setMessages(prev => {
        const exists = prev.some(
          msg => msg._id === newMessage._id
        );

        if (exists) {
          return prev;
        }

        return [
          ...prev,
          newMessage
        ];
      });
    };

    socket.on(
      "receivemessage",
      receiveMessage
    );

    return () => {
      socket.off(
        "receivemessage",
        receiveMessage
      );
    };
  }, [groupid]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  const handleSend = () => {

    if (!text.trim()) {
      return;
    }

    sendMutation.mutate(
      {
        groupid,
        text: text.trim()
      },
      {
        onSuccess: (savedMessage) => {
          setMessages(prev => {

            const exists = prev.some(
              msg => msg._id === savedMessage._id
            );

            if (exists) {
              return prev;
            }

            return [
              ...prev,
              savedMessage
            ];
          });

          setText("");
        },

        onError: (error) => {
          toast.error(
            error.response?.data ||
            "Unable to send message"
          );
        }
      }
    );
  };

  if (isGroupLoading || isMessagesLoading) {
    return (
      <Layout>
        <div className={styles["chat-loading"]}>
          <div className={styles["loader"]}></div>
          <p>Loading Group Chat...</p>
        </div>
      </Layout>
    );
  }

  return (
    

      <div className={styles["chat-container"]}>

        <div className={styles["chat-header"]}>

          <div className={styles["header-left"]}>

            <button
              className={styles["icon-btn"]}
              onClick={() => navigate("/groupchat")}
            >
              <FaArrowLeft />
            </button>

            <Avatar
              src={group.groupimage}
              name={group.groupname}
              className={styles["profile-image"]}
            />

            <div className={styles["header-info"]}>
              <h3>{group.groupname}</h3>

              <span>
                {group.members?.length || 0} Members
              </span>
            </div>

          </div>

        </div>

        <div className={styles["chat-messages"]}>

          {messages.map((msg,index) => {

            const isMine =
              String(msg.sender?._id) ===
              String(profileid);

            const senderName =
              msg.sender?.user?.username ||
              msg.sender?.fullname ||
              msg.sender?.username ||
              "Unknown";

            const senderPic =
              msg.sender?.profilepic;

            return (

              <div
                key={msg._id || index}
                className={`${styles["message-row"]} ${isMine ? styles["mine"] : styles["other"]}`}
              >

                {!isMine && (
                  <Avatar
                    src={senderPic}
                    name={senderName}
                    className={styles["message-avatar"]}
                  />
                )}

                <div
                  className={`${styles["message-bubble"]} ${isMine ? styles["sent-message"] : styles["received-message"]}`}
                >

                  {!isMine && (
                    <div className={styles["sender-name"]}>
                      {senderName}
                    </div>
                  )}

                  <p>{msg.text}</p>

                  <span className={styles["message-time"]}>
                    {msg.createdAt &&
                      new Date(msg.createdAt).toLocaleTimeString([],{
                        hour:"2-digit",
                        minute:"2-digit"
                      })}
                  </span>

                </div>

              </div>

            );
          })}

          {messages.length === 0 && (
            <div className={styles["empty-chat"]}>
              <h3>No Messages Yet</h3>
              <p>
                Start the conversation with your group.
              </p>
            </div>
          )}

          <div ref={messageEndRef}></div>

        </div>

        <div className={styles["chat-input-area"]}>

          <input
            type="text"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <button
            className={styles["send-btn"]}
            onClick={handleSend}
            disabled={
              sendMutation.isPending ||
              !text.trim()
            }
          >
            {sendMutation.isPending
              ? "..."
              : <FaPaperPlane />}
          </button>

        </div>

      </div>

    
  );
}