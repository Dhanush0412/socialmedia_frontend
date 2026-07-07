import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";

const markMessagesRead = async (receiverid) => {

  const response = await axios.put(
    `${URL}/dmessage/read/${receiverid}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  return response.data;
};

export const useMarkRead = () => {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: markMessagesRead,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["unreadCount"]
      });

    }

  });

};