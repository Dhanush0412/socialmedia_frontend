import React from 'react';
import styles from "../../pages/Settings/Settings.module.css";
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
  CheckCircle,
} from '@mui/icons-material';
import { useNotifications, useReadNotification } from '../../hooks/useSettings';

function Notifications() {
  const { data: notificationsData, isLoading } = useNotifications();
  const readNotificationMutation = useReadNotification();

  const notifications = notificationsData || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationRead = async (notificationId) => {
    try {
      await readNotificationMutation.mutateAsync(notificationId);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
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
        {unreadCount > 0 && (
          <Badge badgeContent={unreadCount} color="primary">
            <NotificationsIcon className={styles.notificationBadgeIcon} />
          </Badge>
        )}
      </Box>

      {notifications.length > 0 ? (
        <List className={styles.notificationList}>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
              onClick={() => !notification.read && handleNotificationRead(notification.id)}
            >
              <ListItemIcon>
                {!notification.read ? (
                  <Badge variant="dot" color="primary">
                    <NotificationsIcon className={styles.notificationIcon} />
                  </Badge>
                ) : (
                  <CheckCircle className={styles.notificationIcon} color="disabled" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={notification.title}
                secondary={
                  <Box>
                    <Typography variant="body2" className={styles.notificationMessage}>
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(notification.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="textSecondary" className={styles.emptyState}>
          No notifications
        </Typography>
      )}
    </Box>
  );
}

export default Notifications;