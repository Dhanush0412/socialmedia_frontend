import {usePendingGroupInvites} from "../../hooks/group/usePendingInvites";
import InviteCard from "../../components/InviteCard";
import "./GroupRequest.css";

export default function GroupRequests(){

const{
data:invites=[],
isLoading,
isError
}=usePendingGroupInvites();

if(isLoading){
return(
<div className="group-request-loading">
Loading Requests...
</div>
);
}

if(isError){
return(
<div className="group-request-loading">
Unable to load requests
</div>
);
}

return(

<div className="group-request-page">

<div className="group-request-header">

<h1>Group Requests</h1>

<p>

Accept or reject your pending group invitations.

</p>

</div>

{

invites.length===0?

<div className="empty-request">

<img
src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
alt="No Requests"
/>

<h2>

No Pending Requests

</h2>

<p>

You don't have any group invitations.

</p>

</div>

:

<div className="invite-list">

{

invites.map(invite=>(

<InviteCard
key={invite._id}
invite={invite}
/>

))

}

</div>

}

</div>

);

}