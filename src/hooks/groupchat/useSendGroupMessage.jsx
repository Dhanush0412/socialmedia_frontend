import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {URL} from "../../../config";

export const useSendGroupMessage=()=>{

return useMutation({

mutationFn:async({groupid,text})=>{

const response=await axios.post(
`${URL}/message/chat/${groupid}`,
{text},
{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);

return response.data;

}

});

};