import {useEffect,useRef,useState} from "react";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";

import Layout from "../../components/Layout/Layout";

import {useGroupDetails} from "../../hooks/group/useGroupDetails";
import {useGroupMessages} from "../../hooks/group/useGroupMessages";
import {useSendGroupMessage} from "../../hooks/groupchat/useSendGroupMessage";

import "./GroupChat.css";

export default function GroupChat(){

const {groupid}=useParams();

const profileid=localStorage.getItem("profileid");

const [text,setText]=useState("");

const bottomRef=useRef(null);

const{
data:group={},
isLoading:isGroupLoading
}=useGroupDetails(groupid);

const{
data:messages=[],
isLoading:isMessagesLoading
}=useGroupMessages(groupid);

const{
mutate:sendMessage,
isPending:isSending
}=useSendGroupMessage();

useEffect(()=>{

bottomRef.current?.scrollIntoView({
behavior:"smooth"
});

},[messages]);

const handleSend=()=>{

if(text.trim()===""){
return;
}

sendMessage(
{
groupid,
text
},
{
onSuccess:()=>{
setText("");
},
onError:(error)=>{
toast.error(
error.response?.data||
"Unable to send message"
);
}
}
);

};
console.log(groupid)

if(isGroupLoading||isMessagesLoading){

return(

<Layout>

<div className="group-chat-loading">

Loading Chat...

</div>

</Layout>

);

}

return(

<Layout>

<div className="group-chat">

<div className="chat-header">

<div className="chat-header-left">

<img
className="group-avatar"
src={group.groupimage}
alt={group.groupname}
/>

<div>

<h2>{group.groupname}</h2>

<p>{group.members?.length||0} Members</p>

</div>

</div>

</div>

<div className="chat-body">
    {Array.isArray(messages)&&messages.map(message=>{

const own=
message.sender?._id===profileid;

return(

<div
key={message._id}
className={
own
?
"message-row own"
:
"message-row"
}
>

<div
className={
own
?
"message sent"
:
"message received"
}
>

{!own&&(

<div className="sender-name">

{
message.sender?.user?.username||
message.sender?.fullname||
message.sender?.username||
"Unknown"
}

</div>

)}

<div className="message-text">

{message.text}

</div>

<div className="message-time">

{
new Date(message.createdAt).toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})
}

</div>

</div>

</div>

);

})}

<div ref={bottomRef}></div>

</div>
<div className="chat-footer">

<input
type="text"
placeholder="Type a message..."
value={text}
onChange={(e)=>setText(e.target.value)}
onKeyDown={(e)=>{
if(e.key==="Enter"){
handleSend();
}
}}
/>

<button
onClick={handleSend}
disabled={isSending}
>

{
isSending
?
"Sending..."
:
"Send"
}

</button>

</div>

</div>

</Layout>

);

}