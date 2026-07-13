import React, { useState } from 'react';
import styles from "./Logout.module.css";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  DeleteForever,
  ExitToApp,
  PersonOff,
} from '@mui/icons-material';
import { useLogout, useDeleteAccount } from '../../../hooks/useSettings';

function Logout({ showSnackbar }) {
  const logoutMutation = useLogout();
  const deleteAccountMutation = useDeleteAccount();

  // Delete account dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [deleteError, setDeleteError] = useState('');

  // Handle logout
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        showSnackbar("Logged out successfully", "success");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'Failed to logout';
        showSnackbar(errorMessage, 'error');
      },
    });
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    if (confirmText !== 'DELETE') {
      setDeleteError('Please type "DELETE" to confirm');
      return;
    }

    setDeleteError('');
    deleteAccountMutation.mutate(undefined, {
      onSuccess: () => {
        showSnackbar("Account deleted successfully", "success");
        handleCloseDeleteDialog();

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      },

      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'Failed to delete account';
        showSnackbar(errorMessage, 'error');
        setDeleteError(errorMessage);
      },
    });
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
    setConfirmText('');
    setDeleteError('');
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setConfirmText('');
    setDeleteError('');
  };

  return (
    <>
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
              startIcon={logoutMutation.isLoading ? <CircularProgress size={20} color="inherit" /> : <LogoutIcon />}
              onClick={handleLogout}
              className={styles.logoutBtn}
              fullWidth
              disabled={logoutMutation.isLoading}
            >
              {logoutMutation.isLoading ? 'Logging out...' : 'Logout'}
            </Button>
          </Paper>

          {/* Delete Account Card */}
          <Paper elevation={2} className={`${styles.actionCard} ${styles.dangerCard}`}>
            <Box className={styles.cardIconWrapper}>
              <PersonOff className={styles.cardIcon} style={{ color: '#ff9417' }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ color: "#ff9417", fontWeight: 600 }}
            >
              Delete Account
            </Typography>
            <Typography variant="body2" color="textSecondary" className={styles.cardDescription}>
              Permanently delete your account and all data
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={deleteAccountMutation.isLoading ? <CircularProgress size={20} color="error" /> : <DeleteForever />}
              onClick={handleOpenDeleteDialog}
              className={styles.deleteBtn}
              fullWidth
              disabled={deleteAccountMutation.isLoading}
            >
              {deleteAccountMutation.isLoading ? 'Deleting...' : 'Delete Account'}
            </Button>
          </Paper>
        </Box>
      </Box>

      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className={styles.dialogTitle}>
          <Typography
            variant="h6"
            sx={{
              color: "#ff9417",
              fontWeight: 600,
            }}
          >
            Delete Account
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={styles.dialogText}>
            <strong>Warning:</strong> This action is <strong>permanent</strong> and cannot be undone.
            <br /><br />
            All your data including:
            <ul>
              <li>Posts and comments</li>
              <li>Messages and conversations</li>
              <li>Connections and blocked users</li>
              <li>Profile information</li>
              <li>Activity history</li>
            </ul>
            will be deleted forever.
          </DialogContentText>

          <Box className={styles.confirmBox}>
            <Typography variant="body2" className={styles.confirmLabel}>
              To confirm, type <strong>"DELETE"</strong> in the field below:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              error={!!deleteError}
              helperText={deleteError}
              className={styles.confirmInput}
              onKeyDown={(e) => {
                if (e.key === "Enter" && confirmText === "DELETE") {
                  handleDeleteAccount();
                }
              }}
              autoFocus
            />
          </Box>

          {deleteAccountMutation.isLoading && (
            <Box className={styles.loadingContainer}>
              <CircularProgress size={24} />
              <Typography variant="body2" color="textSecondary">
                Deleting your account...
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button
            onClick={handleCloseDeleteDialog}
            className={styles.cancelButton}
            disabled={deleteAccountMutation.isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            variant="contained"
            className={styles.confirmDeleteButton}
            disabled={deleteAccountMutation.isLoading || confirmText !== 'DELETE'}
            className={styles.confirmDeleteButton}
          >
            {deleteAccountMutation.isLoading ? 'Deleting...' : 'Permanently Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Logout;