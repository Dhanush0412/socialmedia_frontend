import "../Profile.css";

import { useForm } from "react-hook-form";

import { useSelector } from "react-redux";

import { toast } from "react-toastify";

import axios from "axios";

function Profile() {

const auth =
useSelector(
(state)=>
state.auth
);

const {
register,
handleSubmit,
formState:{
errors,
},
}=
useForm();

const onSubmit =
async(data)=>{

try{

const payload={

userid:
auth?.id
||
auth?.userid
||
"USER_ID",

bio:
data.bio,

role:
data.role,

};

await axios.post(
"https://6985ac756964f10bf2540df1.mockapi.io/profile",
payload
);

toast.success(
"Profile Saved 🎉"
);

}

catch{

toast.error(
"Failed to save profile"
);

}

};

return(

<div className="profile-page">

<div className="profile-card">

<div className="profile-header">

<div className="avatar">

{
auth?.username
?.charAt(0)
?.toUpperCase()

||

"U"
}

</div>

<h1>

Profile Setup

</h1>

<p>

Complete your profile
to personalize your account

</p>

</div>

<form
className="profile-form"

onSubmit={
handleSubmit(
onSubmit
)
}
>

<div className="input-group">

<label>

User ID

</label>

<input

value={
auth?.id
||
auth?.userid
||
"USER_ID"
}

readOnly

/>

</div>

<div className="input-group">

<label>

Role

</label>

<input

placeholder=
"Frontend Developer"

{
...register(
"role",
{
required:
"Role is required"
}
)
}

/>

<p className="error">

{
errors.role
?.message
}

</p>

</div>

<div className="input-group">

<label>

Bio

</label>

<textarea

placeholder=
"Node.js Developer"

{
...register(
"bio",
{
required:
"Bio is required"
}
)
}

/>

<p className="error">

{
errors.bio
?.message
}

</p>

</div>

<button>

Save Profile

</button>

</form>

</div>

</div>

);

}

export default Profile;