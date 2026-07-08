import {toast} from "react-toastify";
import {useAcceptGroupInvite} from "../hooks/group/useAcceptGroupInvite";
import {useRejectGroupInvite} from "../hooks/group/useRejectGroupInvite";
import "../pages/Groups/GroupRequest.css";

export default function InviteCard({invite}){

const {mutate:acceptInvite,isPending:isAccepting}=useAcceptInvite();

const {mutate:rejectInvite,isPending:isRejecting}=useRejectInvite();

const handleAccept=()=>{

acceptInvite(invite._id,{

onSuccess:()=>{

toast.success("Joined group successfully");

},

onError:(error)=>{

toast.error(error.response?.data||"Unable to accept invite");

}

});

};

const handleReject=()=>{

rejectInvite(invite._id,{

onSuccess:()=>{

toast.success("Invitation rejected");

},

onError:(error)=>{

toast.error(error.response?.data||"Unable to reject invite");

}

});

};

return(

<div className="invite-card">

<div className="invite-left">

<img
src={invite.group.groupimage}
alt={invite.group.groupname}
/>

<div>

<h3>

{invite.group.groupname}

</h3>

<p>

Invited by {invite.sender.fullname}

</p>

</div>

</div>

<div className="invite-actions">

<button
className="accept-btn"
disabled={isAccepting||isRejecting}
onClick={handleAccept}
>

{isAccepting?"Accepting...":"Accept"}

</button>

<button
className="reject-btn"
disabled={isAccepting||isRejecting}
onClick={handleReject}
>

{isRejecting?"Rejecting...":"Reject"}

</button>

</div>

</div>

);

}