function MessageList(){

const messages=[
{
id:1,
sender:"John",
message:"Hello everyone"
},
{
id:2,
sender:"Admin",
message:"Welcome to group"
},
{
id:3,
sender:"Employee",
message:"Welcome to Office"
}
];

return(
<div className="message-list">

{
messages.map((item)=>(
<div
className="message-box"
key={item.id}
>

<h5>
{item.sender}
</h5>

<p>
{item.message}
</p>

</div>
))
}

</div>
);

}

export default MessageList;