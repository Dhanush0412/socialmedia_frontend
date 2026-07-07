import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  TextField,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Avatar,
  Divider,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutlineOutlined,
  DeleteOutlined,
  Send,
  Close,
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

// Transition for dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PostCard({ post }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: dashboard } = useDashboard();
  const profileid = dashboard?.profileid;

  const { mutate: likePost } = useLikePost(profileid);
  const { mutate: unlikePost } = useUnlikePost(profileid);

  const { data: comments = [], refetch: refetchComments } = useComments(post._id);
  const { mutate: addComment } = useAddComment();
  const { mutate: deleteComment } = useDeleteComment();

  const [commentText, setCommentText] = useState("");
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(
    post.likes?.some((like) => like.toString() === profileid)
  );
  const [openModal, setOpenModal] = useState(false);
  const [modalCommentText, setModalCommentText] = useState("");

  // Update like state when post changes
  useEffect(() => {
    setIsLiked(post.likes?.some((like) => like.toString() === profileid));
    setLikeCount(post.likes?.length || 0);
  }, [post.likes, profileid]);

  // Check if caption is longer than 50 characters
  const isLong = post.caption?.length > 50;

  // Display caption (first 50 chars)
  const displayedCaption = isLong
    ? post.caption?.slice(0, 50)
    : post.caption;

  const handleLikeToggle = () => {
    if (isLiked) {
      unlikePost(post._id);
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      likePost(post._id);
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const handleDeleteComment = (commentId) => {
    deleteComment({
      commentid: commentId,
      postid: post._id,
    });
    setTimeout(() => refetchComments(), 500);
  };

  const handleModalAddComment = () => {
    if (!modalCommentText.trim()) return;

    addComment({
      postid: post._id,
      text: modalCommentText,
    });

    setModalCommentText("");
    setTimeout(() => refetchComments(), 500);
  };

  const handleOpenModal = (e) => {
    if (e) e.stopPropagation();
    setOpenModal(true);
    refetchComments();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalCommentText("");
  };

  // Format date
  const formatDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const postDay = new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());
    
    const diffTime = today - postDay;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const hours = postDate.getHours().toString().padStart(2, '0');
      const minutes = postDate.getMinutes().toString().padStart(2, '0');
      return `Today at ${hours}:${minutes}`;
    }
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return postDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <Card className={styles.postCard} elevation={0}>
        {/* MEDIA - Clickable to open modal */}
        <Box className={styles.mediaWrapper} onClick={handleOpenModal}>
          {post.media?.includes("/video/upload/") ? (
            <Box className={styles.mediaContainer}>
              <video controls className={styles.media} onClick={(e) => e.stopPropagation()}>
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
        </Box>

        {/* CAPTION SECTION */}
        <CardContent className={styles.captionContainer}>
          <Box className={styles.captionWrapper}>
            <Typography className={styles.captionText}>
              {displayedCaption}
              {isLong && (
                <span 
                  className={styles.readMoreInline}
                  onClick={handleOpenModal}
                >
                  ... <span className={styles.readMoreLink}>Read More</span>
                </span>
              )}
            </Typography>
          </Box>
          
          {/* Post Time */}
          <Typography className={styles.postTime}>
            {formatDate(post.createdAt)}
          </Typography>
        </CardContent>

        {/* ACTIONS - Only Like and Comment */}
        <CardActions className={styles.actions}>
          <Box className={styles.actionGroup}>
            <IconButton
              className={styles.actionButton}
              onClick={handleLikeToggle}
              size="small"
            >
              {isLiked ? (
                <Favorite className={styles.likedIcon} />
              ) : (
                <FavoriteBorder className={styles.actionIcon} />
              )}
              <Typography className={styles.actionCount}>
                {likeCount}
              </Typography>
            </IconButton>

            <IconButton
              className={styles.actionButton}
              onClick={handleOpenModal}
              size="small"
            >
              <ChatBubbleOutlineOutlined className={styles.actionIcon} />
              <Typography className={styles.actionCount}>
                {comments.length}
              </Typography>
            </IconButton>
          </Box>
        </CardActions>
      </Card>

      {/* FULL POST DETAILS MODAL */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: styles.modalPaper,
        }}
      >
        <DialogTitle className={styles.modalTitle}>
          <Box className={styles.modalHeader}>
            <Box className={styles.modalUserInfo}>
              <Avatar 
                className={styles.modalAvatar}
                src={post.profile?.avatar}
              >
                {post.profile?.user?.username?.charAt(0).toUpperCase() || "U"}
              </Avatar>
              <Box>
                <Typography className={styles.modalUserName}>
                  {post.profile?.user?.username || "User"}
                </Typography>
                <Typography className={styles.modalPostTime}>
                  {formatDate(post.createdAt)}
                </Typography>
              </Box>
            </Box>
            <IconButton 
              className={styles.modalCloseButton}
              onClick={handleCloseModal}
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent className={styles.modalContent}>
          {/* Full Caption */}
          <Box className={styles.modalCaptionSection}>
            <Typography className={styles.modalCaptionText}>
              {post.caption || "No caption"}
            </Typography>
          </Box>

          {/* Media in Modal */}
          {post.media && (
            <Box className={styles.modalMediaContainer}>
              {post.media?.includes("/video/upload/") ? (
                <video controls className={styles.modalMedia}>
                  <source src={post.media} />
                </video>
              ) : (
                <img 
                  src={post.media} 
                  alt="Post" 
                  className={styles.modalMedia} 
                />
              )}
            </Box>
          )}

          <Divider className={styles.modalDivider} />

          {/* Like Section */}
          <Box className={styles.modalLikeSection}>
            <IconButton
              className={styles.modalLikeButton}
              onClick={handleLikeToggle}
            >
              {isLiked ? (
                <Favorite className={styles.modalLikedIcon} />
              ) : (
                <FavoriteBorder className={styles.modalActionIcon} />
              )}
              <Typography className={styles.modalLikeCount}>
                {likeCount} likes
              </Typography>
            </IconButton>
          </Box>

          {/* All Comments with Profile Username */}
          <Box className={styles.modalCommentsSection}>
            <Typography className={styles.modalCommentsTitle}>
              Comments ({comments.length})
            </Typography>
            
            <Box className={styles.modalCommentsList}>
              {comments?.map((c) => (
                <Box key={c._id} className={styles.modalCommentItem}>
                  <Box className={styles.modalCommentContent}>
                    <Avatar 
                      className={styles.modalCommentAvatar}
                      src={c.user?.avatar}
                    >
                      {c.user?.username?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                    <Box className={styles.modalCommentTextWrapper}>
                      <Typography className={styles.modalCommentUserName}>
                        {c.user?.username || "User"}
                      </Typography>
                      <Typography className={styles.modalCommentText}>
                        {c.text}
                      </Typography>
                    </Box>
                  </Box>
                  <DeleteOutlined
                    className={styles.modalDeleteIcon}
                    onClick={() => handleDeleteComment(c._id)}
                  />
                </Box>
              ))}
              {comments?.length === 0 && (
                <Typography className={styles.modalNoComments}>
                  No comments yet. Be the first to comment!
                </Typography>
              )}
            </Box>
          </Box>

          {/* Add Comment in Modal */}
          <Box className={styles.modalCommentInputSection}>
            <Box className={styles.modalCommentBox}>
              <TextField
                fullWidth
                type="text"
                placeholder="Write a comment..."
                value={modalCommentText}
                onChange={(e) => setModalCommentText(e.target.value)}
                variant="outlined"
                size="small"
                className={styles.modalCommentInput}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleModalAddComment();
                }}
              />
              <button 
                className={styles.modalCommentButton}
                onClick={handleModalAddComment}
              >
                <Send style={{ fontSize: '20px' }} />
              </button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PostCard;