import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../config";

const sendInvite=async(inviteData)=>{
  const response=await axios.post(
    `${URL}/group/invite`,
    inviteData
  );
  return response.data;
};

export const useSendInvite=()=>{
  return useMutation({
    mutationFn:sendInvite,
    onSuccess:(data)=>{
      toast.success(
        data.message || "Invite sent successfully"
      );
    },
    onError:(error)=>{
      toast.error(
        error.response?.data || "Invite failed"
      );
    }
  });
};