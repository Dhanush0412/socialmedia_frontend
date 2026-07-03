import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  TextField,
  Box,
  Collapse,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutlineOutlined,
  DeleteOutlined,
  Send,
} from "@mui/icons-material";
import { useDashboard } from "../../hooks/useDashboard";
import { useLikePost } from "../../hooks/useLikePost";
import { useUnlikePost } from "../../hooks/useUnlikePost";
import {
  useComments,
  useAddComment,
  useDeleteComment,
} from "../../hooks/useComments";
import styles from "./PostCard.module.css";

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

  // CORRECT DATE FORMATTING
  const formatDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    
    // Reset time part for accurate day comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const postDay = new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());
    
    const diffTime = today - postDay;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Check if it's today
    if (diffDays === 0) {
      // Show time for today's posts
      const hours = postDate.getHours().toString().padStart(2, '0');
      const minutes = postDate.getMinutes().toString().padStart(2, '0');
      return `Today at ${hours}:${minutes}`;
    }
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    // For older posts, show date
    return postDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className={styles.postCard} elevation={0}>
      {/* MEDIA */}
      {post.media?.includes("/video/upload/") ? (
        <Box className={styles.mediaContainer}>
          <video controls className={styles.media}>
            <source src={post.media} />
          </video>
        </Box>
      ) : (
        <Box className={styles.mediaContainer}>
          <CardMedia
            component="img"
            image={post.media}
            alt="post"
            className={styles.media}
          />
        </Box>
      )}

      {/* CAPTION WITH TIME */}
      <CardContent className={styles.captionContainer}>
        <Typography className={styles.captionText}>
          {displayedCaption}
          {isLong && (
            <span
              onClick={() => setExpanded((prev) => !prev)}
              className={styles.readMore}
            >
              {expanded ? " Read Less" : " ...Read More"}
            </span>
          )}
        </Typography>
        <Typography className={styles.postTime}>
          {formatDate(post.createdAt)}
        </Typography>
      </CardContent>

      {/* ACTIONS - Only Like and Comment */}
      <CardActions className={styles.actions}>
        <Box className={styles.actionGroup}>
          <IconButton
            className={styles.actionButton}
            onClick={() =>
              isLiked ? unlikePost(post._id) : likePost(post._id)
            }
            size="small"
          >
            {isLiked ? (
              <Favorite className={styles.likedIcon} />
            ) : (
              <FavoriteBorder className={styles.actionIcon} />
            )}
            <Typography className={styles.actionCount}>
              {post.likes?.length || 0}
            </Typography>
          </IconButton>

          <IconButton
            className={styles.actionButton}
            onClick={() => setShowComments((prev) => !prev)}
            size="small"
          >
            <ChatBubbleOutlineOutlined className={styles.actionIcon} />
            <Typography className={styles.actionCount}>
              {comments.length}
            </Typography>
          </IconButton>
        </Box>
      </CardActions>

      {/* COMMENT SECTION */}
      <Collapse in={showComments}>
        <Box className={styles.commentSection}>
          <Box className={styles.commentBox}>
            <TextField
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              variant="outlined"
              size="small"
              className={styles.commentInput}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleAddComment();
              }}
            />
            <button 
              className={styles.commentButton}
              onClick={handleAddComment}
            >
              <Send style={{ fontSize: '16px' }} />
            </button>
          </Box>

          <Box className={styles.commentList}>
            {comments?.map((c) => (
              <Box key={c._id} className={styles.commentItem}>
                <span>{c.text}</span>
                <DeleteOutlined
                  className={styles.deleteIcon}
                  onClick={() =>
                    deleteComment({
                      commentid: c._id,
                      postid: post._id,
                    })
                  }
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
}

export default PostCard;