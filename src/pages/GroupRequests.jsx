import {useGroupInvites} from "../hooks/group/useGroupInvite";
import {useAcceptInvite} from "../hooks/group/useAcceptGroupInvite";
import {useRejectGroupInvite} from "../hooks/group/useRejectGroupInvite";
import GroupRequestCard from "../components/GroupRequestCard";
import Layout from "../components/Layout/Layout";

function GroupRequests(){

const {
data=[]
}=useGroupInvites();


const accept=
useAcceptInvite();


const reject=
useRejectGroupInvite();



return(
<Layout>
<div>

<h2>
Pending Group Requests
</h2>


{
data.map(invite=>(

<GroupRequestCard

key={
invite._id
}

invite={invite}

onAccept={()=>accept.mutate(
invite._id
)}

onReject={()=>reject.mutate(
invite._id
)}

/>

))

}


</div>
</Layout>
);

}


export default GroupRequests;