import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";

const getUnreadCount = async () => {

  const response = await axios.get(
    `${URL}/dmessage/unread`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  return response.data;
};

export const useUnreadCount = () => {

  return useQuery({
    queryKey: ["unreadCount"],
    queryFn: getUnreadCount,
    refetchOnWindowFocus: false
  });

};