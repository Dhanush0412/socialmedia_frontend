import Layout from "../components/Layout";
import { useMyPosts } from "../hooks/useMyPost";
import "../css/MyPosts.css";

function MyPosts() {
  const profileid = localStorage.getItem("profileid");

  const {
    data: posts,
    isLoading,
  } = useMyPosts(profileid);

  console.log("Posts Response:", posts);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Layout>
      <div className="myposts-container">
        <h1>My Posts</h1>

        {posts?.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <div className="posts-grid">
            {posts?.map((post) => (
              <div
                className="post-card"
                key={post._id}
              >
                <img
                  src={`http://localhost:5000/${post.media.replace(/\\/g, "/")}`}
                  alt="post"
                />

                <p>{post.caption}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyPosts;