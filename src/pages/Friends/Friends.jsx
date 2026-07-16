import Layout from "../../components/Layout/Layout";
import styles from "./Friends.module.css";
import MyConnections from "../MyConnection/MyConnection";
import PendingRequests from "../PendingRequests/PendingRequests";

export default function Friends(){
  return(
    <Layout>

      <div className={styles["friends-page"]}>

        <div className={styles["friends-left"]}>
          <MyConnections />
        </div>

        <div className={styles["friends-right"]}>
          <PendingRequests />
        </div>

      </div>

    </Layout>
  );
}