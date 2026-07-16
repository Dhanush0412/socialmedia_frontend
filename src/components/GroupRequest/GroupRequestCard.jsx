import { useState } from "react";
import { toast } from "react-toastify";
import { useAcceptGroupInvite } from "../../hooks/group/useAcceptGroupInvite";
import { useRejectGroupInvite } from "../../hooks/group/useRejectGroupInvite";
import styles from "./GroupRequest.module.css";

export default function GroupRequestCard({ invite }) {

  const {
    mutate: acceptInvite,
    isPending: isAccepting,
  } = useAcceptGroupInvite();

  const {
    mutate: rejectInvite,
    isPending: isRejecting,
  } = useRejectGroupInvite();

  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return null;
  }

  const handleAccept = () => {

    setHidden(true);

    acceptInvite(invite._id, {
      onError: (error) => {

        setHidden(false);

        toast.error(
          error.response?.data ||
          "Unable to accept invitation"
        );

      },
    });

  };

  const handleReject = () => {

    setHidden(true);

    rejectInvite(invite._id, {
      onError: (error) => {

        setHidden(false);

        toast.error(
          error.response?.data ||
          "Unable to reject invitation"
        );

      },
    });

  };

  return (

    <div className={styles.groupRequestCard}>

      <div className={styles.groupRequestImage}>

        <img
          src={invite.group?.groupimage}
          alt={invite.group?.groupname}
        />

      </div>

      <div className={styles.groupRequestContent}>

        <h2>
          {invite.group?.groupname}
        </h2>

        <p>
          Invited by
          <strong>
            {" "}
            {invite.sender?.user?.username ||
              invite.sender?.username ||
              "Unknown User"}
          </strong>
        </p>

        <div className={styles.groupRequestButtons}>

          <button
            className={styles.acceptBtn}
            disabled={isAccepting || isRejecting}
            onClick={handleAccept}
          >
            {isAccepting ? "Accepting..." : "Accept"}
          </button>

          <button
            className={styles.rejectBtn}
            disabled={isAccepting || isRejecting}
            onClick={handleReject}
          >
            {isRejecting ? "Rejecting..." : "Reject"}
          </button>

        </div>

      </div>

    </div>

  );

}