import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDebounce } from "../../hooks/useDebounce";
import Layout from "../../components/Layout/Layout";
import { useSearchConnectedUsers } from "../../hooks/group/useSearchConnectedUsers";
import { useSendGroupInvite } from "../../hooks/group/useSendGroupInvite";

import {
  Autocomplete,
  Avatar,
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import "../../Css/SearchUsers.css";
import "./GroupDetails.css";

export default function GroupDetails() {
  const { groupid } = useParams();

 const [search, setSearch] = useState("");

const debouncedSearch = useDebounce(search, 1000);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const {
  data = [],
  isLoading,
} = useSearchConnectedUsers(debouncedSearch);
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
          onError: (error) => {
            toast.error(
              error.response?.data ||
                "Unable to send invitation"
            );
          },
        }
      );
    });

    toast.success("Invitations sent");

    setSelectedUsers([]);
    setSearch("");
  };

  return (
    <Layout>
      <div className="search-users">
        <div className="search-users__header">
          <div className="search-users__icon">
            👥
          </div>

          <h1 className="search-users__title">
            Invite Friends
          </h1>

          <p className="search-users__subtitle">
            Search and select multiple friends to invite into this group
          </p>
        </div>

        <Box
          sx={{
            width: "100%",
            maxWidth: 650,
            margin: "30px auto",
          }}
        >
          <Autocomplete
            multiple
            disableCloseOnSelect
            loading={isLoading}
            options={Array.isArray(data) ? data : []}
            value={selectedUsers}
            filterOptions={(x) => x}
            getOptionLabel={(option) =>
              option?.user?.username || ""
            }
            isOptionEqualToValue={(option, value) =>
              option._id === value._id
            }
            onInputChange={(event, value) => {
              setSearch(value);
            }}
            onChange={(event, newValue) => {
              setSelectedUsers(newValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  avatar={
                    <Avatar src={option.profilepic} />
                  }
                  label={option.user.username}
                  {...getTagProps({ index })}
                  key={option._id}
                />
              ))
            }
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option._id}>
                <Checkbox
                  checked={selected}
                  sx={{ mr: 2 }}
                />

                <Avatar
                  src={option.profilepic}
                  sx={{
                    width: 42,
                    height: 42,
                    mr: 2,
                  }}
                />

                <Box>
                  <Typography
                    fontWeight={600}
                  >
                    {option.user.username}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {option.bio ||
                      "No bio available"}
                  </Typography>
                </Box>
              </li>
            )}
            
            renderInput={(params) => (
  <TextField
    {...params}
    label="Search Friends"
    placeholder="Type username..."
  />
)}
          />
        </Box>

        <div className="search-users__count">
          Selected :
          <strong>
            {" "}
            {selectedUsers.length}
          </strong>
        </div>

        {selectedUsers.length > 0 && (
          <div className="selected-users-preview">
            {selectedUsers.map((user) => (
              <div
                className="selected-user-card"
                key={user._id}
              >
                <Avatar
                  src={user.profilepic}
                  sx={{
                    width: 45,
                    height: 45,
                  }}
                />

                <div>
                  <h4>
                    {user.user.username}
                  </h4>

                  <p>
                    {user.bio ||
                      "No bio available"}
                  </p>
                </div>
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
            mt: 3,
            width: "100%",
            maxWidth: 300,
            display: "block",
            mx: "auto",
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