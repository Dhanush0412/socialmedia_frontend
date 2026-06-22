import { useState } from "react";
import Layout from "../components/Layout";
import "../css/NewPost.css";
import { FaCloudUploadAlt } from "react-icons/fa";

function NewPost() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
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

        <button className="post-btn">
          Post
        </button>
      </div>
    </Layout>
  );
}

export default NewPost;