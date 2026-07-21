import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";

const getUnreadCount = async () => {
  const response = await axios.get(
    `${URL}/dmessage/unread`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};

export const useUnreadCount = () => {
  return useQuery({
    queryKey: ["unreadCount"],
    queryFn: getUnreadCount,

    // Cache data for 5 minutes
    staleTime: 1000 * 30 * 1,

    // Keep cache for 10 minutes
    gcTime: 1000 * 60 * 10,

    // Only fetch once unless you manually invalidate
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,

    retry: 1,
  });
};