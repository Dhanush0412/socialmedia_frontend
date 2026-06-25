import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../config";

const getPendingInvites=async(profileid)=>{
  const response=await axios.get(
    `${URL}/group/invite/${profileid}`
  );
  return response.data;
};

export const usePendingInvites=(profileid)=>{
  return useQuery({
    queryKey:["pending-invites",profileid],
    queryFn:()=>getPendingInvites(profileid),
    enabled:!!profileid
  });
};