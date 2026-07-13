import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./CreateGroup.css";
import Layout from "../../components/Layout/Layout";
import { useCreateGroup } from "../../hooks/group/useCreateGroup";

export default function CreateGroup() {
  const navigate = useNavigate();

  const [groupname, setGroupname] = useState("");
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);

  const { mutate, isPending } = useCreateGroup();

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

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

    formData.append("groupname", groupname);

    if (image) {
      formData.append("groupimage", image);
    }

    mutate(formData,{
onSuccess:(group)=>{
toast.success("Group created successfully");

navigate(`/group/details/${group._id}`);
},
onError:(error)=>{
toast.error(error.response?.data||"Unable to create group");
}
});
  }

  return (
    <Layout>
    <div className="create-group-page">
      <div className="create-group-card">

        <h1>Create New Group</h1>

        <p>Create your own private communication group.</p>

        <form onSubmit={handleSubmit}>

          <div className="image-preview">

            {preview ? (
              <img src={preview} alt="preview" />
            ) : (
              <div className="placeholder">
                Upload Group Image
              </div>
            )}

          </div>

          <label className="upload-btn">

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
            onChange={(e) => setGroupname(e.target.value)}
          />

          <button
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Group"}
          </button>

        </form>

      </div>
    </div>
    </Layout>
  );
}