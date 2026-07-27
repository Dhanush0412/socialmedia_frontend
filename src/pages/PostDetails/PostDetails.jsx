import { useMemo } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import PostCard from "../../components/PostCard/PostCard";
import { useFeed } from "../../hooks/useFeed";

import styles from "./PostDetails.module.css";

function PostDetails() {
  const { username,postId } = useParams();

  const { data, isLoading } = useFeed();

  const posts = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.posts);
  }, [data]);

  const post = posts.find((item) => item._id === postId);

  if (isLoading) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className={styles.notFound}>
          <h2>Post Not Found</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <PostCard
  post={post}
  isDetails={true}
/>
      </div>
    </Layout>
  );
}

export default PostDetails;