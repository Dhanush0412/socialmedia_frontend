import "../css/Profile.css";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProfile } from "../hooks/useProfile";
import { toast } from "react-toastify";
import PandaLogo from "../assets/panda 2.png";

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);

      const imageUrl =
        URL.createObjectURL(file);

      setPreviewImage(imageUrl);
      setShowPopup(true);
    }
  };

  const handleUpload = () => {
    // setProfileImage(previewImage);
    setShowPopup(false);
  };

  const handleCancel = () => {
    // setPreviewImage(null);
    setShowPopup(false);
  };

  // const saveProfile = () => {
  //   const profileData = {
  //     bio,
  //     profileImage,
  //   };

  //   localStorage.setItem(
  //     "profile",
  //     JSON.stringify(profileData)
  //   );

  //   alert(
  //     "Profile Created Successfully!"
  //   );

  //   navigate("/login");
  // };

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
          localStorage.setItem(
            "profileid",
            data.profileid
          );
        }

        toast.success(
          "Profile Created Successfully"
        );

        navigate("/dashboard");
      },

      onError: (error) => {
        console.error(error);

        toast.error(
          error?.response?.data?.message ||
          "Profile creation failed"
        );
      },
    });
  };

  const { mutate, isPending } =
    useCreateProfile();

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user) {
      setUsername(user.username);
    }
  }, []);

  return (
    <div className="profile-page">

      {/* LEFT SIDE */}
      <div className="profile-left">

        <img
          src={PandaLogo}
          alt="Panda"
          className="panda-logo"
        />

      </div>

      {/* RIGHT SIDE */}
      <div className="profile-right">

        <div className="profile-content">

          <div className="profile-header">

            <div className="profile-image-wrapper">

              <div className="profile-image">

                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                  />
                ) : (
                  <FaUserCircle />
                )}

              </div>

              <label
                htmlFor="imageUpload"
                className="image-edit-icon"
              >
                <FaEdit />
              </label>

              <input
                id="imageUpload"
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageSelect}
              />

            </div>

            <div className="username-section">
              <h1>{username || "User"}</h1>
            </div>

          </div>

          {/* BIO */}

          <div className="bio-box">

            <div className="bio-title">
              <h2>Bio</h2>
            </div>

            <textarea
              placeholder="Write something about yourself..."
              value={bio}
              onChange={(e) =>
                setBio(e.target.value)
              }
            />

            <button
              className="save-profile-btn"
              onClick={saveProfile}
            >
              Save Profile
            </button>

          </div>

        </div>

      </div>

      {/* IMAGE POPUP */}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box"> 
            <h3>
              Profile Picture Preview
            </h3>

            <img
              src={previewImage}
              alt="Preview"
              className="popup-preview"
            />

            <div className="popup-buttons">
              <button
                className="upload-btn"
                onClick={handleUpload}
              >
                Upload
              </button>

              <button
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;