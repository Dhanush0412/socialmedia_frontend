import "../css/GroupCard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupChat from "../pages/Groups/GroupChat";
// import GroupRequestDialog from "../pages/groups/GroupRequestDialog";
export default function GroupCard({group}){
 
const navigate=useNavigate();
//  const [open,setOpen]=useState(false);
return(
 <>
<div className="group-card">
 
<div className="group-image">
 
<img
src={group.groupimage}
alt={group.groupname}
/>
</div>
 
<div className="group-content">
 
<h3>{group.groupname}</h3>
 
<div className="group-footer">
 
<p>{group.members?.length || 0} Members</p>
 <div className="group-buttons">
<button
onClick={(e)=>{
e.stopPropagation();
navigate(`/group/chat/${group._id}`);
}}
>
Open Group
</button>
 
<button
onClick={(e)=>{
e.stopPropagation();
navigate(`/group/details/${group._id}`);
}}
>
Add Member
</button>
{/* <button
onClick={(e)=>{
e.stopPropagation();
setOpen(true);
}}
>
View Requests
</button> */}
</div>
</div>
 
</div>
 
</div>
  {/* <GroupRequestDialog
      open={open}
      onClose={() => setOpen(false)}
      groupid={group?._id}
    /> */}
    </>
);
 
}