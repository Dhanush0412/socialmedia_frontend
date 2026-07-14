import { useMyGroups } from "../hooks/group/useMyGroups";
import GroupCard from "../components/GroupCard";
import "../css/groups.css";
import { useNavigate } from "react-router-dom";

function Group(){

const navigate=useNavigate();

const{
data=[],
isLoading
}=useMyGroups();

if(isLoading){
return <h2>Loading...</h2>;
}

return(

<div className="groups-container">

<div className="groups-header">

<h1>My Groups</h1>

<button
className="create-group-btn"
onClick={()=>navigate("/create-group")}
>
+ Create Group
</button>

</div>

<div className="group-wrapper">

{data.map(group=>(

<GroupCard
key={group._id}
group={group}
/>

))}

</div>

</div>

);

}

export default Group;