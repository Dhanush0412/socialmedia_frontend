import React from 'react';
import styles from "./Logout.module.css";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  DeleteForever,
  Warning,
  ExitToApp,
  PersonOff,
} from '@mui/icons-material';

function Logout({ onLogout, onDelete }) {
  return (
    <Box className={styles.contentWrapper}>
      <Typography variant="h6" className={styles.contentTitle}>
        Account Actions
      </Typography>
      <Typography variant="body2" color="textSecondary" className={styles.contentSubtitle}>
        Manage your account security
      </Typography>

      <Box className={styles.accountActions}>
        {/* Logout Card */}
        <Paper elevation={2} className={styles.actionCard}>
          <Box className={styles.cardIconWrapper}>
            <ExitToApp className={styles.cardIcon} style={{ color: '#ff9417' }} />
          </Box>
          <Typography variant="h6" className={styles.cardTitle}>
            Logout
          </Typography>
          <Typography variant="body2" color="textSecondary" className={styles.cardDescription}>
            Sign out of your account on this device
          </Typography>
          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={onLogout}
            className={styles.logoutBtn}
            fullWidth
          >
            Logout
          </Button>
        </Paper>

        {/* Delete Account Card */}
        <Paper elevation={2} className={`${styles.actionCard} ${styles.dangerCard}`}>
          <Box className={styles.cardIconWrapper}>
            <PersonOff className={styles.cardIcon} style={{ color: '#f44336' }} />
          </Box>
          <Typography variant="h6" className={styles.cardTitle}>
            Delete Account
          </Typography>
          <Typography variant="body2" color="textSecondary" className={styles.cardDescription}>
            Permanently delete your account and all data
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteForever />}
            onClick={onDelete}
            className={styles.deleteBtn}
            fullWidth
          >
            Delete Account
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default Logout;