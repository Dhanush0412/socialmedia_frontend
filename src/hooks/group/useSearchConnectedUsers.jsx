import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";

const searchConnectedUsers = async (search) => {
  const response = await axios.get(
    `${URL}/group/searchconnecteduser`,
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

export const useSearchConnectedUsers = (search) => {
  return useQuery({
    queryKey: ["search-connected-users", search],
    queryFn: () => searchConnectedUsers(search),
    enabled: search.trim().length > 0,
    staleTime: 0,
  });
};