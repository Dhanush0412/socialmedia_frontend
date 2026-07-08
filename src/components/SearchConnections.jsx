import {useState,useMemo} from "react";
import {useConnections} from "../hooks/connection/useConnections";
import {useSendGroupInvite} from "../hooks/group/useSendGroupInvite";
import "../Css/GroupDetails.css";

export default function SearchConnection({groupid}){

const [search,setSearch]=useState("");

const {data:connections=[],isLoading}=useConnections();

const {mutate:sendInvite}=useSendGroupInvite();

const filteredConnections=useMemo(()=>{

if(!search.trim()) return connections;

return connections.filter(user=>{

const name=(user.fullname||user.username||"").toLowerCase();

return name.includes(search.toLowerCase());

});

},[connections,search]);

const inviteUser=(receiverid)=>{

sendInvite(
{
groupid,
receiverid
},
{
onSuccess:()=>{
alert("Invitation sent successfully");
},
onError:(error)=>{
alert(error?.response?.data||"Unable to send invite");
}
}
);

};

return(

<div className="search-container">

<div className="search-box">

<input
type="text"
placeholder="Search your connections..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

{

isLoading?

<div className="group-loading">

Loading Connections...

</div>

:

<div className="search-results">

{

filteredConnections.length===0?

<div
style={{
textAlign:"center",
padding:"20px",
color:"#777"
}}
>

No Connections Found

</div>

:

filteredConnections.map(user=>(

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
alt=""
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
onClick={()=>inviteUser(user._id)}
>

Invite

</button>

</div>

))

}

</div>

}

</div>

);

}