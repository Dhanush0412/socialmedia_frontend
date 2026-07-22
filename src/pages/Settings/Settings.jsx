import React, { useState } from "react";
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
} from "@mui/material";
import {
  AccountCircle,
  Block,
  Assessment,
} from "@mui/icons-material";

import Account from "../../components/Settings/Account/Account";
import Blocked from "../../components/Settings/Blocked/Blocked";
import Activity from "../../components/Settings/Activity/Activity";

function Settings() {
  const [activeTab, setActiveTab] = useState("account");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const menuItems = [
    {
      id: "account",
      label: "Account Information",
      icon: <AccountCircle />,
    },
    {
      id: "blocked",
      label: "Blocked Contacts",
      icon: <Block />,
    },
    {
      id: "activity",
      label: "Activity",
      icon: <Assessment />,
    },
  ];

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const renderContent = () => {
    const props = {
      showSnackbar,
    };

    switch (activeTab) {
      case "account":
        return <Account {...props} />;
      case "blocked":
        return <Blocked {...props} />;
      case "activity":
        return <Activity {...props} />;
      default:
        return <Account {...props} />;
    }
  };

  return (
    <Layout>
      <Container
        maxWidth="xl"
        className={styles.container}
        disableGutters
      >
        <Box className={styles.settingsPage}>
          <Typography
            variant="h4"
            className={styles.pageTitle}
          >
            Settings
          </Typography>

          <Box className={styles.settingsWrapper}>
            <Paper
              elevation={2}
              className={styles.sidebar}
            >
              <List className={styles.menuList}>
                {menuItems.map((item) => (
                  <ListItem
                    key={item.id}
                    disablePadding
                  >
                    <ListItemButton
                      className={`${styles.menuItem} ${
                        activeTab === item.id
                          ? styles.activeMenuItem
                          : ""
                      }`}
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

            <Paper
              elevation={2}
              className={styles.contentArea}
            >
              <Box className={styles.contentScroll}>
                {renderContent()}
              </Box>
            </Paper>
          </Box>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
}

export default Settings;