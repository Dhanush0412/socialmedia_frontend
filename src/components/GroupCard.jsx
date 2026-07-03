import {
Card,
Avatar,
Typography,
Button,
Box
} from "@mui/material";
import {useNavigate} from "react-router-dom";


function GroupCard({group}){

const navigate=useNavigate();


return(

<Card
sx={{
display:"flex",
alignItems:"center",
padding:2
}}
>


<Avatar>

{
group.name
.charAt(0)
}

</Avatar>


<Box
sx={{
flex:1,
ml:2
}}
>

<Typography
fontWeight={700}
>

{
group.name
}

</Typography>


<Typography>
Group Chat
</Typography>


</Box>


<Button

variant="contained"

onClick={()=>navigate(
`/groupchat/${group._id}`
)}

>

Open

</Button>


</Card>

);

}

export default GroupCard;