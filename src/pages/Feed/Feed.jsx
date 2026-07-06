import Layout from "../../components/Layout/Layout";
import { useFeed } from "../../hooks/useFeed";
import styles from "./Feed.module.css";
import PostCard from "../../components/PostCard/PostCard";

function Feed() {
  const { data: posts, isLoading, refetch } = useFeed();

  if (isLoading) return <h2 className={styles.loadingText}>Loading...</h2>;

  return (
    <Layout>
      <div className={styles.feedContainer}>
        <div className={styles.headerSection}>
          <h1 className={styles.pageTitle}>📸 Feed</h1>
          <p className={styles.postCount}>{posts?.length || 0} posts</p>
        </div>

        {posts?.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📝</div>
            <h3>No posts available</h3>
            <p>Your connections haven't shared anything yet.</p>
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

export default Feed;