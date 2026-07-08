import React, { useState, useEffect } from "react";
import styles from "./Account.module.css";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  InputAdornment,
  Alert,
  Chip,
  Divider,
  Paper,
  Fade,
  Snackbar,
} from "@mui/material";
import {
  Edit,
  Person,
  Phone,
  Save,
  Cancel,
  Lock,
  Visibility,
  VisibilityOff,
  VpnKey,
  Badge,
  CalendarToday,
  AccessTime,
  CheckCircle,
  Shield,
  CameraAlt,
  Close,
  AssignmentInd,
  Description,
} from "@mui/icons-material";
import {
  useProfile,
  useEditProfile,
  useChangePassword,
  useUpdateProfilePicture,
} from "../../../hooks/useSettings";
import { toast } from "react-toastify";

// Custom styled button component
const CancelButton = ({ children, ...props }) => (
  <Button
    {...props}
    variant="outlined"
    sx={{
      color: '#ff9417',
      borderColor: '#ff9417',
      '&:hover': {
        backgroundColor: 'rgba(255, 148, 23, 0.08)',
        borderColor: '#e68300',
        color: '#e68300',
        transform: 'scale(1.02)',
      },
      '&:active': {
        backgroundColor: 'rgba(255, 148, 23, 0.15)',
        transform: 'scale(0.98)',
      },
      '&:focus': {
        outline: `2px solid rgba(255, 148, 23, 0.3)`,
        outlineOffset: '2px',
      },
      transition: 'all 0.2s ease',
    }}
  >
    {children}
  </Button>
);

// Custom Save button component
const SaveButton = ({ children, ...props }) => (
  <Button
    {...props}
    variant="contained"
    sx={{
      backgroundColor: '#ff9417',
      '&:hover': {
        backgroundColor: '#e68300',
        transform: 'scale(1.02)',
      },
      '&:active': {
        transform: 'scale(0.98)',
      },
      transition: 'all 0.2s ease',
    }}
  >
    {children}
  </Button>
);

function Account({ showSnackbar }) {
  const [editProfile, setEditProfile] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Profile data state
  const [profileData, setProfileData] = useState({
    username: "",
    bio: "",
    profileid: "",
    avatar: "",
    profilepic: "",
    createdAt: "",
    lastLogin: "",
    isVerified: false,
    status: "active",
  });

  // Password data state
  const [passwordData, setPasswordData] = useState({
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  // Password errors
  const [passwordErrors, setPasswordErrors] = useState({
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  // Fetch profile data
  const { data: profileDataFromApi, isLoading: profileLoading, refetch } = useProfile();
  const editProfileMutation = useEditProfile();
  const changePasswordMutation = useChangePassword();
  const updateProfilePictureMutation = useUpdateProfilePicture();

  // Update local state when API data is loaded
  useEffect(() => {
    if (profileDataFromApi) {
      // Get username from localStorage as fallback
      const storedUsername = localStorage.getItem("username") ||
        localStorage.getItem("userName") ||
        localStorage.getItem("name");

      // Get bio from profile data or localStorage
      const storedBio = localStorage.getItem("bio") || "";

      setProfileData({
        username: profileDataFromApi.username || profileDataFromApi.name || storedUsername || "",
        bio: profileDataFromApi.bio || storedBio || "",
        profileid: profileDataFromApi.profileid || localStorage.getItem("profileid") || "",
        avatar: profileDataFromApi.avatar || profileDataFromApi.profilepic || "",
        profilepic: profileDataFromApi.profilepic || profileDataFromApi.avatar || "",
        createdAt: profileDataFromApi.createdAt || profileDataFromApi.created_at || "",
        lastLogin: profileDataFromApi.lastLogin || profileDataFromApi.last_login || "",
        isVerified: profileDataFromApi.isVerified || false,
        status: profileDataFromApi.status || "active",
      });
    } else {
      // If no API data, try to get from localStorage
      const storedUsername = localStorage.getItem("username") ||
        localStorage.getItem("userName") ||
        localStorage.getItem("name");
      const storedProfileId = localStorage.getItem("profileid");
      const storedBio = localStorage.getItem("bio") || "";

      if (storedUsername) {
        setProfileData(prev => ({
          ...prev,
          username: storedUsername,
          profileid: storedProfileId || prev.profileid,
          bio: storedBio || prev.bio,
        }));
      }
    }
  }, [profileDataFromApi]);

  // Handle profile input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    // Clear specific field error when user starts typing
    setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    
    // If confirm password field is being typed in, check if it matches
    if (name === "confirmpassword" && value !== passwordData.newpassword) {
      setPasswordErrors((prev) => ({ 
        ...prev, 
        confirmpassword: "Passwords do not match" 
      }));
    } else if (name === "confirmpassword" && value === passwordData.newpassword) {
      setPasswordErrors((prev) => ({ ...prev, confirmpassword: "" }));
    }
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setOpenImageDialog(true);
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!selectedImage) return;

    try {
      const formData = new FormData();
      formData.append("profilepic", selectedImage);

      await updateProfilePictureMutation.mutateAsync(formData);

      setOpenImageDialog(false);
      setSelectedImage(null);
      setPreviewImage(null);
      toast.success("Profile picture updated successfully!");
      refetch();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update profile picture";
      toast.error(errorMessage);
    }
  };

  // Cancel image upload
  const handleCancelImage = () => {
    setOpenImageDialog(false);
    setSelectedImage(null);
    setPreviewImage(null);
    // Revoke object URL to prevent memory leaks
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
  };

  // Validate password
  const validatePassword = () => {
    let isValid = true;
    const errors = { currentpassword: "", newpassword: "", confirmpassword: "" };

    // Current password validation
    if (!passwordData.currentpassword || passwordData.currentpassword.trim() === "") {
      errors.currentpassword = "Current password is required";
      isValid = false;
    }

    // New password validation
    if (!passwordData.newpassword || passwordData.newpassword.trim() === "") {
      errors.newpassword = "New password is required";
      isValid = false;
    } else if (passwordData.newpassword.length < 6) {
      errors.newpassword = "Password must be at least 6 characters";
      isValid = false;
    } else if (passwordData.newpassword === passwordData.currentpassword) {
      errors.newpassword = "New password must be different from current password";
      isValid = false;
    }

    // Confirm password validation
    if (!passwordData.confirmpassword || passwordData.confirmpassword.trim() === "") {
      errors.confirmpassword = "Please confirm your password";
      isValid = false;
    } else if (passwordData.newpassword !== passwordData.confirmpassword) {
      errors.confirmpassword = "Passwords do not match";
      isValid = false;
    }

    setPasswordErrors(errors);
    return isValid;
  };

  // Save profile
  const handleSaveProfile = async () => {
    try {
      const updateData = {
        username: profileData.username,
        bio: profileData.bio,
      };

      await editProfileMutation.mutateAsync(updateData);

      // Save bio to localStorage
      localStorage.setItem("bio", profileData.bio);

      setEditProfile(false);
      toast.success("Profile updated successfully!");
      refetch();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
    }
  };

  // Change password
  const handleChangePassword = async () => {
    // Validate password first
    if (!validatePassword()) {
      return;
    }

    try {
      // Prepare the payload
      const payload = {
        currentpassword: passwordData.currentpassword,
        newpassword: passwordData.newpassword,
        confirmpassword: passwordData.confirmpassword
      };

      console.log("Password data being sent:", {
        ...payload,
        currentpassword: "***",
        newpassword: "***",
        confirmpassword: "***"
      });

      await changePasswordMutation.mutateAsync(payload);

      // Success - close dialog and clear form
      setOpenPasswordDialog(false);
      setPasswordData({
        currentpassword: "",
        newpassword: "",
        confirmpassword: "",
      });
      setPasswordErrors({
        currentpassword: "",
        newpassword: "",
        confirmpassword: "",
      });
      toast.success("Password changed successfully!");
    } catch (error) {
      console.error("Password change error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      // Handle specific error messages from the server
      let errorMessage = "Failed to change password";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
        
        // Map server error to specific field
        if (errorMessage.toLowerCase().includes("current password")) {
          setPasswordErrors(prev => ({
            ...prev,
            currentpassword: errorMessage
          }));
          // Focus on current password field
          document.querySelector('input[name="currentpassword"]')?.focus();
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error(errorMessage);
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get avatar URL
  const getAvatarUrl = () => {
    if (profileData.avatar) return profileData.avatar;
    if (profileData.profilepic) return profileData.profilepic;
    return null;
  };

  // Cancel edit profile
  const handleCancelEditProfile = () => {
    setEditProfile(false);
    if (profileDataFromApi) {
      const storedUsername = localStorage.getItem("username") ||
        localStorage.getItem("userName") ||
        localStorage.getItem("name");
      const storedBio = localStorage.getItem("bio") || "";

      setProfileData({
        username: profileDataFromApi.username || profileDataFromApi.name || storedUsername || "",
        bio: profileDataFromApi.bio || storedBio || "",
        profileid: profileDataFromApi.profileid || localStorage.getItem("profileid") || "",
        avatar: profileDataFromApi.avatar || profileDataFromApi.profilepic || "",
        profilepic: profileDataFromApi.profilepic || profileDataFromApi.avatar || "",
        createdAt: profileDataFromApi.createdAt || profileDataFromApi.created_at || "",
        lastLogin: profileDataFromApi.lastLogin || profileDataFromApi.last_login || "",
        isVerified: profileDataFromApi.isVerified || false,
        status: profileDataFromApi.status || "active",
      });
    }
  };

  if (profileLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
        <Typography variant="body2" color="textSecondary">
          Loading profile...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.contentWrapper}>
      <Typography variant="h6" className={styles.contentTitle}>
        Account Information
      </Typography>
      <Typography variant="body2" color="textSecondary" className={styles.contentSubtitle}>
        Manage your account details and security
      </Typography>

      <Box className={styles.profileContainer}>
        {/* Profile Avatar and Edit Button */}
        <Box className={styles.profileAvatarContainer}>
          <Box className={styles.avatarWrapper}>
            <Avatar
              className={styles.profileAvatar}
              src={getAvatarUrl()}
            >
              {profileData.username ? profileData.username.charAt(0).toUpperCase() : "U"}
            </Avatar>
            <IconButton
              component="label"
              className={styles.cameraButton}
              size="small"
            >
              <CameraAlt fontSize="small" />
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
              />
            </IconButton>
            {profileData.isVerified && (
              <Badge
                className={styles.verifiedBadge}
                badgeContent={<CheckCircle />}
                color="primary"
              />
            )}
          </Box>

          {/* Bio next to avatar */}
          <Box className={styles.avatarBioContainer}>
            <Typography variant="body2" className={styles.avatarBioText}>
              {profileData.bio || "No bio added yet"}
            </Typography>
          </Box>

          <Box className={styles.profileActions}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Edit />}
              onClick={() => setEditProfile(!editProfile)}
              className={styles.editProfileBtn}
            >
              {editProfile ? "Cancel" : "Edit Profile"}
            </Button>
          </Box>
        </Box>

        {/* Profile Information */}
        {editProfile ? (
          <Paper elevation={0} className={styles.editFormPaper}>
            <Box className={styles.editProfileForm}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={profileData.username}
                disabled={true}
                onChange={handleProfileChange}
                margin="normal"
                size="medium"
                InputProps={{
                  startAdornment: <Person className={styles.inputIcon} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#ff9417',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                multiline
                rows={4}
                value={profileData.bio}
                onChange={handleProfileChange}
                margin="normal"
                size="medium"
                placeholder="Tell us about yourself..."
                inputProps={{ maxLength: 500 }}
                helperText={`${profileData.bio?.length || 0}/500`}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#ff9417',
                  },
                }}
              />
              <Box className={styles.editProfileActions}>
                <SaveButton
                  onClick={handleSaveProfile}
                  disabled={editProfileMutation.isLoading}
                  startIcon={<Save />}
                >
                  {editProfileMutation.isLoading ? "Saving..." : "Save Changes"}
                </SaveButton>
                <CancelButton
                  onClick={handleCancelEditProfile}
                  disabled={editProfileMutation.isLoading}
                  startIcon={<Cancel />}
                >
                  Cancel
                </CancelButton>
              </Box>
            </Box>
          </Paper>
        ) : (
          <Box>
            {/* Profile Info Grid */}
            <Box className={styles.profileInfo}>
              {/* Username with Change Password Button */}
              <Box className={styles.usernameContainer}>
                <Box className={styles.infoItem}>
                  <Person className={styles.infoIcon} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Username
                    </Typography>
                    <Typography variant="body1">{profileData.username || "Not set"}</Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<VpnKey />}
                  onClick={() => setOpenPasswordDialog(true)}
                  className={styles.changePasswordBtn}
                >
                  Change Password
                </Button>
              </Box>

              {/* Profile ID Box */}
              <Box className={styles.profileIdBox}>
                <Box className={styles.profileIdContent}>
                  <Box className={styles.profileIdIconWrapper}>
                    <AssignmentInd className={styles.profileIdIcon} />
                  </Box>
                  <Box className={styles.profileIdInfo}>
                    <Typography variant="caption" color="textSecondary" className={styles.profileIdLabel}>
                      Profile ID
                    </Typography>
                    <Typography variant="body1" className={styles.profileIdValue}>
                      {profileData.profileid || "Not set"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* Change Password Dialog */}
      <Dialog
        open={openPasswordDialog}
        onClose={() => {
          setOpenPasswordDialog(false);
          setPasswordData({
            currentpassword: "",
            newpassword: "",
            confirmpassword: "",
          });
          setPasswordErrors({
            currentpassword: "",
            newpassword: "",
            confirmpassword: "",
          });
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: styles.passwordDialog,
        }}
      >
        <DialogTitle className={styles.dialogTitle}>
          <Box className={styles.dialogTitleContent}>
            <Lock className={styles.dialogIcon} />
            <Typography variant="h6">Change Password</Typography>
          </Box>
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <DialogContentText className={styles.dialogText}>
            Enter your current password and choose a new password for your account.
            For security, your new password must be at least 6 characters long and different from your current password.
          </DialogContentText>

          <TextField
            fullWidth
            label="Current Password"
            name="currentpassword"
            type={showCurrentPassword ? "text" : "password"}
            value={passwordData.currentpassword}
            onChange={handlePasswordChange}
            margin="normal"
            size="medium"
            error={!!passwordErrors.currentpassword}
            helperText={passwordErrors.currentpassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className={styles.inputIcon} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("current")}
                    edge="end"
                  >
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                borderColor: '#ff9417',
              },
            }}
          />

          <TextField
            fullWidth
            label="New Password"
            name="newpassword"
            type={showNewPassword ? "text" : "password"}
            value={passwordData.newpassword}
            onChange={handlePasswordChange}
            margin="normal"
            size="medium"
            error={!!passwordErrors.newpassword}
            helperText={passwordErrors.newpassword || "Password must be at least 6 characters"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className={styles.inputIcon} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("new")}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                borderColor: '#ff9417',
              },
            }}
          />

          <TextField
            fullWidth
            label="Confirm New Password"
            name="confirmpassword"
            type={showConfirmPassword ? "text" : "password"}
            value={passwordData.confirmpassword}
            onChange={handlePasswordChange}
            margin="normal"
            size="medium"
            error={!!passwordErrors.confirmpassword}
            helperText={passwordErrors.confirmpassword || "Passwords do not match"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock className={styles.inputIcon} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("confirm")}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                borderColor: '#ff9417',
              },
            }}
          />

          {changePasswordMutation.isError && (
            <Alert severity="error" className={styles.passwordAlert}>
              {changePasswordMutation.error?.response?.data?.message ||
                "Failed to change password. Please check your current password and try again."}
            </Alert>
          )}
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <CancelButton
            onClick={() => {
              setOpenPasswordDialog(false);
              setPasswordData({
                currentpassword: "",
                newpassword: "",
                confirmpassword: "",
              });
              setPasswordErrors({
                currentpassword: "",
                newpassword: "",
                confirmpassword: "",
              });
            }}
            disabled={changePasswordMutation.isLoading}
          >
            Cancel
          </CancelButton>
          <SaveButton
            onClick={handleChangePassword}
            disabled={changePasswordMutation.isLoading}
            startIcon={<Save />}
          >
            {changePasswordMutation.isLoading ? "Changing..." : "Change Password"}
          </SaveButton>
        </DialogActions>
      </Dialog>

      {/* Profile Picture Dialog */}
      <Dialog
        open={openImageDialog}
        onClose={handleCancelImage}
        maxWidth="xs"
        fullWidth
        TransitionComponent={Fade}
        transitionDuration={350}
      >
        <DialogTitle className={styles.dialogTitle}>
          <Box className={styles.dialogTitleContent}>
            <CameraAlt className={styles.dialogIcon} />
            <Typography variant="h6">Profile Picture</Typography>
          </Box>
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <Box className={styles.previewContainer}>
            <Avatar
              src={previewImage}
              className={styles.previewAvatar}
              sx={{
                background: 'linear-gradient(135deg, #ff9f1a, #ff7900) !important',
              }}
            >
              {!previewImage && <Person sx={{ fontSize: 90 }} />}
            </Avatar>
            <Typography className={styles.dialogText}>
              Is this the profile picture you want to use?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <CancelButton onClick={handleCancelImage}>
            Cancel
          </CancelButton>
          <SaveButton
            onClick={handleImageUpload}
            disabled={updateProfilePictureMutation.isLoading}
            startIcon={<CheckCircle />}
          >
            {updateProfilePictureMutation.isLoading ? "Uploading..." : "Use Photo"}
          </SaveButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Account;