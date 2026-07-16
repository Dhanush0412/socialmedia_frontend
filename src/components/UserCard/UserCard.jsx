import { useState } from "react";
import { useSendConnection } from "../../hooks/connection/useSendConnection";
import {
  Card,
  CardContent,
  Avatar,
  Button,
  Typography,
  Box
} from "@mui/material";
import styles from "./UserCard.module.css";

function UserCard({ user }) {

  const sendRequest = useSendConnection();
  const [sent, setSent] = useState(false);

  const username = user?.user?.username || "Unknown User";
  const image = user?.profilepic;

  const handleSendRequest = () => {
    sendRequest.mutate(user._id, {
      onSuccess: () => {
        setSent(true);
      }
    });
  };

  return (

    <Card className={styles.card}>

      <CardContent className={styles.cardContent}>

        <Box className={styles.avatarWrapper}>

          <Avatar
            src={image}
            className={styles.avatar}
          >
            {!image && username.charAt(0).toUpperCase()}
          </Avatar>

          <Box className={styles.onlineDot} />

        </Box>

        <Box className={styles.userInfo}>

          <Typography
            variant="h6"
            className={styles.username}
          >
            {username}
          </Typography>

        </Box>

        <Button
          variant="contained"
          className={`${styles.connectButton} ${
            sent ? styles.sentButton : ""
          }`}
          onClick={handleSendRequest}
          disabled={sendRequest.isPending || sent}
        >
          {sendRequest.isPending
            ? "Sending..."
            : sent
            ? "✓ Sent"
            : "Connect"}
        </Button>

      </CardContent>

    </Card>

  );
}

export default UserCard;