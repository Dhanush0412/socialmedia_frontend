import Layout from "../../components/Layout/Layout";
import Group from "./Group";
import GroupRequests from "./GroupRequest";
import styles from "./GroupList.module.css";

export default function GroupList() {
  return (
    <Layout>
      <div className={styles["groups-page"]}>
        <div className={styles["groups-left"]}>
          <Group />
        </div>

        <div className={styles["groups-right"]}>
          <GroupRequests />
        </div>
      </div>
    </Layout>
  );
}