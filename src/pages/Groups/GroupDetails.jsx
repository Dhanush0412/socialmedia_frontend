import {useState} from "react";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import Layout from "../../components/Layout/Layout";
import {useSearchUsers} from "../../hooks/connection/useSearchUsers";
import {useSendGroupInvite} from "../../hooks/group/useSendGroupInvite";
import "../../Css/SearchUsers.css";
import "./GroupDetails.css";

export default function GroupDetails(){

const {groupid}=useParams();

const [search,setSearch]=useState("");
const [selectedUsers,setSelectedUsers]=useState([]);

const{
data=[],
isLoading
}=useSearchUsers(search);

const{
mutate:sendInvite
}=useSendGroupInvite();

const toggleUser=(userid)=>{

if(selectedUsers.includes(userid)){

setSelectedUsers(
selectedUsers.filter(id=>id!==userid)
);

}else{

setSelectedUsers([
...selectedUsers,
userid
]);

}

};

const inviteSelected=()=>{

if(selectedUsers.length===0){

toast.warning("Please select friends");

return;

}

selectedUsers.forEach(receiverid=>{

sendInvite(

{
groupid,
receiverid
},

{

onError:(error)=>{

toast.error(
error.response?.data||
"Unable to send invitation"
);

}

}

);

});

toast.success("Invitations sent");

setSelectedUsers([]);

};

return(

<Layout>

<div className="search-users">

<div className="search-users__header">

<div className="search-users__icon">
👥
</div>

<h1 className="search-users__title">
Invite Friends
</h1>

<p className="search-users__subtitle">
Search and select multiple friends to invite into this group
</p>

</div>

<div className="search-users__input-wrapper">

<span className="search-users__input-icon">

<svg
width="18"
height="18"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2.5"
>

<circle
cx="11"
cy="11"
r="8"
/>

<path d="m21 21-4.35-4.35"/>

</svg>

</span>

<input
className="search-users__input"
type="text"
placeholder="Search friends..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

{

search&&(

<button
className="search-users__clear"
onClick={()=>setSearch("")}
>

✕

</button>

)

}

</div>

{

isLoading&&search&&(

<div className="search-users__status">

Searching...

</div>

)

}

{

search&&
Array.isArray(data)&&
data.length===0&&(

<div className="search-users__empty">

<div className="search-users__empty-icon">

👤

</div>

<h3>

No friends found

</h3>

<p>

Try another username

</p>

</div>

)

}

{

search&&
Array.isArray(data)&&
data.length>0&&(

<>

<p className="search-users__count">

Selected :
<strong>
{" "}
{selectedUsers.length}
</strong>

</p>

<div className="search-users__results">

{

data.map(user=>(

<div
key={user._id}
className={`group-user-card ${
selectedUsers.includes(user._id)
?
"selected"
:
""
}`}
onClick={()=>toggleUser(user._id)}
>

<div className="group-user-left">

<input
type="checkbox"
checked={selectedUsers.includes(user._id)}
onChange={()=>toggleUser(user._id)}
onClick={(e)=>e.stopPropagation()}
/>

<img
src={user.profilepic}
alt={user.user.username}
/>

<div className="group-user-info">

<h3>

{user.user.username}

</h3>

<p>

{user.bio||"No bio available"}

</p>

</div>

</div>

</div>

))

}

</div>

<button
className="invite-selected-btn"
disabled={!selectedUsers.length}
onClick={inviteSelected}
>

Invite Selected
(
{selectedUsers.length}
)

</button>

</>

)

}

{

!search&&(

<div className="search-users__placeholder">

<div className="search-users__placeholder-icon">

👥

</div>

<p>

Search friends to invite them into this group

</p>

</div>

)

}

</div>

</Layout>

);

}