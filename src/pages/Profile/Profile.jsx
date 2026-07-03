import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateProfile } from "../../hooks/useProfile";
import PandaLogo from "../../assets/Panda1.png";

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
  Fade,
  LinearProgress,
} from "@mui/material";

import {
  CameraAlt,
  Person,
  ArrowForward,
  CheckCircle,
  Close,
  ShieldOutlined,
} from "@mui/icons-material";

import styles from "./Profile.module.css";

function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const { mutate, isPending } = useCreateProfile();

  useEffect(() => {
    // Get username from localStorage (set during login)
    const storedUsername = localStorage.getItem("username") || 
                          localStorage.getItem("userName") || 
                          localStorage.getItem("name");
    
    // Also try to get from user data if stored as object
    const userData = localStorage.getItem("userData");
    let userName = storedUsername;
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        userName = parsedUser.username || parsedUser.userName || parsedUser.name || userName;
      } catch (e) {
        // If parsing fails, use the stored username
      }
    }

    if (userName) {
      setUsername(userName);
    } else {
      // Fallback to a default or redirect to login
      setUsername("User");
    }
  }, []);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setShowPopup(true);
  };

  const handleUpload = () => {
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const saveProfile = () => {
    const userid = localStorage.getItem("userid") || localStorage.getItem("userId");

    if (!userid) {
      toast.error("User ID not found. Please login again.");
      navigate("/login");
      return;
    }

    const formData = new FormData();

    formData.append("userid", userid);
    formData.append("bio", bio);
    formData.append("username", username);

    if (profileImage) {
      formData.append("profilepic", profileImage);
    }

    mutate(formData, {
      onSuccess: (data) => {
        if (data.profileid) {
          localStorage.setItem("profileid", data.profileid);
        }

        toast.success("Profile Created Successfully");
        navigate("/dashboard");
      },

      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Profile creation failed"
        );
      },
    });
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.container}>
        {/* =========================== LEFT PANEL ============================ */}
        <Box className={styles.leftPanel}>
          {/* Decorative Circles */}
          <Box className={styles.circleOne}></Box>
          <Box className={styles.circleTwo}></Box>
          <Box className={styles.circleThree}></Box>

          {/* Wave Icon */}
          <Box className={styles.waveBox}>👋</Box>

          {/* Welcome Text */}
          <Typography className={styles.welcomeTitle}>
            Welcome Back!
          </Typography>

          <Typography className={styles.welcomeSubTitle}>
            Let's complete your profile
            <br />
            and personalize your experience.
          </Typography>

          {/* Panda Section */}
          <Box className={styles.pandaSection}>
            <Box className={styles.orangeGlow}></Box>
            <img src={PandaLogo} alt="Panda" className={styles.pandaImage} />
          </Box>

          {/* Feature Card */}
          <Box className={styles.featureCard}>
            <Box className={styles.featureItem}>
              <Box className={`${styles.iconCircle} ${styles.orange}`}>👤</Box>
              <Box>
                <Typography className={styles.featureTitle}>Connect</Typography>
                <Typography className={styles.featureText}>
                  Find and connect with friends
                </Typography>
              </Box>
            </Box>

            <Box className={styles.featureItem}>
              <Box className={`${styles.iconCircle} ${styles.pink}`}>💬</Box>
              <Box>
                <Typography className={styles.featureTitle}>Chat</Typography>
                <Typography className={styles.featureText}>
                  Share moments and messages
                </Typography>
              </Box>
            </Box>

            <Box className={styles.featureItem}>
              <Box className={`${styles.iconCircle} ${styles.yellow}`}>🔔</Box>
              <Box>
                <Typography className={styles.featureTitle}>
                  Stay Updated
                </Typography>
                <Typography className={styles.featureText}>
                  Get notified about activities
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* =========================== RIGHT PANEL ============================ */}
        <Box className={styles.rightPanel}>
          <Box className={styles.profileCard}>
            {/* HEADER */}
            <Box className={styles.header}>
              <Typography className={styles.heading}>
                Complete Your Profile
              </Typography>
              <Box className={styles.dotGrid}>
                {Array.from({ length: 12 }).map((_, index) => (
                  <span key={index}></span>
                ))}
              </Box>
            </Box>

            <Box className={styles.headingLine}></Box>

            {/* PROFILE IMAGE */}
            <Box className={styles.avatarWrapper}>
              <Avatar src={previewImage} className={styles.avatar}>
                {!previewImage && <Person sx={{ fontSize: 75 }} />}
              </Avatar>
              <IconButton component="label" className={styles.cameraButton}>
                <CameraAlt />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </IconButton>
            </Box>

            {/* USERNAME - From Login */}
            <Box className={styles.usernameContainer}>
              <Typography className={styles.username}>
                {username || "User"}
              </Typography>
            </Box>

            {/* BIO SECTION */}
            <Box className={styles.bioSection}>
              <Typography className={styles.inputLabel}>Bio</Typography>
              <TextField
                multiline
                rows={5}
                fullWidth
                placeholder="Tell us about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                inputProps={{
                  maxLength: 500,
                }}
                className={styles.bioInput}
              />
              <Typography className={styles.bioCounter}>
                {bio.length}/500
              </Typography>
            </Box>

            {/* CREATE PROFILE BUTTON */}
            <Button
              fullWidth
              variant="contained"
              onClick={saveProfile}
              disabled={isPending}
              className={styles.createButton}
              endIcon={!isPending && <ArrowForward />}
            >
              {isPending ? (
                <Box className={styles.loadingWrapper}>
                  <LinearProgress className={styles.loadingBar} />
                  Creating...
                </Box>
              ) : (
                "Create Profile"
              )}
            </Button>

            {/* FOOTER NOTE */}
            <Box className={styles.footerInfo}>
              <ShieldOutlined className={styles.footerIcon} />
              <Typography className={styles.footerText}>
                You can always update your profile later
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* =========================== IMAGE PREVIEW DIALOG =========================== */}
      <Dialog
        open={showPopup}
        onClose={handleCancel}
        maxWidth="xs"
        fullWidth
        TransitionComponent={Fade}
        transitionDuration={350}
        className={styles.previewDialog}
      >
        <DialogTitle className={styles.dialogTitle}>
          Profile Picture
        </DialogTitle>

        <DialogContent className={styles.dialogContent}>
          <Avatar src={previewImage} className={styles.previewAvatar}>
            {!previewImage && <Person sx={{ fontSize: 90 }} />}
          </Avatar>
          <Typography className={styles.dialogText}>
            Is this the profile picture you want to use?
          </Typography>
        </DialogContent>

        <DialogActions className={styles.dialogActions}>
          <Button
            variant="contained"
            startIcon={<CheckCircle />}
            className={styles.usePhotoButton}
            onClick={handleUpload}
          >
            Use Photo
          </Button>
          <Button
            variant="outlined"
            startIcon={<Close />}
            className={styles.cancelPhotoButton}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Profile;