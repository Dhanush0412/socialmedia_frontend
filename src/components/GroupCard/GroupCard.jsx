import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./GroupCard.module.css";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";

import { useRejectedGroupInvites } from "../../hooks/group/useRejectedGroupInvites";

export default function GroupCard({ group }) {

  const navigate = useNavigate();

  const [openMembers, setOpenMembers] =
    useState(false);

  const handleOpenMembers = (e) => {
    e.stopPropagation();
    setOpenMembers(true);
  };

  const handleCloseMembers = () => {
    setOpenMembers(false);
  };

  const {
    data: rejectedInvites = [],
  } = useRejectedGroupInvites(
    group._id,
    openMembers
  );

  return (
    <>

      <div className={styles["group-card"]}>

        <div className={styles["group-image"]}>

          <img
            src={group.groupimage}
            alt={group.groupname}
          />

        </div>

        <div className={styles["group-content"]}>

          <h3>
            {group.groupname}
          </h3>

          <div className={styles["group-footer"]}>

            <p
              className={styles["members-count"]}
              onClick={handleOpenMembers}
            >
              👥 {group.members?.length || 0} Members
            </p>

            <div className={styles["group-buttons"]}>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/group/chat/${group._id}`
                  );
                }}
              >
                Open Group
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/group/details/${group._id}`
                  );
                }}
              >
                Add Member
              </button>

            </div>

          </div>

        </div>

      </div>

      <Dialog
        open={openMembers}
        onClose={handleCloseMembers}
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 700,
          }}
        >

          Group Members

          <IconButton
            onClick={handleCloseMembers}
          >
            <CloseIcon />
          </IconButton>

        </DialogTitle>

        <DialogContent
          className={styles.membersDialog}
        >
                    {/* Members Section */}

          <Typography
            variant="h6"
            className={styles.sectionTitle}
          >
            👥 Members ({group.members?.length || 0})
          </Typography>

          {group.members?.length > 0 ? (

            group.members.map((member) => (

              <div
                key={member._id}
                className={styles.memberCard}
              >

                <div className={styles.memberLeft}>

                  <Avatar
                    src={member.profilepic}
                    alt={member.user?.username}
                    className={styles.avatar}
                  />

                  <div>

                    <div className={styles.memberName}>

                      {member.user?.username}

                      {String(member._id) ===
                        String(group.createdby?._id) && (

                        <span
                          className={styles.adminBadge}
                        >
                          Admin
                        </span>

                      )}

                    </div>

                    <div
                      className={styles.memberBio}
                    >
                      {member.bio ||
                        "No bio available"}
                    </div>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <Typography
              className={styles.emptyRejected}
            >
              No members found.
            </Typography>

          )}

          <Divider sx={{ my: 3 }} />

          {/* Rejected Invitations */}

          <Typography
            variant="h6"
            className={
              styles.sectionTitleRejected
            }
          >
            ❌ Rejected Invitations (
            {rejectedInvites.length})
          </Typography>

          {rejectedInvites.length > 0 ? (

            rejectedInvites.map((invite) => (

              <div
                key={invite._id}
                className={styles.rejectedCard}
              >

                <div className={styles.memberLeft}>

                  <Avatar
                    src={
                      invite.receiver?.profilepic
                    }
                    alt={
                      invite.receiver?.user
                        ?.username
                    }
                    className={styles.avatar}
                  />

                  <div>

                    <div
                      className={
                        styles.memberName
                      }
                    >
                      {
                        invite.receiver?.user
                          ?.username
                      }
                    </div>

                    <div
                      className={
                        styles.rejectedText
                      }
                    >
                      Invitation Rejected
                    </div>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <Typography
              className={styles.emptyRejected}
            >
              No rejected invitations.
            </Typography>

          )}

        </DialogContent>

      </Dialog>

    </>
  );

}