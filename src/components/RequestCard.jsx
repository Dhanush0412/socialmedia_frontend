import {useAcceptRequest} from "../hooks/connection/useAcceptRequest";
import {useRejectRequest} from "../hooks/connection/useRejectRequest";
import "../Css/RequestCard.css"
function RequestCard({request}){

  const accept=useAcceptRequest();
  const reject=useRejectRequest();

  return(
    <div className="request-card">
      <div className="request-user">
        <div className="request-avatar">
        {request?.sender?.username?.charAt(0)?.toUpperCase()}
        </div>

        <div className="request-info">
          <h3>{request?.sender?.username}</h3>
          <p>wants to connect with you</p>
        </div>
      </div>

      <div className="request-actions">
        <button
          className="accept-btn"
          onClick={()=>{
            accept.mutate(request._id);
          }}
          disabled={accept.isPending}
        >
          {accept.isPending ? "Accepting..." : "Accept"}
        </button>

        <button
          className="reject-btn"
          onClick={()=>{
            reject.mutate(request._id);
          }}
          disabled={reject.isPending}
        >
          {reject.isPending ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  );
}

export default RequestCard;