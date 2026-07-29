import { useMemo } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import PostCard from "../../components/PostCard/PostCard";

import { useFeed } from "../../hooks/useFeed";
import { useMyPosts } from "../../hooks/useMyPost";

import styles from "./PostDetails.module.css";

function PostDetails() {
  const { postId } = useParams();

  // Feed posts
  const {
    data: feedData,
    isLoading: feedLoading,
  } = useFeed();

  // My posts
  const {
    data: myPosts = [],
    isLoading: myPostsLoading,
  } = useMyPosts();

  // Merge both lists and remove duplicates
  const posts = useMemo(() => {
    const feedPosts = feedData
      ? feedData.pages.flatMap((page) => page.posts)
      : [];

    const allPosts = [...feedPosts, ...myPosts];

    return allPosts.filter(
      (post, index, self) =>
        index === self.findIndex((p) => p._id === post._id)
    );
  }, [feedData, myPosts]);

  // Find selected post
  const post = useMemo(() => {
    return posts.find((item) => item._id === postId);
  }, [posts, postId]);

  if (feedLoading || myPostsLoading) {
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