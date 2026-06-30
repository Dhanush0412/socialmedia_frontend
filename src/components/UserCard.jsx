import { useState } from "react";
import { useSendConnection } from "../hooks/connection/useSendConnection";
import "../css/UserCard.css";

function UserCard({ user }) {
  const sendRequest = useSendConnection();
  const [sent,setSent]=useState(false);

  const username = user?.user?.username || "Unknown User";
  const image = user?.profilepic;

  const handleSendRequest = () => {
    sendRequest.mutate(user._id,{
      onSuccess:()=>{
        setSent(true);
      }
    });
  };

  return (
    <div className="user-card">
      <div className="profile-image">
        {image ? (
          <img src={image} alt={username}/>
        ) : (
          <div className="avatar">
            {username.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="profile-image__online"/>
      </div>

      <div className="user-details">
        <div className="user-info">
          <h3 className="user-name">{username}</h3>
        </div>

        <button
          className={`connect-btn ${sent ? "connect-btn--sent" : ""}`}
          onClick={handleSendRequest}
          disabled={sendRequest.isPending || sent}
        >
          {sendRequest.isPending ? (
            <span className="connect-btn__inner">
              <span className="btn-spinner"/>
              Sending...
            </span>
          ) : sent ? (
            <span className="connect-btn__inner">
              ✓ Sent
            </span>
          ) : (
            <span className="connect-btn__inner">
              Connect
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default UserCard;