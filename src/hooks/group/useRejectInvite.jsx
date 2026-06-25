import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../config";

const rejectInvite=async(inviteid)=>{
  const response=await axios.put(
    `${URL}/group/reject/${inviteid}`
  );
  return response.data;
};

export const useRejectInvite=()=>{
  return useMutation({
    mutationFn:rejectInvite,
    onSuccess:(data)=>{
      toast.success(
        data.message || "Invite rejected"
      );
    },
    onError:(error)=>{
      toast.error(
        error.response?.data || "Reject failed"
      );
    }
  });
};