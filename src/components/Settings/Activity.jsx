import React from 'react';
import styles from "../../pages/Settings/Settings.module.css";
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useActivity } from '../../hooks/useSettings';

function Activity() {
  const { data: activityData, isLoading } = useActivity();
  const activities = activityData || [];

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
        <Typography variant="body2" color="textSecondary">
          Loading activity...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.contentWrapper}>
      <Typography variant="h6" className={styles.contentTitle}>
        Recent Activity
      </Typography>
      <Typography variant="body2" color="textSecondary" className={styles.contentSubtitle}>
        Your recent account activity
      </Typography>

      {activities.length > 0 ? (
        <Box className={styles.activityContainer}>
          {activities.map((activity) => (
            <Box key={activity.id} className={styles.activityItem}>
              <Box className={styles.activityInfo}>
                <Typography variant="body1" className={styles.activityAction}>
                  {activity.action}
                </Typography>
                <Typography variant="caption" color="textSecondary" className={styles.activityDetails}>
                  {activity.device || 'Unknown device'}
                </Typography>
              </Box>
              <Chip
                label={new Date(activity.time).toLocaleString()}
                size="small"
                className={styles.activityTime}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="textSecondary" className={styles.emptyState}>
          No activity yet
        </Typography>
      )}
    </Box>
  );
}

export default Activity;