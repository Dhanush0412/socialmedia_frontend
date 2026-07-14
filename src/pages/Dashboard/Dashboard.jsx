import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDashboard } from "../../hooks/useDashboard";
import { useNotifications } from "../../hooks/useSettings";
import { useNavigate } from "react-router-dom";
import pandaLoading from "../../assets/Panda1.png";
import Layout from "../../components/Layout/Layout.jsx";
import Notifications from "../../components/Settings/Notifications/Notifications";

import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import NotificationsIcon from "@mui/icons-material/Notifications";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useDashboard();
  const { data: notificationsData } = useNotifications();

  const [anchorEl, setAnchorEl] = useState(null);

  const notifications = Array.isArray(notificationsData)
    ? notificationsData
    : [];

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (isLoading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <img
            src={pandaLoading}
            alt="Loading Panda"
            className={styles.loadingPanda}
          />

          <p className={styles.loadingText}>
            Waiting for Panda...
          </p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <p className={styles.errorText}>Failed to load dashboard</p>
        </div>
      </Layout>
    );
  }

  const profile = data?.profile || data?.data || data;

  return (
    <Layout>
      <div className={styles.dashboardContainer}>

        {/* ================= Header Card ================= */}

        <div className={styles.dashboardHeader}>

          <div className={styles.profileSection}>

            <div className={styles.avatarContainer}>
              {profile?.profilepic ? (
                <img
                  src={profile.profilepic}
                  alt="Profile"
                  className={styles.profileImage}
                  onError={(e) => {
                    e.target.src =
                      "https://res.cloudinary.com/dubjosis9/image/upload/v1782300064/demoimage_b0q161.jpg";
                  }}
                />
              ) : (
                <FaUserCircle className={styles.defaultAvatar} />
              )}
            </div>

            <div className={styles.userInfo}>
              <h1 className={styles.username}>
                {profile?.username || "User"}
              </h1>

              <p className={styles.profileId}>
                Profile ID: {profile?.profileid || "N/A"}
              </p>
            </div>

          </div>

          {/* Notification Bell */}

          <div className={styles.notificationWrapper}>
            <IconButton onClick={handleOpen}>

              <Badge
                badgeContent={unreadCount}
                color="error"
              >
                <NotificationsIcon
                  sx={{
                    color: "#F68B1F",
                    fontSize: 34,
                  }}
                />
              </Badge>

            </IconButton>
          </div>

        </div>

        {/* ================= Bio Card ================= */}

        <div className={styles.bioCard}>

          <div className={styles.bioHeader}>

            <h2 className={styles.bioTitle}>
              Bio
            </h2>

            <Button
              variant="contained"
              className={styles.viewPostBtn}
              onClick={() => navigate("/myposts")}
              sx={{
                background: "#F68B1F",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  background: "#D96F00",
                },
              }}
            >
              View Posts
            </Button>

          </div>

          <p className={styles.bioText}>
            {profile?.bio || "No bio available"}
          </p>

        </div>

        {/* ================= Stats ================= */}

        <div className={styles.statsSection}>

          {/* Groups */}
          <div
            className={`${styles.statCard} ${styles.clickableCard}`}
            onClick={() => navigate("/groupchat")}
          >
            <h3 className={styles.statTitle}>Groups</h3>

            <div className={styles.countCircle}>
              {profile?.groups || 0}
            </div>
          </div>

          {/* Connections */}

          <div
            className={`${styles.statCard} ${styles.clickableCard}`}
            onClick={() => navigate("/friends")}
          >
            <h3 className={styles.statTitle}>Connections</h3>

            <div className={styles.countCircle}>
              {profile?.connections || 0}
            </div>
          </div>

          {/* Posts */}

          <div className={styles.statCard}>
            <h3 className={styles.statTitle}>Posts</h3>

            <div
              className={`${styles.countCircle} ${styles.clickableCircle}`}
              onClick={() => navigate("/myposts")}
            >
              {profile?.posts || 0}
            </div>
          </div>

        </div>

      </div>

      {/* ================= Notification Popup ================= */}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            borderRadius: "15px",
            overflow: "hidden",
          },
        }}
      >
        <div className={styles.notificationPopup}>
          <Notifications />
        </div>
      </Popover>

    </Layout>
  );
}

export default Dashboard;