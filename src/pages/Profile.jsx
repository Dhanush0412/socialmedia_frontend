import "../css/Profile.css";

import {
  useForm
} from "react-hook-form";

import {
  useSelector
} from "react-redux";

import {
  toast
} from "react-toastify";

import {
  useCreateProfile
} from "../hooks/useCreateProfile";

import {
  useFriends
} from "../hooks/useFriends";

import { useNavigate } from "react-router-dom";
function Profile(){


const auth =
useSelector(
(state)=>state.auth.user
);
const navigate=useNavigate();


const userid =
auth?.id;



const {
register,
handleSubmit,
formState:{
errors
}

}=useForm();



const {
mutate,
isPending

}=useCreateProfile();



const {
data:friends

}=useFriends(userid);





const onSubmit=(data)=>{


const payload={

userid,

username:
auth?.username,


bio:
data.bio


};



mutate(payload,{

onSuccess:()=>{

toast.success(
"Profile Updated "
);

},


onError:()=>{

toast.error(
"Profile update failed"
);

}

});


};


const handlelogout=()=>{
    navigate("/login")
}


return(

<div className="profile-page">


<div className="profile-card">



{/* PROFILE HEADER */}


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

{
auth?.username
}

</h1>


<p>
Complete your profile
</p>


</div>





{/* PROFILE FORM */}


<form

className="profile-form"

onSubmit={
handleSubmit(onSubmit)
}

>



<label>
Username
</label>


<input

value={
auth?.username || ""
}

readOnly

/>





<label>
Bio
</label>


<textarea



{...register(
"bio",
{
required:
"Bio is required"
}
)}

>


</textarea>


<p className="error">

{
errors.bio?.message
}

</p>




<button
disabled={isPending}
>

{
isPending
?
"Saving..."
:
"Save Profile"
}

</button>


<button onClick={handlelogout}>logout</button>
</form>





{/* CONNECTIONS SECTION */}



<div className="connection-section">


<h2>
Your Connections
</h2>



<div className="profile-stats">


<div>

<h2>
{
friends?.length || 0
}
</h2>

<span>
Friends
</span>

</div>



<div>

<h2>
0
</h2>

<span>
Posts
</span>

</div>




<div>

<h2>
0
</h2>

<span>
Groups
</span>

</div>



</div>



</div>




</div>


</div>


);


}


export default Profile;