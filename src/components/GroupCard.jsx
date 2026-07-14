import "../css/GroupCard.css";
import { useNavigate } from "react-router-dom";
import GroupChat from "../pages/Groups/GroupChat";
export default function GroupCard({group}){
 
const navigate=useNavigate();
 
return(
 
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
</div>
</div>
 
</div>
 
</div>
 
);
 
}