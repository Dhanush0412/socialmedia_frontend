import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {URL} from "../../../config";

const getMessages=async(groupid)=>{

const response=await axios.get(
`${URL}/message/getting/${groupid}`,
{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);

return response.data;

};

export const useGroupMessages=(groupid)=>{

return useQuery({

queryKey:["group-messages",groupid],

queryFn:()=>getMessages(groupid),

enabled:!!groupid,

refetchOnWindowFocus:false

});

};