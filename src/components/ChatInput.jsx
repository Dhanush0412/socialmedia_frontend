import {useState} from "react";

function ChatInput(){

const [message,setMessage]=useState("");

const sendMessage=()=>{

if(!message.trim())
return;

console.log(message);

setMessage("");

};

return(
<div className="chat-input">

<input
type="text"
placeholder="Type message..."
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>

<button onClick={sendMessage}>
Send
</button>

</div>
);
}

export default ChatInput;