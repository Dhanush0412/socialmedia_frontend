import {toast} from "react-toastify";
import {useAcceptGroupInvite} from "../hooks/group/useAcceptGroupInvite";
import {useRejectGroupInvite} from "../hooks/group/useRejectGroupInvite";
import "../css/GroupRequests.css";

export default function GroupRequestCard({invite}){

const{
mutate:acceptInvite,
isPending:isAccepting
}=useAcceptGroupInvite();

const{
mutate:rejectInvite,
isPending:isRejecting
}=useRejectGroupInvite();

return(

<div className="group-request-card">

<div className="group-request-image">

<img
src={invite.group?.groupimage}
alt={invite.group?.groupname}
/>

</div>

<div className="group-request-content">

<h2>

{invite.group?.groupname}

</h2>

<p>

Invited by

<strong>

{" "}
{invite.sender?.user?.username||
invite.sender?.username||
"Unknown User"}

</strong>

</p>

<div className="group-request-buttons">

<button
className="accept-btn"
disabled={isAccepting}
onClick={()=>{

acceptInvite(
invite._id,
{
onSuccess:()=>{

toast.success(
"Invitation accepted"
);

},
onError:(error)=>{

toast.error(
error.response?.data||
"Unable to accept invitation"
);

}
}
);

}}
>

{

isAccepting
?
"Accepting..."
:
"Accept"

}

</button>

<button
className="reject-btn"
disabled={isRejecting}
onClick={()=>{

rejectInvite(
invite._id,
{
onSuccess:()=>{

toast.success(
"Invitation rejected"
);

},
onError:(error)=>{

toast.error(
error.response?.data||
"Unable to reject invitation"
);

}
}
);

}}
>

{

isRejecting
?
"Rejecting..."
:
"Reject"

}

</button>

</div>

</div>

</div>

);

}