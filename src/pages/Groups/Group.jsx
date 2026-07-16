import { useMyGroups } from "../../hooks/group/useMyGroups";
import GroupCard from "../../components/GroupCard/GroupCard";
import styles from "./Group.module.css";
import { useNavigate } from "react-router-dom";

function Group(){

  const navigate=useNavigate();

  const{
    data=[],
    isLoading
  }=useMyGroups();

  if(isLoading){
    return <h2>Loading...</h2>;
  }

  return(

    <div className={styles["groups-container"]}>

      <div className={styles["groups-header"]}>

        <h1>My Groups</h1>

        <button
          className={styles["create-group-btn"]}
          onClick={()=>navigate("/create-group")}
        >
          + Create Group
        </button>

      </div>

      <div className={styles["group-wrapper"]}>

        {data.map(group=>(

          <GroupCard
            key={group._id}
            group={group}
          />

        ))}

      </div>

    </div>

  );

}

export default Group;