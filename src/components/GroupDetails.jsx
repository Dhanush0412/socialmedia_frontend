import {useParams} from "react-router-dom";
import {useGroupDetails} from "../hooks/group/useGroupDetails";
import {useState} from "react";


export default function GroupDetails(){


const {id}=useParams();


const {data:group}=useGroupDetails(id);


const [search,setSearch]=useState("");



return(

<div className="group-details">


<img 
src={group?.groupimage}
/>


<h1>
{group?.groupname}
</h1>


<h3>
Members
</h3>


{
group?.members?.map(member=>(

<p key={member._id}>

{member.username}

</p>

))

}



<hr/>


<h3>
Invite Members
</h3>


<input

placeholder="Search connection"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>


<button>
Search
</button>


</div>

)


}