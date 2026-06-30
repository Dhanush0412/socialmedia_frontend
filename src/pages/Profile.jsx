import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProfile } from "../hooks/useProfile";
import { toast } from "react-toastify";
import PandaLogo from "../assets/panda 2.png";

// MUI Components
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Fade,
} from "@mui/material";

// MUI Icons
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

// CSS Module
import styles from "../css/Profile.module.css";

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setShowPopup(true);
    }
  };

  const handleUpload = () => {
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const saveProfile = () => {
    const userid = localStorage.getItem("userid");

    if (!userid) {
      toast.error("User ID not found");
      return;
    }

    const formData = new FormData();
    formData.append("userid", userid);
    formData.append("bio", bio);

    if (profileImage) {
      formData.append("profilepic", profileImage);
    }

    mutate(formData, {
      onSuccess: (data) => {
        console.log("Profile Response:", data);
        if (data.profileid) {
          localStorage.setItem("profileid", data.profileid);
        }
        toast.success("Profile Created Successfully");
        navigate("/dashboard");
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error?.response?.data?.message || "Profile creation failed"
        );
      },
    });
  };

  const { mutate, isPending } = useCreateProfile();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUsername(username);
    }
  }, []);

  return (
    <Box className={styles.root}>
      <Box className={styles.container}>
        {/* Left Panel */}
        <Box className={styles.leftPanel}>
          {/* Soft Corner Bubbles */}
          <Box className={styles.cornerBubble1} />
          <Box className={styles.cornerBubble2} />
          <Box className={styles.cornerBubble3} />
          <Box className={styles.cornerBubble4} />
          
          <Box className={styles.brandingContent}>
            <Box className={styles.logoWrapper}>
              <img src={PandaLogo} alt="Panda" className={styles.pandaLogo} />
            </Box>
            
            <Typography variant="h3" className={styles.welcomeTitle}>
              Welcome Back!
            </Typography>
            
            <Typography variant="body1" className={styles.welcomeSubtitle}>
              Complete your profile
            </Typography>
          </Box>
        </Box>

        {/* Right Panel */}
        <Box className={styles.rightPanel}>
          <Box className={styles.profileCard}>
            {/* Avatar */}
            <Box
              className={styles.avatarWrapper}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Avatar
                src={previewImage}
                className={styles.profileAvatar}
                sx={{ width: 120, height: 120, bgcolor: "#f68b1f" }}
              >
                {!previewImage && <PersonIcon sx={{ fontSize: 60 }} />}
              </Avatar>
              <IconButton
                component="label"
                className={`${styles.editButton} ${
                  isHovering ? styles.editButtonVisible : ""
                }`}
              >
                <EditIcon />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </IconButton>
            </Box>

            <Typography variant="h5" className={styles.username}>
              {username || "User"}
            </Typography>

            {/* Bio */}
            <Box className={styles.bioSection}>
              <TextField
                placeholder="Tell us about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                className={styles.bioTextField}
                inputProps={{ maxLength: 500 }}
              />
              <Box className={styles.bioCounter}>
                <Typography variant="caption">
                  {bio.length}/500
                </Typography>
              </Box>
            </Box>

            {/* Button */}
            <Button
              variant="contained"
              fullWidth
              size="large"
              className={styles.saveButton}
              onClick={saveProfile}
              disabled={isPending}
              endIcon={!isPending && <ArrowForwardIcon />}
            >
              {isPending ? (
                <Box className={styles.loadingWrapper}>
                  <LinearProgress className={styles.loadingProgress} />
                  Creating...
                </Box>
              ) : (
                "Create Profile"
              )}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Dialog */}
      <Dialog
        open={showPopup}
        onClose={handleCancel}
        maxWidth="xs"
        fullWidth
        TransitionComponent={Fade}
        transitionDuration={400}
        className={styles.previewDialog}
      >
        <DialogTitle className={styles.dialogTitle}>
          <Box className={styles.dialogTitleContent}>
            <Box className={styles.dialogIconWrapper}>
              <PersonIcon className={styles.dialogIcon} />
            </Box>
            <Box>
              <Typography variant="h6" className={styles.dialogTitleText}>
                Profile Picture
              </Typography>
              <Typography variant="body2" className={styles.dialogSubtitle}>
                Is this how you want to appear?
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <Avatar
            src={previewImage}
            className={styles.previewAvatar}
            sx={{ width: 180, height: 180, bgcolor: "#f68b1f" }}
          >
            {!previewImage && <PersonIcon sx={{ fontSize: 80 }} />}
          </Avatar>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button
            variant="contained"
            className={styles.uploadButton}
            onClick={handleUpload}
            startIcon={<CheckCircleIcon />}
          >
            Use Photo
          </Button>
          <Button
            variant="outlined"
            className={styles.cancelButton}
            onClick={handleCancel}
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Profile;