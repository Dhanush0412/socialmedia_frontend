import Layout from "../components/Layout";
import "../css/Dashboard.css";
import MyConnections from "./MyConnections";
import PendingRequests from "./PendingRequests";
import "../Css/friends.css"

export default function Friends(){
    return(
        <Layout>
         <div className="friends-page">
        <MyConnections />
        <PendingRequests />
        </div>
        </Layout>
    )
}