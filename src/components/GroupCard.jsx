import {useNavigate} from "react-router-dom";

function GroupCard({group}){

const navigate=useNavigate();

return(
<div className="group-card">

<h3>{group.name}</h3>

<p>
Members: {group.members?.length || 0}
</p>

<button onClick={()=>navigate(`/dashboard/chat/${group.id}`)}>
Open Chat
</button>

</div>
);

}

export default GroupCard;