import {useState} from "react";

function ChatInput(){

const [text,setText]=useState("");

const send=()=>{

if(!text.trim())
return;

console.log(text);

setText("");

};

return(
<div className="chat-input">

<input
type="text"
placeholder="Type text..."
value={text}
onChange={(e)=>setText(e.target.value)}
/>

<button onClick={send}>
Send
</button>

</div>
);
}

export default ChatInput;