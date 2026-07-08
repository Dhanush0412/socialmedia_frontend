import {useEffect,useRef,useState} from "react";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useGroupMessages} from "../../hooks/group/useGroupMessages";
import {useSendGroupMessage} from "../../hooks/group/useSendGroupMessage";
import "../../Css/GroupChat.css";

export default function GroupChat(){

const {groupid}=useParams();

const userid=localStorage.getItem("userid");

const [text,setText]=useState("");

const bottomRef=useRef(null);

const{
data:messages=[],
isLoading
}=useGroupMessages(groupid);

const{
mutate:sendMessage,
isPending
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

if(isLoading){

return(

<div className="group-chat-loading">

Loading Chat...

</div>

);

}

return(

<div className="group-chat">

<div className="chat-header">

<h2>

Group Chat

</h2>

</div>

<div className="chat-body">

{

messages.map(message=>(

<div
key={message._id}
className={
message.sender._id===userid
?
"message sent"
:
"message received"
}
>

{

message.sender._id!==userid&&(

<div className="sender-name">

{message.sender.fullname}

</div>

)

}

<div className="message-text">

{message.text}

</div>

<div className="message-time">

{new Date(message.createdAt)
.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})}

</div>

</div>

))

}

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
disabled={isPending}
>

{isPending?"Sending...":"Send"}

</button>

</div>

</div>

);

}