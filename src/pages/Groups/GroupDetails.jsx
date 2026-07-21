import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import { useSearchConnectedUsers } from "../../hooks/group/useSearchConnectedUsers";
import { useSendGroupInvite } from "../../hooks/group/useSendGroupInvite";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";

import styles from "./GroupDetails.module.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 420,
    },
  },
};

export default function GroupDetails() {
  const { groupid } = useParams();

  const [selectedUsers, setSelectedUsers] = useState([]);

  const {
    data = [],
    isLoading,
  } = useSearchConnectedUsers(groupid, "");

  const { mutate: sendInvite } = useSendGroupInvite();

  const inviteSelected = () => {
    if (!selectedUsers.length) {
      toast.warning("Please select friends");
      return;
    }

    selectedUsers.forEach((user) => {
      sendInvite(
        {
          groupid,
          receiverid: user._id,
        },
        {
          onSuccess: (response) => {
          toast.success(
            response?.data || "Invitation sent successfully"
          );
        },
          onError: (error) => {
            toast.error(
              error.response?.data ||
                "Unable to send invitation"
            );
          },
        }
      );
    });

    setSelectedUsers([]);
  };

  return (
    <Layout>
      <div className={styles["search-users"]}>
        <div className={styles["search-users__header"]}>
          <div className={styles["search-users__icon"]}>
            👥
          </div>

          <h1 className={styles["search-users__title"]}>
            Invite Friends
          </h1>

          <p className={styles["search-users__subtitle"]}>
            Select your connected friends and invite them to this
            group.
          </p>
        </div>

        <Box
          sx={{
            width: "100%",
            maxWidth: 650,
            margin: "30px auto",
          }}
        >
          <FormControl fullWidth>
  <InputLabel id="friends-select-label">
    Select Friends
  </InputLabel>

  <Select
    labelId="friends-select-label"
    multiple
    value={selectedUsers.map((user) => user._id)}
    input={<OutlinedInput label="Select Friends" />}
    MenuProps={MenuProps}
    displayEmpty
    renderValue={(selected) => {
      if (selected.length === 0) {
        return "Select Friends";
      }

      return selectedUsers
        .map((user) => user.user.username)
        .join(", ");
    }}
    onChange={(event) => {
      const selectedIds = event.target.value;

      const selected = data.filter((user) =>
        selectedIds.includes(user._id)
      );

      setSelectedUsers(selected);
    }}
  >
    {isLoading ? (
      <MenuItem disabled>
        Loading...
      </MenuItem>
    ) : data.length === 0 ? (
      <MenuItem disabled>
        No connected friends found
      </MenuItem>
    ) : (
      data.map((user) => (
        <MenuItem
          key={user._id}
          value={user._id}
        >
          <Checkbox
            checked={selectedUsers.some(
              (item) => item._id === user._id
            )}
          />

          <Avatar
            src={user.profilepic}
            sx={{
              width: 40,
              height: 40,
              mr: 2,
            }}
          />

          <ListItemText
            primary={user.user.username}
            secondary={
              user.bio || "No bio available"
            }
          />
        </MenuItem>
      ))
    )}
  </Select>
</FormControl>

</Box>
{selectedUsers.length > 0 && (
  <div className={styles.selectedUsers}>
    <Typography
      variant="h6"
      sx={{
        mb: 2,
        fontWeight: 600,
      }}
    >
      Selected Friends ({selectedUsers.length})
    </Typography>

    {selectedUsers.map((user) => (
      <div
        key={user._id}
        className={styles.selectedUser}
      >
        <Avatar
          src={user.profilepic}
          alt={user.user.username}
          sx={{
            width: 50,
            height: 50,
            mr: 2,
          }}
        />

        <div
          style={{
            flex: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
          >
            {user.user.username}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {user.bio || "No bio available"}
          </Typography>
        </div>

        <Button
          color="error"
          variant="outlined"
          size="small"
          onClick={() =>
            setSelectedUsers((prev) =>
              prev.filter(
                (item) => item._id !== user._id
              )
            )
          }
        >
          Remove
        </Button>
      </div>
    ))}
  </div>
)}
<Button
  variant="contained"
  size="large"
  disabled={!selectedUsers.length}
  onClick={inviteSelected}
  sx={{
    mt: 4,
    width: "100%",
    maxWidth: 320,
    display: "block",
    mx: "auto",
    py: 1.5,
    borderRadius: "12px",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: 600,
  }}
>
  Invite Selected ({selectedUsers.length})
</Button>

      </div>
    </Layout>
  );
}