import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./CreateGroup.module.css";
import { useCreateGroup } from "../../hooks/group/useCreateGroup";
import Layout from "../../components/Layout/Layout";

export default function CreateGroup() {
  const navigate = useNavigate();

  const [groupname, setGroupname] = useState("");
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);

  const {
    mutate,
    isPending
  } = useCreateGroup();

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (groupname.trim() === "") {
      toast.warning("Please enter group name");
      return;
    }

    const formData = new FormData();

    formData.append(
      "groupname",
      groupname
    );

    if (image) {
      formData.append(
        "groupimage",
        image
      );
    }

    mutate(formData, {
      onSuccess: (group) => {
        toast.success(
          "Group created successfully"
        );

        navigate(`/group/details/${group._id}`);
      },

      onError: (error) => {
        toast.error(
          error.response?.data ||
          "Unable to create group"
        );
      }
    });
  };

  return (
    <Layout>
      <div className={styles["create-group-page"]}>
        <div className={styles["create-group-card"]}>
          <button
            type="button"
            className={styles["icon-btn"]}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>

          <h1>
            Create New Group
          </h1>

          <p>
            Create your own private communication group.
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles["image-preview"]}>
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                />
              ) : (
                <div className={styles["placeholder"]}>
                  Upload Group Image
                </div>
              )}
            </div>

            <label className={styles["upload-btn"]}>
              Choose Image

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImage}
              />
            </label>

            <input
              type="text"
              placeholder="Enter Group Name"
              value={groupname}
              onChange={(e) =>
                setGroupname(e.target.value)
              }
            />

            <button
              type="submit"
              disabled={isPending}
            >
              {isPending
                ? "Creating..."
                : "Create Group"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}