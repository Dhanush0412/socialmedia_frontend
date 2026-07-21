import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./RejectedInviteList.module.css";
import { useRejectedGroupInvites } from "../../hooks/groups/useRejectedGroupInvites";

export default function RejectedInviteList({ groupid }) {

  const {
    data: rejectedInvites = [],
    isLoading,
  } = useRejectedGroupInvites(groupid);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (rejectedInvites.length === 0) {
    return (
      <div className={styles.empty}>
        No rejected invitations
      </div>
    );
  }

  return (

    <div className={styles.container}>

      <h2 className={styles.title}>
        Rejected Invitations
      </h2>

      {rejectedInvites.map((invite) => (

        <div
          key={invite._id}
          className={styles.card}
        >

          <Avatar
            src={invite.receiver?.profilepic}
            sx={{
              width: 60,
              height: 60,
            }}
          />

          <div className={styles.info}>

            <h3>
              {invite.receiver?.user?.username}
            </h3>

            <p>
              {invite.receiver?.bio || "No bio"}
            </p>

            <span className={styles.badge}>
              Rejected
            </span>

          </div>

        </div>

      ))}

    </div>

  );

}