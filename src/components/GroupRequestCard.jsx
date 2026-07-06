import {
Card,
CardContent,
Avatar,
Typography,
Button,
Box
} from "@mui/material";

function GroupRequestCard({
invite,
onAccept,
onReject
}){

return(

<Card
sx={{
display:"flex",
alignItems:"center",
padding:2,
borderRadius:3
}}
>


<Avatar
src={invite.group?.image}
sx={{
width:55,
height:55
}}
>

{
invite.group?.name
?.charAt(0)
}

</Avatar>


<CardContent
sx={{
flex:1
}}
>

<Typography
fontWeight={700}
>

{
invite.group?.name
}

</Typography>


<Typography
color="gray"
>

Group Invitation

</Typography>


</CardContent>


<Box>

<Button
variant="contained"
color="success"
onClick={onAccept}
>

Accept

</Button>


<Button
variant="outlined"
color="error"
sx={{
ml:1
}}
onClick={onReject}
>

Reject

</Button>


</Box>


</Card>

);

}

export default GroupRequestCard;