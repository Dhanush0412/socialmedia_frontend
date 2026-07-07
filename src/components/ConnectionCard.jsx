import { useNavigate } from "react-router-dom";
import "../Css/ConnectionCard.css";

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
      className={`connection-card ${
        unreadCount > 0 ? "unread-card" : ""
      }`}
      onClick={openChat}
    >

      <div className="friend-profile-image">

        {

          profileImage ? (

            <img
              src={profileImage}
              alt={username}
            />

          ) : (

            <div className="profile-placeholder">

              {username.charAt(0).toUpperCase()}

            </div>

          )

        }

        <span className="online-status"></span>

      </div>

      <div className="friend-info">

        <h3>

          {username}

        </h3>

        <p>

          {friend?.bio || "Start conversation"}

        </p>

      </div>

      {
    unreadCount>0 &&

    <div className="unread-badge">

        {unreadCount}

    </div>
}
      <button
        className="chat-button"
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