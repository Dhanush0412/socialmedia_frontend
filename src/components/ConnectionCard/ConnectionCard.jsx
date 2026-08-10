import { useNavigate } from "react-router-dom";
import styles from "./ConnectionCard.module.css";
import { useBlockUser } from "../../hooks/connection/useBlockUser";
import { FaCommentDots, FaBan, FaSpinner } from "react-icons/fa";

function ConnectionCard({ friend, unreadCount }) {
  const navigate = useNavigate();
  const { mutate: block, isPending } = useBlockUser();

  const username = friend?.user?.username || "Unknown User";
  const profileImage = friend?.profilepic;

  const openChat = () => {
    navigate(`/chat/${friend._id}`);
  };

  const handleBlock = () => {
    if (!friend?._id) {
      console.log("Profile id missing");
      return;
    }
    block(friend._id);
  };

  return (
    <div
      className={`${styles.connectionCard} ${
        unreadCount > 0 ? styles.unreadCard : ""
      }`}
      onClick={openChat}
    >
      <div className={styles.avatarWrapper}>
        {profileImage ? (
          <img
            src={profileImage}
            alt={username}
            className={styles.avatarImage}
          />
        ) : (
          <div className={styles.profilePlaceholder}>
            {username.charAt(0).toUpperCase()}
          </div>
        )}
        <span className={styles.onlineStatus} title="Online"></span>
      </div>

      <div className={styles.friendInfo}>
        <div className={styles.titleRow}>
          <h3 className={styles.username}>{username}</h3>
          {unreadCount > 0 && (
            <span className={styles.unreadBadge}>{unreadCount}</span>
          )}
        </div>
        <p className={styles.userBio}>
          {friend?.bio || "Tap to start conversation"}
        </p>
      </div>

      <div className={styles.actionButtons}>
        <button
          className={styles.chatButton}
          onClick={(e) => {
            e.stopPropagation();
            openChat();
          }}
          title="Chat"
        >
          <FaCommentDots className={styles.btnIcon} />
          <span>Chat</span>
        </button>

        <button
          className={styles.blockButton}
          disabled={isPending}
          onClick={(e) => {
            e.stopPropagation();
            handleBlock();
          }}
          title="Block User"
        >
          {isPending ? (
            <FaSpinner className={styles.spinnerIcon} />
          ) : (
            <FaBan className={styles.btnIcon} />
          )}
          <span>{isPending ? "Blocking" : "Block"}</span>
        </button>
      </div>
    </div>
  );
}

export default ConnectionCard;