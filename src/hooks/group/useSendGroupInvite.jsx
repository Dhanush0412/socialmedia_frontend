import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";


const sendInvite=async({
  groupid,
  receiverid
})=>{

 const response=await axios.post(
   `${URL}/group/sendinvite/${groupid}/${receiverid}`,
   {},
   {
    withCredentials:true
   }
 );

 return response.data;

};


export const useSendGroupInvite=()=>{

 return useMutation({
  mutationFn:sendInvite
 });

};