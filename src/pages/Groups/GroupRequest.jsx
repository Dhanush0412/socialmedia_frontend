import GroupRequestCard from "../../components/GroupRequestCard";
import {usePendingGroupInvites} from "../../hooks/group/usePendingGroupInvites";
import "./GroupRequest.css";

export default function GroupRequests(){

const{
data:invites=[],
isLoading,
isError
}=usePendingGroupInvites();

if(isLoading){

return(

<div className="group-requests-loading">

Loading Group Invitations...

</div>

);

}

if(isError){

return(

<div className="group-requests-loading">

Unable to load invitations

</div>

);

}

return(

<div className="group-requests-page">

<div className="group-requests-header">

<h1>Group Invitations</h1>

<p>

Accept or reject invitations from your friends.

</p>

</div>

{

invites.length===0?

(

<div className="group-requests-empty">

<img
src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
alt="No Invitations"
/>

<h2>No Pending Invitations</h2>

<p>

You don't have any pending group invitations.

</p>

</div>

)

:

(

<div className="group-requests-list">

{

invites.map(invite=>(

<GroupRequestCard
key={invite._id}
invite={invite}
/>

))

}

</div>

)

}

</div>

);

}