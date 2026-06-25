import Layout from "../components/Layout";
import { useMyPosts } from "../hooks/useMyPost";
import "../css/MyPosts.css";
import { useState } from "react";

function MyPosts() {
  const profileid = localStorage.getItem("profileid");
  const [expandedPost, setExpandedPost] = useState(null);
  const { data: posts, isLoading } = useMyPosts();

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
                {post.media.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    controls
                    className="post-media"
                  >
                    <source
                      src={`http://localhost:5000/${post.media.replace(/\\/g, "/")}`}
                      type="video/mp4"
                    />
                    Your browser does not support video.
                  </video>
                ) : (
                  <img
                    src={`http://localhost:5000/${post.media.replace(/\\/g, "/")}`}
                    alt="post"
                  />
                )}

                <div className="caption-container">
                  <p>
                    {expandedPost === post._id
                      ? post.caption
                      : post.caption?.slice(0, 100)}

                    {post.caption?.length > 100 && (
                      <span
                        className="read-more"
                        onClick={() =>
                          setExpandedPost(
                            expandedPost === post._id ? null : post._id
                          )
                        }
                      >
                        {expandedPost === post._id
                          ? " Show Less"
                          : "... Read More"}
                      </span>
                    )}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyPosts;