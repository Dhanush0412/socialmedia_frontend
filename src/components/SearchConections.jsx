import {useState} from "react";
import {toast} from "react-toastify";
import {useSearchUsers} from "../hooks/chat/useSearchUsers";
import {useSendGroupInvite} from "../hooks/group/useSendGroupInvite";
import "../Css/GroupDetails.css";

export default function SearchConnection({groupid}){

const [search,setSearch]=useState("");

const {data:users=[],isLoading}=useSearchUsers(search);

const {mutate:sendInvite,isPending}=useSendGroupInvite();

const handleInvite=(receiverid)=>{

sendInvite(
{
groupid,
receiverid
},
{
onSuccess:()=>{
toast.success("Invitation sent successfully");
},
onError:(error)=>{
toast.error(error.response?.data||"Unable to send invitation");
}
}
);

};

return(

<div className="search-container">

<input
className="search-input"
type="text"
placeholder="Search users..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

{

isLoading&&

<p className="search-status">

Searching...

</p>

}

{

!isLoading&&search&&users.length===0&&(

<p className="search-status">

No users found

</p>

)

}

<div className="search-results">

{

users.map(user=>(

<div
className="search-user"
key={user._id}
>

<div className="search-user-left">

<img
src={
user.profilepic||
"https://cdn-icons-png.flaticon.com/512/149/149071.png"
}
alt={user.fullname}
/>

<div>

<h4>

{user.fullname||user.username}

</h4>

<p>

{user.email}

</p>

</div>

</div>

<button
disabled={isPending}
onClick={()=>handleInvite(user._id)}
>

Invite

</button>

</div>

))

}

</div>

</div>

);

}