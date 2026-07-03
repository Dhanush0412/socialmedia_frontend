import {useMyGroups} from "../hooks/group/useMyGroups";
import GroupCard from "../components/GroupCard";


function MyGroups(){

const {data=[]}=useMyGroups();


return(

<div>

<h2>
My Groups
</h2>


{
data.map(group=>(

<GroupCard
key={group._id}
group={group}
/>

))

}


</div>

);

}


export default MyGroups;