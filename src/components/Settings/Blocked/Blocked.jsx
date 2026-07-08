import React from 'react';
import styles from "./Blocked.module.css";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  CircularProgress,
} from '@mui/material';
import { useBlockedUsers } from '../../../hooks/useSettings';

function Blocked({ showSnackbar }) {
  const { data: blockedUsersData, isLoading, refetch } = useBlockedUsers();
  const blockedUsers = blockedUsersData || [];

  const handleUnblockUser = async (userId) => {
    try {
      // Add your unblock API call here
      // await unblockUser.mutateAsync(userId);
      showSnackbar('User unblocked successfully', 'success');
      refetch();
    } catch (error) {
      showSnackbar(error.message || 'Failed to unblock user', 'error');
    }
  };

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
        <Typography variant="body2" color="textSecondary">
          Loading blocked contacts...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.contentWrapper}>
      <Typography variant="h6" className={styles.contentTitle}>
        Blocked Contacts
      </Typography>
      <Typography variant="body2" color="textSecondary" className={styles.contentSubtitle}>
        {blockedUsers.length > 0 
          ? `You have blocked ${blockedUsers.length} user${blockedUsers.length > 1 ? 's' : ''}`
          : 'No blocked contacts'}
      </Typography>

      {blockedUsers.length > 0 ? (
        <List className={styles.blockedList}>
          {blockedUsers.map((user) => (
            <ListItem key={user.id} className={styles.blockedItem}>
              <ListItemIcon>
                <Avatar className={styles.blockedAvatar}>
                  {user.name ? user.name.charAt(0) : 'U'}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={user.name || 'Unknown User'}
                secondary={user.email || 'No email'}
              />
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleUnblockUser(user.id)}
                className={styles.unblockBtn}
              >
                Unblock
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="textSecondary" className={styles.emptyState}>
          No blocked contacts
        </Typography>
      )}
    </Box>
  );
}

export default Blocked;