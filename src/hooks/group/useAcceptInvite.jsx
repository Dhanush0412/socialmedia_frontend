import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../config";

const acceptInvite=async(inviteid)=>{
  const response=await axios.put(
    `${URL}/group/accept/${inviteid}`
  );
  return response.data;
};

export const useAcceptInvite=()=>{
  return useMutation({
    mutationFn:acceptInvite,
    onSuccess:(data)=>{
      toast.success(
        data.message || "Invite accepted"
      );
    },
    onError:(error)=>{
      toast.error(
        error.response?.data || "Accept failed"
      );
    }
  });
};