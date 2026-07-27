import React from "react";
import styles from "./Blocked.module.css";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useBlockedUsers } from "../../../hooks/useSettings";
import { useUnblockUser } from "../../../hooks/connection/useunBlockUser";

function Blocked({ showSnackbar }) {
  const { data: blockedUsersData, isLoading } = useBlockedUsers();
  const { mutate: unblock, isPending, variables: pendingProfileId } = useUnblockUser();
const queryClient=useQueryClient();
  const blockedUsers = React.useMemo(() => {
    if (!blockedUsersData) return [];

    if (Array.isArray(blockedUsersData)) {
      return blockedUsersData.map((profile) => ({
        id: profile._id,
        name: profile.user?.username || "Unknown User",
        email: profile.user?.email || "No email",
        profilepic: profile.profilepic || null,
        ...profile,
      }));
    }

    if (blockedUsersData.data && Array.isArray(blockedUsersData.data)) {
      return blockedUsersData.data.map((profile) => ({
        id: profile._id,
        name: profile.user?.username || "Unknown User",
        email: profile.user?.email || "No email",
        profilepic: profile.profilepic || null,
        ...profile,
      }));
    }

    return [];
  }, [blockedUsersData]);

  const handleUnblock = (profileid, name) => {
    if (!profileid) {
      console.log("Profile id missing");
      return;
    }


    unblock(profileid, {
      onSuccess: () => {
        showSnackbar?.(`${name} has been unblocked`, "success");
        queryClient.refetchQueries({ queryKey: ["blockedUsers"], type: "active" });
      },
      onError: (error) => {
        showSnackbar?.(
          error?.response?.data?.message || "Failed to unblock user",
          "error"
        );
      },
    });
  };

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
        <Typography variant="body2">Loading blocked contacts...</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.contentWrapper}>
      <Typography variant="h6" className={styles.contentTitle}>
        Blocked Contacts
      </Typography>

      <Typography
        variant="body2"
        color="textSecondary"
        className={styles.contentSubtitle}
      >
        {blockedUsers.length > 0
          ? `You have blocked ${blockedUsers.length} user${
              blockedUsers.length > 1 ? "s" : ""
            }`
          : "No blocked contacts"}
      </Typography>

      {blockedUsers.length > 0 ? (
        <List className={styles.blockedList}>
          {blockedUsers.map((user) => {
            const isThisUserPending = isPending && pendingProfileId === user._id;

            return (
              <ListItem key={user.id} className={styles.blockedItem}>
                <ListItemIcon>
                  <Avatar className={styles.blockedAvatar} src={user.profilepic}>
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </Avatar>
                </ListItemIcon>

                <ListItemText
                  primary={user.name}
                  secondary={user.email}
                  className={styles.blockedText}
                />

                <button
                  className={styles.chatbutton}
                  disabled={isThisUserPending}
                  onClick={() => handleUnblock(user._id, user.name)}
                >
                  {isThisUserPending ? "Unblocking..." : "Unblock"}
                </button>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Box className={styles.emptyStateWrapper}>
          <Typography variant="body2" color="textSecondary" className={styles.emptyState}>
            No blocked contacts
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Blocked;