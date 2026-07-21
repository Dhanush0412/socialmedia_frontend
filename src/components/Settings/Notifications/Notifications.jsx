import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Notifications.module.css";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  CircularProgress,
} from "@mui/material";

import {
  Notifications as NotificationsIcon,
  Favorite,
  Comment,
  PersonAdd,
  PersonAddAlt1,
  Groups,
  Chat,
} from "@mui/icons-material";

import {
  useNotifications,
  useReadNotification,
} from "../../../hooks/useSettings";

function Notifications() {
  const navigate = useNavigate();

  const {
    data: notificationsData,
    isLoading,
  } = useNotifications();

  const readNotificationMutation = useReadNotification();

  const notifications = Array.isArray(notificationsData)
    ? notificationsData
    : [];

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <Favorite className={styles.likeIcon} />;

      case "comment":
        return <Comment className={styles.commentIcon} />;

      case "connectionrequest":
        return (
          <PersonAdd className={styles.connectionIcon} />
        );

      case "connectionaccepted":
        return (
          <PersonAddAlt1
            className={styles.acceptedIcon}
          />
        );

      case "groupinvite":
        return <Groups color="primary" />;

      case "grouprejected":
        return <Groups color="error" />;

      case "message":
        return <Chat color="success" />;

      default:
        return (
          <NotificationsIcon
            className={styles.notificationIcon}
          />
        );
    }
  };
    const handleNotificationClick = async (notification) => {
    try {
      // Mark notification as read
      if (!notification.read) {
        await readNotificationMutation.mutateAsync(notification._id);
      }
      // Navigate based on notification type
      switch (notification.type) {
        case "like":
        
            navigate("/myposts");
          break;

        case "comment":
          // if (notification.postid) {
          //   navigate(`/myposts/${notification.postid}`);
          // } else {
          //   navigate("/feed");
          // }
          // break;
          
            navigate("/myposts");
            break;

        case "connectionrequest":
          navigate("/friends")
          break;

        // case "connectionaccepted":
        //   navigate(`/chat/${friend.id}`);
        //   break;

        case "connectionaccepted":
  if (notification.senderid?._id) {
    navigate(`/chat/${notification.senderid._id}`);
  } else {
    navigate("/friends");
  }
  break;
        case "groupinvite":
          navigate("/groupchat");
          break;

        case "grouprejected":
          navigate("/groupchat");
          break;

        case "message":
          if (notification.senderid) {
            navigate(`/chat/${notification.senderid}`);
          } else {
            navigate("/chat");
          }
          break;

        default:
          navigate("/notifications");
      }
    } catch (error) {
      console.error(
        "Failed to process notification:",
        error
      );
    }
  };

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />

        <Typography
          variant="body2"
          color="textSecondary"
        >
          Loading notifications...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.contentWrapper}>
      {/* Header */}
      <Box className={styles.notificationHeader}>
        <Box>
          <Typography
            variant="h6"
            className={styles.contentTitle}
          >
            Notifications
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            className={styles.contentSubtitle}
          >
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${
                  unreadCount > 1 ? "s" : ""
                }`
              : "All caught up! No unread notifications"}
          </Typography>
        </Box>

        <Badge
          badgeContent={unreadCount}
          color="primary"
        >
          <NotificationsIcon
            className={styles.notificationBadgeIcon}
          />
        </Badge>
      </Box>
            {/* Notification List */}
      {notifications.length > 0 ? (
        <List className={styles.notificationList}>
          {notifications.map((notification) => (
            <ListItem
              key={notification._id}
              disablePadding
              className={
                !notification.read
                  ? styles.unread
                  : ""
              }
            >
              <ListItemButton
                onClick={() =>
                  handleNotificationClick(
                    notification
                  )
                }
                className={
                  styles.notificationItem
                }
              >
                <ListItemIcon>
                  {!notification.read ? (
                    <Badge
                      variant="dot"
                      color="primary"
                    >
                      {getNotificationIcon(
                        notification.type
                      )}
                    </Badge>
                  ) : (
                    getNotificationIcon(
                      notification.type
                    )
                  )}
                </ListItemIcon>

                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      fontWeight={
                        notification.read
                          ? 500
                          : 700
                      }
                      className={
                        styles.notificationTitle
                      }
                    >
                      {notification.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className={
                          styles.notificationMessage
                        }
                      >
                        {notification.message}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        className={
                          styles.notificationTime
                        }
                      >
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
                <Box className={styles.emptyState}>
          <NotificationsIcon
            className={styles.emptyIcon}
          />

          <Typography
            variant="h6"
            gutterBottom
          >
            No Notifications
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            You're all caught up!
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Notifications;