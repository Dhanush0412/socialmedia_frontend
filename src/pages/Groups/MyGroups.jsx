import {useNavigate} from "react-router-dom";
import {useMyGroups} from "../../hooks/group/useMyGroups";
import GroupCard from "../../components/GroupCard";
import "./MyGroups.css";

export default function MyGroups(){

const navigate=useNavigate();

const{
data:groups=[],
isLoading,
isError
}=useMyGroups();

if(isLoading){
return(
<div className="group-loading">
Loading Groups...
</div>
);
}

if(isError){
return(
<div className="group-loading">
Unable to load groups
</div>
);
}

return(

<div className="my-groups-page">

<div className="group-header">

<h1>My Groups</h1>

<button
className="create-group-btn"
onClick={()=>navigate("/creategroup")}
>

+ Create Group

</button>

</div>

{

groups.length===0?

<div className="empty-group">

<img
src="https://cdn-icons-png.flaticon.com/512/7486/7486754.png"
alt="No Groups"
/>

<h2>No Groups Yet</h2>

<p>Create your first communication group.</p>

<button
onClick={()=>navigate("/creategroup")}
>

Create Group

</button>

</div>

:

<div className="group-grid">

{

groups.map(group=>(

<GroupCard
key={group._id}
group={group}
onInvite={()=>
navigate(`/group/${group._id}/friends`)
}
/>

))

}

</div>

}

</div>

);

}