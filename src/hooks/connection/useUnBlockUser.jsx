import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";
import { toast } from "react-toastify";

const unblockUser = async (unblockprofileid) => {

  const response = await axios.delete(
    `${URL}/connection/unblock/${unblockprofileid}`,
    {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;

};


export const useUnblockUser = () => {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: unblockUser,


   onSuccess: (data) => {

  console.log("Unblock response:", data);

  toast.success(
    typeof data === "string"
      ? data
      : "User unblocked"
  );


  queryClient.invalidateQueries({
    queryKey:["blockedUsers"],
  });


  queryClient.invalidateQueries({
    queryKey:["connections"],
  });

},


    onError:(error)=>{

      toast.error(
        error.response?.data ||
        "Unable to unblock user"
      );

    }

  });

};