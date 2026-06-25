import {useParams} from "react-router-dom";
import {useGroupDetails} from "../hooks/group/useGroupDetails";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import "../css/chat.css";

function GroupChat(){

const {groupid}=useParams();

const {
data,
isLoading
}=useGroupDetails(groupid);

if(isLoading)
return <h2>Loading...</h2>;

return(
<div className="chat-container">

<div className="chat-header">
<h1>Hello Group chat</h1>
<h2>
{data?.name}
</h2>
</div>

<MessageList/>

<ChatInput/>

</div>
);
}

export default GroupChat;