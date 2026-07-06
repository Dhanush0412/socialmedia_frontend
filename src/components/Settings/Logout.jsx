import React from 'react';
import styles from "../../pages/Settings/Settings.module.css";
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Delete,
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
        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          className={styles.logoutBtn}
        >
          Logout
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={onDelete}
          className={styles.deleteBtn}
        >
          Delete Account
        </Button>
      </Box>
    </Box>
  );
}

export default Logout;