import Layout from "../../components/Layout/Layout";
import Group from "../Group";
import GroupRequests from "./GroupRequest";
import "./GroupList.css";

export default function GroupList(){

return(

<Layout>

<div className="groups-page">

<div className="groups-left">

<Group/>

</div>

<div className="groups-right">

<GroupRequests/>

</div>

</div>

</Layout>

);

}