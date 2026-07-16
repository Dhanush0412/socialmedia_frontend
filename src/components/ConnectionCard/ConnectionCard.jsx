import { useNavigate } from "react-router-dom";
import styles from "./ConnectionCard.module.css";

function ConnectionCard({ friend, unreadCount }) {
  const navigate = useNavigate();

  const username =
    friend?.user?.username || "Unknown User";

  const profileImage =
    friend?.profilepic;

  const openChat = () => {
    navigate(`/chat/${friend._id}`);
  };

  return (
    <div
      className={`${styles["connection-card"]} ${
        unreadCount > 0 ? styles["unread-card"] : ""
      }`}
      onClick={openChat}
    >
      <div className={styles["friend-profile-image"]}>
        {profileImage ? (
          <img
            src={profileImage}
            alt={username}
          />
        ) : (
          <div className={styles["profile-placeholder"]}>
            {username.charAt(0).toUpperCase()}
          </div>
        )}

        <span className={styles["online-status"]}></span>
      </div>

      <div className={styles["friend-info"]}>
        <h3>{username}</h3>

        <p>
          {friend?.bio || "Start conversation"}
        </p>
      </div>

      {unreadCount > 0 && (
        <div className={styles["unread-badge"]}>
          {unreadCount}
        </div>
      )}

      <button
        className={styles["chat-button"]}
        onClick={(e) => {
          e.stopPropagation();
          openChat();
        }}
      >
        Chat
      </button>
    </div>
  );
}

export default ConnectionCard;