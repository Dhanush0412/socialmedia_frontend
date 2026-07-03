import {useMyGroups} from "../hooks/group/useMyGroups";
import {useNavigate} from "react-router-dom";


function MyGroups(){

const {data=[]}=useMyGroups();

const navigate=useNavigate();


return(

<div>

{
data.map(group=>(

<div
key={group._id}
className="group-card"
onClick={()=>
navigate(`/group-chat/${group._id}`)
}
>

<h3>
{group.groupname}
</h3>

<p>
Open Chat
</p>

</div>

))
}

</div>

)

}

export default MyGroups;