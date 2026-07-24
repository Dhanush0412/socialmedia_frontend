import { useEffect, useMemo, useRef } from "react";

import Layout from "../../components/Layout/Layout";
import { useFeed } from "../../hooks/useFeed";
import styles from "./Feed.module.css";
import PostCard from "../../components/PostCard/PostCard";
import pandaLoading from "../../assets/Panda1.png";

function Feed() {

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeed();

  const loadMoreRef = useRef(null);

  const posts = useMemo(() => {

    if (!data) return [];

    return data.pages.flatMap((page) => page.posts);

  }, [data]);

  useEffect(() => {

    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {

        const firstEntry = entries[0];

        if (
          firstEntry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }

      },
      {
        threshold: 1,
      }
    );

    const current = loadMoreRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {

      if (current) {
        observer.unobserve(current);
      }

      observer.disconnect();

    };

  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  ]);
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
    ...
  </div>

) : (

  <>
    <div className={styles.postsGrid}>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
        />
      ))}
    </div>

    <div
      ref={loadMoreRef}
      className={styles.loadMoreTrigger}
    />

    {isFetchingNextPage && (
      <div className={styles.loadingMore}>
        <img
          src={pandaLoading}
          alt="Loading more"
          className={styles.loadingMoreImage}
        />
        <p>Loading more posts...</p>
      </div>
    )}

    {!hasNextPage && posts.length > 0 && (
      <div className={styles.endMessage}>
        🎉 You've reached the end.
      </div>
    )}
  </>

)}
      </div>

    </Layout>
  );
}

export default Feed;