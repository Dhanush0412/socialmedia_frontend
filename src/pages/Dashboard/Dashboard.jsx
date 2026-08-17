import { useState } from "react";
import { FaUsers, FaUserFriends, FaNewspaper, FaArrowRight, FaShieldAlt, FaKey, FaPaperPlane, FaPen } from "react-icons/fa";
import { useDashboard } from "../../hooks/useDashboard";
import { useNotifications } from "../../hooks/useSettings";
import { useNavigate } from "react-router-dom";
import pandaLoading from "../../assets/pandalogo.svg";
import Layout from "../../components/Layout/Layout.jsx";
import Notifications from "../../components/Settings/Notifications/Notifications";
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
  const notifications = Array.isArray(notificationsData) ? notificationsData : [];
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  if (isLoading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <img src={pandaLoading} alt="Loading Panda" className={styles.loadingPanda} />
          <p className={styles.loadingText}>Waiting for Panda...</p>
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
        <header className={styles.dashboardHeader}>
          <div className={styles.headerContent}>
            <div className={styles.headerAccent}></div>
            <div>
              <h1 className={styles.greetingTitle}>Hello, {profile?.username || "Groot"}! 👋</h1>
              <p className={styles.greetingSubtext}>Connect. Chat. Share.</p>
            </div>
          </div>
          <div className={styles.headerRightArea}>
            <IconButton onClick={handleOpen} aria-label="Open notifications" className={styles.notificationIconButton}>
              <Badge
                badgeContent={unreadCount}
                color="error"
                overlap="circular"
                className={styles.notificationBadge}
              >
                <NotificationsIcon className={styles.notificationBellIcon} />
              </Badge>
            </IconButton>
          </div>
        </header>
        <div className={styles.profileCard}>
          <div className={styles.profileLeftPane}>
            <div className={styles.avatarLargeContainer}>
              <img
                src={profile?.profilepic || "https://res.cloudinary.com/dubjosis9/image/upload/v1782300064/demoimage_b0q161.jpg"}
                alt={profile?.username || "Profile"}
                className={styles.avatarLargeImage}
                onError={(e) => {
                  e.target.src = "https://res.cloudinary.com/dubjosis9/image/upload/v1782300064/demoimage_b0q161.jpg";
                }}
              />
            </div>
            <h2 className={styles.profileName}>{profile?.username || "Groot"}</h2>
            <span className={styles.profileHandle}>@{profile?.username?.toLowerCase().replace(/\s+/g, "") || "groot"}</span>
            <p className={styles.profileBio}>{profile?.bio || "No status bio provided yet."}</p>
            <button type="button" className={styles.editProfileBtn} onClick={() => navigate("/settings")}>
              <FaPen className={styles.editIcon} />
              <span>Edit Profile</span>
            </button>
          </div>
          <div className={styles.profileRightPane}>
            <div className={styles.pandaChatCard}>
              <div className={styles.pandaHeader}>
                <div className={styles.pandaBrandGroup}>
                  <div className={styles.pandaAvatarFrame}>
                    <img src={pandaLoading} alt="Panda Logo" className={styles.pandaIconImg} />
                  </div>
                  <div>
                    <div className={styles.pandaTitle}>PandaChat Live</div>
                    <div className={styles.pandaSubText}>
                      <span className={styles.pulseDot}></span>
                      Real-time Messaging
                    </div>
                  </div>
                </div>
                <span className={styles.activeRoomBadge}># General</span>
              </div>
              <div className={styles.chatMessageArea}>
                <div className={`${styles.chatBubble} ${styles.incoming}`}>
                  <span>Welcome to <strong>PandaChat</strong>! Type a message or jump into active group rooms. 🐼</span>
                  <span className={styles.msgTime}>10:42 AM</span>
                </div>
                <div className={`${styles.chatBubble} ${styles.outgoing}`}>
                  <span>Hey Panda! Loving the instant real-time sync speed. ⚡</span>
                  <span className={styles.msgTime}>10:43 AM</span>
                </div>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <small>Panda Assistant is active...</small>
                </div>
              </div>
              <div className={styles.pandaInputBar}>
                <input type="text" placeholder="Send a message in PandaChat..." className={styles.pandaInput} disabled />
                <button className={styles.pandaSendBtn} onClick={() => navigate("/groupchat")} title="Open Chat App">
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.metricCardsRow}>
          <div className={`${styles.metricCardBox} ${styles.groupsCard}`} onClick={() => navigate("/groupchat")} role="button" tabIndex={0}>
            <div className={styles.metricCardLeft}>
              <div className={`${styles.metricCardIcon} ${styles.groupIconBg}`}>
                <FaUsers />
              </div>
              <div className={styles.metricCardData}>
                <span className={styles.metricCardTitle}>Groups</span>
                <span className={styles.metricCardNumber}>{profile?.groups || 0}</span>
                <span className={styles.metricCardSubLabel}>Total Groups</span>
              </div>
            </div>
            <button className={styles.actionArrowBtn} aria-label="Navigate to groups">
              <FaArrowRight />
            </button>
          </div>
          <div className={`${styles.metricCardBox} ${styles.connectionsCard}`} onClick={() => navigate("/friends")} role="button" tabIndex={0}>
            <div className={styles.metricCardLeft}>
              <div className={`${styles.metricCardIcon} ${styles.friendsIconBg}`}>
                <FaUserFriends />
              </div>
              <div className={styles.metricCardData}>
                <span className={styles.metricCardTitle}>Connections</span>
                <span className={styles.metricCardNumber}>{profile?.connections || 0}</span>
                <span className={styles.metricCardSubLabel}>Total Connections</span>
              </div>
            </div>
            <button className={styles.actionArrowBtn} aria-label="Navigate to connections">
              <FaArrowRight />
            </button>
          </div>
          <div className={`${styles.metricCardBox} ${styles.postsCard}`} onClick={() => navigate("/myposts")} role="button" tabIndex={0}>
            <div className={styles.metricCardLeft}>
              <div className={`${styles.metricCardIcon} ${styles.postsIconBg}`}>
                <FaNewspaper />
              </div>
              <div className={styles.metricCardData}>
                <span className={styles.metricCardTitle}>Posts</span>
                <span className={styles.metricCardNumber}>{profile?.posts || 0}</span>
                <span className={styles.metricCardSubLabel}>Total Posts</span>
              </div>
            </div>
            <button className={styles.actionArrowBtn} aria-label="Navigate to posts">
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div className={styles.securitySectionCard}>
          <div className={styles.securityCardLeft}>
            <div className={styles.securityIconBox}>
              <FaShieldAlt />
            </div>
            <div className={styles.securityCardText}>
              <h3>Account & Security</h3>
              <p>Manage your password, authentication settings, and account privacy.</p>
            </div>
          </div>
          <button type="button" className={styles.secBtnPrimary} onClick={() => navigate("/settings")}>
            <FaKey />
            <span>Update Password</span>
          </button>
        </div>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: { className: styles.popoverPaperContainer },
        }}
      >
        <div className={styles.popoverContentInner}>
          <Notifications />
        </div>
      </Popover>
    </Layout>
  );
}

export default Dashboard;