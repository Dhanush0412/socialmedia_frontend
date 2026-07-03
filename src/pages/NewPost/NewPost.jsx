import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import styles from "./NewPost.module.css";
import { toast } from "react-toastify";
import { useCreatePost } from "../../hooks/useCreatePost";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  IconButton,
  Avatar,
  LinearProgress,
  Fade,
  Zoom,
  Alert,
} from "@mui/material";
import {
  CloudUpload,
  Image as ImageIcon,
  Videocam,
  Clear,
  Send,
  AddPhotoAlternate,
  EmojiEmotions,
} from "@mui/icons-material";

function NewPost() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [fileType, setFileType] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const { mutateAsync: createPost, isPending } = useCreatePost();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      processFile(selected);
    }
  };

  const processFile = (selected) => {
    const type = selected.type.startsWith("image") ? "image" : "video";
    setFileType(type);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const removeFile = () => {
    setFile(null);
    setPreview("");
    setFileType("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handlePost = async () => {
    try {
      if (!file) {
        toast.error("Please upload a photo or video");
        return;
      }

      if (!caption.trim()) {
        toast.error("Please enter a caption");
        return;
      }

      const profileid = localStorage.getItem("profileid");
      const formData = new FormData();
      formData.append("profileid", profileid);
      formData.append("caption", caption);
      formData.append("media", file);

      await createPost(formData);
      toast.success("Post created successfully!");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to create post"
      );
    }
  };

  return (
    <Layout>
      <Box className={styles.container}>
        <Paper elevation={0} className={styles.card}>
          {/* Header */}
          <Box className={styles.header}>
            <Box className={styles.headerLeft}>
              <Avatar className={styles.headerAvatar}>
                <ImageIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" className={styles.headerTitle}>
                  Create New Post
                </Typography>
                <Typography variant="caption" className={styles.headerSubtitle}>
                  Share your moment
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Upload Area or Preview */}
          {!preview ? (
            <Box
              className={`${styles.uploadArea} ${dragOver ? styles.dragOver : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                hidden
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className={styles.uploadLabel}>
                <Box className={styles.uploadContent}>
                  <Box className={styles.iconWrapper}>
                    <CloudUpload className={styles.uploadIcon} />
                  </Box>
                  <Typography variant="body1" className={styles.uploadTitle}>
                    Drop your files here
                  </Typography>
                  <Typography variant="caption" className={styles.uploadSubtitle}>
                    or click to browse
                  </Typography>
                  <Box className={styles.uploadBadges}>
                    <Box className={styles.badgeChip}>
                      <ImageIcon sx={{ fontSize: 14 }} />
                      <span>JPEG, PNG, GIF</span>
                    </Box>
                    <Box className={styles.badgeChip}>
                      <Videocam sx={{ fontSize: 14 }} />
                      <span>MP4, MOV</span>
                    </Box>
                  </Box>
                </Box>
              </label>
            </Box>
          ) : (
            <Zoom in={true}>
              <Box className={styles.previewContainer}>
                <Box className={styles.previewHeader}>
                  <Typography variant="caption" className={styles.previewLabel}>
                    {fileType === "image" ? "📸 Photo" : "🎬 Video"}
                  </Typography>
                  <IconButton 
                    size="small" 
                    className={styles.removeButton}
                    onClick={removeFile}
                  >
                    <Clear sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
                <Box className={styles.previewWrapper}>
                  {fileType === "image" ? (
                    <img src={preview} alt="Preview" className={styles.previewMedia} />
                  ) : (
                    <video controls className={styles.previewMedia}>
                      <source src={preview} />
                    </video>
                  )}
                </Box>
                <Box className={styles.previewActions}>
                  <label htmlFor="file-upload" className={styles.changeFileLabel}>
                    <AddPhotoAlternate sx={{ fontSize: 14 }} />
                    Change File
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    hidden
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                </Box>
              </Box>
            </Zoom>
          )}

          {/* Caption Input */}
          <Box className={styles.captionSection}>
            <Box className={styles.captionHeader}>
              <Typography variant="caption" className={styles.captionLabel}>
                Caption
              </Typography>
              <Typography variant="caption" className={styles.characterCount}>
                {caption.length}/500
              </Typography>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Write something about your post..."
              value={caption}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setCaption(e.target.value);
                }
              }}
              variant="outlined"
              className={styles.captionInput}
              InputProps={{
                className: styles.captionTextArea,
                endAdornment: (
                  <Box className={styles.captionActions}>
                    <IconButton size="small" className={styles.emojiButton}>
                      <EmojiEmotions sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                ),
              }}
            />
          </Box>

          {/* Progress Bar */}
          {isPending && (
            <Fade in={isPending}>
              <Box className={styles.progressSection}>
                <LinearProgress className={styles.progressBar} />
                <Typography variant="caption" className={styles.progressText}>
                  Uploading...
                </Typography>
              </Box>
            </Fade>
          )}

          {/* Action Buttons - Only Publish */}
          <Box className={styles.actionButtons}>
            <Button
              variant="contained"
              fullWidth
              className={styles.postButton}
              onClick={handlePost}
              disabled={isPending || !file || !caption.trim()}
              startIcon={!isPending && <Send sx={{ fontSize: 16 }} />}
            >
              {isPending ? "Posting..." : "Publish Post"}
            </Button>
          </Box>

          {/* Tips */}
          <Box className={styles.tipsSection}>
            <Alert severity="info" className={styles.tipsAlert}>
              <Typography variant="caption" className={styles.tipsText}>
                💡 Add hashtags to reach more people
              </Typography>
            </Alert>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
}

export default NewPost;