import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";

const searchConnectedUsers = async (groupid, search) => {
  const response = await axios.get(
    `${URL}/group/searchconnecteduser/${groupid}`,
    {
      params: {
        username: search,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};

export const useSearchConnectedUsers = (groupid, search) => {
  return useQuery({
    queryKey: ["search-connected-users", groupid, search],

    queryFn: () => searchConnectedUsers(groupid, search),

    enabled: !!groupid,

    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};