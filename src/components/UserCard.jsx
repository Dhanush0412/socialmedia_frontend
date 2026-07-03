import { useState } from "react";
import { useSendConnection } from "../hooks/connection/useSendConnection";
import {
  Card,
  CardContent,
  Avatar,
  Button,
  Typography,
  Box
} from "@mui/material";

function UserCard({ user }) {
  const sendRequest = useSendConnection();
  const [sent,setSent] = useState(false);

  const username = user?.user?.username || "Unknown User";
  const image = user?.profilepic;

  const handleSendRequest = () => {
    sendRequest.mutate(user._id,{
      onSuccess:()=>{
        setSent(true);
      }
    });
  };

  return (
    <Card
      sx={{
        width:"100%",
        borderRadius:3,
        boxShadow:3,
        display:"flex",
        alignItems:"center",
        flexShrink:0
      }}
    >

      <CardContent
        sx={{
          width:"100%",
          display:"flex",
          alignItems:"center",
          gap:2,
          padding:"18px !important"
        }}
      >

        <Box
          sx={{
            position:"relative",
            flexShrink:0
          }}
        >

          <Avatar
            src={image}
            sx={{
              width:65,
              height:65,
              fontSize:28
            }}
          >
            {!image && username.charAt(0).toUpperCase()}
          </Avatar>


          <Box
            sx={{
              position:"absolute",
              width:14,
              height:14,
              background:"#22c55e",
              borderRadius:"50%",
              right:2,
              bottom:3,
              border:"3px solid white"
            }}
          />

        </Box>


        <Box
          sx={{
            flex:1,
            overflow:"hidden"
          }}
        >

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              whiteSpace:"nowrap",
              overflow:"hidden",
              textOverflow:"ellipsis"
            }}
          >
            {username}
          </Typography>

        </Box>


        <Button
          variant="contained"
          sx={{
            borderRadius:5,
            textTransform:"none",
            px:3,
            flexShrink:0,
            background: sent
              ? "#22c55e"
              : "linear-gradient(135deg,#6366f1,#8b5cf6)",
            "&:hover":{
              background: sent
                ? "#16a34a"
                : "linear-gradient(135deg,#4f46e5,#7c3aed)"
            }
          }}
          onClick={handleSendRequest}
          disabled={sendRequest.isPending || sent}
        >
          {
            sendRequest.isPending
            ? "Sending..."
            : sent
            ? "✓ Sent"
            : "Connect"
          }
        </Button>

      </CardContent>

    </Card>
  );
}

export default UserCard;