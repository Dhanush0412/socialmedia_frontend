import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDirectMessages } from "../hooks/chat/useDirectMessages";
import { useSendMessage } from "../hooks/chat/useSendMessage";
import { socket } from "../socket";
import "../Css/Chat.css";

function Chat(){

  const { id } = useParams();
  const userId = localStorage.getItem("userid");

  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);

  const messageEndRef = useRef(null);

  const { data, isLoading } = useDirectMessages(id);
  const sendMutation = useSendMessage();
useEffect(()=>{
  if(data){
    setMessages([...data].reverse());
  }
},[data]);

useEffect(()=>{
  socket.emit("joinprofile",userId);

  const receiveMessage=(newMessage)=>{
    const senderId=newMessage.sender?._id || newMessage.sender;
    const receiverId=newMessage.receiver?._id || newMessage.receiver;

    const isCurrentChat=
      (senderId===id && receiverId===userId) ||
      (senderId===userId && receiverId===id);

    if(isCurrentChat){
      setMessages(prev=>{
        const exists=prev.some(
          msg=>msg._id===newMessage._id
        );

        if(exists) return prev;

        return [...prev,newMessage];
      });
    }
  };

  socket.on("receiveDirectMessage",receiveMessage);

  return()=>{
    socket.off("receiveDirectMessage",receiveMessage);
  };
},[id,userId]);


  useEffect(()=>{

    messageEndRef.current?.scrollIntoView({
      behavior:"smooth"
    });

  },[messages]);

const sendMessage=()=>{

  if(!message.trim()){
    return;
  }


  sendMutation.mutate(
    {
      receiverid:id,
      text:message.trim()
    },
    {
      onSuccess:()=>{

        setMessage("");

      }
    }
  );

};

    
  if(isLoading){

    return(
      <div className="chat-loading">
        Loading chat...
      </div>
    );

  }



  return(

    <div className="chat-box">

      <div className="chat-top">

  <div className="chat-top-left">

    <div className="chat-avatar">
      <span>{id ? id.charAt(0).toUpperCase() : "U"}</span>
    </div>

    <div className="chat-top-info">
      <h2>Chat</h2>
      <span className="chat-top-status">Online</span>
    </div>

  </div>

</div>


      <div className="chat-body">


        {
          messages.map((msg,index)=>(

            <div

              key={msg._id || index}

              className={
                msg.sender?._id === userId
                ?
                "message-wrapper sent"
                :
                "message-wrapper received"
              }

            >

              <div className="message-content">

                <p>
                  {msg.text}
                </p>

                <span>
                  {
                    msg.createdAt &&
                    new Date(
                      msg.createdAt
                    ).toLocaleTimeString(
                      [],
                      {
                        hour:"2-digit",
                        minute:"2-digit"
                      }
                    )
                  }
                </span>

              </div>


            </div>

          ))
        }


        <div ref={messageEndRef}/>


      </div>



      <div className="chat-footer">


        <input

          value={message}

          placeholder="Type a message..."

          onChange={
            e=>setMessage(e.target.value)
          }


          onKeyDown={
            e=>{

              if(e.key==="Enter"){
                sendMessage();
              }

            }
          }

        />


        <button

          onClick={sendMessage}

          disabled={
            sendMutation.isPending ||
            !message.trim()
          }

        >

          {
            sendMutation.isPending
            ?
            "..."
            :
            "Send"
          }

        </button>


      </div>


    </div>

  );

}

export default Chat;