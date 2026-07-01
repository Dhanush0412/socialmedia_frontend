import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import "../Css/Chat.css";

function Chat(){
  const { id } = useParams();
  const userId = localStorage.getItem("userid");
  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);

  useEffect(()=>{
    socket.emit("join",userId);

    socket.on("receiveMessage",(data)=>{
      setMessages((prev)=>[
        ...prev,
        {
          sender:data.sender,
          message:data.message,
          time:new Date().toLocaleTimeString()
        }
      ]);
    });

    return()=>{
      socket.off("receiveMessage");
    };
  },[userId]);

  const sendMessage=()=>{
    if(!message.trim()){
      return;
    }

    const data={
      sender:userId,
      receiver:id,
      message:message
    };

    socket.emit("sendMessage",data);

    setMessages((prev)=>[
      ...prev,
      {
        sender:userId,
        message,
        time:new Date().toLocaleTimeString()
      }
    ]);

    setMessage("");
  };

  return(
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat</h2>
      </div>

      <div className="chat-messages">
        {
          messages.map((msg,index)=>(
            <div
              key={index}
              className={
                msg.sender === userId
                ? "message sent"
                : "message received"
              }
            >
              <p>
                {msg.message}
              </p>
              <span>
                {msg.time}
              </span>
            </div>
          ))
        }
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          placeholder="Type message..."
          onChange={(e)=>setMessage(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key==="Enter"){
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;