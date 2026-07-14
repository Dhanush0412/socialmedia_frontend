import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../config";

const rejectInvite = async (inviteid) => {

  const response = await axios.put(
    `${URL}/group/reject/${inviteid}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  return response.data;

};

export const useRejectGroupInvite = () => {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: rejectInvite,

    onSuccess: (data) => {

      toast.success(data.message || "Invite rejected");

      queryClient.invalidateQueries({
        queryKey: ["group-invites"]
      });

    },

    onError: (error) => {

      toast.error(
        error.response?.data || "Reject failed"
      );

    }

  });

};