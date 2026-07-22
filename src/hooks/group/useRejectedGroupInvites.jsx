import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";

const getRejectedGroupInvites = async (groupid) => {
  const response = await axios.get(
    `${URL}/group/rejectedlist/${groupid}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};

export const useRejectedGroupInvites = (
  groupid,
  enabled = true
) => {
  return useQuery({
    queryKey: ["rejected-group-invites", groupid],
    queryFn: () => getRejectedGroupInvites(groupid),
    enabled: !!groupid && enabled,
  });
};