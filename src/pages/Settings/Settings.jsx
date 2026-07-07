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

// Import child components 
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
        <Dialog 
          open={openLogoutDialog} 
          onClose={() => setOpenLogoutDialog(false)}
          PaperProps={{
            sx: {
              borderRadius: '20px',
              padding: '8px',
            }
          }}
        >
          <DialogTitle sx={{ 
            fontWeight: 700, 
            color: '#1a1a2e',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <Logout sx={{ color: '#ff9417', fontSize: '28px' }} />
            Confirm Logout
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: '#666', fontSize: '15px' }}>
              Are you sure you want to logout? You will need to sign in again to access your account.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ padding: '16px 24px 24px', gap: '12px' }}>
            <Button 
              onClick={() => setOpenLogoutDialog(false)} 
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                padding: '8px 24px',
                fontWeight: 600,
                color: '#666',
                border: '2px solid #e6e6e6',
                '&:hover': {
                  background: '#fafafa',
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmLogout} 
              variant="contained"
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                padding: '8px 24px',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #ff9f1a, #ff7900)',
                boxShadow: '0 18px 40px rgba(255, 145, 0, 0.28)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 24px 55px rgba(255, 145, 0, 0.35)',
                }
              }}
            >
              Logout
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog 
          open={openDeleteDialog} 
          onClose={() => setOpenDeleteDialog(false)}
          PaperProps={{
            sx: {
              borderRadius: '20px',
              padding: '8px',
            }
          }}
        >
          <DialogTitle sx={{ 
            fontWeight: 700, 
            color: '#1a1a2e',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ fontSize: '28px' }}>⚠️</span>
            Delete Account
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: '#666', fontSize: '15px' }}>
              Are you sure you want to delete your account? This action is permanent and cannot be undone.
              All your data will be permanently removed.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ padding: '16px 24px 24px', gap: '12px' }}>
            <Button 
              onClick={() => setOpenDeleteDialog(false)} 
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                padding: '8px 24px',
                fontWeight: 600,
                color: '#666',
                border: '2px solid #e6e6e6',
                '&:hover': {
                  background: '#fafafa',
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmDelete} 
              variant="contained"
              color="error"
              sx={{
                textTransform: 'none',
                borderRadius: '12px',
                padding: '8px 24px',
                fontWeight: 600,
                boxShadow: '0 18px 40px rgba(211, 47, 47, 0.25)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 24px 55px rgba(211, 47, 47, 0.3)',
                }
              }}
            >
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
            sx={{ 
              width: '100%',
              borderRadius: '12px',
              '& .MuiAlert-icon': {
                fontSize: '24px',
              }
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
}

export default Settings;