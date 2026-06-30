import {usePendingInvites} from "../hooks/group/usePendingInvites";
import GroupInviteCard from "../components/GroupInviteCard";
import Layout from "../components/Layout/Layout";
import styles from "./Dashboard/Dashboard.module.css";

function GroupRequests(){

const {
data,
isLoading
}=usePendingInvites();


if(isLoading)
return <h2>Loading...</h2>;


return(
    <Layout>
<div>

<h1>
Group Requests
</h1>


{
data?.map((invite)=>(

<GroupInviteCard
key={invite._id}
invite={invite}
/>

))
}


</div>
</Layout>
);

}

export default GroupRequests;