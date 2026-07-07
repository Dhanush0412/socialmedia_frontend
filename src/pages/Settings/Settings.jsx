import React, { useState } from 'react';
import Layout from "../../components/Layout/Layout";
import styles from "./Settings.module.css";
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  AccountCircle,
  Notifications as NotificationsIcon,
  Block,
  Palette,
  Assessment,
  Logout,
} from '@mui/icons-material';

// Import child components from components/Settings
import Account from '../../components/Settings/Account';
import Notifications from '../../components/Settings/Notifications';
import Blocked from '../../components/Settings/Blocked';
import Themes from '../../components/Settings/Themes';
import Activity from '../../components/Settings/Activity';
import LogoutComponent from '../../components/Settings/Logout';

function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const menuItems = [
    { id: 'account', label: 'Account Information', icon: <AccountCircle /> },
    { id: 'notifications', label: 'Notifications', icon: <NotificationsIcon /> },
    { id: 'blocked', label: 'Blocked Contacts', icon: <Block /> },
    { id: 'themes', label: 'Themes', icon: <Palette /> },
    { id: 'activity', label: 'Activity', icon: <Assessment /> },
    { id: 'logout', label: 'Logout', icon: <Logout /> },
  ];

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogout = () => setOpenLogoutDialog(true);
  const handleConfirmLogout = () => {
    setOpenLogoutDialog(false);
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleDeleteAccount = () => setOpenDeleteDialog(true);
  const handleConfirmDelete = () => {
    setOpenDeleteDialog(false);
    showSnackbar('Account deleted successfully', 'success');
  };

  const renderContent = () => {
    const props = {
      showSnackbar,
    };

    switch (activeTab) {
      case 'account':
        return <Account {...props} />;
      case 'notifications':
        return <Notifications {...props} />;
      case 'blocked':
        return <Blocked {...props} />;
      case 'themes':
        return <Themes {...props} />;
      case 'activity':
        return <Activity {...props} />;
      case 'logout':
        return <LogoutComponent {...props} onLogout={handleLogout} onDelete={handleDeleteAccount} />;
      default:
        return <Account {...props} />;
    }
  };

  return (
    <Layout>
      <Container maxWidth="xl" className={styles.container} disableGutters>
        <Box className={styles.settingsPage}>
          <Typography variant="h4" className={styles.pageTitle}>
            Settings
          </Typography>

          <Box className={styles.settingsWrapper}>
            {/* Sidebar */}
            <Paper elevation={2} className={styles.sidebar}>
              <List className={styles.menuList}>
                {menuItems.map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton
                      className={`${styles.menuItem} ${activeTab === item.id ? styles.activeMenuItem : ''}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <ListItemIcon className={styles.menuIcon}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Content Area */}
            <Paper elevation={2} className={styles.contentArea}>
              <Box className={styles.contentScroll}>
                {renderContent()}
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Dialogs */}
        <Dialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to logout? You will need to sign in again to access your account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenLogoutDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmLogout} color="error" variant="contained">
              Logout
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your account? This action is permanent and cannot be undone.
              All your data will be permanently removed.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained">
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
}

export default Settings;