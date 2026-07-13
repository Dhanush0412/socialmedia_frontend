import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {URL} from "../../../config";

const getPendingGroupInvites=async()=>{

const response=await axios.get(
`${URL}/group/invites`,
{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);

return response.data;

};

export const usePendingGroupInvites=()=>{

return useQuery({

queryKey:["group-invites"],

queryFn:getPendingGroupInvites,

staleTime:1000*60,

refetchOnWindowFocus:false

});

};