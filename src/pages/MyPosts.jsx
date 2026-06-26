import Layout from "../components/Layout";
import { useMyPosts } from "../hooks/useMyPost";
import "../css/MyPosts.css";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { useLikePost } from "../hooks/useLikePost";
import { useUnlikePost } from "../hooks/useUnlikePost";
import { useDashboard } from "../hooks/useDashboard";

function MyPosts() {
  const { data: dashboard } = useDashboard();
  const profileid = dashboard?.profileid;

  const { mutate: likePost } = useLikePost(profileid);
  const { mutate: unlikePost } = useUnlikePost(profileid);

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
            {posts?.map((post) => {
              const isLiked = post.likes?.some(
                (like) => like.toString() === profileid
              );

              console.log("CURRENT PROFILE:", profileid);
              console.log("POST LIKES:", post.likes);

              return (
                <div className="post-card" key={post._id}>

                  {/* MEDIA */}
                  {post.media?.includes("/video/upload/") ? (
                    <video controls className="post-media">
                      <source src={post.media} />
                    </video>
                  ) : (
                    <img
                      src={post.media}
                      alt="post"
                      className="post-media"
                    />
                  )}

                  {/* CAPTION */}
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
                              expandedPost === post._id
                                ? null
                                : post._id
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

                  {/* ACTIONS */}
                  <div className="post-actions">

                    <button
                      className="action-btn"
                      onClick={() => {
                        if (isLiked) {
                          unlikePost(post._id);
                        } else {
                          likePost(post._id);
                        }
                      }}
                    >
                      {isLiked ? (
                        <FaHeart color="red" />
                      ) : (
                        <FaRegHeart />
                      )}

                      <span>{post.likes?.length || 0}</span>
                    </button>

                    <button className="action-btn">
                      <FaComment />
                      <span>{post.comments?.length || 0}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyPosts;