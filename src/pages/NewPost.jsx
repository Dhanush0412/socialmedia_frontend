import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../css/NewPost.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCreatePost } from "../hooks/useCreatePost";

function NewPost() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const { mutateAsync: createPost, isPending } = useCreatePost();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
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
        error?.response?.data?.message ||
        "Failed to create post"
      );
    }
  };

  return (
    <Layout>
      <div className="newpost-card">
        <h2 className="newpost-title">New Post</h2>

        <label className="upload-box">
          <input
            type="file"
            hidden
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          <span>Select photos / videos</span>
          <FaCloudUploadAlt className="upload-icon" />
        </label>

        {preview && (
          <div className="preview-container">
            {file?.type.startsWith("image") ? (
              <img src={preview} alt="preview" />
            ) : (
              <video controls>
                <source src={preview} />
              </video>
            )}
          </div>
        )}

        <textarea
          className="caption-box"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <button
          className="post-btn"
          onClick={handlePost}
          disabled={isPending}
        >
          {isPending ? "Posting..." : "Post"}
        </button>
      </div>
    </Layout>
  );
}

export default NewPost;