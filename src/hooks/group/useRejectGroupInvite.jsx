import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";


const rejectInvite=async(inviteid)=>{

 const response=await axios.put(
  `${URL}/group/reject/${inviteid}`,
  {},
  {
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}

 );

 return response.data;

};


export const useRejectGroupInvite=()=>{

 return useMutation({

  mutationFn:rejectInvite

 });

};