import Layout from "../components/Layout";
import "../css/Feed.css";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { useFeed } from "../hooks/useFeed";
import { useDashboard } from "../hooks/useDashboard";
import { useLikePost } from "../hooks/useLikePost";
import { useUnlikePost } from "../hooks/useUnlikePost";
import {
  useComments,
  useAddComment,
  useDeleteComment,
} from "../hooks/useComments";

function Feed() {
  const { data: dashboard } = useDashboard();
  const profileid = dashboard?.profileid;
  const { mutate: likePost, isPending: liking } = useLikePost(profileid);
  const { mutate: unlikePost, isPending: unliking } = useUnlikePost(profileid);
  const { data: posts, isLoading } = useFeed();
  const [expandedPost, setExpandedPost] = useState(null);

  if (isLoading) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="feed-container">

        <h1>Feed</h1>

        {posts?.length === 0 ? (
          <div className="no-feed">
            <h3>No posts available</h3>
            <p>Your connections haven't shared anything yet.</p>
          </div>
        ) : (
          <div className="feed-grid">

            {posts?.map((post) => {

// const isLiked = post.likes?.includes(profileid);

              const isLiked = post.likes?.some(
                (like) => like.toString() === profileid
              );

              return (
                <div className="feed-card" key={post._id}>

                  {/* User */}
                  <div className="feed-user">
                    <div className="avatar">
                      {post.profile?.user?.username?.charAt(0).toUpperCase()}
                    </div>

                    <div className="user-details">
                      <h4>{post.profile?.user?.username}</h4>
                      <p>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Media */}

                  {post.media?.includes("/video/upload/") ? (
                    <video controls className="feed-media">
                      <source src={post.media} />
                    </video>
                  ) : (
                    <img
                      src={post.media}
                      alt="post"
                      className="feed-media"
                    />
                  )}

                  {/* Caption */}

                  <div className="feed-caption">

                    <p>

                      {expandedPost === post._id
                        ? post.caption
                        : post.caption?.slice(0, 120)}

                      {post.caption?.length > 120 && (
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

                  {/* Buttons */}

                  <div className="feed-actions">

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

export default Feed;