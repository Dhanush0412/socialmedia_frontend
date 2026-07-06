import {useAcceptInvite} from "../hooks/group/useAcceptGroupInvite";
import {useRejectGroupInvite} from "../hooks/group/useRejectGroupInvite";

function GroupInviteCard({invite}){

const accept=useAcceptInvite();
const reject=useRejectGroupInvite();


return(
<div className="group-invite-card">

<h3>
{invite.group?.name}
</h3>

<p>
Invited by:
{invite.sender?.username}
</p>


<button
onClick={()=>
accept.mutate(invite._id)
}
>
Accept
</button>


<button
onClick={()=>
reject.mutate(invite._id)
}
>
Reject
</button>


</div>
);

}

export default GroupInviteCard;