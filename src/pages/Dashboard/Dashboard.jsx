import { FaUserCircle } from "react-icons/fa";
import { useDashboard } from "../../hooks/useDashboard";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <CircularProgress sx={{ color: "#F68B1F" }} />
          <p className={styles.loadingText}>Loading...</p>
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
        {/* Header Card */}
        <div className={styles.dashboardHeader}>
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

        {/* Bio Card */}
        <div className={styles.bioCard}>
          <div className={styles.bioHeader}>
            <h2 className={styles.bioTitle}>Bio</h2>
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

        {/* Stats Section */}
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <h3 className={styles.statTitle}>Groups</h3>
            <div className={styles.countCircle}>
              {profile?.groups || 0}
            </div>
          </div>

          <div className={styles.statCard}>
            <h3 className={styles.statTitle}>Connections</h3>
            <div className={styles.countCircle}>
              {profile?.connections || 0}
            </div>
          </div>

          <div className={styles.statCard}>
            <h3 className={styles.statTitle}>Posts</h3>
            <div className={styles.countCircle}>
              {profile?.posts || 0}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;