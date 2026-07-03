import { useState } from "react";
import { useAcceptRequest } from "../hooks/connection/useAcceptRequest";
import { useRejectRequest } from "../hooks/connection/useRejectRequest";
import "../Css/RequestCard.css";

function RequestCard({ request }) {
  const accept = useAcceptRequest();
  const reject = useRejectRequest();

  const [hidden, setHidden] = useState(false);

  const username =
    request?.sender?.user?.username ||
    request?.sender?.username ||
    request?.user?.username ||
    "Unknown User";

  const profilePic =
    request?.sender?.profilepic ||
    request?.sender?.user?.profilepic ||
    request?.user?.profilepic;

  const handleAccept = () => {
    accept.mutate(request._id, {
      onSuccess: () => {
        setHidden(true);
      },
    });
  };

  const handleReject = () => {
    reject.mutate(request._id, {
      onSuccess: () => {
        setHidden(true);
      },
    });
  };

  if (hidden) {
    return null;
  }

  return (
    <div className="request-card">
      <div className="request-user">
        <div className="request-avatar">
          {profilePic ? (
            <img
              src={profilePic}
              alt={username}
              className="request-avatar-img"
            />
          ) : (
            username.charAt(0).toUpperCase()
          )}
        </div>

        <div className="request-info">
          <h3>{username}</h3>
          <p>wants to connect with you</p>
        </div>
      </div>

      <div className="request-actions">
        <button
          className="accept-btn"
          onClick={handleAccept}
          disabled={accept.isPending || reject.isPending}
        >
          {accept.isPending ? "Accepting..." : "Accept"}
        </button>

        <button
          className="reject-btn"
          onClick={handleReject}
          disabled={accept.isPending || reject.isPending}
        >
          {reject.isPending ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  );
}

export default RequestCard;