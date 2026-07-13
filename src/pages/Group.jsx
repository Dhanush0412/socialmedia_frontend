import { useMyGroups } from "../hooks/group/useMyGroups";
import GroupCard from "../components/GroupCard";
import "../css/groups.css";
import { LayersSharp } from "@mui/icons-material";
import Layout from "../components/Layout/Layout";

function Group(){

const {data=[],isLoading}=useMyGroups();

if(isLoading){
return <h2>Loading...</h2>;
}

return(
<Layout>
<div className="groups-container">

<h1>My Groups</h1>

<div className="group-wrapper">

{data.map((group)=>(

<GroupCard
key={group._id}
group={group}

/>
))}

</div>

</div>
</Layout>
);

}

export default Group;