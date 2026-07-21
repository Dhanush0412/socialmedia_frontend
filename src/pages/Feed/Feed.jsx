import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useFeed } from "../../hooks/useFeed";
import styles from "./Feed.module.css";
import PostCard from "../../components/PostCard/PostCard";
import pandaLoading from "../../assets/Panda1.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Feed() {

  const { data: posts = [], isLoading } = useFeed();

  const POSTS_PER_PAGE = 6;

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const startIndex = (page - 1) * POSTS_PER_PAGE;

  const endIndex = startIndex + POSTS_PER_PAGE;

  const currentPosts = posts.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {

    setPage(value);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  if (isLoading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <img
            src={pandaLoading}
            alt="Loading"
            className={styles.loadingPanda}
          />

          <p className={styles.loadingText}>
            Waiting for Panda...
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className={styles.feedContainer}>

        <div className={styles.headerSection}>

          <h1 className={styles.pageTitle}>
            📸 Feed
          </h1>

          <p className={styles.postCount}>
            {posts.length} Posts
          </p>

        </div>

        {posts.length === 0 ? (

          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📝</div>

            <h3>No posts available</h3>

            <p>
              Your connections haven't shared anything yet.
            </p>
          </div>

        ) : (

          <>
            <div className={styles.postsGrid}>

              {currentPosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                />
              ))}

            </div>

            <div className={styles.paginationContainer}>

              

                <Pagination
                  page={page}
                  count={totalPages}
                  onChange={handlePageChange}
                  color="warning"
                  shape="rounded"
                  size="large"
                />

              

            </div>

          </>

        )}

      </div>

    </Layout>
  );
}

export default Feed;