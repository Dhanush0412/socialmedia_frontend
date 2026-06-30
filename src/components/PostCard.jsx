import { useState } from "react";
import { FaHeart, FaRegHeart, FaComment, FaTrash } from "react-icons/fa";
import { useDashboard } from "../hooks/useDashboard";
import { useLikePost } from "../hooks/useLikePost";
import { useUnlikePost } from "../hooks/useUnlikePost";
import {
  useComments,
  useAddComment,
  useDeleteComment,
} from "../hooks/useComments";
import "../css/PostCard.css";

function PostCard({ post }) {
  const { data: dashboard } = useDashboard();
  const profileid = dashboard?.profileid;

  const { mutate: likePost } = useLikePost(profileid);
  const { mutate: unlikePost } = useUnlikePost(profileid);

  const { data: comments = [] } = useComments(post._id);
  const { mutate: addComment } = useAddComment();
  const { mutate: deleteComment } = useDeleteComment();

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [expanded, setExpanded] = useState(false);

  const isLiked = post.likes?.some(
    (like) => like.toString() === profileid
  );

  const isLong = post.caption?.length > 100;

  const displayedCaption =
    expanded || !isLong
      ? post.caption
      : post.caption?.slice(0, 100);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    addComment({
      postid: post._id,
      text: commentText,
    });

    setCommentText("");
  };

  return (
    <div className="post-card">

      {/* MEDIA */}
      {post.media?.includes("/video/upload/") ? (
        <video controls className="post-media">
          <source src={post.media} />
        </video>
      ) : (
        <img src={post.media} alt="post" className="post-media" />
      )}

      {/* CAPTION */}
      <div className="caption-container">
        <p>
          {displayedCaption}

          {isLong && (
            <span
              onClick={() => setExpanded((prev) => !prev)}
              style={{
                color: "#f68b1f",
                cursor: "pointer",
                marginLeft: "6px",
                fontWeight: "500",
              }}
            >
              {expanded ? " Read Less" : " ...Read More"}
            </span>
          )}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="post-actions">
        <button
          className="action-btn"
          onClick={() =>
            isLiked ? unlikePost(post._id) : likePost(post._id)
          }
        >
          {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
          <span>{post.likes?.length || 0}</span>
        </button>

        <button
          className="action-btn"
          onClick={() => setShowComments((prev) => !prev)}
        >
          <FaComment />
          <span>{comments.length}</span>
        </button>
      </div>

      {/* COMMENT SECTION */}
      {showComments && (
        <div className="comment-section">

          {/* INPUT */}
          <div className="comment-box">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <button onClick={handleAddComment}>Post</button>
          </div>

          {/* LIST */}
          <div className="comment-list">
            {comments?.map((c) => (
              <div key={c._id} className="comment-item">
                <span>{c.text}</span>

                <FaTrash
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    deleteComment({
                      commentid: c._id,
                      postid: post._id,
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default PostCard;