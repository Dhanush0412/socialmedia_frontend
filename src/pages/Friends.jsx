import Layout from "../components/Layout/Layout";
import styles from "./Dashboard/Dashboard.module.css";
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