import Layout from "../../components/Layout/Layout";
import { useMyPosts } from "../../hooks/useMyPost";
import styles from "./MyPosts.module.css";
import { useNavigate } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import { Badge } from "@mui/material";

function MyPosts() {
  const navigate = useNavigate();
  const { data: posts, isLoading } = useMyPosts();

  if (isLoading) return <h2 className={styles.loadingText}>Loading...</h2>;

  return (
    <Layout>
      <div className={styles.mypostsContainer}>
        <div className={styles.headerSection}>
          <div className={styles.headerLeft}>
            <button
              className={styles.backButton}
              onClick={() => navigate("/dashboard")}
              aria-label="Go back to dashboard"
            >
              ← Back
            </button>
            <h1 className={styles.pageTitle}>📸 My Posts</h1>
          </div>
          <div className={styles.headerRight}>
            <Badge 
              badgeContent={posts?.length || 0} 
              color="primary"
              className={styles.postsBadge}
              sx={{
                '& .MuiBadge-badge': {
                  background: 'linear-gradient(135deg, #ff9f1a, #ff7900)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '14px',
                  minWidth: '28px',
                  height: '28px',
                  borderRadius: '14px',
                  boxShadow: '0 2px 8px rgba(255, 145, 0, 0.3)',
                  padding: '0 10px',
                }
              }}
            >
              <span className={styles.postsLabel}>Total Posts</span>
            </Badge>
          </div>
        </div>
        {posts?.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📝</div>
            <h3>No posts yet</h3>
            <p>Start sharing your moments!</p>
          </div>
        ) : (
          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyPosts;