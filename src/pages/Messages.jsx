import "../css/GroupCard.css";
import { useNavigate } from "react-router-dom";
import { useMyGroups } from "../hooks/group/useMyGroups";
 
export default function Messages({group}){
 
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
 
<button
onClick={(e)=>{
e.stopPropagation();
navigate(`/group/details/${group._id}`);
}}
>
Open Group
</button>
 
</div>
 
</div>
 
</div>
 
);
 
}
 