import Layout from "../../components/Layout/Layout";
import { useMyPosts } from "../../hooks/useMyPost";
import styles from "./MyPosts.module.css";
import PostCard from "../../components/PostCard/PostCard";

function MyPosts() {
  const { data: posts, isLoading } = useMyPosts();

  if (isLoading) return <h2 className={styles.loadingText}>Loading...</h2>;

  return (
    <Layout>
      <div className={styles.mypostsContainer}>
        <div className={styles.headerSection}>
          <h1 className={styles.pageTitle}>📸 My Posts</h1>
          <p className={styles.postCount}>{posts?.length || 0} posts</p>
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