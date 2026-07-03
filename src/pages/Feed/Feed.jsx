import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  IconButton,
  Button,
  CircularProgress,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Comment as CommentIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { useFeed } from "../../hooks/useFeed";
import { useDashboard } from "../../hooks/useDashboard";
import { useLikePost } from "../../hooks/useLikePost";
import { useUnlikePost } from "../../hooks/useUnlikePost";
import {
  useComments,
  useAddComment,
  useDeleteComment,
} from "../../hooks/useComments";
import styles from "./Feed.module.css";

function Feed() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: dashboard } = useDashboard();
  const profileid = dashboard?.profileid;
  const { mutate: likePost, isPending: liking } = useLikePost(profileid);
  const { mutate: unlikePost, isPending: unliking } = useUnlikePost(profileid);
  const { data: posts, isLoading } = useFeed();
  const [expandedPost, setExpandedPost] = useState(null);

  const handleLikeToggle = (postId, isLiked) => {
    if (isLiked) {
      unlikePost(postId);
    } else {
      likePost(postId);
    }
  };

  const handleReadMore = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  if (isLoading) {
    return (
      <Layout>
        <Box className={styles.loadingContainer}>
          <CircularProgress sx={{ color: "#f68b1f" }} />
          <Typography variant="h6" sx={{ mt: 2, color: "#666" }}>
            Loading your feed...
          </Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box className={styles.feedContainer}>
        <Typography
          variant="h4"
          className={styles.feedTitle}
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #f68b1f, #ffa94d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 3,
          }}
        >
          Feed
        </Typography>

        {posts?.length === 0 ? (
          <Paper className={styles.emptyFeed}>
            <Typography variant="h5" sx={{ color: "#555", mb: 1 }}>
              No posts available
            </Typography>
            <Typography variant="body1" sx={{ color: "gray" }}>
              Your connections haven't shared anything yet.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3} className={styles.feedGrid}>
            {posts?.map((post) => {
              const isLiked = post.likes?.some(
                (like) => like.toString() === profileid
              );
              const isExpanded = expandedPost === post._id;
              const captionText = post.caption || "";
              const shouldTruncate = captionText.length > 120;
              const displayCaption = isExpanded
                ? captionText
                : captionText.slice(0, 120);

              return (
                <Grid item xs={12} sm={6} md={4} key={post._id}>
                  <Card className={styles.feedCard} elevation={0}>
                    {/* User Header */}
                    <Box className={styles.feedUser}>
                      <Avatar
                        className={styles.avatar}
                        sx={{
                          bgcolor: "#f68b1f",
                          width: 50,
                          height: 50,
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        {post.profile?.user?.username?.charAt(0).toUpperCase() || "U"}
                      </Avatar>
                      <Box className={styles.userDetails}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {post.profile?.user?.username || "Unknown User"}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "gray" }}>
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Media */}
                    {post.media && (
                      <Box className={styles.mediaWrapper}>
                        {post.media?.includes("/video/upload/") ? (
                          <video
                            controls
                            className={styles.feedMedia}
                            style={{ width: "100%", borderRadius: "12px" }}
                          >
                            <source src={post.media} />
                          </video>
                        ) : (
                          <CardMedia
                            component="img"
                            image={post.media}
                            alt="Post"
                            className={styles.feedMedia}
                            sx={{
                              height: 250,
                              objectFit: "cover",
                              borderRadius: "12px",
                            }}
                          />
                        )}
                      </Box>
                    )}

                    {/* Caption */}
                    <CardContent sx={{ flex: 1, pb: 1 }}>
                      <Typography variant="body2" sx={{ color: "#444", lineHeight: 1.6 }}>
                        {displayCaption}
                        {shouldTruncate && (
                          <Button
                            size="small"
                            onClick={() => handleReadMore(post._id)}
                            sx={{
                              color: "#f68b1f",
                              fontWeight: 600,
                              textTransform: "none",
                              minWidth: "auto",
                              p: 0,
                              ml: 0.5,
                              "&:hover": {
                                textDecoration: "underline",
                                bgcolor: "transparent",
                              },
                            }}
                          >
                            {isExpanded ? "Show Less" : "... Read More"}
                          </Button>
                        )}
                      </Typography>
                    </CardContent>

                    {/* Actions */}
                    <CardActions sx={{ pt: 0, pb: 1.5, gap: 2 }}>
                      <Button
                        size="small"
                        onClick={() => handleLikeToggle(post._id, isLiked)}
                        disabled={liking || unliking}
                        sx={{
                          minWidth: "auto",
                          color: isLiked ? "#e74c3c" : "#666",
                          "&:hover": {
                            bgcolor: "rgba(231, 76, 60, 0.08)",
                          },
                        }}
                      >
                        {isLiked ? (
                          <FavoriteIcon sx={{ color: "#e74c3c", mr: 0.5 }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ mr: 0.5 }} />
                        )}
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {post.likes?.length || 0}
                        </Typography>
                      </Button>

                      <Button
                        size="small"
                        sx={{
                          minWidth: "auto",
                          color: "#666",
                          "&:hover": {
                            bgcolor: "rgba(246, 139, 31, 0.08)",
                          },
                        }}
                      >
                        <CommentIcon sx={{ mr: 0.5 }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {post.comments?.length || 0}
                        </Typography>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Layout>
  );
}

export default Feed;