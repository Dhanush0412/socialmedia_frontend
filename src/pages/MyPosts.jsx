import Layout from "../components/Layout/Layout";
import { useMyPosts } from "../hooks/useMyPost";
import "../css/MyPosts.css";
import PostCard from "../components/PostCard";

function MyPosts() {
  const { data: posts, isLoading } = useMyPosts();

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <Layout>
      <div className="myposts-container">
        <h1>My Posts</h1>

        {posts?.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <div className="posts-grid">
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