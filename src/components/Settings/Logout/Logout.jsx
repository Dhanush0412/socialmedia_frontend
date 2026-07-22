import { useState } from "react";
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
} from "@mui/material";
import {
  Logout as LogoutIcon,
  ExitToApp,
  WarningAmber,
  Security,
  Lock,
  VerifiedUser,
} from "@mui/icons-material";
import { useLogout } from "../../../hooks/useSettings";
import Layout from "../../Layout/Layout";

function Logout({ showSnackbar }) {
  const logoutMutation = useLogout();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    if (!logoutMutation.isPending) {
      setOpenDialog(false);
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setOpenDialog(false);
        showSnackbar("Logged out successfully", "success");
        localStorage.removeItem("token");
        localStorage.removeItem("profileid");
        localStorage.removeItem("userid");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to logout";
        showSnackbar(errorMessage, "error");
      },
    });
  };

  return (
    <Layout>
      <Box className={styles.contentWrapper}>
        <Paper
          elevation={0}
          className={styles.actionCard}
        >
          <Box className={styles.topSection}>
            <Box className={styles.cardIconWrapper}>
              <ExitToApp
                className={styles.cardIcon}
              />
            </Box>

            <Typography
              variant="h3"
              className={styles.cardTitle}
            >
              Logout from PandaChat
            </Typography>

            <Typography
              className={styles.cardDescription}
            >
              You're currently signed in on this
              device. Logging out will securely end
              your current session while keeping all
              your chats, groups and account data
              safe on our servers.
            </Typography>
          </Box>

          <Box className={styles.features}>
            <Box className={styles.featureCard}>
              <Security
                className={styles.featureIcon}
              />
              <Typography
                className={styles.featureTitle}
              >
                Secure Logout
              </Typography>
              <Typography
                className={styles.featureText}
              >
                End your current session safely.
              </Typography>
            </Box>

            <Box className={styles.featureCard}>
              <Lock
                className={styles.featureIcon}
              />
              <Typography
                className={styles.featureTitle}
              >
                Privacy Protected
              </Typography>
              <Typography
                className={styles.featureText}
              >
                Your information stays protected.
              </Typography>
            </Box>

            <Box className={styles.featureCard}>
              <VerifiedUser
                className={styles.featureIcon}
              />
              <Typography
                className={styles.featureTitle}
              >
                Login Anytime
              </Typography>
              <Typography
                className={styles.featureText}
              >
                Sign in again using your account.
              </Typography>
            </Box>
          </Box>

          <Box className={styles.infoSection}>
            <Typography
              className={styles.infoTitle}
            >
              Before you logout
            </Typography>

            <Box className={styles.infoList}>
              <Typography
                className={styles.infoItem}
              >
                ✓ Your messages and media remain
                safe in your account.
              </Typography>

              <Typography
                className={styles.infoItem}
              >
                ✓ Group memberships are not
                affected.
              </Typography>

              <Typography
                className={styles.infoItem}
              >
                ✓ You can login anytime with your
                registered credentials.
              </Typography>

              <Typography
                className={styles.infoItem}
              >
                ✓ Your account remains completely
                secure.
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            className={styles.logoutBtn}
            onClick={handleOpenDialog}
          >
            Logout Account
          </Button>
        </Paper>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            className: styles.dialogPaper,
          }}
        >
          <DialogTitle
            className={styles.dialogTitle}
          >
            <Box className={styles.dialogHeader}>
              <WarningAmber
                className={styles.warningIcon}
              />

              <Typography
                variant="h6"
                fontWeight={700}
              >
                Confirm Logout
              </Typography>
            </Box>
          </DialogTitle>

          <DialogContent>
            <DialogContentText
              className={styles.dialogText}
            >
              Are you sure you want to logout from
              PandaChat?
              <br />
              <br />
              You will need to login again to access
              your account.
            </DialogContentText>
          </DialogContent>

          <DialogActions
            className={styles.dialogActions}
          >
            <Button
              onClick={handleCloseDialog}
              className={styles.cancelButton}
              disabled={logoutMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              className={
                styles.confirmLogoutButton
              }
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              startIcon={
                logoutMutation.isPending ? (
                  <CircularProgress
                    size={18}
                    color="inherit"
                  />
                ) : (
                  <LogoutIcon />
                )
              }
            >
              {logoutMutation.isPending
                ? "Logging Out..."
                : "Logout"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
}

export default Logout;