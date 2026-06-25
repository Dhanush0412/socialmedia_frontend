import {useMyGroups} from "../hooks/group/useMyGroups";
import GroupCard from "../components/GroupCard";
import "../css/groups.css";

function Group(){

const profileid=1;

const {
data,
isLoading
}=useMyGroups(profileid);


if(isLoading)
return <h2>Loading...</h2>;

return(
<div className="groups-container">

<h1>
My Groups
</h1>

<div className="group-wrapper">

{/* {
data?.map((group)=>(
<GroupCard
key={group.id}
group={group}
/>
))
} */}

</div>

</div>
);

}

export default Group;