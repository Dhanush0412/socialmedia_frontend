import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL } from "../../../config";


const getInvites=async()=>{

 const response=await axios.get(
  `${URL}/group/invites`,
  {
   withCredentials:true
  }
 );

 return response.data;

};


export const useGroupInvites=()=>{

 return useQuery({

  queryKey:["groupInvites"],

  queryFn:getInvites

 });

};