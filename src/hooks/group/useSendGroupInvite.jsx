import { useMutation,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";


const sendInvite=async({
  groupid,
  receiverid
})=>{

 const response=await axios.post(
   `${URL}/group/sendinvite/${groupid}/${receiverid}`,
   {},{
   headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}}
 );

 return response.data;

};


export const useSendGroupInvite=()=>{
const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendInvite,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["group-invites"]
      });

    }


})}