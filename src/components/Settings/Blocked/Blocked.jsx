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
  CircularProgress,
} from '@mui/material';
import { useBlockedUsers } from '../../../hooks/useSettings';

function Blocked({ showSnackbar }) {
  const { data: blockedUsersData, isLoading } = useBlockedUsers();
  
  // Extract user data from the profile documents
  const blockedUsers = React.useMemo(() => {
    if (!blockedUsersData) return [];
    
    // If data is an array of profile documents
    if (Array.isArray(blockedUsersData)) {
      return blockedUsersData.map(profile => {
        // The user info is nested in the 'user' field
        if (profile.user) {
          return {
            id: profile.user._id || profile._id,
            name: profile.user.username || profile.user.name || 'Unknown User',
            email: profile.user.email || 'No email',
            profilepic: profile.profilepic || null,
            bio: profile.bio || '',
            // Keep the original profile data if needed
            ...profile
          };
        }
        // Fallback: use the profile data directly
        return {
          id: profile._id,
          name: profile.username || 'Unknown User',
          email: profile.email || 'No email',
          ...profile
        };
      });
    }
    
    // If data is an object with a data property
    if (blockedUsersData.data && Array.isArray(blockedUsersData.data)) {
      return blockedUsersData.data.map(profile => {
        if (profile.user) {
          return {
            id: profile.user._id || profile._id,
            name: profile.user.username || profile.user.name || 'Unknown User',
            email: profile.user.email || 'No email',
            profilepic: profile.profilepic || null,
            ...profile
          };
        }
        return {
          id: profile._id,
          name: profile.username || 'Unknown User',
          email: profile.email || 'No email',
          ...profile
        };
      });
    }
    
    console.warn("Unexpected blocked users data structure:", blockedUsersData);
    return [];
  }, [blockedUsersData]);

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
                <Avatar 
                  className={styles.blockedAvatar}
                  src={user.profilepic}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={user.name}
                secondary={user.email}
              />
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