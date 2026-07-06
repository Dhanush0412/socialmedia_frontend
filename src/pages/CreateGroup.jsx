import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSearchUsers } from "../hooks/connection/useSearchUsers";
import { useCreateGroup } from "../hooks/group/useCreateGroup";
import "../Css/CreateGroup.css";

function CreateGroup(){
  const [search,setSearch]=useState("");
  const [groupName,setGroupName]=useState("");
  const [selectedUsers,setSelectedUsers]=useState([]);

  const {data=[]}=useSearchUsers(search);
  const createGroup=useCreateGroup();

  const selectUser=(user)=>{
    const exists=selectedUsers.some(
      item=>item._id===user._id
    );

    if(exists){
      setSelectedUsers(
        selectedUsers.filter(
          item=>item._id!==user._id
        )
      );
    }
    else{
      setSelectedUsers([
        ...selectedUsers,
        user
      ]);
    }
  };

  const createNewGroup=()=>{

    if(!groupName.trim() || selectedUsers.length===0){
      return;
    }

    createGroup.mutate({
  groupname:groupName
});
  };

  return(
    <Layout>
    <div className="create-group">

      <h2>
        Create Group
      </h2>

      <input
        placeholder="Group name"
        value={groupName}
        onChange={(e)=>setGroupName(e.target.value)}
      />

      <input
        placeholder="Search users..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />


      <div className="selected-users">

        {
          selectedUsers.map(user=>(
            <div
              key={user._id}
              className="selected-user"
            >
              {user.user.username}
            </div>
          ))
        }

      </div>


      <div className="user-list">

        {
          data.map(user=>(
            <div
              key={user._id}
              className={
                selectedUsers.some(
                  item=>item._id===user._id
                )
                ?
                "user active"
                :
                "user"
              }
              onClick={()=>selectUser(user)}
            >

              <img
                src={user.profilepic}
              />

              <span>
                {user.user.username}
              </span>


              {
                selectedUsers.some(
                  item=>item._id===user._id
                )
                &&
                <b>
                  ✓
                </b>
              }

            </div>
          ))
        }

      </div>


      <button
        onClick={createNewGroup}
        disabled={createGroup.isPending}
      >
        {
          createGroup.isPending
          ?
          "Creating..."
          :
          "Create Group"
        }
      </button>


    </div>
    </Layout>
  );
}

export default CreateGroup;