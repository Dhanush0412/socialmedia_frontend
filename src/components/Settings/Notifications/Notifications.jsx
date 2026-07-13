import React from 'react';
import styles from "./Notifications.module.css";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  CircularProgress,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Favorite,
  Comment,
  PersonAdd,
  PersonAddAlt1,
} from '@mui/icons-material';
import { useNotifications, useReadNotification } from '../../../hooks/useSettings';

function Notifications() {
  const { data: notificationsData, isLoading } = useNotifications();
  const readNotificationMutation = useReadNotification();

  // ✅ FIX: Ensure notifications is always an array
  const notifications = Array.isArray(notificationsData) ? notificationsData : [];
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      try {
        await readNotificationMutation.mutateAsync(notification._id);
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'like':
        return <Favorite className={styles.likeIcon} />;
      case 'comment':
        return <Comment className={styles.commentIcon} />;
      case 'connection_request':
        return <PersonAdd className={styles.connectionIcon} />;
      case 'connection_accepted':
        return <PersonAddAlt1 className={styles.acceptedIcon} />;
      default:
        return <NotificationsIcon className={styles.notificationIcon} />;
    }
  };

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
        <Typography variant="body2" color="textSecondary">
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
          <Typography variant="h6" className={styles.contentTitle}>
            Notifications
          </Typography>
          <Typography variant="body2" color="textSecondary" className={styles.contentSubtitle}>
            {unreadCount > 0 
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'All caught up! No unread notifications'}
          </Typography>
        </Box>
        <Badge badgeContent={unreadCount} color="primary">
          <NotificationsIcon className={styles.notificationBadgeIcon} />
        </Badge>
      </Box>

      {/* Notification List */}
      {notifications.length > 0 ? (
        <List className={styles.notificationList}>
          {notifications.map((notification) => (
            <ListItem
              key={notification._id}
              className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <ListItemIcon>
                {!notification.read ? (
                  <Badge variant="dot" color="primary">
                    {getNotificationIcon(notification.type)}
                  </Badge>
                ) : (
                  getNotificationIcon(notification.type)
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" className={styles.notificationTitle}>
                    {notification.title}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" className={styles.notificationMessage}>
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" className={styles.notificationTime}>
                      {new Date(notification.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box className={styles.emptyState}>
          <NotificationsIcon className={styles.emptyIcon} />
          <Typography variant="body2" color="textSecondary">
            No notifications
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Notifications;